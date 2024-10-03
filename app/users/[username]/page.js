import { getUserByEmail, getUserByUsername } from "@/action/user";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { default_user_pic, profiles } from "@/constants";
import { Suspense } from "react";
import { capitalizeString, resolveUrl } from "@/utils";
import { permanentRedirect } from "next/navigation";
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";
const Tiptap = dynamic(() => import("@/components/Tiptap/Tiptap"), {
  ssr: false,
  loading: () => <Loader />,
});

export function generateMetadata({ params }) {
  const username = decodeURIComponent(params.username);
  return {
    title: `${capitalizeString(username)}'s Profile | Angstrom`,
    description: `View the career profile of ${capitalizeString(username)}.`,
  };
}

export default function UserPage({ params }) {
  params.username = decodeURIComponent(params.username);

  return (
    <div className="flex flex-col justify-center items-center max-w-3xl mx-auto -mb-10">
      <Suspense fallback={<Loader />}>
        <SuspenseComponent params={params} />
      </Suspense>
    </div>
  );
}

async function SuspenseComponent({ params }) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  const paramsUser = await getUserByUsername(params.username);
  if (!paramsUser) permanentRedirect("/not-found");
  return (
    <>
      {params.username === user?.username && (
        <div className="bg-slate-900 rounded-md p-3 mb-6 w-full flex flex-wrap justify-center items-center gap-3">
          Edit your profile
          <Link href={`/users/${user.username}/edit`}>
            <Button variant="outline" aria-label="edit your profile">
              Here
            </Button>
          </Link>
        </div>
      )}
      <div className="w-full flex flex-col justify-center">
        <BasicInfoSection user={paramsUser} />

        {paramsUser.achievements?.length ? (
          <>
            <Separator />
            <AchievementsSection achievements={paramsUser.achievements} />
          </>
        ) : (
          <></>
        )}

        {paramsUser.profiles && Object.keys(paramsUser.profiles)?.length ? (
          <>
            <Separator />
            <ProfilesSection userProfiles={paramsUser.profiles} />
          </>
        ) : (
          <></>
        )}

        {paramsUser.skills?.length ? (
          <>
            <Separator />
            <SkillsSection skills={paramsUser.skills} />
          </>
        ) : (
          <></>
        )}

        {paramsUser.experience?.length ? (
          <>
            <Separator />
            <ExperienceSection experience={paramsUser.experience} />
          </>
        ) : (
          <></>
        )}
        {paramsUser.projects?.length ? (
          <>
            <Separator />
            <ProjectsSection projects={paramsUser.projects} />
          </>
        ) : (
          <></>
        )}

        {paramsUser.education?.length ? (
          <>
            <Separator />
            <EducationSection education={paramsUser.education} />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

function BasicInfoSection({ user }) {
  let name;
  if (!user.firstname) name = user.lastname;
  else if (!user.lastname) name = user.firstname;
  else name = user.firstname + " " + user.lastname;

  return (
    <div className="mb-10">
      <h2 className="text-2xl">Basic Info</h2>
      <div className="flex flex-col">
        <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col gap-y-6">
            {(user.firstname || user.lastname) && (
              <div className=" overflow-hidden">
                <h4>Name</h4>
                <span className="text-sm text-muted-foreground truncate max-w-full">
                  {name}
                </span>
              </div>
            )}
            <div className=" overflow-hidden">
              <h4>Email</h4>
              <span className="text-sm text-muted-foreground truncate max-w-full">
                {user.email}
              </span>
            </div>
            <div>
              <h4>Username</h4>
              <span className="text-sm text-muted-foreground">
                {user.username}
              </span>
            </div>
          </div>
          <Image
            src={resolveUrl(user.pic, default_user_pic)}
            alt="Profile Picture"
            width={200}
            height={200}
            className="rounded-full mx-auto"
            loading="lazy"
          />
        </div>
        {user.about && (
          <div className="mt-4">
            <h4>About</h4>
            <span className="text-sm text-muted-foreground">{user.about}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function AchievementsSection({ achievements }) {
  return (
    <div className="my-10">
      <h2 className="text-2xl">Achievements</h2>
      <Tiptap desc={achievements} />
    </div>
  );
}

function ProfilesSection({ userProfiles }) {
  return (
    <div className="my-10">
      <h2 className="text-2xl">Profiles</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 place-items-stretch gap-6 mt-6">
        {Object.keys(userProfiles)
          .sort()
          .map((profileName) => (
            <div key={profileName} className="max-w-full overflow-hidden">
              <Link
                href={`${profiles[profileName].base_url}${userProfiles[profileName]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-fit max-w-full"
              >
                <Image
                  src={`/icons/profiles/${profileName}.svg`}
                  width={30}
                  height={30}
                  alt={`${profileName} logo`}
                  loading="lazy"
                />
                <span className="text-sm text-muted-foreground truncate max-w-full">
                  {userProfiles[profileName]}
                </span>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

function SkillsSection({ skills }) {
  return (
    <div className="my-10">
      <h2 className="text-2xl">Skills</h2>
      <div className=" w-full mt-2">
        <div className="w-full">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="mt-4 mr-6">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceSection({ experience }) {
  return (
    <div className="flex flex-col gap-6 my-10">
      <h2 className="text-2xl">Experience</h2>

      {experience.map((item, index) => (
        <div
          key={item.id}
          className="flex flex-col gap-x-4 gap-y-2 bg-slate-900 rounded-md p-4"
        >
          <div className="grid sm:flex sm:flex-wrap gap-x-4 gap-y-2 items-center">
            <div className=" grid sm:flex sm:flex-wrap items-center gap-x-4 gap-y-2 overflow-hidden">
              <h4 className="text-[17px] font-semibold truncate max-w-full break-words my-2 sm:my-0">
                {item.company}
              </h4>
              <div className="flex gap-x-4 items-center overflow-hidden">
                <span className="hidden sm:block">-</span>
                <span className="truncate max-w-full">{item.position}</span>
              </div>
            </div>
            <div className="flex gap-x-4 items-center overflow-hidden">
              <span className="hidden sm:block">|</span>
              <span className="text-muted-foreground text-sm truncate max-w-36">
                {item.start}
              </span>
              -
              <span className="text-muted-foreground text-sm truncate max-w-36 ">
                {item.end ? item.end : "Present"}
              </span>
            </div>
          </div>
          <span className="text-muted-foreground break-words">
            {item.about}
          </span>
        </div>
      ))}
    </div>
  );
}

function ProjectsSection({ projects }) {
  return (
    <div className="flex flex-col gap-6 my-10">
      <h2 className="text-2xl">Projects</h2>

      {projects.map((project, index) => (
        <div
          key={project.id}
          className="flex flex-col gap-x-4 gap-y-2 bg-slate-900 rounded-md p-4"
        >
          <div className="sm:flex gap-x-4 overflow-hidden">
            <h4 className="text-[17px] font-semibold truncate max-w-full break-words my-2 sm:my-0">
              {project.name}
            </h4>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="hidden sm:block">|</span>
              <Link
                href={project.code_url}
                target="_blank"
                className="text-muted-foreground text-sm underline"
              >
                Github
              </Link>
              {project.code_url != project.live_url && (
                <>
                  |
                  <Link
                    href={project.live_url}
                    target="_blank"
                    className="text-muted-foreground text-sm underline"
                  >
                    Live
                  </Link>
                </>
              )}
            </div>
          </div>
          <span className="text-sm text-muted-foreground break-words">
            {project.about}
          </span>

          <div className=" w-full">
            <div className="w-full flex flex-wrap gap-3">
              {project.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationSection({ education }) {
  return (
    <div className="flex flex-col gap-6 my-10">
      <h2 className="text-2xl">Education</h2>

      {education.map((item, index) => (
        <div
          key={item.id}
          className="flex flex-col gap-x-4 gap-y-2 bg-slate-900 rounded-md p-4"
        >
          <div className="grid lg:flex gap-x-4 gap-y-2">
            <div className="sm:flex gap-x-4 gap-y-2 overflow-hidden">
              <h4 className="text-[17px] font-semibold truncate max-w-full break-words my-2 sm:my-0">
                {item.degree}
              </h4>
              {item.specialization && (
                <div className="flex gap-x-4 overflow-hidden">
                  <span className="hidden sm:block">-</span>
                  <span className="truncate max-w-full">
                    {item.specialization}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-x-4 overflow-hidden">
              <span className="hidden lg:block">|</span>
              <span className="text-muted-foreground text-sm truncate max-w-36">
                {item.start}
              </span>
              -
              <span className="text-muted-foreground text-sm truncate max-w-36">
                {item.end ? item.end : "Present"}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2">
            <span className="text-muted-foreground">{item.institution}</span>
            {item.score && (
              <>
                <span className="hidden sm:block">|</span>
                <span className="text-muted-foreground">{item.score}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
