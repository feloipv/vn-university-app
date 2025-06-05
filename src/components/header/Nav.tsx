import Link from "next/link";
import { BookMarked, DraftingCompass, House, School } from "lucide-react";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="w-full max-h-full">
      <ul className="w-max m-auto flex gap-x-2 place-items-center text-sm text-[#333] font-medium capitalize">
        <li
          className={`size-max rounded-sm cursor-pointer hover:bg-slate-100 hover:text-orange-500 ${
            pathname == "/" && "bg-slate-100 text-orange-500"
          }`}
        >
          <Link
            href="/"
            className="size-full px-5 py-2 flex place-items-center gap-x-2"
          >
            <House className="size-4 text-inherit" />
            Trang chủ
          </Link>
        </li>
        <li
          className={`size-max rounded-sm cursor-pointer hover:bg-slate-100 hover:text-orange-500 ${
            pathname.startsWith("/university") && "bg-slate-100 text-orange-500"
          }`}
        >
          <Link
            href="/university"
            className="size-full px-5 py-2 flex place-items-center gap-x-2"
          >
            <School className="size-4 text-inherit" />
            Trường Đại Học
          </Link>
        </li>
        <li
          className={`size-max rounded-sm cursor-pointer hover:bg-slate-100 hover:text-orange-500 ${
            pathname.startsWith("/trainingField") &&
            "bg-slate-100 text-orange-500"
          }`}
        >
          <Link
            href="/trainingField"
            className="size-full px-5 py-2 flex place-items-center gap-x-2"
          >
            <BookMarked className="size-4 text-inherit" />
            Ngành học
          </Link>
        </li>
        <li
          className={`size-max rounded-sm cursor-pointer hover:bg-slate-100 hover:text-orange-500`}
        >
          <Link
            href="https://tomchart.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="size-full px-5 py-2 flex place-items-center gap-x-2"
          >
            <DraftingCompass className="size-4 text-inherit" />
            Công cụ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
