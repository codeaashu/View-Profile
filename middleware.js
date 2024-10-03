import { NextResponse } from "next/server";
import { auth } from "@/auth";

// Function to fetch user data from the database (if necessary)
async function fetchUser(session, baseUrl) {
  try {
    const response = await fetch(
      `${baseUrl}/api/user?email=${encodeURIComponent(session.user.email)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data.user || null;
  } catch (error) {
    console.log("Error in fetching user in middleware:", error.message);
    throw new Error("Internal Server Error");
  }
}

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;
  const protectedRoutes = ["/users/[username]/edit"];
  const isProtectedRoute = protectedRoutes.some((route) => {
    const routePattern = new RegExp(`^${route.replace(/\[.+?\]/g, "[^/]+")}$`);
    return routePattern.test(pathname);
  });

  // Check if user is authenticated
  const session = await auth();

  // Retrieve user presence status from cookies
  let userPresent = request.cookies.get("user_present")?.value; // Access cookie from request
  // console.log("middleware", isProtectedRoute, userPresent);

  const response = NextResponse.next();

  try {
    if (!session?.user?.email) {
      // User is not authenticated
      if (userPresent) {
        // console.log("deleting cookie");
        response.cookies.delete("user_present", { path: "/" });
        // console.log("Cookie deleted");
      }

      // Redirect to sign-in if user is not authenticated and trying to access a protected page
      if (
        pathname !== "/sign-in" &&
        (isProtectedRoute || pathname === "/register")
      ) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    } else {
      // User is authenticated
      if (!userPresent) {
        const currentUser = await fetchUser(session, origin);
        if (currentUser) {
          // console.log("adding cookie");
          response.cookies.set("user_present", "true", {
            httpOnly: true,
            path: "/",
            maxAge: 3600, // Set cookie expiration (1 hour)
          });
          // console.log("Cookie added");
        } else if (pathname !== "/register" && pathname !== "/sign-out") {
          // If user is authenticated but not registered, redirect to register
          return NextResponse.redirect(new URL("/register", request.url));
        }
      }
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  // Redirect logged-in users away from register or sign-in pages
  if (userPresent && (pathname === "/register" || pathname === "/sign-in")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/users/:username/edit", // Protected route: middleware will run
    "/((?!api|_next/static|_next/image|images|icons|favicon.ico).*)", // Everything else (protected routes not listed above)
  ],
};
