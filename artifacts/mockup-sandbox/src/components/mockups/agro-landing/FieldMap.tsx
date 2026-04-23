import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ScanLine, 
  Map, 
  Leaf, 
  Crosshair, 
  Activity, 
  ShieldAlert, 
  ArrowUpRight, 
  Layers, 
  Droplet,
  Thermometer,
  Wind,
  Camera,
  Brain,
  ShieldCheck
} from "lucide-react";
import "./_fieldmap.css";

const hotspots = [
  {
    id: 1,
    x: 25,
    y: 35,
    plot: "Sector 7A",
    crop: "Tomatoes",
    disease: "Early Blight",
    confidence: "94%",
    status: "critical",
    treatment: "Apply copper-based fungicide",
    temp: "24°C",
    humidity: "68%"
  },
  {
    id: 2,
    x: 65,
    y: 20,
    plot: "Sector 2B",
    crop: "Wheat",
    disease: "Leaf Rust",
    confidence: "88%",
    status: "warning",
    treatment: "Isolate affected area, monitor",
    temp: "22°C",
    humidity: "55%"
  },
  {
    id: 3,
    x: 75,
    y: 65,
    plot: "Sector 9C",
    crop: "Corn",
    disease: "Healthy",
    confidence: "99%",
    status: "healthy",
    treatment: "Continue standard care",
    temp: "26°C",
    humidity: "60%"
  },
  {
    id: 4,
    x: 35,
    y: 75,
    plot: "Sector 4D",
    crop: "Soybeans",
    disease: "Downy Mildew",
    confidence: "91%",
    status: "warning",
    treatment: "Improve drainage, trim lower leaves",
    temp: "25°C",
    humidity: "72%"
  }
];

