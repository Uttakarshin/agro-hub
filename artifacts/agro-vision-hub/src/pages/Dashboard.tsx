import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react/custom-fetch";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Activity, Leaf, AlertTriangle, ScanLine, TrendingUp, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import type { DashboardSummary, ScanItem, Tip } from "@/lib/api";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const COLORS = ["hsl(142 71% 45%)", "hsl(80 60% 50%)", "hsl(30 90% 55%)", "hsl(340 70% 55%)", "hsl(200 70% 50%)"];

export default function Dashboard() {
  const summary = useQuery<DashboardSummary>({ queryKey: ["dashboard-summary"], queryFn: () => customFetch("/api/dashboard/summary") });
  const recent = useQuery<ScanItem[]>({ queryKey: ["dashboard-recent"], queryFn: () => customFetch("/api/dashboard/recent") });
  const tips = useQuery<Tip[]>({ queryKey: ["dashboard-tips"], queryFn: () => customFetch("/api/dashboard/tips") });

  const s = summary.data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white">
        <img src={`${BASE}/dashboard-bg.jpg`} alt="" className="absolute inset-0 w-full h-full object-cover -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-900/80 to-lime-700/60" />
        <Sparkles className="absolute top-6 right-6 h-8 w-8 opacity-40 animate-float-slow" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-white/90 max-w-xl">Your crop health overview, fresh from the field.</p>
        <Link href="/scan"><Button size="lg" className="mt-6 bg-white text-emerald-700 hover:bg-white/90" data-testid="button-new-scan-hero"><ScanLine className="h-4 w-4 mr-2" />Start a new scan</Button></Link>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={ScanLine} label="Total scans" value={s?.totalScans ?? 0} loading={summary.isLoading} />
        <StatCard icon={Leaf} label="Healthy" value={s?.healthyCount ?? 0} tone="success" loading={summary.isLoading} />
        <StatCard icon={AlertTriangle} label="Diseased" value={s?.diseasedCount ?? 0} tone="warning" loading={summary.isLoading} />
        <StatCard icon={Activity} label="Health score" value={`${s?.healthScore ?? 100}%`} loading={summary.isLoading} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-emerald-600" />Weekly scan activity</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={s?.weeklyTrend ?? []}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(142 71% 45%)" stopOpacity={0.6} /><stop offset="95%" stopColor="hsl(142 71% 45%)" stopOpacity={0.05} /></linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(80 60% 50%)" stopOpacity={0.5} /><stop offset="95%" stopColor="hsl(80 60% 50%)" stopOpacity={0.05} /></linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="scans" name="Scans" stroke="hsl(142 71% 45%)" fill="url(#g1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="healthy" name="Healthy" stroke="hsl(80 60% 50%)" fill="url(#g2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Disease breakdown</CardTitle></CardHeader>
          <CardContent>
            {s?.diseaseBreakdown && s.diseaseBreakdown.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={s.diseaseBreakdown} dataKey="count" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                      {s.diseaseBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center text-muted-foreground">
                <Leaf className="h-12 w-12 mb-2 text-emerald-500/50" />
                <p>No diseases detected yet.</p>
                <p className="text-xs">Run scans to see your patterns.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent scans</CardTitle>
            <Link href="/history"><Button variant="ghost" size="sm" data-testid="link-view-all">View all</Button></Link>
          </CardHeader>
          <CardContent>
            {recent.isLoading ? (
              <div className="space-y-2">{[0, 1, 2].map(i => <div key={i} className="h-16 rounded-lg animate-shimmer bg-muted" />)}</div>
            ) : recent.data && recent.data.length > 0 ? (
              <div className="space-y-2">
                {recent.data.map((r) => (
                  <Link key={r.id} href={`/scans/${r.id}`}>
                    <div className="flex items-center justify-between p-3 rounded-lg border hover-elevate active-elevate-2 cursor-pointer" data-testid={`recent-scan-${r.id}`}>
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${r.status === "healthy" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"}`}>
                          <Leaf className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{r.cropName}</div>
                          <div className="text-xs text-muted-foreground">{r.diseaseName || "Healthy"} · {new Date(r.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <Badge variant={r.status === "healthy" ? "default" : "secondary"} className={r.status === "healthy" ? "bg-emerald-600" : "bg-amber-500"}>{r.status}</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <ScanLine className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p>No scans yet. Try your first one.</p>
                <Link href="/scan"><Button className="mt-4" data-testid="button-first-scan">Scan a leaf</Button></Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-emerald-600" />AI farming tips</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {tips.isLoading ? (
              <div className="space-y-2">{[0, 1, 2].map(i => <div key={i} className="h-16 rounded-lg animate-shimmer bg-muted" />)}</div>
            ) : tips.data && tips.data.length > 0 ? (
              tips.data.map((t) => (
                <div key={t.id} className="p-3 rounded-lg border bg-gradient-to-br from-emerald-50/50 to-lime-50/50 dark:from-emerald-950/20 dark:to-lime-950/20">
                  <div className="text-sm font-semibold">{t.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t.body}</div>
                  <Badge variant="outline" className="mt-2 text-[10px]">{t.category}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">Loading personalized tips...</p>
            )}
          </CardContent>
        </Card>
      </div>

      {s && s.totalScans > 0 && (
        <Card>
          <CardHeader><CardTitle>Field health score</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">Based on {s.totalScans} scans</span><span className="text-2xl font-bold text-emerald-600">{s.healthScore}%</span></div>
            <Progress value={s.healthScore} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, tone, loading }: { icon: any; label: string; value: number | string; tone?: "success" | "warning"; loading?: boolean }) {
  const ring = tone === "success" ? "from-emerald-500/20 to-emerald-500/5" : tone === "warning" ? "from-amber-500/20 to-amber-500/5" : "from-emerald-500/15 to-lime-500/5";
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardContent className="p-4">
          <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${ring} flex items-center justify-center mb-2`}>
            <Icon className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
          </div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-2xl font-bold mt-0.5">{loading ? "—" : value}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
