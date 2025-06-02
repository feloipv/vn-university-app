import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative w-full px-36 py-5 bg-gray-100 rounded-2xl grid grid-cols-[60%_1fr] gap-x-2 items-center">
      <div className="w-full grid grid-rows-[repeat(2,_max-content)] gap-y-3">
        <h1 className="w-full h-max capitalize text[#333] text-4xl leading-12 font-bold">
          <div className="text-orange-400">Chọn Đúng Trường</div> Vạn Dặm Thành
          Công Trên Con Đường Ước Mơ
        </h1>
        <p className="w-[80%] h-max capitalize text-[#6b6b6b] text-sm font-medium leading-[24px]">
          Tìm hiểu về các yếu tố quan trọng như chất lượng đào tạo, cơ sở vật
          chất, đội ngũ giảng viên và môi trường học tập.
        </p>
      </div>
      <div className="relative w-full aspect-square bg-orange-100 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]">
        <Image
          src="/banner.png"
          alt="banner"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Banner;
