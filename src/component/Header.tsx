"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

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
          "absolute top-16 right-0 flex flex-col justify-center items-center gap-4 px-4 py-2 bg-white rounded-bl-2xl",
          {
            "max-h-16 opacity-100": isMenuOpen,
            "max-h-0 opacity-0": !isMenuOpen,
          }
        )}
      >
        <button className="text-sm text-gray-500 cursor-pointer">
          <span>JQuery 버전으로 이동</span>
        </button>
      </div>
    </div>
  );
}
