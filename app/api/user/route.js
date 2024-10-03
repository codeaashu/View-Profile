import { createUser, getUserByEmail, updateUser } from "@/action/user";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const user = await createUser(data, true);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({
      error:
        error.message ||
        "An unexpected error occurred. Please try again later.",
    });
  }
}

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");
    const user = await getUserByEmail(email, true);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({
      error:
        error.message ||
        "An unexpected error occurred. Please try again later.",
    });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const user = await updateUser(data, true);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({
      error:
        error.message ||
        "An unexpected error occurred. Please try again later.",
    });
  }
}
