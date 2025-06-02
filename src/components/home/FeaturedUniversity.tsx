"use client";

import { useGetUniversitiesQuery } from "@/lib/redux/api/university";
import { ListUniversities } from "../university/ListUniversities";

const FeaturedUniversity = () => {
  const { data: universities } = useGetUniversitiesQuery({ limit: 8 });

  return (
    <div className="w-full mt-10 text-[#333]">
      <h2 className="capitalize text-center text-2xl font-semibold">
        Các trường đại học nổi bật
      </h2>
      <p className="mt-2 mb-5 capitalize text-center text-xs text-[#6b6b6b] font-medium">
        Khám phá thông tin về các trường đại học hàng đầu Việt Nam
      </p>
      <ListUniversities data={universities?.data} />
    </div>
  );
};
export default FeaturedUniversity;
