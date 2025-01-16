import { connectDB } from "../lib/mongodb";
import User from "../models/User";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to the database
        await connectDB();

        // Find the user by email
        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password"); // Ensure password is included

        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid email or password");
        }

        // Authentication successful, return the user object
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
