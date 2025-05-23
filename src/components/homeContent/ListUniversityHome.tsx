"use client";

import { useGetUniversitiesQuery } from "@/lib/redux/api/university";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronsRight } from "lucide-react";

const ListUniversityHome = () => {
  const { data: universities } = useGetUniversitiesQuery({});

  return (
    <div className="w-full mt-10 text-[#333]">
      <h2 className="capitalize text-center text-2xl font-semibold">
        Danh sách các trường đại học
      </h2>
      <p className="mt-2 mb-5 capitalize text-center text-xs text-[#6b6b6b] font-medium">
        Tìm hiểu toàn diện về các trường đại học tại Việt Nam
      </p>
      <div className="grid grid-cols-4 gap-5">
        {universities?.data?.map((university) => (
          <Link
            href={`/university/${university._id}`}
            key={university._id}
            className="w-full grid grid-cols-[30%_1fr] items-center gap-x-4 p-5 rounded-lg border border-slate-200 transform transition-all hover:-translate-y-2 hover:shadow-lg"
          >
            <div className="relative w-full aspect-square border bg-slate-50 rounded-lg overflow-hidden">
              <Image
                src={String(university.logo)}
                fill
                alt="logo-university"
                className="object-contain"
              />
            </div>
            <div className="grid grid-rows-[repeat(2)_max-content] gap-y-2">
              <h3 className="w-full h-max font-semibold capitalize line-clamp-2">
                {university.name}
              </h3>
              <div className="grid grid-cols-3 gap-x-2 text-xs">
                <Badge variant="secondary">{university.code}</Badge>
                <Badge variant="secondary" className="capitalize">
                  {university.city}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link href={"/university"} className="block w-full text-center">
        <Button className="w-max mt-5 mb-10 text-sm cursor-pointer hover:bg-orange-500">
          Xem thêm
          <ChevronsRight className="size-5" />
        </Button>
      </Link>
    </div>
  );
};
export default ListUniversityHome;
