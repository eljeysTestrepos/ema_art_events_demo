"use client";

import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="py-4 px-6 flex items-center justify-between relative">
      <div className="text-xl font-bold">SMK</div>
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="">
          {isOpen ? (
            <IoCloseOutline className="h-6 w-6 text-black" aria-hidden="true" />
          ) : (
            <RxHamburgerMenu
              className="h-6 w-6 text-black"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
      <nav
        className={`absolute top-full left-0 w-full  origin-top lg:relative lg:top-auto lg:left-auto lg:w-auto lg:bg-transparent lg:shadow-none ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } ${isOpen ? "block" : "hidden"} lg:block`}
        style={{ top: "100%" }}
      >
        <ul
          className={`p-4 lg:p-0 flex flex-col lg:flex-row lg:space-x-6 items-start lg:items-center ${
            isOpen ? "flex-row justify-end space-x-4" : ""
          }`}
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/events">Event</Link>
          </li>
          <li>
            <Link href="/dashboard">Kurator</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
