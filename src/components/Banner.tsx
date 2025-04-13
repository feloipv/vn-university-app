import Image from "next/image";

const Banner = () => {
  return (
    <div className="w-full px-36 py-10 bg-gray-100 rounded-2xl h-[300px] m-auto grid grid-cols-[65%_auto] gap-x-2 justify-items-end">
      <div className="w-full grid grid-rows-[max-content_auto] gap-y-3 m-auto">
        <h1 className="w-full capitalize text[#333] text-4xl leading-12 font-bold">
          <div className="text-orange-400">Chọn Đúng Trường</div> Vạn Dặm Thành
          Công Trên Con Đường Ước Mơ
        </h1>
        <p className="w-[450px] capitalize text-[#6b6b6b] text-sm font-normal leading-[24px]">
          Tìm hiểu về các yếu tố quan trọng như chất lượng đào tạo, cơ sở vật
          chất, đội ngũ giảng viên và môi trường học tập.
        </p>
      </div>
      <div className="relative w-full grid place-items-center">
        <Image
          src={"/banner.png"}
          alt="banner"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;
