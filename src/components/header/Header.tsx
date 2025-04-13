"use client";

import Link from "next/link";
import Nav from "@/components/header/Nav";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="mb-5 sticky z-50 bg-white select-none shadow top-0 w-full h-16 lg:px-24 grid grid-cols-[20%_auto_20%_max-content] place-items-center gap-x-2">
      <div className="w-full max-h-full">
        <Link
          href="/"
          className="text-2xl font-extrabold text-gray-700 uppercase"
        >
          daihoctot
        </Link>
      </div>
      <Nav />
      <SearchBar />
      <UserMenu />
    </header>
  );
};
export default Header;
