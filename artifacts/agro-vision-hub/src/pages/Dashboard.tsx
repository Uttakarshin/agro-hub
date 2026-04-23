import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react/custom-fetch";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Activity, Leaf, AlertTriangle, ScanLine, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import type { DashboardSummary, ScanItem, Tip } from "@/lib/api";

const COLORS = ["hsl(142 71% 55%)", "hsl(80 60% 60%)", "hsl(30 90% 60%)", "hsl(340 70% 60%)", "hsl(200 70% 60%)"];

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const glassCard = "rounded-2xl bg-black/55 backdrop-blur-md border border-white/15 shadow-2xl text-white";

export default function Dashboard() {
  const summary = useQuery<DashboardSummary>({ queryKey: ["dashboard-summary"], queryFn: () => customFetch("/api/dashboard/summary") });
  const recent = useQuery<ScanItem[]>({ queryKey: ["dashboard-recent"], queryFn: () => customFetch("/api/dashboard/recent") });
  const tips = useQuery<Tip[]>({ queryKey: ["dashboard-tips"], queryFn: () => customFetch("/api/dashboard/tips") });

  const s = summary.data;

  return (
    <div className="relative text-white">
      <AnimatedBackground />
      <motion.div
        className="max-w-7xl mx-auto px-4 py-8 space-y-8"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl p-8 md:p-12 border border-white/15 bg-gradient-to-br from-emerald-700/40 via-black/55 to-lime-700/30 backdrop-blur-md shadow-2xl"
        >
          <motion.div
            aria-hidden
            className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-emerald-400/30 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <Sparkles className="absolute top-6 right-6 h-8 w-8 text-emerald-200 opacity-70" />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">Welcome back</h1>
          <p className="mt-2 text-white/90 max-w-xl">Your crop health overview, fresh from the field.</p>
          <Link href="/scan">
            <Button size="lg" className="mt-6 bg-white text-emerald-800 hover:bg-emerald-50 shadow-xl" data-testid="button-new-scan-hero">
              <ScanLine className="h-4 w-4 mr-2" />Start a new scan
            </Button>
          </Link>
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={ScanLine} label="Total scans" value={s?.totalScans ?? 0} loading={summary.isLoading} />
          <StatCard icon={Leaf} label="Healthy" value={s?.healthyCount ?? 0} tone="success" loading={summary.isLoading} />
          <StatCard icon={AlertTriangle} label="Diseased" value={s?.diseasedCount ?? 0} tone="warning" loading={summary.isLoading} />
          <StatCard icon={Activity} label="Health score" value={`${s?.healthScore ?? 100}%`} loading={summary.isLoading} />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div variants={fadeUp} className={`${glassCard} lg:col-span-2 p-6`}>
            <div className="flex items-center gap-2 font-semibold text-lg mb-4"><TrendingUp className="h-5 w-5 text-emerald-400" />Weekly scan activity</div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={s?.weeklyTrend ?? []}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(142 71% 55%)" stopOpacity={0.7} /><stop offset="95%" stopColor="hsl(142 71% 55%)" stopOpacity={0.05} /></linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(80 60% 60%)" stopOpacity={0.6} /><stop offset="95%" stopColor="hsl(80 60% 60%)" stopOpacity={0.05} /></linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: "rgba(0,0,0,0.85)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "white" }} />
                  <Area type="monotone" dataKey="scans" name="Scans" stroke="hsl(142 71% 55%)" fill="url(#g1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="healthy" name="Healthy" stroke="hsl(80 60% 60%)" fill="url(#g2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className={`${glassCard} p-6`}>
            <div className="font-semibold text-lg mb-4">Disease breakdown</div>
            {s?.diseaseBreakdown && s.diseaseBreakdown.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={s.diseaseBreakdown} dataKey="count" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                      {s.diseaseBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Legend wrapperStyle={{ fontSize: 12, color: "white" }} />
                    <Tooltip contentStyle={{ background: "rgba(0,0,0,0.85)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "white" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center text-white/70">
                <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <Leaf className="h-12 w-12 mb-2 text-emerald-400/70" />
                </motion.div>
                <p>No diseases detected yet.</p>
                <p className="text-xs">Run scans to see your patterns.</p>
              </div>
            )}
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div variants={fadeUp} className={`${glassCard} lg:col-span-2 p-6`}>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="font-semibold text-lg">Recent scans</div>
              <Link href="/history"><Button variant="ghost" size="sm" className="text-white hover:bg-white/15 hover:text-white" data-testid="link-view-all">View all</Button></Link>
            </div>
            {recent.isLoading ? (
              <div className="space-y-2">{[0, 1, 2].map(i => <div key={i} className="h-16 rounded-lg animate-shimmer bg-white/10" />)}</div>
            ) : recent.data && recent.data.length > 0 ? (
              <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2">
                {recent.data.map((r) => (
                  <motion.div key={r.id} variants={fadeUp} whileHover={{ x: 4 }}>
                    <Link href={`/scans/${r.id}`}>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition cursor-pointer" data-testid={`recent-scan-${r.id}`}>
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${r.status === "healthy" ? "bg-emerald-500/30 text-emerald-200" : "bg-amber-500/30 text-amber-200"}`}>
                            <Leaf className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">{r.cropName}</div>
                            <div className="text-xs text-white/65">{r.diseaseName || "Healthy"} · {new Date(r.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <Badge className={r.status === "healthy" ? "bg-emerald-600" : "bg-amber-500"}>{r.status}</Badge>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 text-white/70">
                <ScanLine className="h-12 w-12 mx-auto mb-3 opacity-60" />
                <p>No scans yet. Try your first one.</p>
                <Link href="/scan"><Button className="mt-4" data-testid="button-first-scan">Scan a leaf</Button></Link>
              </div>
            )}
          </motion.div>

          <motion.div variants={fadeUp} className={`${glassCard} p-6`}>
            <div className="flex items-center gap-2 font-semibold text-lg mb-4"><Sparkles className="h-5 w-5 text-emerald-400" />AI farming tips</div>
            <div className="space-y-3">
              {tips.isLoading ? (
                <div className="space-y-2">{[0, 1, 2].map(i => <div key={i} className="h-16 rounded-lg animate-shimmer bg-white/10" />)}</div>
              ) : tips.data && tips.data.length > 0 ? (
                <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
                  {tips.data.map((t) => (
                    <motion.div
                      key={t.id}
                      variants={fadeUp}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-lg border border-white/15 bg-gradient-to-br from-emerald-500/15 to-lime-500/10"
                    >
                      <div className="text-sm font-semibold text-white">{t.title}</div>
                      <div className="text-xs text-white/75 mt-1">{t.body}</div>
                      <Badge variant="outline" className="mt-2 text-[10px] border-white/30 text-white/90">{t.category}</Badge>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-sm text-white/70 text-center py-8">Loading personalized tips...</p>
              )}
            </div>
          </motion.div>
        </div>

        {s && s.totalScans > 0 && (
          <motion.div variants={fadeUp} className={`${glassCard} p-6`}>
            <div className="font-semibold text-lg mb-4">Field health score</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70">Based on {s.totalScans} scans</span>
              <span className="text-2xl font-bold text-emerald-300">{s.healthScore}%</span>
            </div>
            <Progress value={s.healthScore} className="bg-white/15" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, tone, loading }: { icon: any; label: string; value: number | string; tone?: "success" | "warning"; loading?: boolean }) {
  const ring =
    tone === "success" ? "from-emerald-400/40 to-emerald-400/10" :
    tone === "warning" ? "from-amber-400/40 to-amber-400/10" :
    "from-emerald-400/30 to-lime-400/10";
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`${glassCard} p-4`}
    >
      <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${ring} flex items-center justify-center mb-2 border border-white/15`}>
        <Icon className="h-5 w-5 text-emerald-200" />
      </div>
      <div className="text-xs text-white/70">{label}</div>
      <div className="text-2xl font-bold mt-0.5">{loading ? "—" : value}</div>
    </motion.div>
  );
}
