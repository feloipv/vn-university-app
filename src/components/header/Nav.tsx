import Link from "next/link";
import {
  BookOpenCheck,
  DraftingCompass,
  House,
  Newspaper,
  School,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="w-full max-h-full">
      <ul className="w-max m-auto flex gap-x-2 place-items-center text-sm text-[#333] font-medium capitalize">
        <li
          className={`size-max px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-100 hover:text-orange-500 ${
            pathname == "/" && "bg-slate-100 text-orange-500"
          }`}
        >
          <Link href="/" className="flex place-items-center gap-x-2">
            <House className="size-4 text-inherit" />
            Trang chủ
          </Link>
        </li>
        <li
          className={`size-max px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-100 hover:text-orange-500 ${
            pathname == "/univarsiry" && "bg-slate-100 text-orange-500"
          }`}
        >
          <Link href="/univarsiry" className="flex place-items-center gap-x-2">
            <School className="size-4 text-inherit" />
            Trường Đại Học
          </Link>
        </li>
        <li
          className={`size-max px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-100 hover:text-orange-500 ${
            pathname == "/blog" && "bg-slate-100 text-orange-500"
          }`}
        >
          <Link href="/blog" className="flex place-items-center gap-x-2">
            <Newspaper className="size-4 text-inherit" />
            Bài viết
          </Link>
        </li>
        <li
          className={`size-max px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-100 hover:text-orange-500`}
        >
          <Link
            href="https://tomchart.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex place-items-center gap-x-2"
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
