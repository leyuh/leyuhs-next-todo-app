"use client"

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LoginModal = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            });

            if (res.error) {
                setError("Invalid credentials");
            }

            router.replace("/");
        } catch (err) {

        }
    }

    return <div className="p-4 rounded-md bg-zinc-100 w-[320px] mt-12 mx-auto">
        <form onSubmit={handleLogin}>
            <h1 className="text-2xl text-center mt-4">Log In</h1>
            <div>
                <h3 className="ml-1">Email</h3>
                <input
                    className="px-2 py-1 rounded-md w-full" 
                    type="text" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mt-2">
                <h3 className="ml-1">Password</h3>
                <input
                    className="px-2 py-1 rounded-md w-full" 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && <p className="w-full text-center">{error}</p>}

            <button type="submit" className=" bg-primary px-8 py-2 text-white rounded-md w-full mt-6">Log In</button>

            <span className="flex gap-2 w-full justify-center items-center mt-2">
                <p>Don't have an account? </p>
                <Link href="/signup" className="underline">Sign up</Link>
            </span>
        </form>
    </div>
}

export const SignupModal = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            if (res.ok) {
                router.push("/login");
            } else {
                setError("An error occurred.");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return <div className="p-4 rounded-md bg-zinc-100 w-[320px] mt-12 mx-auto">
        <form onSubmit={handleSignup}>
            <h1 className="text-2xl text-center mt-4">Sign Up</h1>

            <div>
                <h3 className="ml-1">Name</h3>
                <input
                    className="px-2 py-1 rounded-md w-full"
                    type="text"
                    placeholder="Name" 
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mt-2">
                <h3 className="ml-1">Email</h3>
                <input 
                    className="px-2 py-1 rounded-md w-full" 
                    type="text" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mt-2">
                <h3 className="ml-1">Password</h3>
                <input
                    className="px-2 py-1 rounded-md w-full" 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && <p className="w-full text-center">{error}</p>}

            <button type="submit" className=" bg-primary px-8 py-2 text-white rounded-md w-full mt-6">Sign Up</button>

            <span className="flex gap-2 w-full justify-center items-center mt-2">
                <p>Already have an account? </p>
                <Link href="/login" className="underline">Log in</Link>
            </span>
        </form>
    </div>
}