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
      <h1 className="text-2xl font-bold">오디오 자막 플레이어</h1>
      <button
        onClick={toggleMenu}
        className="absolute top-4 right-4 text-sm text-gray-500 cursor-pointer"
      >
        <Image src="/menu.svg" alt="menu" width={32} height={32} />
      </button>
      <div
        className={clsx(
          "absolute top-16 right-0 flex flex-col justify-center items-center gap-4 px-4 py-2 bg-white rounded-bl-2xl overflow-hidden transition-all duration-300 ease-in-out",
          {
            "max-h-16 opacity-100": isMenuOpen,
            "max-h-0 opacity-0": !isMenuOpen,
          }
        )}
      >
        <Link
          href="/mp3-vtt-player-jquery"
          className="text-sm text-gray-500 cursor-pointer"
        >
          JQuery 버전으로 이동
        </Link>
      </div>
    </div>
  );
}
