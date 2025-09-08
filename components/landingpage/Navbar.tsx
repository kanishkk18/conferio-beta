"use client"
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/conferiologo.jpg";
import { signIn } from "next-auth/react"

import { ThemeToggle } from "../ui/ThemeToggle";
export function Navbar() {
  return (
    <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
      <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} className="h-10 w-11 rounded-sm dark:invert" alt="Logo" />

          <h4 className="text-3xl font-semibold">
            Conferio<span className="text-primary">Cal</span>
          </h4>
        </Link>
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>

      <nav className="hidden md:flex md:justify-end md:space-x-4">
        <ThemeToggle />
        <button onClick={() => signIn()}>Sign In</button>
      
      </nav>
    </div>
  );
}
