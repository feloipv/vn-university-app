import { Skeleton } from "@/components/ui/skeleton";
import { IGetUniversityById } from "@/interfaces/university";

type Props = {
  data?: IGetUniversityById;
};

export const Campuses = ({ data }: Props) => {
  return (
    <div className="w-full border border-slate-200 rounded-lg p-10">
      <h3 className="w-full text-xl font-semibold capitalize line-clamp-2 mb-2.5">
        Các cơ sở hoạt động
      </h3>
      {data ? (
        <ul className="list-decimal list-inside pl-4 space-y-4 font-medium">
          {data?.campuses?.map((item) => (
            <li key={item.name} className="space-y-2 text-sm">
              <span className="font-semibold text-base">{item.name}</span>
              <ul className="list-disc list-inside text-[#6b7280] pl-4">
                <li>Địa chỉ: {item.address}</li>
                <li>Số điện thoại: {item.phone}</li>
                <li>Email liên hệ: {item.email}</li>
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <>
          {Array.from({ length: 2 }).map((_value, index) => (
            <div key={index} className="space-y-2 mb-10">
              <Skeleton className="w-[70%] h-10" />
              <div className="space-y-2 pl-10">
                <Skeleton className="w-[30%] h-6" />
                <Skeleton className="w-[50%] h-6" />
                <Skeleton className="w-[20%] h-6" />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
