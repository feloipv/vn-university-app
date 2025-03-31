import { ActivateAccountForm } from "@/components/auth/activateAccount-form";

const Activate = () => {
  return (
    <div className="w-full h-screen grid lg:grid-rows-[50px_auto] grid-rows-[100px_auto] gap-y-[30px]">
      <div className="w-full h-max text-center mt-[150px] space-y-2">
        <ActivateAccountForm />
      </div>
    </div>
  );
};

export default Activate;
