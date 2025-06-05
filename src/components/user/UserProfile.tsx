"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import AvatarCropper from "@/components/user/AvatarCropper";
import { useGetProfileQuery } from "@/lib/redux/api/auth";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import AvatarUpload from "@/components/user/AvatarUpload";

const UserProfile = () => {
  const { data: userProfile, isLoading } = useGetProfileQuery();
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [openAvatarCropper, setOpenAvatarCropper] = useState<boolean>(false);

  const avatarUrl = userProfile?.data?.avatar;
  const userName = userProfile?.data?.userName;

  const handleFileSelected = (fileUrl: string) => {
    setCropImageSrc(fileUrl);
    setOpenAvatarCropper(true);
  };

  useEffect(() => {
    if (!openAvatarCropper) {
      setCropImageSrc(null);
      cropImageSrc && URL.revokeObjectURL(cropImageSrc);
    }
  }, [openAvatarCropper]);
  return (
    <>
      {cropImageSrc && (
        <AvatarCropper
          open={setOpenAvatarCropper}
          isOpen={openAvatarCropper}
          imageSrc={cropImageSrc}
        />
      )}
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="capitalize text-center text-2xl font-semibold">
            Thông tin cá nhân
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="size-max relative">
            <Avatar className="size-[150px] ">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={userName} />}
              <AvatarFallback
                className={`text-2xl ${
                  userName && "bg-emerald-500 text-white text font-semibold"
                }`}
              >
                {userName?.charAt(0).toUpperCase() || "UN"}
              </AvatarFallback>
            </Avatar>
            {!isLoading && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%] p-2 border bg-muted border-slate-300 rounded-full cursor-pointer "
                  >
                    <Pencil className="text-slate-950 size-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-max grid gap-y-1 text-center">
                  <span className="cursor-pointer text-xs font-medium hover:text-blue-500">
                    <AvatarUpload onFileSelected={handleFileSelected} />
                  </span>
                </PopoverContent>
              </Popover>
            )}
          </div>
          {userProfile?.data ? (
            <div className="text-center">
              <h3 className="text-lg font-semibold capitalize">{userName}</h3>
              <p className="text-xs text-[#6b6b6b] font-medium">
                {userProfile?.data?.email}
              </p>
            </div>
          ) : (
            <div className="space-y-2 w-full flex flex-col items-center">
              <Skeleton className="w-[70%] h-7 rounded-md" />
              <Skeleton className="w-[50%] h-5 rounded-sm" />
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default UserProfile;
