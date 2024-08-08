"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const navLinks = [
  {
    name: "Homepage",
    href: "/",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function SideNavBar() {
  const pathName = usePathname();
  const [showNav, setShowNav] = useState(true);
  return (
    <main className="w-[250px] fixed top-0 left-0 bottom-0">
      <div className="p-10">
        <Image src="/logo.svg" width={56} height={56} alt="logo" />
      </div>
      <div
        onClick={() => setShowNav(!showNav)}
        className="flex mt-20 p-5 items-center cursor-pointer justify-between"
      >
        <div className="flex items-center gap-2">
          <Image src="/Desktop.svg" width={20} height={20} alt="logo" />
          <p className="text-xs">Pages</p>
        </div>
        {showNav ? (
          <Image src="/arrow1.svg" width={20} height={20} alt="arrow" />
        ) : (
          <Image src="/arrow33.svg" width={20} height={20} alt="arrow" />
        )}
      </div>
      {showNav && (
        <div className="px-6 mt-4 transition-all duration-200">
          <div className="grid gap-3 relative pl-4">
            <div className="bg-[#f4f4f4] w-[1px] absolute left-0 top-3 bottom-3"></div>
            {navLinks.map((link, i) => (
              <Link
                className={`text-sm text-black flex items-center gap-3`}
                key={i}
                href={link.href}
              >
                {link.name}
                {pathName === link.href && (
                  <div className="w-[6px] h-[6px] rounded-full bg-primary"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
