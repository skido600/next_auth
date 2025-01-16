import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import User from "../../../../../models/User";

interface RegisterValues {
  email: string;
  password: string;
  name: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, password, name }: RegisterValues = await req.json();

    // Server-side validation
    if (!name || !password || !email) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if the email is already registered
    const userFound = await User.findOne({ email });
    if (userFound) {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 403 }
      );
    }

    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user in MongoDB
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    console.log(savedUser);

    return NextResponse.json(
      { message: "Account created successfully!" },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
