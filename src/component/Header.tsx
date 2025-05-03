"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="absolute top-0 left-0 flex justify-center items-center gap-4 w-full h-16 bg-white">
      <h1 className="text-2xl font-bold">Audio Caption Player</h1>
      <button
        onClick={toggleMenu}
        aria-label="메뉴 열기"
        className="absolute top-4 right-4 text-sm text-gray-500 cursor-pointer"
      >
        <Image src="/menu.svg" alt="menu" width={32} height={32} />
      </button>
      <nav
        className={clsx(
          "absolute top-16 right-0 px-4 py-2 bg-white rounded-bl-2xl shadow-xl origin-top-right transform transition-all duration-300 ease-in-out",
          {
            "max-h-16 opacity-100": isMenuOpen,
            "max-h-0 opacity-0": !isMenuOpen,
          }
        )}
        aria-label="메뉴"
      >
        <Link
          href="/audio-caption-player-jquery"
          className="flex items-center text-sm text-gray-500 cursor-pointer"
        >
          jQuery 버전으로 이동
        </Link>
      </nav>
    </div>
  );
}
