import React from "react";
import { motion } from "framer-motion";
import { Leaf, Camera, Brain, ShieldCheck, Sparkles, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

import "./_group.css";

export function Split() {
  return (
    <div className="min-h-screen bg-[hsl(60_30%_98%)] text-[hsl(150_25%_12%)] font-sans selection:bg-primary/20 flex flex-col">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 w-full border-b border-[hsl(140_15%_88%)] bg-[hsl(60_30%_98%)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-2 font-bold tracking-tight text-[hsl(150_25%_12%)]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg leaf-gradient text-white">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline-block">Agro Vision Hub</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex hover:bg-black/5">Sign in</Button>
            <Button className="bg-[hsl(142_71%_38%)] text-white hover:bg-[hsl(142_71%_33%)] rounded-full px-6 shadow-sm">
              Get started
            </Button>
          </div>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="mx-auto w-full max-w-[1600px] flex-1 lg:flex">
        {/* Left Column: Sticky Hero */}
        <section className="relative w-full lg:w-1/2 lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 p-6 lg:p-12">
          <div className="absolute inset-0 z-0 overflow-hidden lg:rounded-br-[4rem]">
            <img 
              src="/__mockup/images/hero-leaf.jpg" 
              alt="Crop leaf" 
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(142_71%_15%)]/90 via-[hsl(142_71%_25%)]/80 to-[hsl(80_60%_20%)]/90 backdrop-blur-[2px]" />
          </div>
          
          <div className="relative z-10 flex h-full flex-col justify-center text-white max-w-xl mx-auto lg:mx-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md shadow-sm">
                <Sparkles className="h-4 w-4 text-[hsl(80_60%_80%)]" /> 
                <span className="text-white/90">Powered by Gemini Vision</span>
              </div>
              
              <h1 className="mb-6 text-5xl font-extrabold tracking-tight leading-[1.1] lg:text-6xl text-white">
                Spot crop disease in seconds — straight from a leaf photo.
              </h1>
              
              <p className="mb-10 text-xl leading-relaxed text-white/80 font-medium">
                Snap a leaf. Get an instant AI diagnosis with severity, treatment, and prevention. Built for real farms, not labs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 rounded-full bg-white text-[hsl(142_71%_25%)] hover:bg-white/90 px-8 text-lg font-semibold shadow-lg transition-transform hover:scale-105 active:scale-95">
                  Start scanning free
                </Button>
                <Button size="lg" variant="outline" className="h-14 rounded-full border-white/30 bg-white/5 text-white hover:bg-white/10 px-8 text-lg font-medium backdrop-blur-sm transition-colors">
                  How it works
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Right Column: Scrolling Rail */}
        <section className="w-full lg:w-1/2 p-6 lg:py-16 lg:px-12">
          <div className="max-w-2xl mx-auto space-y-24">
            
            {/* Feature Rail */}
            <div className="space-y-6">
              
              {[
                { 
                  icon: Camera, 
                  title: "Snap a leaf", 
                  body: "Use your phone camera or upload an image. We even reject anything that isn't a real crop leaf." 
                },
                { 
                  icon: Brain, 
                  title: "AI diagnoses", 
                  body: "A vision model trained on plant pathology identifies the disease, severity, and confidence level." 
                },
                { 
                  icon: ShieldCheck, 
                  title: "Get a plan", 
                  body: "Actionable treatment and prevention steps in plain language — no jargon." 
                },
              ].map((feature, i) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex flex-col sm:flex-row gap-6 rounded-3xl border border-[hsl(140_15%_88%)] bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-[hsl(142_71%_80%)] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(142_71%_98%)] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[hsl(60_30%_98%)] border border-[hsl(140_15%_88%)] shadow-sm group-hover:leaf-gradient-soft group-hover:border-transparent transition-colors">
                    <feature.icon className="h-7 w-7 text-[hsl(142_71%_38%)]" />
                  </div>
                  <div className="relative z-10 flex flex-col justify-center">
                    <h3 className="mb-2 text-2xl font-bold text-[hsl(150_25%_12%)]">{feature.title}</h3>
                    <p className="text-[hsl(150_10%_40%)] leading-relaxed text-lg">{feature.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="h-px w-full bg-[hsl(140_15%_88%)]" />

            {/* Built Around Farming Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-[hsl(140_15%_88%)] bg-white shadow-sm"
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img 
                  src="/__mockup/images/about-farmer.jpg" 
                  alt="Farmer checking crops" 
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-8 sm:p-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full leaf-gradient-soft">
                  <Leaf className="h-6 w-6 text-[hsl(142_71%_38%)]" />
                </div>
                <h2 className="mb-4 text-3xl font-bold leading-tight">
                  Built around the way you actually farm.
                </h2>
                <p className="mb-8 text-lg text-[hsl(150_10%_40%)] leading-relaxed">
                  Track every scan, watch your weekly health score, and get AI-curated tips for your crops. Switch languages, units, and themes to fit how you work.
                </p>
                <div className="flex items-center gap-4 rounded-2xl bg-[hsl(60_30%_98%)] p-4 border border-[hsl(140_15%_88%)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <BarChart3 className="h-5 w-5 text-[hsl(142_71%_38%)]" />
                  </div>
                  <span className="font-medium text-[hsl(150_25%_12%)] leading-tight">Personal dashboard with disease trends</span>
                </div>
              </div>
            </motion.div>

            {/* Final CTA within flow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-[hsl(142_71%_38%)]/20 bg-[hsl(142_71%_98%)] p-8 sm:p-10 text-center shadow-sm"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <ShieldCheck className="h-8 w-8 text-[hsl(142_71%_38%)]" />
              </div>
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-[hsl(150_25%_12%)]">
                Ready to protect your harvest?
              </h2>
              <p className="mb-8 text-lg text-[hsl(150_10%_40%)] max-w-lg mx-auto">
                Free to start. Your scans stay private to your account.
              </p>
              <Button size="lg" className="h-14 rounded-full bg-[hsl(142_71%_38%)] text-white hover:bg-[hsl(142_71%_33%)] px-10 text-lg font-semibold shadow-lg shadow-[hsl(142_71%_38%)]/20 transition-transform hover:-translate-y-1">
                Create your free account
              </Button>
            </motion.div>

          </div>
        </section>
      </main>
    </div>
  );
}
