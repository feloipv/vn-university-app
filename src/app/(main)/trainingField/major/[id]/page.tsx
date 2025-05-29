"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ListUniversities } from "@/components/university/ListUniversities";
import { useGetMajorByIdQuery } from "@/lib/redux/api/major";
import { useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const MajorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: major } = useGetMajorByIdQuery(id);

  return (
    <>
      {major?.data ? (
        <Breadcrumb className="my-5 font-medium">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/trainingField">Ngành học</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#333] font-medium">
                {major.data.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ) : (
        <Skeleton className="w-[25rem] h-5 my-5" />
      )}
      <div className="w-full">
        <h2 className="capitalize text-center text-2xl font-semibold">
          Lựa chọn phù hợp với bạn
        </h2>
        <p className="mt-2 mb-5 text-center text-xs text-[#6b6b6b] font-medium">
          Khám phá thông tin chi tiết về ngành học để định hướng nghề nghiệp
          chính xác.
        </p>
        {major ? (
          <section className="w-full border border-slate-200 rounded-lg p-10 space-y-5">
            <div>
              <h3 className="w-full text-xl font-semibold capitalize mb-2">
                Ngành {major?.data?.name}
              </h3>
              <p className="text-sm text-[#6b6b6b] font-medium">
                {major?.data?.description}
              </p>
            </div>
            <Separator />
            <ul className="list-disc list-inside text-[#6b7280] text-sm font-normal capitalize">
              <h4 className="capitalize text-black text-lg font-medium mt-4 mb-4">
                {`Các Trường có đào tạo Ngành ${major.data?.name}`}
              </h4>
              {major.data?.trainingFieldIds?.map((trainingfield) => (
                <ListUniversities
                  key={trainingfield._id}
                  data={trainingfield.universityIds}
                />
              ))}
            </ul>
          </section>
        ) : (
          <div className="w-full border border-slate-200 rounded-lg p-10 ">
            <Skeleton className="w-[50%] h-8 mb-2" />
            <Skeleton className="w-full h-20" />
            <Separator className="my-5" />
            <Skeleton className="w-[50%] h-8 mb-2" />
            <div className="pl-4 space-y-2">
              <Skeleton className="w-[70%] h-6" />
              <Skeleton className="w-[80%] h-6" />
              <Skeleton className="w-[40%] h-6" />
              <Skeleton className="w-[60%] h-6" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MajorDetail;