export function FieldMap() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(1);
  const [isScanning, setIsScanning] = useState(true);

  // Auto-cycle through hotspots
  useEffect(() => {
    if (!isScanning) return;
    
    const interval = setInterval(() => {
      setActiveHotspot((prev) => {
        const next = (prev === null ? 0 : prev) + 1;
        return next >= hotspots.length ? 1 : next;
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isScanning]);

  const activeData = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  return (
    <div className="fieldmap-container relative min-h-screen w-full overflow-x-hidden flex flex-col selection:bg-[hsl(var(--accent-signal))]/30 selection:text-[hsl(var(--accent-signal))]">
      
      {/* Hero Section - Full Screen Map */}
      <section className="relative w-full h-[100vh] flex flex-col md:flex-row overflow-hidden border-b border-[hsl(var(--border-color))]">
        {/* Background Map Layer */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none md:left-[480px]">
          <div className="absolute inset-0 bg-[hsl(20_10%_8%)]/80 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 map-grid-overlay z-10 opacity-30" />
          <img 
            src="/__mockup/images/topographic-farm-map.png" 
            alt="Topographic Farm Map" 
            className="w-full h-full object-cover object-center opacity-40 grayscale"
          />
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(20_10%_8%)] via-transparent to-[hsl(20_10%_8%)]/50 z-20" />
        </div>

        {/* Main Marketing Sidebar (Left) */}
        <div className="relative z-30 w-full md:w-[480px] h-full border-r border-[hsl(var(--border-color))] bg-[hsl(20_10%_8%)]/95 backdrop-blur-md flex flex-col">
          
          <header className="p-8 border-b border-[hsl(var(--border-color))] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[hsl(var(--accent-signal))] bg-[hsl(var(--accent-signal))]/10 flex items-center justify-center rounded">
                <Crosshair className="w-5 h-5 text-[hsl(var(--accent-signal))]" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[hsl(var(--text-muted))]">Agro System</div>
                <div className="font-serif font-semibold text-lg text-[hsl(var(--text-main))]">Vision Hub</div>
              </div>
            </div>
            <div className="flex gap-4 text-xs font-mono">
              <a href="/sign-in" className="text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-main))] transition-colors uppercase tracking-wider">Sign In</a>
            </div>
          </header>

          <div className="flex-1 p-8 flex flex-col justify-center overflow-y-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[hsl(var(--accent-signal))]/30 bg-[hsl(var(--accent-signal))]/5 text-[hsl(var(--accent-signal))] text-[11px] font-mono uppercase tracking-widest w-fit mb-8 rounded">
              <Activity className="w-3.5 h-3.5" />
              Powered by Gemini Vision
            </div>

            <h1 className="font-serif text-5xl md:text-6xl font-medium leading-[1.1] mb-6 text-[hsl(var(--text-main))] tracking-tight">
              Precision crop <br/>diagnosis at <br/>scale.
            </h1>
            
            <p className="font-mono text-[13px] leading-relaxed text-[hsl(var(--text-muted))] mb-10 max-w-[340px]">
              Deploy an intelligent overlay across your entire operation. Upload a leaf photo from any sector and receive instant AI analysis of disease pathology, severity, and treatment protocols in &lt;2.0s.
            </p>

            <div className="space-y-4 mb-12">
              <div className="flex items-start gap-4">
                <div className="mt-1"><ScanLine className="w-4 h-4 text-[hsl(var(--accent-signal))]" /></div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-[hsl(var(--text-main))] mb-1">Instant Scan</div>
                  <div className="font-mono text-[11px] text-[hsl(var(--text-muted))]">Computer vision pathology detection</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1"><Layers className="w-4 h-4 text-[hsl(var(--accent-signal))]" /></div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-[hsl(var(--text-main))] mb-1">Severity Mapping</div>
                  <div className="font-mono text-[11px] text-[hsl(var(--text-muted))]">Confidence scoring & risk profiling</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button asChild className="w-full bg-[hsl(var(--accent-signal))] text-[hsl(20_10%_8%)] hover:bg-[hsl(var(--accent-signal))]/80 rounded-none h-14 font-mono uppercase tracking-wider text-xs flex items-center justify-between px-6 group cursor-pointer">
                <a href="/sign-up">
                  <span>Initialize Scanner</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" className="w-full border-[hsl(var(--border-color))] text-[hsl(var(--text-main))] hover:bg-[hsl(var(--text-main))]/10 hover:text-white rounded-none h-14 font-mono uppercase tracking-wider text-xs">
                <a href="#how-it-works">View System Specs</a>
              </Button>
            </div>
          </div>
          
          <footer className="p-6 border-t border-[hsl(var(--border-color))] font-mono text-[10px] text-[hsl(var(--text-muted))] flex justify-between uppercase tracking-widest">
            <span>Sys: Online</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-signal))] animate-pulse" /> Monitoring</span>
          </footer>
        </div>

        {/* Map Interactive Area (Right) */}
        <div className="relative z-20 flex-1 h-[50vh] md:h-full p-8 hidden md:block">
          {/* Telemetry Header */}
          <div className="absolute top-8 right-8 flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--text-muted))] border border-[hsl(var(--border-color))] bg-[hsl(20_10%_8%)]/80 backdrop-blur px-4 py-2">
            <div className="flex items-center gap-2">
              <Thermometer className="w-3.5 h-3.5" /> 24.2°C
            </div>
            <div className="w-px h-3 bg-[hsl(var(--border-color))]" />
            <div className="flex items-center gap-2">
              <Droplet className="w-3.5 h-3.5" /> 68% RH
            </div>
            <div className="w-px h-3 bg-[hsl(var(--border-color))]" />
            <div className="flex items-center gap-2">
              <Wind className="w-3.5 h-3.5" /> 12 km/h NE
            </div>
          </div>

          {/* Hotspots */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {hotspots.map((hotspot) => (
              <div 
                key={hotspot.id}
                className="absolute pointer-events-auto"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                onMouseEnter={() => {
                  setIsScanning(false);
                  setActiveHotspot(hotspot.id);
                }}
                onMouseLeave={() => setIsScanning(true)}
              >
                {/* Ping Marker */}
                <div className="relative -translate-x-1/2 -translate-y-1/2 cursor-crosshair group">
                  <div className={`w-3 h-3 rounded-full transition-all duration-500 ${activeHotspot === hotspot.id ? 'bg-[hsl(var(--accent-signal))] signal-dot scale-125' : 'bg-[hsl(var(--accent-signal))]/40 border border-[hsl(var(--accent-signal))]'}`} />
                  {activeHotspot !== hotspot.id && (
                    <div className="absolute inset-0 rounded-full border border-[hsl(var(--accent-signal))] animate-ping opacity-20" />
                  )}
                  
                  {/* ID Label */}
                  <div className="absolute top-4 left-4 font-mono text-[9px] text-[hsl(var(--text-muted))] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    [{hotspot.id}] {hotspot.plot}
                  </div>
                </div>

                {/* Data Card (Active only) */}
                <AnimatePresence>
                  {activeHotspot === hotspot.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      className="absolute top-6 left-6 w-[280px] bg-[hsl(20_10%_8%)]/95 backdrop-blur-xl border border-[hsl(var(--border-color))] shadow-2xl overflow-hidden pointer-events-auto"
                    >
                      {/* Card Header */}
                      <div className="border-b border-[hsl(var(--border-color))] p-3 flex justify-between items-start bg-[hsl(var(--text-main))]/5">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--text-muted))] mb-1 flex items-center gap-1.5">
                            <Map className="w-3 h-3" /> {hotspot.plot}
                          </div>
                          <div className="font-serif font-medium text-lg text-[hsl(var(--text-main))] leading-none">
                            {hotspot.crop}
                          </div>
                        </div>
                        <div className={`px-2 py-1 font-mono text-[10px] uppercase tracking-widest border ${
                          hotspot.status === 'critical' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                          hotspot.status === 'warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                          'bg-[hsl(var(--accent-signal))]/10 text-[hsl(var(--accent-signal))] border-[hsl(var(--accent-signal))]/30'
                        }`}>
                          {hotspot.confidence} Match
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 space-y-4">
                        <div>
                          <div className="font-mono text-[9px] uppercase tracking-widest text-[hsl(var(--text-muted))] mb-1.5">Detected Pathology</div>
                          <div className={`font-mono text-sm font-semibold flex items-center gap-2 ${
                            hotspot.status === 'healthy' ? 'text-[hsl(var(--accent-signal))]' : 'text-white'
                          }`}>
                            {hotspot.status !== 'healthy' && <ShieldAlert className="w-4 h-4 text-amber-400" />}
                            {hotspot.disease}
                          </div>
                        </div>

                        <div className="h-px w-full bg-[hsl(var(--border-color))]" />

                        <div>
                          <div className="font-mono text-[9px] uppercase tracking-widest text-[hsl(var(--text-muted))] mb-1.5">Recommended Protocol</div>
                          <div className="font-mono text-[11px] text-[hsl(var(--text-main))] leading-snug">
                            {hotspot.treatment}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer / Graph mock */}
                      <div className="h-8 w-full border-t border-[hsl(var(--border-color))] flex items-end px-2 opacity-50">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 mx-[1px] ${hotspot.status === 'critical' ? 'bg-red-500' : hotspot.status === 'warning' ? 'bg-amber-500' : 'bg-[hsl(var(--accent-signal))]'}`} 
                            style={{ height: `${20 + Math.random() * 80}%` }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
          {/* Bottom Status Bar */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
            <div className="font-mono text-[10px] text-[hsl(var(--text-muted))] uppercase tracking-widest space-y-1">
              <div>Lat: 40.7128° N</div>
              <div>Lng: 74.0060° W</div>
              <div>Elv: 124m</div>
            </div>
            
            {/* Active target reticle indicator */}
            <div className="flex flex-col items-end gap-2">
              <div className="w-16 h-16 border border-[hsl(var(--accent-signal))]/40 relative">
                <div className="absolute top-1/2 left-0 w-full h-px bg-[hsl(var(--accent-signal))]/20" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-[hsl(var(--accent-signal))]/20" />
                <div className="absolute inset-2 border border-[hsl(var(--accent-signal))]/20 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[hsl(var(--accent-signal))]" />
              </div>
              <div className="font-mono text-[9px] text-[hsl(var(--accent-signal))] uppercase tracking-widest">
                Lock Acquired
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative w-full py-32 px-6 md:px-12 bg-[hsl(20_10%_8%)] border-b border-[hsl(var(--border-color))]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16 border-b border-[hsl(var(--border-color))] pb-6">
            <div className="font-mono text-sm uppercase tracking-widest text-[hsl(var(--accent-signal))]">[01]</div>
            <h2 className="font-serif text-3xl text-[hsl(var(--text-main))]">System Protocols</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[hsl(var(--border-color))] to-transparent ml-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Camera, 
                step: "01",
                title: "Data Acquisition", 
                body: "Upload raw image data of affected foliage. System validates image quality and rejects non-botanical inputs automatically." 
              },
              { 
                icon: Brain, 
                step: "02",
                title: "Pathology Analysis", 
                body: "Gemini Vision neural network processes the image, identifying the exact disease strain, computing severity, and generating a confidence matrix." 
              },
              { 
                icon: ShieldCheck, 
                step: "03",
                title: "Treatment Protocol", 
                body: "System outputs actionable, plain-language mitigation and prevention strategies tailored to the specific crop and pathology." 
              },
            ].map((feature) => (
              <div key={feature.step} className="p-8 border border-[hsl(var(--border-color))] bg-[hsl(20_10%_8%)]/50 relative group hover:bg-[hsl(var(--border-color))]/20 transition-colors">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[hsl(var(--accent-signal))] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[hsl(var(--accent-signal))] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[hsl(var(--accent-signal))] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[hsl(var(--accent-signal))] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex justify-between items-start mb-12">
                  <div className="w-12 h-12 border border-[hsl(var(--accent-signal))]/30 flex items-center justify-center bg-[hsl(var(--accent-signal))]/5 text-[hsl(var(--accent-signal))]">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="font-mono text-4xl text-[hsl(var(--border-color))] font-light tracking-tighter">
                    {feature.step}
                  </div>
                </div>
                
                <h3 className="font-serif text-xl mb-4 text-[hsl(var(--text-main))]">{feature.title}</h3>
                <p className="font-mono text-[11px] leading-relaxed text-[hsl(var(--text-muted))]">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="relative w-full py-32 px-6 md:px-12 bg-[hsl(20_10%_8%)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-mono text-sm uppercase tracking-widest text-[hsl(var(--accent-signal))] mb-6">[02] Architecture</div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight mb-8 text-[hsl(var(--text-main))]">
              Built for the <br/>field environment.
            </h2>
            <p className="font-mono text-sm leading-relaxed text-[hsl(var(--text-muted))] mb-10 max-w-md">
              Track historical scan data, monitor weekly health indices across sectors, and review AI-curated longitudinal trends. Engineered with customizable locales, metric/imperial unit toggles, and high-contrast themes for outdoor visibility.
            </p>
            
            <div className="space-y-6 pt-8 border-t border-[hsl(var(--border-color))]">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center border border-[hsl(var(--border-color))] text-[hsl(var(--text-main))]">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-[hsl(var(--text-main))]">Longitudinal Analytics</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center border border-[hsl(var(--border-color))] text-[hsl(var(--text-main))]">
                  <Leaf className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-[hsl(var(--text-main))]">150+ Crop Pathologies</span>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-square border border-[hsl(var(--border-color))] p-4 bg-[hsl(20_10%_8%)]/50">
            <div className="w-full h-full border border-[hsl(var(--border-color))]/50 relative overflow-hidden bg-black flex items-center justify-center">
               <div className="absolute inset-0 map-grid-overlay opacity-20" />
               <div className="absolute w-[200%] h-px bg-[hsl(var(--accent-signal))]/20 rotate-45" />
               <div className="absolute w-[200%] h-px bg-[hsl(var(--accent-signal))]/20 -rotate-45" />
               
               <div className="relative z-10 w-48 h-48 border border-[hsl(var(--accent-signal))]/30 rounded-full flex items-center justify-center bg-[hsl(var(--accent-signal))]/5 backdrop-blur-sm">
                 <div className="w-32 h-32 border border-[hsl(var(--accent-signal))]/50 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--accent-signal))] absolute -top-1" />
                 </div>
                 <div className="absolute font-mono text-[10px] text-[hsl(var(--accent-signal))] uppercase tracking-widest text-center">
                   System<br/>Ready
                 </div>
               </div>
            </div>
            
            {/* Corner decorators */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[hsl(var(--text-muted))]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[hsl(var(--text-muted))]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[hsl(var(--text-muted))]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[hsl(var(--text-muted))]" />
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="relative w-full py-24 border-t border-[hsl(var(--border-color))] bg-[#0d0a08] flex flex-col items-center justify-center text-center px-6">
        <div className="font-mono text-xs uppercase tracking-widest text-[hsl(var(--accent-signal))] mb-6">End of Transmission</div>
        <h2 className="font-serif text-4xl md:text-5xl text-[hsl(var(--text-main))] mb-6">Deploy Agro Vision Hub</h2>
        <p className="font-mono text-sm text-[hsl(var(--text-muted))] mb-10 max-w-md">
          Basic telemetry access is open. Secure your account to begin logging pathology data immediately.
        </p>
        <Button asChild className="bg-[hsl(var(--accent-signal))] text-[hsl(20_10%_8%)] hover:bg-[hsl(var(--accent-signal))]/80 rounded-none h-14 font-mono uppercase tracking-wider text-xs px-12">
          <a href="/sign-up">Initialize Account</a>
        </Button>
      </section>

    </div>
  );
}
