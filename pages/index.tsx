import { Inter } from 'next/font/google'
import { signIn, signOut, useSession } from "next-auth/react";
import Header from "@/components/Header";
import HomePage from "@/components/HomePage";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { data: session } = useSession()

  if (!session) {
    return (
      <main
        className={`flex min-h-screen bg-[url('/images/background.png')] bg-cover flex-col items-center justify-center p-24 ${inter.className}`}
      >
        <button onClick={() => signIn('google')} className={'button text-black'}>Login with Google</button>
      </main>
    )
  }

  return (
    <>
      <HomePage nameTags={[]} />
    </>
 )
}
