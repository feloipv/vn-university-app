"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ListUniversities } from "@/components/university/ListUniversities";
import { useGetMajorByIdQuery } from "@/lib/redux/api/major";
import { useParams } from "next/navigation";
import { AppBreadcrumb } from "@/components/ui/breadcrumb";

const MajorDetail = () => {
  const { id, majorId } = useParams<{ id: string; majorId: string }>();
  const { data: major } = useGetMajorByIdQuery(majorId);

  const traningField = major?.data?.trainingFieldIds?.find(
    (tnf) => String(tnf._id) === String(id)
  );

  return (
    <>
      {major?.data ? (
        <AppBreadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: String(traningField?.name), href: `/trainingField/${id}` },
            { label: major.data.name, isCurrentPage: true },
          ]}
        />
      ) : (
        <Skeleton className="w-[25rem] h-5 my-5" />
      )}
      <div className="w-full">
        <h2 className="capitalize text-center text-2xl font-semibold">
          Lựa chọn chuyên ngành phù hợp với bạn
        </h2>
        <p className="mt-2 mb-5 text-center text-xs text-[#6b6b6b] font-medium">
          Khám phá thông tin chi tiết về chuyên ngành để định hướng nghề nghiệp
          chính xác.
        </p>
        {major ? (
          <section className="w-full border border-slate-200 rounded-lg p-10 space-y-5">
            <div>
              <h3 className="w-full text-xl font-semibold capitalize mb-2">
                Chuyên ngành {major?.data?.name}
              </h3>
              <p className="text-sm text-[#6b6b6b] font-medium">
                {major?.data?.description}
              </p>
            </div>
            <Separator />
            <ul className="list-disc list-inside text-[#6b7280] text-sm font-normal capitalize">
              <h4 className="capitalize text-black text-lg font-medium mt-4 mb-4">
                {`Các Trường có đào tạo chuyên Ngành ${major.data?.name}`}
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
