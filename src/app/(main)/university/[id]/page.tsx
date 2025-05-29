"use client";

import { AdmissionInfo } from "@/components/university/detail/AdmissionInfo";
import { BreadcrumbUniversityDetail } from "@/components/university/detail/BreadcrumbUniversityDetail";
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
      <BreadcrumbUniversityDetail data={university?.data} />
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
