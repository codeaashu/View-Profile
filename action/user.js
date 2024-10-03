import prisma from "@/lib/db";
import { handleRedisOperation, updateUserCache } from "@/lib/redis";
import { handleActionError, handleCaughtActionError } from "@/utils";

// return is used with handleActionError to ensure that the function immediately exits after the error handling logic has been applied.

export async function getUserByEmail(email, throwable = false) {
  if (!email || !email.trim()) return null;

  try {
    const cacheUser = await handleRedisOperation("get", `email:${email}`);
    if (cacheUser) return JSON.parse(cacheUser);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        projects: true,
        education: true,
        experience: true,
      },
    });

    if (!user) return null;

    await updateUserCache(user);

    return user;
  } catch (error) {
    handleCaughtActionError(
      "Error in fetching user",
      error.message,
      throwable,
      null
    );
  }
}

export async function getAllUsers(throwable = false) {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    handleCaughtActionError(
      "Error in fetching users",
      error.message,
      throwable,
      []
    );
  }
}

export async function getUserByUsername(username, throwable = false) {
  if (!username || !username?.trim()) return null;

  try {
    const cacheEmail = await handleRedisOperation(
      "get",
      `username:${username}`
    );

    const cacheUser = cacheEmail
      ? await handleRedisOperation("get", `email:${cacheEmail}`)
      : null;

    if (cacheUser) return JSON.parse(cacheUser);

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        projects: true,
        education: true,
        experience: true,
      },
    });

    if (!user) return null;

    await updateUserCache(user);

    return user;
  } catch (error) {
    handleCaughtActionError(
      "Error in fetching user",
      error.message,
      throwable,
      null
    );
  }
}

export async function createUser(data, throwable = false) {
  try {
    const cacheEmail = await handleRedisOperation(
      "get",
      `username:${data.username}`
    );

    const userExists = cacheEmail
      ? true
      : await prisma.user.findUnique({
          where: {
            username: data.username,
          },
        });

    if (userExists) {
      if (!cacheEmail) await updateUserCache(userExists);
      return handleActionError(
        "Username already exists. Please choose a different username.",
        throwable,
        null
      );
    }

    const newUser = await prisma.user.create({
      data,
    });

    if (!newUser)
      return handleActionError(
        "Failed to create user. Please try again later.",
        throwable,
        null
      );

    await updateUserCache(newUser);

    return newUser;
  } catch (error) {
    handleCaughtActionError(
      "Error in creating user",
      error.message,
      throwable,
      null
    );
  }
}

export async function updateUser(data, throwable = false) {
  try {
    const cacheUser = await handleRedisOperation("get", `email:${data.email}`);

    const user = cacheUser
      ? JSON.parse(cacheUser)
      : await prisma.user.findUnique({
          where: {
            email: data.email,
          },
          include: {
            experience: true,
            projects: true,
            education: true,
          },
        });

    if (!user) return handleActionError("User not found.", throwable, null);

    if (user.username !== data.username) {
      const cacheOtherEmail = await handleRedisOperation(
        "get",
        `username:${data.username}`
      );

      const sameUsernameExists =
        cacheOtherEmail ||
        (await prisma.user.findUnique({
          where: {
            username: data.username,
          },
        }));

      if (sameUsernameExists) {
        if (!cacheOtherEmail) await updateUserCache(sameUsernameExists);
        return handleActionError("Username already exists.", throwable, null);
      }
    }

    // Perform the update within a single transaction
    const updatedUser = await prisma.$transaction(
      async (tx) => {
        // Prepare sets and operations
        const newExperienceSet = new Set(
          data.experience.map((exp) => `${exp.company}-${exp.position}`)
        );
        const newProjectsSet = new Set(data.projects.map((proj) => proj.name));
        const newEducationSet = new Set(
          data.education.map((edu) => edu.degree)
        );

        // Handle experience updates or creates
        const experienceToDelete = user.experience.filter(
          (exp) => !newExperienceSet.has(`${exp.company}-${exp.position}`)
        );
        const deleteExperiencePromises = experienceToDelete.map((exp) =>
          tx.experience.delete({ where: { id: exp.id } })
        );
        const upsertExperiencePromises = data.experience.map((exp) =>
          tx.experience.upsert({
            where: {
              userId_company_position: {
                userId: user.id,
                company: exp.company,
                position: exp.position,
              },
            },
            update: exp,
            create: { ...exp, userId: user.id },
          })
        );

        // Handle project updates or creates
        const projectsToDelete = user.projects.filter(
          (project) => !newProjectsSet.has(project.name)
        );
        const deleteProjectPromises = projectsToDelete.map((project) =>
          tx.project.delete({ where: { id: project.id } })
        );
        const upsertProjectPromises = data.projects.map((project) =>
          tx.project.upsert({
            where: { userId_name: { userId: user.id, name: project.name } },
            update: project,
            create: { ...project, userId: user.id },
          })
        );

        // Handle education updates or creates
        const educationToDelete = user.education.filter(
          (edu) => !newEducationSet.has(edu.degree)
        );
        const deleteEducationPromises = educationToDelete.map((edu) =>
          tx.education.delete({ where: { id: edu.id } })
        );
        const upsertEducationPromises = data.education.map((edu) =>
          tx.education.upsert({
            where: { userId_degree: { userId: user.id, degree: edu.degree } },
            update: edu,
            create: { ...edu, userId: user.id },
          })
        );

        // Perform all deletions and upserts in parallel
        await Promise.all([
          ...deleteExperiencePromises,
          ...upsertExperiencePromises,
          ...deleteProjectPromises,
          ...upsertProjectPromises,
          ...deleteEducationPromises,
          ...upsertEducationPromises,
        ]);

        // Update the user record
        return tx.user.update({
          where: { email: data.email },
          data: {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            pic: data.pic,
            about: data.about,
            achievements: data.achievements,
            profiles: data.profiles,
            skills: { set: data.skills },
          },
          include: { projects: true, education: true, experience: true },
        });
      },
      {
        maxWait: 5000, // Wait up to 5 seconds for a connection
        timeout: 20000, // Abort the transaction if it takes more than 20 seconds
      }
    );

    if (!updatedUser)
      return handleActionError("Failed to update user.", throwable, null);

    await updateUserCache(updatedUser, user.username);

    return updatedUser;
  } catch (error) {
    handleCaughtActionError(
      "Error in updating user",
      error.message,
      throwable,
      null
    );
  }
}
