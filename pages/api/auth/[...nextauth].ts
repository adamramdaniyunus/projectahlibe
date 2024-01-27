import NextAuth from 'next-auth'
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from "@/lib/promise";
import {Adapter} from "next-auth/adapters";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? ""
        }),
    ],
    adapter: MongoDBAdapter(clientPromise) as Adapter,
})