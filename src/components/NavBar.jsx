"use client"

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const NavBar = ({ backgroundColor }) => {
    
    const { data: session } = useSession();

    if (!backgroundColor) backgroundColor = "#18181b";

    return <div className="transition-colors duration-100 top-0 flex text-white items-center bg-zinc-900 bg-opacity-85 z-20 relative justify-between h-16 px-4 md:px-8 text-lg w-full" style={{ backgroundColor: backgroundColor + "AA" }}>
        <Link href="/">
            <h1 className="z-20 text-2xl tracking-widest font-light">TASK APP</h1>
        </Link>
        {session?.user ? (
            <button onClick={() => signOut()}>Sign Out</button>
        ) : (
            <Link href="/login">Log In</Link>
        )}
        
    </div>
}

export default NavBar;