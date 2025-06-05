"use client";

import Cropper from "react-easy-crop";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import getCroppedImg from "@/utils/getCroppedImg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUploadAvatarMutation } from "@/lib/redux/api/auth";
import Backdrop from "../ui/Backdrop";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const AvatarCropper = ({
  imageSrc,
  open,
  isOpen,
}: {
  imageSrc: string;
  open: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [updateAvatar, { isLoading }] = useUploadAvatarMutation();

  const onCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSave = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const formData = new FormData();
      formData.append("avatar", croppedImage);
      const result = await updateAvatar(formData).unwrap();
      open(false);
      if (result.success) {
        toast.success("Chỉnh sửa ảnh thành công", {
          position: "top-center",
          richColors: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Backdrop show={isLoading}>
        <LoaderCircle className="animate-spin size-5" />
      </Backdrop>
      <Dialog open={isOpen}>
        <DialogContent className="w-full">
          <DialogTitle>Chỉnh sửa ảnh đại diện</DialogTitle>
          <div className="w-full aspect-square max-w-lg bg-whites">
            <div className="relative size-full">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="rect"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => open(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="cursor-pointer">
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AvatarCropper;
