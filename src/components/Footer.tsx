// components/Footer.tsx

import Link from "next/link";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-8 py-5">
          <div className="w-full">
            <Link
              href="/"
              className="text-2xl font-extrabold text-gray-700 uppercase mb-2"
            >
              DAIHOCTOT
            </Link>
            <p className="text-sm">
              Nền tảng thông tin giúp học sinh chọn trường đại học phù hợp tại
              Việt Nam.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Liên Kết</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-500">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="/university" className="hover:text-orange-500">
                  Trường Đại Học
                </Link>
              </li>
              <li>
                <Link href="/trainingField" className="hover:text-orange-500">
                  Ngành Học
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-500">
                  Bài Viết
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://tomchart.com/"
                  className="hover:text-orange-500"
                >
                  Công Cụ
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full h-max grid grid-rows-[repeat(3,_max-content)] justify-end gap-y-1 ">
            <h3 className="text-lg font-semibold mb-1">Liên Hệ</h3>
            <p className="text-sm">Email: phanvanloi1522003@gmail.com</p>
            <p className="text-sm">SĐT: 0364 336 088</p>
          </div>
        </div>
        <Separator />
        <div className="text-center text-sm text-gray-500 py-5">
          © {new Date().getFullYear()} DAIHOCTOT. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
