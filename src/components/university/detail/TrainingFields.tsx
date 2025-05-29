import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { IGetUniversityById } from "@/interfaces/university";

type Props = {
  data?: IGetUniversityById;
};

export const TrainingFields = ({ data }: Props) => {
  return (
    <div className="w-full border border-slate-200 rounded-lg p-10">
      <h3 className="w-full h-max text-xl font-semibold capitalize line-clamp-2 mb-2.5">
        Ngành đào tạo và điểm chuẩn
      </h3>
      {data ? (
        <ul className="list-decimal list-inside pl-4 space-y-4 font-medium">
          {data.trainingFields?.map((item) => (
            <li key={item.trainingFieldId._id} className="text-sm">
              <span className="font-semibold text-base">
                Nhóm ngành{" "}
                <span className="capitalize">{item.trainingFieldId.name}</span>
              </span>
              <ul className="list-disc list-inside text-[#6b7280] pl-4">
                {item.majors?.map((major) => (
                  <li key={major.majorId._id}>
                    <span>
                      {major.majorId.name}
                      <div className="list-disc list-inside text-[#6b7280]">
                        <span>Điểm chuẩn:</span>
                        {major.scores?.map((score) => (
                          <div key={score.year} className="pl-4 space-x-2">
                            <Badge>{score.year}</Badge>
                            <span>Điểm thi tốt nghiệp THPT:</span>
                            <Badge variant={"outline"} className="">
                              {score.thpt}
                            </Badge>
                            <span>Điểm học bạ:</span>
                            <Badge variant={"outline"} className="">
                              {score.hocBa}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </span>
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
