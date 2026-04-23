import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Leaf, ShieldCheck, Microscope, Scan as ScanIcon, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const crops = [
  { name: "Tomato",       sci: "Solanum lycopersicum", img: "/__mockup/images/leaf-tomato.jpg", scanRate: "98.2%" },
  { name: "Potato",       sci: "Solanum tuberosum",    img: "/__mockup/images/leaf-potato.jpg", scanRate: "97.5%" },
  { name: "Corn (Maize)", sci: "Zea mays",             img: "/__mockup/images/leaf-corn.jpg", scanRate: "99.1%" },
  { name: "Rice",         sci: "Oryza sativa",         img: "/__mockup/images/leaf-rice.jpg", scanRate: "96.8%" },
  { name: "Wheat",        sci: "Triticum aestivum",    img: "/__mockup/images/leaf-wheat.jpg", scanRate: "95.4%" },
  { name: "Apple",        sci: "Malus domestica",      img: "/__mockup/images/leaf-apple.jpg", scanRate: "98.7%" },
  { name: "Grape",        sci: "Vitis vinifera",       img: "/__mockup/images/leaf-grape.jpg", scanRate: "94.9%" },
  { name: "Bell Pepper",  sci: "Capsicum annuum",      img: "/__mockup/images/leaf-bellpepper.jpg", scanRate: "97.1%" },
  { name: "Soybean",      sci: "Glycine max",          img: "/__mockup/images/leaf-soybean.jpg", scanRate: "96.5%" },
  { name: "Cotton",       sci: "Gossypium hirsutum",   img: "/__mockup/images/leaf-cotton.jpg", scanRate: "98.0%" },
];

export function Precise() {
  const [hoveredCrop, setHoveredCrop] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative text-slate-900 font-sans flex flex-col font-['Inter',sans-serif]">
      {/* Background Image with strong overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/__mockup/images/hero-leaf-bg.jpg" 
          alt="Leaf background" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-slate-50/95 to-slate-100/95 backdrop-blur-[2px]"></div>
      </div>

      {/* Top Strip */}
      <div className="relative z-10 bg-emerald-950 text-emerald-50 px-6 py-2 flex items-center justify-between text-xs tracking-wide">
        <div className="flex items-center gap-2 font-mono">
          <ScanIcon className="w-3 h-3 text-emerald-400" />
          <span>SYSTEM READY // MODEL V4.2</span>
        </div>
        <div className="hidden md:flex items-center gap-6 opacity-80">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Verify it's a leaf</span>
          <span className="flex items-center gap-1.5"><Leaf className="w-3 h-3" /> Confirm species</span>
          <span className="flex items-center gap-1.5"><Microscope className="w-3 h-3" /> Diagnose health</span>
        </div>
      </div>

      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header & Stepper */}
          <div className="mb-12">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-6">New Scan</h1>
            
            {/* Precise Stepper */}
            <div className="flex flex-col gap-4 max-w-2xl bg-white/50 p-4 rounded-sm border border-slate-200/50 backdrop-blur-sm shadow-sm">
              <div className="flex items-center justify-between text-sm font-mono tracking-tight text-slate-500">
                <span className="text-emerald-700 font-medium">01 / CHOOSE CROP</span>
                <span>02 / UPLOAD LEAF</span>
                <span>03 / ANALYZE</span>
              </div>
              <div className="h-[2px] w-full bg-slate-200/80 relative">
                <div className="absolute top-0 left-0 h-full bg-emerald-600 w-1/3 transition-all duration-500 ease-in-out" />
              </div>
            </div>
            
            <p className="mt-8 text-slate-700 max-w-xl leading-relaxed">
              Select the species below to calibrate the detection model. Accurate selection improves diagnostic confidence by up to 14%.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
            {crops.map((crop, i) => (
              <motion.button
                key={crop.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredCrop(crop.name)}
                onMouseLeave={() => setHoveredCrop(null)}
                className="group relative flex items-stretch bg-white/80 backdrop-blur-md border border-slate-200/80 hover:border-emerald-500 hover:shadow-[0_4px_20px_-4px_rgba(16,185,129,0.15)] transition-all duration-300 text-left overflow-hidden h-28"
              >
                {/* Left side Image */}
                <div className="w-28 h-full shrink-0 border-r border-slate-100 overflow-hidden relative">
                  <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={crop.img} 
                    alt={`${crop.name} leaf`}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* Right side Content */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div className="w-full flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                        {crop.name}
                      </h3>
                      <p className="text-xs italic text-slate-500 font-serif leading-tight mt-0.5">
                        {crop.sci}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-slate-100/80 px-1.5 py-0.5 rounded">
                      <span>CONF</span>
                      <span className="text-slate-700 font-medium">{crop.scanRate}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-2">
                    <ArrowRight 
                      className="w-4 h-4 text-emerald-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
                    />
                  </div>
                </div>
                
                {/* Bottom subtle hairline */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Rail Context */}
        <div className="hidden lg:block w-72 shrink-0 border-l border-slate-200/80 pl-10 py-2">
          <div className="sticky top-12">
            <h4 className="text-xs font-mono font-semibold text-slate-500 tracking-widest mb-6 bg-white/60 inline-block px-2 py-1 rounded backdrop-blur-sm">ANALYSIS PROTOCOL</h4>
            
            <div className="space-y-8 relative">
              <div className="absolute left-[11px] top-4 bottom-4 w-px bg-slate-200/80" />
              
              <div className="relative flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center shrink-0 z-10 text-emerald-700 shadow-sm">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                <div className="bg-white/60 p-2 -mt-2 rounded backdrop-blur-sm">
                  <h5 className="text-sm font-semibold text-slate-900 mb-1">Verify Quality</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">Checking for blur, lighting, and leaf presence.</p>
                </div>
              </div>
              
              <div className="relative flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center shrink-0 z-10 text-slate-400 shadow-sm">
                  <Leaf className="w-3 h-3" />
                </div>
                <div className="bg-white/60 p-2 -mt-2 rounded backdrop-blur-sm">
                  <h5 className="text-sm font-semibold text-slate-900 mb-1">Confirm Species</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">Matching selected crop to visual signatures.</p>
                </div>
              </div>
              
              <div className="relative flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center shrink-0 z-10 text-slate-400 shadow-sm">
                  <Microscope className="w-3 h-3" />
                </div>
                <div className="bg-white/60 p-2 -mt-2 rounded backdrop-blur-sm">
                  <h5 className="text-sm font-semibold text-slate-900 mb-1">Diagnose Health</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">Scanning for 40+ known pathogens and deficiencies.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-4 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded text-xs text-slate-600 font-mono leading-relaxed shadow-sm">
              <span className="text-emerald-600 block mb-2 font-semibold">/// READY</span>
              Select a crop from the grid to proceed to image capture.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
