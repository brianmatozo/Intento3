import connectDB from "lib/mongodb";
import UserModel, { User } from "models/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
connectDB();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const user: User | null = await (UserModel as mongoose.Model<User>).findOne({ email: credentials.email }).exec();
        
        if (!user) {
          console.log("User not found");
          return null;
        }

        const isValidPassword = bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          console.log("Invalid password");
          return null;
        }
        return { id: user.id, name: user.name, email: user.email };
      },
    })
  ],
  session: {
    strategy: "jwt"
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
    }
  },
  theme: {
    colorScheme: "light"
  },
};

export default NextAuth(authOptions);
