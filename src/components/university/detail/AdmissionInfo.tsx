import { Skeleton } from "@/components/ui/skeleton";
import { IGetUniversityById } from "@/interfaces/university";

type Props = {
  data?: IGetUniversityById;
};

export const AdmissionInfo = ({ data }: Props) => {
  return (
    <div className="w-full border border-slate-200 rounded-lg p-10">
      <h3 className="w-full text-xl font-semibold capitalize line-clamp-2 mb-2.5">
        Phương thức xét tuyển
      </h3>
      {data ? (
        <ul className="list-decimal list-inside pl-4 space-y-4 font-medium">
          {data.admissionInfo?.methods?.map((item) => (
            <li key={item.title} className="space-y-2 text-sm">
              <span className="font-semibold text-base">{item.title}</span>
              <ul className="list-disc list-inside text-[#6b7280] pl-4">
                {item.conditions?.map((conditionsItem) => (
                  <li key={conditionsItem}>{conditionsItem}</li>
                ))}
              </ul>
              <ul className="list-disc list-inside text-[#6b7280] pl-4">
                <span>Hồ sơ xét tuyển: </span>
                {item.documents?.map((documentsItem) => (
                  <li key={documentsItem} className="pl-4">
                    {documentsItem}
                  </li>
                ))}
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
