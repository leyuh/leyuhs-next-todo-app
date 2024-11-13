"use client"

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const NavBar = () => {
    
    const { data: session } = useSession();

    return <div className="flex text-white items-center bg-zinc-900 bg-opacity-85 z-20 relative justify-between h-16 px-4 md:px-8 text-lg w-full">
        <Link href="/">
            <h1 className="z-20 text-2xl tracking-wider font-light">TODO APP</h1>
        </Link>
        {session?.user ? (
            <button onClick={() => signOut()}>Sign Out</button>
        ) : (
            <Link href="/login">Log In</Link>
        )}
        
    </div>
}

export default NavBar;