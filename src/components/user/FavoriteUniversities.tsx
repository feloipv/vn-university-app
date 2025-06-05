"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ListUniversities } from "../university/ListUniversities";
import { useGetProfileQuery } from "@/lib/redux/api/auth";

const FavoriteUniversities = () => {
  const { data: userProfile, isLoading } = useGetProfileQuery();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="capitalize text-center text-2xl font-semibold">
          Các trường đại học yêu thích của bạn
        </CardTitle>
        <CardDescription className="mb-5 capitalize text-center text-xs text-[#6b6b6b] font-medium">
          Đây là danh sách các trường đại học mà bạn đã thích
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ListUniversities data={userProfile?.data?.favoriteUniversityIds} />
      </CardContent>
    </Card>
  );
};

export default FavoriteUniversities;
