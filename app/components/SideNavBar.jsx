"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAllServices } from "../libs/Powerhouse";

export default function SideNavBar() {
  const pathName = usePathname();
  const [showNav, setShowNav] = useState(true);
  const [navLinks, setNavLinks] = useState([
    {
      name: "Homepage",
      href: "/",
    },
    {
      name: "Services",
      href: "/services",
      submenu: [],
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ]);

  useEffect(() => {
    const fetchAllServices = async () => {
      const res = await getAllServices();
      if (res) {
        setNavLinks((prevNavLinks) =>
          prevNavLinks.map((link) =>
            link.name === "Services"
              ? {
                  ...link,
                  submenu: res.map((service) => ({
                    name: service.header, // Adjust according to the structure of your service data
                    href: `/services/${service._id}`, // Assuming your service object has a 'slug' property
                  })),
                }
              : link
          )
        );
      }
    };

    fetchAllServices();
  }, []);

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
                  className={`text-sm hover:text-primary text-black flex items-center gap-3`}
                  href={link.href}
                >
                  {link.name}
                  {pathName === link.href && (
                    <div className="w-[6px] h-[6px] rounded-full bg-primary"></div>
                  )}
                </Link>
                {/* Check if the link has a submenu */}
                {pathName.startsWith("/services") &&
                  link.submenu?.length > 0 && (
                    <div className="ml-1 pl-4 pt-2 my-3 transition-all duration-200 grid gap-2 border-l border-[#f4f4f4]">
                      {link.submenu.map((sublink, j) => (
                        <Link
                          className={`text-sm text-black hover:text-primary whitespace-nowrap flex items-center gap-3`}
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
