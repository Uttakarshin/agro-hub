import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Leaf, Camera, Brain, ShieldCheck, Sparkles, BarChart3 } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b glass">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
          <Logo />
          <div className="flex gap-2">
            <Link href="/sign-in"><Button variant="ghost" data-testid="button-signin">Sign in</Button></Link>
            <Link href="/sign-up"><Button data-testid="button-signup">Get started</Button></Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img src={`${BASE}/hero-fields.jpg`} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center text-white">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/25 backdrop-blur text-xs font-semibold border border-emerald-300/40 text-emerald-50">
              <Sparkles className="h-3.5 w-3.5" /> Powered by Gemini Vision
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Spot crop disease in seconds — straight from a leaf photo.
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
              Snap a leaf. Get an instant AI diagnosis with severity, treatment, and prevention. Built for real farms, not labs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/sign-up"><Button size="lg" className="text-base h-12 px-6 shadow-lg shadow-emerald-900/40" data-testid="button-cta-start">Start scanning free</Button></Link>
              <Link href="/about"><Button size="lg" variant="outline" className="text-base h-12 px-6 bg-white/15 border-white/40 text-white hover:bg-white/25" data-testid="button-cta-about">How it works</Button></Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="relative hidden md:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20"
            >
              <img src={`${BASE}/hero-scan.png`} alt="AI scanning a crop leaf" className="w-full h-[460px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 via-transparent to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-5 -left-5 bg-white/95 text-emerald-900 rounded-2xl px-4 py-3 shadow-xl backdrop-blur flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-full leaf-gradient flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Live diagnosis</div>
                <div className="text-sm font-bold">Early Blight · 92% confidence</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 }}
              className="absolute -top-4 -right-4 bg-emerald-600 text-white rounded-full px-4 py-2 shadow-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" /> AI in 2s
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Camera, title: "Snap a leaf", body: "Use your phone camera or upload an image. We even reject anything that isn't a real crop leaf." },
            { icon: Brain, title: "AI diagnoses", body: "A vision model trained on plant pathology identifies the disease, severity, and confidence level." },
            { icon: ShieldCheck, title: "Get a plan", body: "Actionable treatment and prevention steps in plain language — no jargon." },
          ].map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl border bg-card p-6">
              <div className="h-12 w-12 rounded-xl leaf-gradient-soft flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            src={`${BASE}/hero-leaf.jpg`}
            alt="Crop leaf"
            className="rounded-2xl shadow-2xl"
          />
          <div>
            <Leaf className="h-10 w-10 text-emerald-600 mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold">Built around the way you actually farm.</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Track every scan, watch your weekly health score, and get AI-curated tips for your crops.
              Switch languages, units, and themes to fit how you work.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <BarChart3 className="h-6 w-6 text-emerald-600" />
              <span className="text-sm">Personal dashboard with disease trends</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to protect your harvest?</h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Free to start. Your scans stay private to your account.</p>
        <Link href="/sign-up"><Button size="lg" className="mt-8 text-base h-12 px-8" data-testid="button-cta-bottom">Create your free account</Button></Link>
      </section>
    </div>
  );
}
