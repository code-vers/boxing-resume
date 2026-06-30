import { Suspense } from "react";
import { ResetPasswordComponent } from "@/features/authentication/components/reset-password.component";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">Loading...</div>}>
      <ResetPasswordComponent />
    </Suspense>
  );
}
