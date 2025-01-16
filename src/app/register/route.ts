import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    console.log(email, password, name);

    // Respond with success
    return NextResponse.json({ message: "Request received" }, { status: 201 });
  } catch (error) {
    console.error("Error adding email to waitlist:", error);
    return NextResponse.json(
      {
        error: "There was a problem adding your email. Please try again later.",
      },
      { status: 500 }
    );
  }
}
