import { Skeleton } from "@/components/ui/skeleton";
import { IGetUniversityById } from "@/interfaces/university";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Props = {
  data?: IGetUniversityById;
};

export const BreadcrumbUniversityDetail = ({ data }: Props) => {
  return (
    <>
      {data ? (
        <Breadcrumb className="my-5 font-medium">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/university">Trường Đại học</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#333] font-medium">
                {data.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ) : (
        <Skeleton className="w-[25rem] h-5 my-5" />
      )}
    </>
  );
};
