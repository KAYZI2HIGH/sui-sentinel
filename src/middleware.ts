import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "./supabaseClient";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;
    const { data: project } = await supabase
      .from("projects")
      .select()
      .eq("user_id", session?.user?.id);

  if (pathname === "/auth" && session?.user && project && project.length !== 0) {
    return NextResponse.redirect(new URL(`/dashboard/${project[0].id}`, req.url));
  }

  if (pathname === "/dashboard/home" && session?.user && project && project.length !== 0) {
    return NextResponse.redirect(
      new URL(`/dashboard/${project[0].id}`, req.url)
    );
  }

  if (
    pathname.startsWith("/dashboard") &&
    pathname !== "/dashboard/create-new-project" &&
    session?.user &&
    project?.length === 0
  ) {
    return NextResponse.redirect(
      new URL(`/dashboard/create-new-project`, req.url)
    );
  }


  if (pathname.startsWith("/dashboard") && !session?.user) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/dashboard/:path*"],
};
