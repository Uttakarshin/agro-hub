import { SignIn, SignUp } from "@clerk/react";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Leaf, Sparkles } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function AuthShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-4"><Logo /></div>
      <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 leaf-gradient-soft" />
        <motion.div
          aria-hidden
          className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-emerald-300/40 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-lime-300/40 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur text-xs font-semibold text-emerald-700 border border-emerald-200">
              <Sparkles className="h-3.5 w-3.5" /> {subtitle}
            </div>
            <h1 className="mt-3 text-2xl font-bold text-foreground flex items-center justify-center gap-2">
              <Leaf className="h-6 w-6 text-emerald-600" /> {title}
            </h1>
          </motion.div>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export function SignInPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to your farm">
      <SignIn routing="path" path={`${BASE}/sign-in`} signUpUrl={`${BASE}/sign-up`} fallbackRedirectUrl={`${BASE}/dashboard`} />
    </AuthShell>
  );
}

export function SignUpPage() {
  return (
    <AuthShell title="Start protecting your harvest" subtitle="Create your free account">
      <SignUp routing="path" path={`${BASE}/sign-up`} signInUrl={`${BASE}/sign-in`} fallbackRedirectUrl={`${BASE}/dashboard`} />
    </AuthShell>
  );
}
