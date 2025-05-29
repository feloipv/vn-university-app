"use client";

import useDebounce from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCityQuery } from "@/lib/redux/api/city";
import { useGetUniversitiesQuery } from "@/lib/redux/api/university";
import { useState } from "react";
import { ListUniversities } from "@/components/university/ListUniversities";

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

  return (
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
        <Select
          value={city}
          onValueChange={(value) => {
            value === "all" ? setCity("") : setCity(value);
          }}
        >
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Tỉnh/Thành phố" />
          </SelectTrigger>
          <SelectContent className="font-normal max-h-[200px]">
            <SelectItem value="all" className="cursor-pointer">
              Tất cả
            </SelectItem>
            {listCity?.results.map((city) => (
              <SelectItem
                key={city.id}
                value={city.name}
                className="cursor-pointer"
              >
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={type}
          onValueChange={(value) => {
            value === "all" ? setType("") : setType(value);
          }}
        >
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Loại trường" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">
              Tất cả
            </SelectItem>
            <SelectItem className="cursor-pointer" value="Công lập">
              Công lập
            </SelectItem>
            <SelectItem className="cursor-pointer" value="Tư thục">
              Tư thục
            </SelectItem>
            <SelectItem className="cursor-pointer" value="Quốc tế">
              Quốc tế
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ListUniversities data={universities?.data} />
    </div>
  );
};

export default University;
