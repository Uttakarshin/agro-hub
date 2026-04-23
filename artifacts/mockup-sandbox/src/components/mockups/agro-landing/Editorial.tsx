import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf, Camera, Brain, ShieldCheck, Sparkles, BarChart3 } from "lucide-react";
import "./_group.css";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export function Editorial() {
  return (
    <div className="min-h-screen bg-[hsl(60_30%_98%)] text-[hsl(150_25%_12%)] font-sans antialiased overflow-x-hidden selection:bg-[hsl(142_71%_38%)] selection:text-white">
      {/* Navbar - Transparent/Floating */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Leaf className="w-7 h-7 text-[hsl(142_71%_45%)]" />
          <span className="text-xl font-bold tracking-tight">Agro Vision Hub</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 text-base">Sign in</Button>
          <Button className="bg-[hsl(142_71%_38%)] text-white hover:bg-[hsl(142_71%_32%)] text-base rounded-full px-6">Get started</Button>
        </div>
      </header>

      {/* Hero Band */}
      <section className="relative w-full min-h-[90vh] flex items-end pb-24 md:pb-32 px-6 md:px-12">
        <div className="absolute inset-0 -z-10">
          <img 
            src="/__mockup/images/hero-fields.jpg" 
            alt="Farm fields" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
        </div>

        <motion.div 
          className="relative z-10 max-w-5xl text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8">
            <Sparkles className="w-4 h-4 text-[hsl(142_71%_60%)]" />
            <span className="text-sm font-medium tracking-wide uppercase">Powered by Gemini Vision</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-8">
            Spot crop disease in seconds — <br className="hidden md:block"/>
            <span className="text-[hsl(142_71%_60%)]">straight from a leaf photo.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-12 leading-relaxed font-light">
            Snap a leaf. Get an instant AI diagnosis with severity, treatment, and prevention. Built for real farms, not labs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-[hsl(142_71%_38%)] text-white hover:bg-[hsl(142_71%_32%)] text-lg h-14 px-8 rounded-full">
              Start scanning free
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10 text-lg h-14 px-8 rounded-full">
              How it works
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Editorial Features Band */}
      <section className="w-full">
        {/* Feature 01 */}
        <div className="w-full min-h-[70vh] grid md:grid-cols-2 border-b border-[hsl(140_15%_88%)]">
          <div className="p-12 md:p-24 flex flex-col justify-center border-r border-[hsl(140_15%_88%)] bg-white">
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-6 mb-12">
                <span className="text-7xl md:text-8xl font-black text-[hsl(140_15%_92%)] tracking-tighter">01</span>
                <div className="w-16 h-16 rounded-full bg-[hsl(142_71%_92%)] flex items-center justify-center">
                  <Camera className="w-8 h-8 text-[hsl(142_71%_38%)]" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Snap a leaf</h2>
              <p className="text-xl md:text-2xl text-[hsl(150_10%_40%)] leading-relaxed font-light max-w-lg">
                Use your phone camera or upload an image. We even reject anything that isn't a real crop leaf.
              </p>
            </motion.div>
          </div>
          <div className="hidden md:block bg-[hsl(140_15%_95%)] relative overflow-hidden">
             {/* Abstract/Editorial crop for image */}
             <img src="/__mockup/images/hero-leaf.jpg" alt="" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
          </div>
        </div>

        {/* Feature 02 */}
        <div className="w-full min-h-[70vh] grid md:grid-cols-2 border-b border-[hsl(140_15%_88%)]">
          <div className="hidden md:block bg-[hsl(142_71%_92%)] relative overflow-hidden order-2 md:order-1">
             <div className="absolute inset-0 bg-gradient-to-br from-[hsl(142_71%_38%)] to-[hsl(142_71%_20%)] opacity-10" />
          </div>
          <div className="p-12 md:p-24 flex flex-col justify-center bg-[hsl(60_30%_98%)] order-1 md:order-2">
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-6 mb-12">
                <span className="text-7xl md:text-8xl font-black text-[hsl(140_15%_88%)] tracking-tighter">02</span>
                <div className="w-16 h-16 rounded-full bg-[hsl(142_71%_15%)] flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">AI diagnoses</h2>
              <p className="text-xl md:text-2xl text-[hsl(150_10%_40%)] leading-relaxed font-light max-w-lg">
                A vision model trained on plant pathology identifies the disease, severity, and confidence level.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Feature 03 */}
        <div className="w-full min-h-[70vh] grid md:grid-cols-2">
          <div className="p-12 md:p-24 flex flex-col justify-center border-r border-[hsl(140_15%_88%)] bg-white">
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-6 mb-12">
                <span className="text-7xl md:text-8xl font-black text-[hsl(140_15%_92%)] tracking-tighter">03</span>
                <div className="w-16 h-16 rounded-full bg-[hsl(142_71%_92%)] flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-[hsl(142_71%_38%)]" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Get a plan</h2>
              <p className="text-xl md:text-2xl text-[hsl(150_10%_40%)] leading-relaxed font-light max-w-lg">
                Actionable treatment and prevention steps in plain language — no jargon.
              </p>
            </motion.div>
          </div>
          <div className="hidden md:block bg-[hsl(150_25%_12%)] relative overflow-hidden">
             <img src="/__mockup/images/about-farmer.jpg" alt="" className="w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale" />
          </div>
        </div>
      </section>

      {/* "Built around" Band */}
      <section className="w-full bg-[hsl(80_60%_92%)] text-[hsl(150_25%_12%)]">
        <div className="grid md:grid-cols-12 max-w-[1600px] mx-auto min-h-[80vh]">
          <div className="md:col-span-5 p-8 md:p-0">
            <img 
              src="/__mockup/images/dashboard-bg.jpg" 
              alt="Dashboard abstract" 
              className="w-full h-full object-cover object-center md:h-[100%] rounded-3xl md:rounded-none shadow-2xl md:shadow-none"
            />
          </div>
          <div className="md:col-span-7 flex items-center p-12 md:p-24 lg:p-32">
            <motion.div {...fadeUp} className="max-w-2xl">
              <Leaf className="w-12 h-12 text-[hsl(142_71%_38%)] mb-10" />
              <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-medium leading-tight mb-8">
                Built around the way you actually farm.
              </h2>
              <p className="text-xl md:text-2xl text-[hsl(150_25%_25%)] mb-12 font-light leading-relaxed">
                Track every scan, watch your weekly health score, and get AI-curated tips for your crops. Switch languages, units, and themes to fit how you work.
              </p>
              
              <div className="flex items-center gap-5 pt-8 border-t border-[hsl(150_25%_12%)]/10">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <BarChart3 className="w-5 h-5 text-[hsl(142_71%_38%)]" />
                </div>
                <span className="text-lg font-medium tracking-tight">Personal dashboard with disease trends</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="w-full min-h-[70vh] bg-[hsl(150_25%_12%)] text-white flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/__mockup/images/hero-fields.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(150_25%_8%)] to-transparent" />
        
        <motion.div 
          className="relative z-10 max-w-4xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Ready to protect your harvest?
          </h2>
          <p className="text-xl md:text-2xl text-white/70 font-light mb-16 max-w-2xl mx-auto">
            Free to start. Your scans stay private to your account.
          </p>
          <Button size="lg" className="bg-white text-[hsl(150_25%_12%)] hover:bg-[hsl(60_30%_98%)] text-xl h-16 px-12 rounded-full">
            Create your free account
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
