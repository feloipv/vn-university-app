"use client";

import useDebounce from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { useGetAllCityQuery } from "@/lib/redux/api/city";
import { useGetUniversitiesQuery } from "@/lib/redux/api/university";
import { useState } from "react";
import { ListUniversities } from "@/components/university/ListUniversities";
import { ComboBoxSelect } from "@/components/ui/ComboBoxSelect";
import { AppBreadcrumb } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

const University = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data: universities } = useGetUniversitiesQuery({
    search: debouncedSearch,
    city,
    type,
  });
  const { data: listCity } = useGetAllCityQuery();

  const cityOpt = [
    { label: "Tất cả", value: "all" },
    ...(listCity?.results ?? []).map((city) => ({
      label: city.name,
      value: city.name,
    })),
  ];

  const typeUniversityOpt = [
    { label: "Tất cả", value: "all" },
    { label: "Công lập", value: "Công lập" },
    { label: "Tư thục", value: "Tư thục" },
    { label: "Quốc tế", value: "Quốc tế" },
  ];

  return (
    <>
      {universities?.data ? (
        <AppBreadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Trường Đại học", isCurrentPage: true },
          ]}
        />
      ) : (
        <Skeleton className="w-[25rem] h-5 my-5" />
      )}
      <div>
        <h2 className="capitalize text-center text-2xl font-semibold">
          Danh sách các trường đại học
        </h2>
        <p className="mt-2 mb-5 capitalize text-center text-xs text-[#6b6b6b] font-medium">
          Tìm hiểu toàn diện về các trường đại học tại Việt Nam
        </p>
        <div className="w-[70%] m-auto mb-10 font-semibold grid grid-cols-[1fr_repeat(2,_max-content)] gap-x-2 place-items-center">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm trường đại học..."
            className="w-full px-4 py-2 focus-visible:ring-0 focus:outline-none border rounded-lg"
          />
          <ComboBoxSelect
            options={cityOpt}
            value={city}
            onChange={(value) => setCity(value === "all" ? "" : value)}
            placeholder="Tỉnh/Thành phố"
            className="w-[250px]"
            contentClassName="w-[250px]"
          />
          <ComboBoxSelect
            options={typeUniversityOpt}
            value={type}
            onChange={(value) => setType(value === "all" ? "" : value)}
            placeholder="Loại trường"
            className="w-[200px]"
            contentClassName="w-[200px]"
          />
        </div>
        <ListUniversities data={universities?.data} />
      </div>
    </>
  );
};

export default University;
