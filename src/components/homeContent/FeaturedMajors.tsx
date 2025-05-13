import Image from "next/image";
import Link from "next/link";

const FeaturedMajors = () => {
  return (
    <>
      <div className="w-full mt-10 text-[#333]">
        <h2 className="capitalize text-center text-2xl font-semibold">
          Các chuyên ngành nổi bật
        </h2>
        <p className="mt-2 mb-5 capitalize text-center text-xs text-[#6b6b6b] font-medium">
          Khám phá các lĩnh vực học tập hot nhất và có nhu cầu cao nhất đang
          định hình tương lai.
        </p>
        <ul className="w-[60%] h-[150px] m-auto grid grid-cols-4 gap-x-2.5">
          <li className="hover:border hover:border-gray-200 transform hover:-translate-y-2 hover:shadow-lg transition-all duration-200 size-full p-3 rounded-xl cursor-pointer hover:bg-gray-100 hover:text-orange-500">
            <Link
              href="/"
              className="size-full grid grid-rows-[1fr_max-content] place-items-center gap-y-1"
            >
              <div className="relative w-[50%] aspect-square">
                <Image
                  src="/majors/Information-technology.png"
                  fill
                  alt="IT"
                  className="object-cover rounded-lg"
                />
              </div>
              <span className="text-[16px] font-medium">
                Công nghệ thông tin
              </span>
            </Link>
          </li>
          <li className="hover:border hover:border-gray-200 transform hover:-translate-y-2 hover:shadow-lg transition-all duration-200 size-full p-3 rounded-xl cursor-pointer hover:bg-gray-100 hover:text-orange-500">
            <Link
              href="/"
              className="size-full grid grid-rows-[1fr_max-content] place-items-center gap-y-1"
            >
              <div className="relative w-[50%] aspect-square">
                <Image
                  src="/majors/E-Commerce.png"
                  fill
                  alt="IT"
                  className="object-cover rounded-lg"
                />
              </div>
              <span className="text-[16px] font-medium">
                Thương mại điện tử
              </span>
            </Link>
          </li>
          <li className="hover:border hover:border-gray-200 transform hover:-translate-y-2 hover:shadow-lg transition-all duration-200 size-full p-3 rounded-xl cursor-pointer hover:bg-gray-100 hover:text-orange-500">
            <Link
              href="/"
              className="size-full grid grid-rows-[1fr_max-content] place-items-center gap-y-1"
            >
              <div className="relative w-[50%] aspect-square">
                <Image
                  src="/majors/Graphic-design.png"
                  fill
                  alt="IT"
                  className="object-cover rounded-lg"
                />
              </div>
              <span className="text-[16px] font-medium">Thiết kế đồ họa</span>
            </Link>
          </li>
          <li className="hover:border hover:border-gray-200 transform hover:-translate-y-2 hover:shadow-lg transition-all duration-200 size-full p-3 rounded-xl cursor-pointer hover:bg-gray-100 hover:text-orange-500">
            <Link
              href="/"
              className="size-full grid grid-rows-[1fr_max-content] place-items-center gap-y-1"
            >
              <div className="relative w-[50%] aspect-square">
                <Image
                  src="/majors/Logistics.png"
                  fill
                  alt="IT"
                  className="object-cover rounded-lg"
                />
              </div>
              <span className="text-[16px] font-medium">Logistics</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FeaturedMajors;
