import connectDB from "@/config/database";
import UserModel from "@/app/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {},

        async authorize(credentials) {
          const { name, email, password } = credentials;
  
          await connectDB();
          const user = await UserModel.findOne({ email });
          const passwordOk = user && bcrypt.compareSync(password, user.password);
  
          if (passwordOk) {
            return {
              _id: user._id,
              name: user.name,
              email: user.email
            };
          }
  
          return null
        }
      })
    ],
    session: {
      strategy: "jwt"
    },
    jwt: {
      signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    },
    callbacks: {
      async session({ session, token }) {
        session.user = token.user;
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.user = user;
        }
        return token;
      },
    },
  };
  
  const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST }