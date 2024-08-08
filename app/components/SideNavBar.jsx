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
    submenu: [
      {
        name: "Sea Freight Forwarding",
        href: "/services/sea-freight",
      },
      {
        name: "Air Freight Forwarding",
        href: "/services/air-freight",
      },
      {
        name: "Palletisation",
        href: "/services/palletisation",
      },
    ],
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
      <div className="px-10 pt-7 pb-10">
        <Link href="/">
          <Image src="/logo.svg" width={56} height={56} alt="logo" />
        </Link>
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
              <div key={i}>
                <Link
                  className={`text-sm text-black flex items-center gap-3`}
                  href={link.href}
                >
                  {link.name}
                  {pathName === link.href && (
                    <div className="w-[6px] h-[6px] rounded-full bg-primary"></div>
                  )}
                </Link>
                {/* Check if the link has a submenu */}
                {pathName.startsWith("/services") && link.submenu && (
                  <div className="ml-1 pl-4 pt-2 my-3 transition-all duration-200 grid gap-2 border-l border-[#f4f4f4]">
                    {link.submenu.map((sublink, j) => (
                      <Link
                        className={`text-sm text-black whitespace-nowrap flex items-center gap-3`}
                        key={j}
                        href={sublink.href}
                      >
                        {sublink.name}
                        {pathName === sublink.href && (
                          <div className="w-[4px] h-[4px] rounded-full bg-primary"></div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
