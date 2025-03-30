import { IVerifyOtp } from "@/interfaces/auth";
import authInstance from "./instance";

export const activateAccount = (value: IVerifyOtp) => {
  return authInstance.post("/auth/activate_user", value);
};
