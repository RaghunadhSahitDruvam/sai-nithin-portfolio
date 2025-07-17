import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        verificationCode: { label: "Verification Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Check if email matches admin email from env

        // Find admin in database
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (!admin) {
          throw new Error("Admin not found");
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          admin.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        // Check verification code if provided
        if (credentials.verificationCode) {
          if (
            !admin.verificationCode ||
            admin.verificationCode !== credentials.verificationCode ||
            !admin.verificationExpiry ||
            admin.verificationExpiry < new Date()
          ) {
            throw new Error("Invalid or expired verification code");
          }

          // Mark as verified and clear verification code
          await prisma.admin.update({
            where: { id: admin.id },
            data: {
              isVerified: true,
              verificationCode: null,
              verificationExpiry: null,
            },
          });
        } else if (!admin.isVerified) {
          throw new Error("Email verification required");
        }

        return {
          id: admin.id,
          email: admin.email,
          name: "Admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/auth",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = "admin";
        token.email = user.email;
      }
      
      // Handle session update trigger (when update() is called)
      if (trigger === "update" && session?.email) {
        token.email = session.email;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
