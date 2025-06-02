"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTrainingFieldByIdQuery } from "@/lib/redux/api/trainingField";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppBreadcrumb } from "@/components/ui/breadcrumb";

const TrainingFieldDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: trainingField } = useGetTrainingFieldByIdQuery(id);

  return (
    <>
      {trainingField?.data ? (
        <AppBreadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Nhóm ngành", href: "/trainingField" },
            { label: trainingField.data.name, isCurrentPage: true },
          ]}
        />
      ) : (
        <Skeleton className="w-[25rem] h-5 my-5" />
      )}
      <div className="w-full">
        <h2 className="capitalize text-center text-2xl font-semibold">
          Khám phá lĩnh vực phù hợp với bạn
        </h2>
        <p className="mt-2 mb-5 capitalize text-center text-xs text-[#6b6b6b] font-medium">
          Tìm hiểu thông tin chi tiết về các lĩnh vực và nhóm ngành đào tạo để
          lựa chọn đúng định hướng nghề nghiệp.
        </p>
        {trainingField ? (
          <section className="w-full border border-slate-200 rounded-lg p-10 space-y-5">
            <div>
              <h3 className="w-full text-xl font-semibold capitalize mb-2">
                Nhóm ngành {trainingField?.data?.name}
              </h3>
              <p className="text-sm text-[#6b6b6b] font-medium">
                {trainingField?.data?.description}
              </p>
            </div>
            <Separator />
            <ul className="list-disc list-inside text-[#6b7280] text-sm font-normal capitalize">
              <h4 className="capitalize text-black text-lg font-medium mt-4 mb-2">
                Các ngành đào tạo
              </h4>
              {trainingField.data?.majorIds.map((major) => (
                <li
                  key={major._id}
                  className="pl-4 hover:text-orange-500 hover:underline"
                >
                  <Link
                    href={`/trainingField/${trainingField.data?._id}/major/${major._id}`}
                  >
                    {major.name}
                  </Link>
                </li>
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

export default TrainingFieldDetail;
