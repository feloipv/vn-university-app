"use client";

import { AppBreadcrumb } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { AdmissionInfo } from "@/components/university/detail/AdmissionInfo";
import { Campuses } from "@/components/university/detail/Campuses";
import { SimpleUniversity } from "@/components/university/detail/SimpleUniversity";
import { TrainingFields } from "@/components/university/detail/TrainingFields";
import { useGetUniversityByIdQuery } from "@/lib/redux/api/university";
import { useParams } from "next/navigation";

const UniversityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: university } = useGetUniversityByIdQuery(id);

  return (
    <>
      {university?.data ? (
        <AppBreadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Trường Đại học", href: "/university" },
            { label: university.data.name, isCurrentPage: true },
          ]}
        />
      ) : (
        <Skeleton className="w-[25rem] h-5 my-5" />
      )}
      <div className="w-full space-y-10">
        <SimpleUniversity data={university?.data} />
        <h2 className="w-full h-max capitalize text-center text-2xl font-semibold">
          Thông tin chi tiết
        </h2>
        <AdmissionInfo data={university?.data} />
        <Campuses data={university?.data} />
        <TrainingFields data={university?.data} />
      </div>
    </>
  );
};
export default UniversityDetail;
