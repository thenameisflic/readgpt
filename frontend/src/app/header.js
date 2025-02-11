"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "@/components/navbar";
import Link from "next/link";
import { InboxIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";

const navigation = []; // for future options

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <Navbar className="px-4">
        <Link href="/" aria-label="Home" className="flex items-center">
          <Image
            alt="ReadGPT logo"
            src="/logo-readgpt.png"
            width={24}
            height={24}
            className="size-8 sm:size-8 rounded-sm"
          />
          <div className="font-serif text-xl ml-2">ReadGPT</div>
        </Link>
        <NavbarSpacer />
        <NavbarSection>
          <NavbarItem
            href="/search"
            aria-label="Search"
            className="tracking-wide"
          >
            About
          </NavbarItem>
        </NavbarSection>
      </Navbar>
    </header>
  );
}
