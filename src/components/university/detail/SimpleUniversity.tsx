import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { IGetUniversityById } from "@/interfaces/university";
import { Slice } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const SimpleUniversity = (university: { data?: IGetUniversityById }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {university.data ? (
        <section className="w-full min-h-[400px] p-10 grid grid-cols-[20%_1fr] items-center gap-x-10 border border-slate-200 rounded-lg">
          <div className="relative w-full aspect-square border border-slate-200 rounded-lg overflow-hidden">
            <Image
              src={String(university?.data?.logo)}
              alt={String(university?.data?.name)}
              fill
              className="object-contain"
            />
          </div>
          <div className="font-medium w-full text-sm grid grid-cols-1 gap-y-1.5">
            <h3 className="w-full text-2xl font-semibold capitalize line-clamp-2">
              {university?.data?.name}
            </h3>
            <div className="space-x-2">
              <span className="text-base font-semibold">Mã trường:</span>
              <Badge variant={"outline"}>{university?.data?.code}</Badge>
            </div>
            <div className="space-x-2">
              <span className="text-base font-semibold">Địa chỉ:</span>
              <span>{university?.data?.location}</span>
            </div>
            <div className="space-x-2">
              <span className="text-base font-semibold">Loại trường:</span>
              <span>{university?.data?.type}</span>
            </div>
            <div className="grid grid-cols-[repeat(3,_max-content)] place-items-center gap-2">
              <span className="text-base font-semibold">Website:</span>
              <Link
                href={String(university?.data?.website)}
                target="_blank"
                className="underline text-orange-500 hover:text-blue-500"
              >
                {university?.data?.website}
              </Link>
            </div>
            <div className="space-x-2">
              <span className="text-base font-semibold">Mô tả:</span>
              <span className="text-gray-800 ">
                {expanded
                  ? university.data?.description
                  : `${String(university.data?.description)
                      .slice(0, 510)
                      .trim()}...`}
              </span>
              <span
                onClick={() => setExpanded(!expanded)}
                className="text-orange-500 cursor-pointer"
              >
                {expanded ? "Thu gọn" : "Xem thêm"}
              </span>
            </div>
          </div>
        </section>
      ) : (
        <section className="w-full h-[400px] p-10 grid grid-cols-[20%_1fr] items-center gap-x-10 border border-slate-200 rounded-lg">
          <Skeleton className="w-full aspect-square border border-slate-200 rounded-lg" />
          <div className="size-full grid grid-rows-[20%_repeat(4,_1fr)_30%] gap-y-2">
            <Skeleton className="w-[70%] h-full" />
            <Skeleton className="w-[20%] h-full ml-5" />
            <Skeleton className="w-[50%] h-full ml-5" />
            <Skeleton className="w-[30%] h-full ml-5" />
            <Skeleton className="w-[60%] h-full ml-5" />
            <Skeleton className="size-full" />
          </div>
        </section>
      )}
    </>
  );
};
