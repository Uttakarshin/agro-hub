import "./_group.css";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf, Camera, Brain, ShieldCheck, Sparkles, BarChart3, ArrowRight, Shield } from "lucide-react";

export function Bento() {
  return (
    <div className="min-h-screen bg-[hsl(60_30%_98%)] text-[hsl(150_25%_12%)] font-sans pb-16 overflow-x-hidden">
      {/* Compact Navbar */}
      <header className="sticky top-0 z-50 bg-[hsl(60_30%_98%)]/80 backdrop-blur-xl border-b border-[hsl(140_15%_88%)]">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between h-14 px-6">
          <div className="flex items-center gap-2">
            <div className="bg-[hsl(142_71%_38%)] p-1.5 rounded-lg text-white shadow-sm">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[hsl(150_25%_12%)]">Agro Vision Hub</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-[hsl(150_25%_12%)] hover:bg-[hsl(140_15%_92%)]">
              Sign in
            </Button>
            <Button size="sm" className="bg-[hsl(142_71%_38%)] text-white hover:bg-[hsl(142_71%_34%)] shadow-md">
              Get started
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 flex flex-col gap-6">
        
        {/* TOP BENTO COMPOSITION */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[minmax(0,auto)]">
          
          {/* Hero Card: 7 cols × 2 rows */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 row-span-2 relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 shadow-xl min-h-[480px] flex flex-col justify-between group"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src="/__mockup/images/hero-fields.jpg" 
                alt="Farm field" 
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(150_40%_10%)]/95 via-[hsl(142_71%_20%)]/80 to-[hsl(142_71%_20%)]/30"></div>
            </div>
            
            <div className="relative z-10 flex justify-start mb-12 md:mb-0">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-white border border-white/20 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-green-300" /> Powered by Gemini Vision
              </span>
            </div>

            <div className="relative z-10 text-white flex flex-col items-start mt-auto max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.05] mb-5">
                Spot crop disease in seconds — straight from a leaf photo.
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                Snap a leaf. Get an instant AI diagnosis with severity, treatment, and prevention. Built for real farms, not labs.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="h-14 px-8 text-base bg-white text-[hsl(142_71%_25%)] hover:bg-white/90 rounded-2xl shadow-lg font-semibold">
                  Start scanning free
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base border-white/30 text-white hover:bg-white/10 rounded-2xl bg-black/20 backdrop-blur-sm">
                  How it works
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Hero Image Card: 5 cols × 2 rows */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="md:col-span-5 row-span-2 relative rounded-[2.5rem] overflow-hidden shadow-lg min-h-[350px] md:min-h-0 group"
          >
            <img 
              src="/__mockup/images/hero-leaf.jpg" 
              alt="Leaf close up" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
            />
            {/* Soft inner shadow/gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(150_40%_10%)]/70 via-transparent to-transparent"></div>
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2.5rem]"></div>
            
            {/* Absolute badge overlapping slightly via transform */}
            <div className="absolute bottom-6 md:-left-4 left-4 right-4 md:right-6 bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/60 flex items-center gap-5 transform md:-rotate-2 transition-transform hover:rotate-0">
              <div className="w-14 h-14 rounded-2xl bg-[hsl(80_60%_92%)] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7 text-[hsl(142_71%_38%)]" />
              </div>
              <div>
                <p className="font-bold text-[hsl(150_25%_12%)] leading-tight text-lg mb-0.5">High Confidence Match</p>
                <p className="text-sm font-medium text-[hsl(150_10%_40%)]">Early Blight detected (98%)</p>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards: 3 cards, each 4 cols × 1 row */}
          {/* Feature 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="md:col-span-4 bg-white rounded-[2.5rem] p-8 shadow-sm border border-[hsl(140_15%_88%)] relative overflow-hidden flex flex-col justify-between min-h-[260px] group hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 rounded-2xl bg-[hsl(80_60%_92%)] flex items-center justify-center mb-6 text-[hsl(142_71%_38%)] transition-transform group-hover:scale-110">
              <Camera className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Snap a leaf</h3>
              <p className="text-[hsl(150_10%_40%)] leading-relaxed text-base">
                Use your phone camera or upload an image. We even reject anything that isn't a real crop leaf.
              </p>
            </div>
          </motion.div>

          {/* Feature 2 (Accent colored) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="md:col-span-4 leaf-gradient-soft rounded-[2.5rem] p-8 shadow-sm border border-white/60 relative overflow-hidden flex flex-col justify-between min-h-[260px] group hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 text-[hsl(142_71%_38%)] shadow-sm transition-transform group-hover:scale-110">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-[hsl(150_25%_12%)]">AI diagnoses</h3>
              <p className="text-[hsl(150_25%_18%)] leading-relaxed text-base">
                A vision model trained on plant pathology identifies the disease, severity, and confidence level.
              </p>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="md:col-span-4 bg-[hsl(140_15%_95%)] rounded-[2.5rem] p-8 shadow-sm border border-transparent relative overflow-hidden flex flex-col justify-between min-h-[260px] group hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 text-[hsl(142_71%_38%)] shadow-sm transition-transform group-hover:scale-110">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Get a plan</h3>
              <p className="text-[hsl(150_10%_40%)] leading-relaxed text-base">
                Actionable treatment and prevention steps in plain language — no jargon.
              </p>
            </div>
          </motion.div>

        </section>

        {/* BOTTOM BENTO COMPOSITION */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto mt-4 md:mt-8">
          
          {/* Main "Built around farming" Block: 8 cols */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="md:col-span-8 bg-[hsl(150_25%_12%)] text-white rounded-[3rem] p-10 md:p-14 relative overflow-hidden flex flex-col justify-between min-h-[460px] shadow-xl"
          >
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsl(142_71%_38%)]/30 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10 flex-1 flex flex-col max-w-xl">
              <div className="bg-white/10 w-16 h-16 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10 shadow-sm">
                <Leaf className="w-8 h-8 text-[hsl(80_60%_92%)]" />
              </div>
              <h2 className="text-4xl md:text-[3.25rem] font-bold tracking-tight mb-6 leading-[1.05] text-white">
                Built around the way you actually farm.
              </h2>
              <p className="text-xl text-white/70 leading-relaxed mb-10 max-w-lg font-medium">
                Track every scan, watch your weekly health score, and get AI-curated tips for your crops. Switch languages, units, and themes to fit how you work.
              </p>
            </div>
            
            <div className="relative z-10 flex items-center gap-4 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 w-fit mt-auto shadow-lg">
              <div className="p-2.5 bg-[hsl(80_60%_92%)] rounded-xl text-[hsl(142_71%_38%)]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="font-semibold text-base text-white/90">Personal dashboard with disease trends</span>
            </div>
          </motion.div>

          {/* Right Column Stack: 4 cols */}
          <div className="md:col-span-4 flex flex-col gap-4 md:gap-6">
            
            {/* Farmer Image Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="flex-[1.5] relative rounded-[3rem] overflow-hidden shadow-md min-h-[240px] group"
            >
              <img 
                src="/__mockup/images/about-farmer.jpg" 
                alt="Farmer in field" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(150_25%_12%)]/60 via-transparent to-transparent"></div>
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[3rem]"></div>
              
              {/* Nested Stat Badge */}
              <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-white/50 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[hsl(142_71%_38%)] animate-pulse"></div>
                 <span className="text-sm font-bold text-[hsl(150_25%_12%)]">Live Sync</span>
              </div>
            </motion.div>

            {/* Stats Row */}
            <div className="flex gap-4 md:gap-6 flex-1 min-h-[140px]">
              {/* Stat Mini Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="flex-1 bg-white rounded-[2.5rem] p-6 shadow-sm border border-[hsl(140_15%_88%)] flex flex-col items-center justify-center text-center relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-[hsl(140_15%_95%)] rounded-full opacity-50"></div>
                <p className="text-[2.5rem] font-black text-[hsl(142_71%_38%)] mb-1 leading-none">10k+</p>
                <p className="text-xs font-bold text-[hsl(150_10%_40%)] uppercase tracking-widest mt-2">Scans</p>
              </motion.div>

              {/* Stat Mini Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="flex-1 leaf-gradient rounded-[2.5rem] p-6 shadow-md flex flex-col items-center justify-center text-center text-white relative overflow-hidden"
              >
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <p className="text-[2.5rem] font-black mb-1 leading-none text-white">32</p>
                <p className="text-xs font-bold text-white/80 uppercase tracking-widest mt-2">Diseases</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FINAL CTA COMPOSITION */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-8 leaf-gradient rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 border border-[hsl(142_71%_45%)]"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[hsl(150_40%_10%)]/20 blur-[80px] rounded-full translate-y-1/3 -translate-x-1/4"></div>
          
          <div className="relative z-10 text-center md:text-left flex-1 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
              Ready to protect your harvest?
            </h2>
            <p className="text-xl text-white/90 font-medium">
              Free to start. Your scans stay private to your account.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <Button size="lg" className="h-16 px-10 text-lg bg-white text-[hsl(142_71%_30%)] hover:bg-white/90 hover:scale-105 transition-transform rounded-2xl shadow-xl w-full md:w-auto font-bold">
              Create your free account
            </Button>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
