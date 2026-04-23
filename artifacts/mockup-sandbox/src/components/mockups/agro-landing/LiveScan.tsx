import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Camera, Brain, ShieldCheck, Sparkles, BarChart3, CheckCircle2, ChevronRight, Activity, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

import "./_group.css";

const MOCK_DIAGNOSIS = {
  disease: "Early Blight (Alternaria solani)",
  confidence: 94.2,
  severity: "Moderate",
  treatments: [
    "Prune affected lower leaves immediately.",
    "Apply copper-based fungicide to healthy foliage.",
    "Ensure adequate spacing for air circulation."
  ]
};

export function LiveScan() {
  const [scanState, setScanState] = useState<"idle" | "scanning" | "analyzing" | "complete">("idle");
  const [activeStep, setActiveStep] = useState(0);

  // Auto-cycle the scan demo on load
  useEffect(() => {
    const timer1 = setTimeout(() => setScanState("scanning"), 1000);
    const timer2 = setTimeout(() => setScanState("analyzing"), 3000);
    const timer3 = setTimeout(() => setScanState("complete"), 4500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Auto-cycle the "How it works" steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050B08] text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-50 overflow-x-hidden">
      
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#050B08]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-6">
          <div className="flex items-center gap-2.5 font-bold tracking-tight text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="text-lg">Agro Vision Hub</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex text-slate-300 hover:text-white hover:bg-white/5">Sign in</Button>
            <Button className="bg-emerald-600 text-white hover:bg-emerald-500 rounded-full px-6 shadow-[0_0_20px_rgba(5,150,105,0.4)] transition-all">
              Start scanning
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section: Live Demo */}
      <main className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none -z-10" />
        
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left: Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5" /> 
                  <span>Powered by Gemini Vision AI</span>
                </div>
                
                <h1 className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                  Know exactly what's wrong.<br className="hidden lg:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">In 2 seconds.</span>
                </h1>
                
                <p className="mb-8 text-xl leading-relaxed text-slate-400 font-light max-w-lg">
                  Stop guessing. Upload a leaf photo and let our vision model instantly identify the disease, its severity, and the exact steps to save your crop.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 px-8 text-base font-semibold text-white shadow-[0_0_30px_rgba(5,150,105,0.3)] transition-all hover:scale-105">
                    Start scanning free
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 rounded-full border-white/10 bg-white/5 hover:bg-white/10 px-8 text-base font-medium text-white backdrop-blur-md">
                    <Play className="mr-2 h-4 w-4" /> Watch how it works
                  </Button>
                </div>

                <div className="mt-10 flex items-center gap-6 text-sm text-slate-500 font-medium">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-[#050B08] bg-slate-800 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <p>Trusted by 10,000+ farmers globally</p>
                </div>
              </motion.div>
            </div>

            {/* Right: Live Demo Interface */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative perspective-[2000px]">
              <motion.div
                initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative rounded-3xl border border-white/10 bg-[#0A1410] shadow-[0_30px_100px_-20px_rgba(0,0,0,1)] overflow-hidden"
              >
                {/* HUD Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500/80" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                      <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 ml-2">live_diagnosis_demo.exe</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <Activity className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-500">SYSTEM ONLINE</span>
                  </div>
                </div>

                <div className="p-6 grid sm:grid-cols-2 gap-6">
                  {/* Image Viewfinder */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black ring-1 ring-white/10">
                    <img 
                      src="/__mockup/images/demo-leaf.png" 
                      alt="Demo leaf" 
                      className={`w-full h-full object-cover transition-all duration-1000 ${scanState === 'idle' ? 'scale-105 blur-sm brightness-50' : 'scale-100 blur-0 brightness-100'}`}
                    />
                    
                    {/* Scanner Line */}
                    {(scanState === "scanning" || scanState === "analyzing") && (
                      <motion.div 
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_20px_4px_rgba(52,211,153,0.8)] z-20"
                      />
                    )}

                    {/* HUD Overlays */}
                    <AnimatePresence>
                      {scanState !== "idle" && (
                        <motion.div 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="absolute inset-0 pointer-events-none z-10"
                        >
                          {/* Corner crosshairs */}
                          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-500/50" />
                          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-500/50" />
                          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-500/50" />
                          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-500/50" />
                          
                          {/* Bounding box for anomaly */}
                          {scanState === "complete" && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 1.2 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute top-1/3 left-1/4 w-32 h-32 border border-red-500/80 bg-red-500/10 rounded-lg backdrop-blur-[1px] flex items-start justify-end p-2"
                            >
                              <span className="text-[10px] font-mono text-red-400 bg-black/80 px-1 rounded">ANOMALY_DETECTED</span>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Status badge */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-full z-20">
                      {scanState === "idle" && <><Camera className="w-3.5 h-3.5 text-slate-400" /><span className="text-xs font-mono text-slate-300">AWAITING_IMAGE</span></>}
                      {scanState === "scanning" && <><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /><span className="text-xs font-mono text-emerald-400">SCANNING...</span></>}
                      {scanState === "analyzing" && <><Brain className="w-3.5 h-3.5 text-blue-400 animate-pulse" /><span className="text-xs font-mono text-blue-400">ANALYZING_PATHOLOGY</span></>}
                      {scanState === "complete" && <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span className="text-xs font-mono text-emerald-400">DIAGNOSIS_COMPLETE</span></>}
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="flex flex-col justify-center">
                    <div className="space-y-6">
                      
                      {/* Placeholder state */}
                      <AnimatePresence mode="wait">
                        {scanState !== "complete" ? (
                          <motion.div 
                            key="skeleton"
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6 opacity-40"
                          >
                            <div className="space-y-2">
                              <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                              <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
                            </div>
                            <div className="space-y-3">
                              <div className="h-2 w-full bg-white/10 rounded" />
                              <div className="h-2 w-full bg-white/10 rounded" />
                              <div className="h-2 w-3/4 bg-white/10 rounded" />
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="results"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ staggerChildren: 0.1 }}
                            className="space-y-6"
                          >
                            {/* Disease Name */}
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                              <p className="text-xs font-mono text-slate-400 mb-1 uppercase tracking-wider">Identified Disease</p>
                              <h3 className="text-2xl font-bold text-white">{MOCK_DIAGNOSIS.disease}</h3>
                            </motion.div>

                            {/* Confidence & Severity Meters */}
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/5">
                              <div>
                                <div className="flex justify-between text-xs font-mono mb-2">
                                  <span className="text-slate-400">Confidence</span>
                                  <span className="text-emerald-400">{MOCK_DIAGNOSIS.confidence}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }} animate={{ width: `${MOCK_DIAGNOSIS.confidence}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-emerald-500" 
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-xs font-mono mb-2">
                                  <span className="text-slate-400">Severity</span>
                                  <span className="text-yellow-400">{MOCK_DIAGNOSIS.severity}</span>
                                </div>
                                <div className="h-1.5 w-full bg-black rounded-full overflow-hidden flex gap-0.5">
                                  <div className="h-full flex-1 bg-yellow-500" />
                                  <div className="h-full flex-1 bg-yellow-500" />
                                  <div className="h-full flex-1 bg-white/10" />
                                </div>
                              </div>
                            </motion.div>

                            {/* Treatment Steps */}
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                              <p className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                                <ShieldCheck className="w-3.5 h-3.5" /> Recommended Action
                              </p>
                              <ul className="space-y-2.5">
                                {MOCK_DIAGNOSIS.treatments.map((step, idx) => (
                                  <motion.li 
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (idx * 0.1) }}
                                    className="flex items-start gap-2.5 text-sm"
                                  >
                                    <span className="flex shrink-0 h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] text-emerald-400 font-mono mt-0.5">
                                      {idx + 1}
                                    </span>
                                    <span className="text-slate-300 leading-snug">{step}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>

                            {/* Re-run button */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setScanState("idle")}
                                className="w-full text-xs text-slate-400 hover:text-white"
                              >
                                Try another image
                              </Button>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </main>

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-[#08100C] py-8 relative z-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">200k+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Scans Performed</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">60+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Diseases Tracked</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">94%</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Avg Confidence</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">&lt;2s</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Auto-cycling Steps */}
      <section className="py-24 relative overflow-hidden">
        {/* Decorative bg */}
        <div className="absolute -right-[20%] top-1/4 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Farm smarter, not harder.</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Three simple steps to protect your yield. No complex machinery required—just your smartphone.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Steps list */}
            <div className="space-y-4">
              {[
                { icon: Camera, title: "1. Snap a photo", desc: "Open the app, point your camera at a problematic leaf, and take a clear picture in good lighting." },
                { icon: Brain, title: "2. AI analyzes", desc: "Our Gemini-powered vision model compares your leaf against millions of known pathology samples." },
                { icon: ShieldCheck, title: "3. Take action", desc: "Get a plain-English treatment plan. Log the disease in your dashboard to track farm health over time." }
              ].map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div 
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/10 border-white/20 shadow-lg' 
                        : 'bg-transparent border-transparent hover:bg-white/5'
                    } border`}
                  >
                    <div className="flex items-start gap-5">
                      <div className={`mt-1 shrink-0 h-12 w-12 rounded-full flex items-center justify-center transition-colors ${
                        isActive ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-white/5 text-slate-400'
                      }`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className={`text-xl font-semibold mb-2 transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {step.title}
                        </h3>
                        <p className={`text-base transition-colors ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Visuals for steps */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden bg-[#0A1410] border border-white/10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
                >
                  {activeStep === 0 && (
                    <>
                      <div className="w-48 h-48 rounded-2xl border-2 border-dashed border-emerald-500/30 flex items-center justify-center mb-8 bg-emerald-500/5">
                        <Camera className="h-16 w-16 text-emerald-400/50" />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">Upload any leaf image</h4>
                      <p className="text-slate-400">Works with corn, wheat, tomatoes, potatoes, and 20+ other crops.</p>
                    </>
                  )}
                  {activeStep === 1 && (
                    <>
                       <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                         <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" style={{ animationDuration: '3s' }} />
                         <div className="absolute inset-4 rounded-full border-4 border-blue-500/20 border-b-blue-500 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
                         <Brain className="h-16 w-16 text-white animate-pulse" />
                       </div>
                       <h4 className="text-2xl font-bold text-white mb-2">Multi-model consensus</h4>
                       <p className="text-slate-400">Cross-referencing symptoms to prevent misdiagnosis.</p>
                    </>
                  )}
                  {activeStep === 2 && (
                    <>
                       <div className="w-full max-w-sm bg-white/5 rounded-xl p-6 border border-white/10 mb-8 text-left">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                              <ShieldCheck className="h-5 w-5 text-emerald-400" />
                            </div>
                            <div>
                              <div className="text-sm text-slate-400 font-mono">STEP 1</div>
                              <div className="text-white font-medium">Apply Copper Fungicide</div>
                            </div>
                          </div>
                          <div className="h-2 w-full bg-white/10 rounded mb-2" />
                          <div className="h-2 w-3/4 bg-white/10 rounded" />
                       </div>
                       <h4 className="text-2xl font-bold text-white mb-2">Clear next steps</h4>
                       <p className="text-slate-400">Save your crop before it spreads to the rest of the field.</p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className="border-t border-white/10 bg-[#020504] pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-30" />
        
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <Leaf className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Stop disease before it spreads.</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Join thousands of farmers using Agro Vision Hub to protect their livelihood.</p>
          
          <Button size="lg" className="h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 px-10 text-lg font-semibold text-white shadow-[0_0_30px_rgba(5,150,105,0.3)]">
            Create your free account <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4" /> Agro Vision Hub &copy; {new Date().getFullYear()}
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
