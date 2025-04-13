import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { sendOtpSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendOTPMutation } from "@/lib/redux/api/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IApiErrorRes } from "@/interfaces/ApiRes";

export const ForgotPassword = ({ className }: { className?: string }) => {
  const [sendOTP, { isLoading }] = useSendOTPMutation();

  const router = useRouter();

  const formSendMail = useForm<z.infer<typeof sendOtpSchema>>({
    resolver: zodResolver(sendOtpSchema),
    defaultValues: {
      email: "phanvanloi1522003@gmail.com",
    },
  });

  const onSubmit = async (values: z.infer<typeof sendOtpSchema>) => {
    try {
      await sendOTP(values).unwrap();
      toast.success("OTP has been sent please check email to reset password", {
        position: "top-center",
        richColors: true,
      });
      localStorage.setItem("userEmail", values.email);
      formSendMail.reset();
      router.push("/reset_password");
    } catch (error) {
      if (error && typeof error === "object" && "data" in error) {
        const apiError = error.data as IApiErrorRes;
        toast.error(apiError.message, {
          position: "top-center",
          richColors: true,
        });
      } else {
        toast.error("An unexpected error occurred!", {
          position: "top-center",
          richColors: true,
        });
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger className={className}>Forgot Password</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Forgot password</DialogTitle>
          <DialogDescription>
            Please enter email to reset password
          </DialogDescription>
        </DialogHeader>
        <Form {...formSendMail}>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              formSendMail.handleSubmit(onSubmit)(e);
            }}
            className="space-y-6 m-auto w-full"
          >
            <FormField
              control={formSendMail.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="m@example.com"
                      className="focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="w-full flex !justify-end">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-max cursor-pointer"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
