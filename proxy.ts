import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  //1- Initialize Supabase Client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // 2- Fetch User Session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // 3- Define our explicit public routes
  const isRootPage = pathname === "/";
  const isAuthPage = pathname === "/auth/login";

  // A route is completely public if its the landing page or auth pages
  const isPublicPage = isRootPage || isAuthPage;

  // 4- Rule1 if its a private page and user is not logged in, kick them into login page
  if (!user && !isPublicPage) {
    url.pathname = "/auth/login";
    // Keeps track of where user wants to go so you can redirect them back later
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // 5- Rule2 if user is logged in, blocked them from seeing the auth pages
  if (user && isAuthPage) {
    console.log("hello", user);
    if (!pathname.startsWith("/auth/callback")) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return response;
  }
}

// 6. Ensure middleware runs on all page routes, skipping static assets cleanly
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (if you want your API routes to handle their own auth independently)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
