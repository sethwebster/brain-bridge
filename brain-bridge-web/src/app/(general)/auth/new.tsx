"use client"
import { signIn, signOut, useSession } from "next-auth/react"

function Page() {
  const { data: session } = useSession()
  if(session && session.user) {
    return <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }
  return <>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
  </>
}

export default Page;
