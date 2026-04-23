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
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/85" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 text-white">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-medium border border-white/20">
              <Sparkles className="h-3.5 w-3.5" /> Powered by Gemini Vision
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
              Spot crop disease in seconds — straight from a leaf photo.
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/90 max-w-2xl">
              Snap a leaf. Get an instant AI diagnosis with severity, treatment, and prevention. Built for real farms, not labs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/sign-up"><Button size="lg" className="text-base h-12 px-6" data-testid="button-cta-start">Start scanning free</Button></Link>
              <Link href="/about"><Button size="lg" variant="outline" className="text-base h-12 px-6 bg-white/10 border-white/30 text-white hover:bg-white/20" data-testid="button-cta-about">How it works</Button></Link>
            </div>
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
