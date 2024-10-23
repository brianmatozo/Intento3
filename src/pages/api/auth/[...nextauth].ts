import connectDB from "lib/mongodb";
import UserModel, { type AuthUser, type UserDocument } from "models/user";
import NextAuth from "next-auth";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
void connectDB();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) {
            throw new Error("Missing credentials");
          }
          // console.log("Received credentials:", credentials);

          const user: UserDocument | null = await UserModel.findOne({
            email: credentials.email,
          }).exec();

          if (!user) {
            throw new Error("User not found");
          }
          const passwordMatch = bcrypt.compare(
            credentials.password,
            user.password
          );
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          } as AuthUser;
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error during authorization:", error.message);
          } else {
            console.error("Unknown error during authorization:", error);
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  theme: {
    colorScheme: "light",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
