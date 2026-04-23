import { SignIn, SignUp } from "@clerk/react";
import { Logo } from "@/components/Logo";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-4"><Logo /></div>
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 -z-10 leaf-gradient-soft" />
        <SignIn routing="path" path={`${BASE}/sign-in`} signUpUrl={`${BASE}/sign-up`} fallbackRedirectUrl={`${BASE}/dashboard`} />
      </div>
    </div>
  );
}

export function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-4"><Logo /></div>
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 -z-10 leaf-gradient-soft" />
        <SignUp routing="path" path={`${BASE}/sign-up`} signInUrl={`${BASE}/sign-in`} fallbackRedirectUrl={`${BASE}/dashboard`} />
      </div>
    </div>
  );
}
