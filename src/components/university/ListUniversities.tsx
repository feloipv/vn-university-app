import { UniversityType } from "@/schemas/university";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

export const ListUniversities = (universities: { data?: UniversityType[] }) => {
  return universities.data ? (
    <section>
      <ul className="grid grid-cols-4 gap-5">
        {universities?.data?.map((university) => (
          <li key={university._id}>
            <Link
              href={`/university/${university._id}`}
              className="w-full h-32 max-h-36 grid grid-cols-[30%_1fr] items-center gap-x-4 p-5 rounded-lg border border-slate-200 transform transition-all hover:-translate-y-2 hover:shadow-lg hover:text-orange-500"
            >
              <div className="relative w-full aspect-square border bg-slate-50 rounded-lg overflow-hidden">
                <Image
                  src={String(university.logo)}
                  fill
                  alt="logo-university"
                  className="object-contain"
                />
              </div>
              <div className="grid grid-rows-[repeat(2,_max-content)] gap-y-2">
                <h3 className="w-full h-max font-semibold capitalize line-clamp-2">
                  {university.name}
                </h3>
                <div className="grid grid-cols-3 gap-x-2 text-xs text-black">
                  <Badge variant="secondary">{university.code}</Badge>
                  <Badge variant="secondary" className="capitalize">
                    {university.city}
                  </Badge>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  ) : (
    <section>
      <ul className="grid grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_item, index) => (
          <li
            key={index}
            className="w-full h-32 max-h-36 grid grid-cols-[30%_1fr] items-center gap-x-4 p-5 rounded-lg border border-slate-200"
          >
            <Skeleton className="w-full aspect-square rounded-lg" />
            <div className="size-full grid grid-rows-[60%_1fr] gap-y-2">
              <Skeleton className="size-full" />
              <Skeleton className="size-full" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
