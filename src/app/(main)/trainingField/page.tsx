"use client";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useDebounce from "@/hooks/useDebounce";
import { useGetTrainingFieldsQuery } from "@/lib/redux/api/trainingField";
import Link from "next/link";
import { useState } from "react";

const TrainingFields = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data: trainingFields, isLoading } = useGetTrainingFieldsQuery({
    search: debouncedSearch,
  });

  return (
    <div className="w-full">
      <h2 className="capitalize text-center text-2xl font-semibold">
        Khám phá lĩnh vực phù hợp với bạn
      </h2>
      <p className="mt-2 mb-5 capitalize text-center text-xs text-[#6b6b6b] font-medium">
        Tìm hiểu thông tin chi tiết về các lĩnh vực và nhóm ngành đào tạo để lựa
        chọn đúng định hướng nghề nghiệp.
      </p>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tìm kiếm lĩnh vực đào tạo..."
        className="w-[50%] m-auto px-4 py-2 focus-visible:ring-0 focus:outline-none border border-slate-300 rounded-lg"
      />
      {trainingFields ? (
        <section className="w-full my-10 grid grid-cols-3 gap-5 cursor-pointer">
          {trainingFields.data?.map((trainingField) => (
            <Link
              href={`trainingField/${trainingField._id}`}
              key={trainingField._id}
              className="w-full min-h-24 border rounded-lg border-slate-200 grid place-items-center transition-all transform hover:-translate-y-2 hover:shadow-lg hover:text-orange-500 hover:font-semibold"
            >
              {trainingField.name}
            </Link>
          ))}
        </section>
      ) : (
        <div className="w-full my-10 grid grid-cols-3 gap-5">
          {Array.from({ length: 12 }).map((item, index) => (
            <Skeleton
              key={index}
              className="w-full min-h-24 border rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainingFields;
