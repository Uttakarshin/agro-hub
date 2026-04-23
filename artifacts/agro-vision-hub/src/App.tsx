import { Switch, Route, Router as WouterRouter, Redirect, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider, Show, useClerk } from "@clerk/react";
import { shadcn } from "@clerk/themes";
import { useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { queryClient } from "@/lib/queryClient";
import { useApiAuth } from "@/lib/api";
import { AppShell } from "@/components/AppShell";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Scan from "@/pages/Scan";
import ScanDetail from "@/pages/ScanDetail";
import History from "@/pages/History";
import SettingsPage from "@/pages/Settings";
import ProfilePage from "@/pages/Profile";
import About from "@/pages/About";
import { SignInPage, SignUpPage } from "@/pages/AuthPages";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

if (!clerkPubKey) throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");

function stripBase(p: string): string {
  return basePath && p.startsWith(basePath) ? p.slice(basePath.length) || "/" : p;
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: typeof window !== "undefined" ? `${window.location.origin}${basePath}/logo.png` : "",
  },
  variables: {
    colorPrimary: "hsl(142 71% 38%)",
    colorForeground: "hsl(150 25% 12%)",
    colorMutedForeground: "hsl(150 10% 40%)",
    colorDanger: "hsl(0 72% 51%)",
    colorBackground: "hsl(0 0% 100%)",
    colorInput: "hsl(140 15% 96%)",
    colorInputForeground: "hsl(150 25% 12%)",
    colorNeutral: "hsl(140 15% 88%)",
    fontFamily: "Inter, sans-serif",
    borderRadius: "0.75rem",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "bg-white dark:bg-zinc-900 rounded-2xl w-[440px] max-w-full overflow-hidden shadow-2xl border",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-zinc-900 dark:text-zinc-50 text-2xl font-bold",
    headerSubtitle: "text-zinc-500 dark:text-zinc-400",
    socialButtonsBlockButtonText: "text-zinc-900 dark:text-zinc-50",
    formFieldLabel: "text-zinc-900 dark:text-zinc-50",
    footerActionLink: "text-emerald-600 hover:text-emerald-700 font-medium",
    footerActionText: "text-zinc-500 dark:text-zinc-400",
    dividerText: "text-zinc-500 dark:text-zinc-400",
    identityPreviewEditButton: "text-emerald-600",
    formFieldSuccessText: "text-emerald-600",
    alertText: "text-zinc-900 dark:text-zinc-50",
    logoBox: "h-12 mb-2",
    logoImage: "h-12 w-auto",
    socialButtonsBlockButton: "border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800",
    formButtonPrimary: "bg-emerald-600 hover:bg-emerald-700 text-white",
    formFieldInput: "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
    footerAction: "",
    dividerLine: "bg-zinc-200 dark:bg-zinc-700",
    alert: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800",
    otpCodeFieldInput: "bg-zinc-50 dark:bg-zinc-800",
    formFieldRow: "",
    main: "",
  },
};

const localization = {
  signIn: { start: { title: "Welcome back", subtitle: "Sign in to your Agro Vision Hub account" } },
  signUp: { start: { title: "Create your account", subtitle: "Start protecting your crops today" } },
};

function HomeRoute() {
  return (
    <>
      <Show when="signed-in"><Redirect to="/dashboard" /></Show>
      <Show when="signed-out"><Landing /></Show>
    </>
  );
}

function Protected({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Show when="signed-in"><AppShell>{children}</AppShell></Show>
      <Show when="signed-out"><Redirect to="/" /></Show>
    </>
  );
}

function AuthBridge() {
  useApiAuth();
  return null;
}

function ClerkRouterBridge({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl || undefined}
      appearance={clerkAppearance}
      localization={localization}
      routerPush={(p) => setLocation(stripBase(p))}
      routerReplace={(p) => setLocation(stripBase(p), { replace: true })}
    >
      {children}
    </ClerkProvider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeRoute} />
      <Route path="/sign-in/*?" component={SignInPage} />
      <Route path="/sign-up/*?" component={SignUpPage} />
      <Route path="/dashboard">{() => <Protected><Dashboard /></Protected>}</Route>
      <Route path="/scan">{() => <Protected><Scan /></Protected>}</Route>
      <Route path="/scans/:id">{() => <Protected><ScanDetail /></Protected>}</Route>
      <Route path="/history">{() => <Protected><History /></Protected>}</Route>
      <Route path="/settings">{() => <Protected><SettingsPage /></Protected>}</Route>
      <Route path="/profile">{() => <Protected><ProfilePage /></Protected>}</Route>
      <Route path="/about">{() => <Protected><About /></Protected>}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <WouterRouter base={basePath}>
            <ClerkRouterBridge>
              <AuthBridge />
              <Router />
            </ClerkRouterBridge>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
