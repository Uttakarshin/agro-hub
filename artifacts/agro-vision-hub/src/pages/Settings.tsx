import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react/custom-fetch";
import { useUser, useClerk } from "@clerk/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bell, Globe, Palette, Ruler, Lock, Database, Wifi } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/lib/theme";
import type { Settings } from "@/lib/api";

export default function SettingsPage() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { setTheme } = useTheme();
  const { openUserProfile } = useClerk();
  const { user } = useUser();
  const { data } = useQuery<Settings>({ queryKey: ["settings"], queryFn: () => customFetch("/api/settings") });
  const [local, setLocal] = useState<Settings | null>(null);

  useEffect(() => { if (data) setLocal(data); }, [data]);

  const save = useMutation({
    mutationFn: (updates: Partial<Settings>) => customFetch<Settings>("/api/settings", { method: "PUT", body: JSON.stringify(updates) }),
    onSuccess: (d) => { qc.setQueryData(["settings"], d); toast({ title: "Settings saved" }); },
    onError: () => toast({ title: "Could not save settings", variant: "destructive" }),
  });

  const update = (patch: Partial<Settings>) => {
    if (!local) return;
    const next = { ...local, ...patch };
    setLocal(next);
    if (patch.theme) setTheme(patch.theme as "light" | "dark" | "system");
    save.mutate(patch);
  };

  if (!local) return <div className="max-w-4xl mx-auto px-4 py-8"><div className="h-96 rounded-xl animate-shimmer bg-muted" /></div>;

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8 space-y-6"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Personalize how Agro Vision Hub works for you.</p>
      </motion.div>

      <MCard>
        <CardHeader><CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-emerald-600" />Appearance</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Row label="Theme" hint="Light, dark, or follow system">
            <Select value={local.theme} onValueChange={(v) => update({ theme: v })}>
              <SelectTrigger className="w-40" data-testid="select-theme"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </Row>
        </CardContent>
      </MCard>

      <MCard>
        <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-emerald-600" />Language &amp; region</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Row label="Language" hint="App language for menus and labels">
            <Select value={local.language} onValueChange={(v) => update({ language: v })}>
              <SelectTrigger className="w-40" data-testid="select-language"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="hi">हिन्दी</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="sw">Kiswahili</SelectItem>
              </SelectContent>
            </Select>
          </Row>
        </CardContent>
      </MCard>

      <MCard>
        <CardHeader><CardTitle className="flex items-center gap-2"><Ruler className="h-5 w-5 text-emerald-600" />Units</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Row label="Measurement system" hint="Used in tips and weather">
            <Select value={local.units} onValueChange={(v) => update({ units: v })}>
              <SelectTrigger className="w-40" data-testid="select-units"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric</SelectItem>
                <SelectItem value="imperial">Imperial</SelectItem>
              </SelectContent>
            </Select>
          </Row>
          <Row label="Temperature" hint="">
            <Select value={local.temperatureUnit} onValueChange={(v) => update({ temperatureUnit: v })}>
              <SelectTrigger className="w-40" data-testid="select-temp"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="celsius">Celsius (°C)</SelectItem>
                <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
              </SelectContent>
            </Select>
          </Row>
        </CardContent>
      </MCard>

      <MCard>
        <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-emerald-600" />Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <SwitchRow label="All notifications" hint="Master toggle for in-app and email notifications" checked={local.notificationsEnabled} onChange={(v) => update({ notificationsEnabled: v })} testId="switch-notif" />
          <SwitchRow label="Scan reminders" hint="Periodic reminders to scan your crops" checked={local.scanReminders} onChange={(v) => update({ scanReminders: v })} testId="switch-reminders" />
          <SwitchRow label="Weather alerts" hint="Warnings about disease-favorable weather" checked={local.weatherAlerts} onChange={(v) => update({ weatherAlerts: v })} testId="switch-weather" />
          <SwitchRow label="Marketing emails" hint="Product updates and growing guides" checked={local.marketingEmails} onChange={(v) => update({ marketingEmails: v })} testId="switch-marketing" />
        </CardContent>
      </MCard>

      <MCard>
        <CardHeader><CardTitle className="flex items-center gap-2"><Database className="h-5 w-5 text-emerald-600" />Scanning</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <SwitchRow label="Auto-save scans" hint="Keep every scan in your history" checked={local.autoSaveScans} onChange={(v) => update({ autoSaveScans: v })} testId="switch-autosave" />
          <SwitchRow label="High-accuracy mode" hint="Use the most precise model (slower)" checked={local.highAccuracyMode} onChange={(v) => update({ highAccuracyMode: v })} testId="switch-accuracy" />
          <SwitchRow label="Offline-friendly preview" hint="Compress images for low-bandwidth use" checked={local.offlineMode} onChange={(v) => update({ offlineMode: v })} testId="switch-offline" />
        </CardContent>
      </MCard>

      <MCard>
        <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5 text-emerald-600" />Account</CardTitle><CardDescription>Manage your password and account security</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <Label>Email</Label>
              <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress ?? "—"}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => openUserProfile()} data-testid="button-change-password">Change password &amp; security</Button>
          <p className="text-xs text-muted-foreground">Forgot your password? Sign out and use the "Forgot password" link on sign-in to receive a reset email.</p>
        </CardContent>
      </MCard>
    </motion.div>
  );
}

const MCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
    whileHover={{ y: -2 }}
  >
    <Card className={className}>{children}</Card>
  </motion.div>
);

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <div><Label>{label}</Label>{hint && <p className="text-sm text-muted-foreground">{hint}</p>}</div>
      {children}
    </div>
  );
}

function SwitchRow({ label, hint, checked, onChange, testId }: { label: string; hint: string; checked: boolean; onChange: (v: boolean) => void; testId: string }) {
  return (
    <div className="flex justify-between items-center">
      <div><Label>{label}</Label><p className="text-sm text-muted-foreground">{hint}</p></div>
      <Switch checked={checked} onCheckedChange={onChange} data-testid={testId} />
    </div>
  );
}
