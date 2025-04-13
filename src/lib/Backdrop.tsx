import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BackdropProps {
  show: boolean;
  children?: ReactNode;
  className?: string;
  overlayClassName?: string;
}

const Backdrop = ({
  show,
  children,
  className,
  overlayClassName,
}: BackdropProps) => {
  if (!show) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 transition-all duration-300",
        overlayClassName
      )}
    >
      <div className={cn("text-white", className)}>{children}</div>
    </div>
  );
};

export default Backdrop;
