"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useCallback } from "react";
import { useGetProfileQuery, useSignoutMutation } from "@/lib/redux/api/auth";
import { cookiesApi } from "@/lib/setCookies";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircle, LogOut, User } from "lucide-react";
import Backdrop from "@/components/ui/Backdrop";
import Link from "next/link";

const UserMenu = () => {
  const { data: userProfile } = useGetProfileQuery();
  const [signOut, { isLoading }] = useSignoutMutation();
  const router = useRouter();
  const [openDialogSignout, setOpenDialogSignout] = useState(false);

  const handleSignOut = useCallback(async () => {
    try {
      const result = await signOut().unwrap();
      await cookiesApi({ name: "isSignin" }, "/api/cookies/delete");
      toast.success(result.message, {
        position: "top-center",
        richColors: true,
      });
      router.push("/signin");
    } catch (error) {
      toast.error("Đăng xuất thất bại, vui lòng thử lại!", {
        position: "top-center",
        richColors: true,
      });
      console.log(error);
    }
  }, [router]);

  return (
    <div className="w-full h-max max-h-full">
      <Menubar className="border-0 shadow-none w-full flex justify-end p-0">
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer p-0">
            <Avatar>
              {userProfile?.data?.avatar && (
                <AvatarImage src={userProfile.data.avatar} />
              )}

              <AvatarFallback
                className={`${
                  userProfile?.data?.userName &&
                  "bg-green-700 text-white font-semibold"
                }`}
              >
                {userProfile?.data?.userName.charAt(0).toUpperCase() || "UN"}
              </AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link
                href={"/profile"}
                className="cursor-pointer hover:!text-orange-500 flex gap-x-2"
              >
                <User className="size-4 text-inherit" />
                <span>Profile</span>
              </Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              className="cursor-pointer hover:!text-red-500 flex gap-x-2"
              onClick={() => setOpenDialogSignout(true)}
            >
              <LogOut className="size-4 text-inherit" />
              <span>Đăng xuất</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <AlertDialog open={openDialogSignout} onOpenChange={setOpenDialogSignout}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn chắc chắn muốn đăng xuất?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn sẽ cần đăng nhập lại để tiếp tục sử dụng hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignOut}
              className="cursor-pointer"
            >
              Đăng xuất
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Backdrop show={isLoading}>
        <LoaderCircle className="animate-spin size-6" />
      </Backdrop>
    </div>
  );
};

export default UserMenu;
