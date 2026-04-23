import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Leaf, ShieldCheck, Microscope, Scan as ScanIcon, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const crops = [
  { name: "Tomato", sci: "Solanum lycopersicum", emoji: "🍅", scanRate: "98.2%" },
  { name: "Potato", sci: "Solanum tuberosum", emoji: "🥔", scanRate: "97.5%" },
  { name: "Corn (Maize)", sci: "Zea mays", emoji: "🌽", scanRate: "99.1%" },
  { name: "Rice", sci: "Oryza sativa", emoji: "🌾", scanRate: "96.8%" },
  { name: "Wheat", sci: "Triticum aestivum", emoji: "🌾", scanRate: "95.4%" },
  { name: "Apple", sci: "Malus domestica", emoji: "🍎", scanRate: "98.7%" },
  { name: "Grape", sci: "Vitis vinifera", emoji: "🍇", scanRate: "94.9%" },
  { name: "Bell Pepper", sci: "Capsicum annuum", emoji: "🫑", scanRate: "97.1%" },
  { name: "Soybean", sci: "Glycine max", emoji: "🫘", scanRate: "96.5%" },
  { name: "Cotton", sci: "Gossypium hirsutum", emoji: "🌱", scanRate: "98.0%" },
];

export function Precise() {
  const [hoveredCrop, setHoveredCrop] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans flex flex-col font-['Inter',sans-serif]">
      {/* Top Strip */}
      <div className="bg-emerald-950 text-emerald-50 px-6 py-2 flex items-center justify-between text-xs tracking-wide">
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

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header & Stepper */}
          <div className="mb-12">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-6">New Scan</h1>
            
            {/* Precise Stepper */}
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="flex items-center justify-between text-sm font-mono tracking-tight text-slate-500">
                <span className="text-emerald-700 font-medium">01 / CHOOSE CROP</span>
                <span>02 / UPLOAD LEAF</span>
                <span>03 / ANALYZE</span>
              </div>
              <div className="h-[2px] w-full bg-slate-200 relative">
                <div className="absolute top-0 left-0 h-full bg-emerald-600 w-1/3 transition-all duration-500 ease-in-out" />
              </div>
            </div>
            
            <p className="mt-8 text-slate-600 max-w-xl leading-relaxed">
              Select the species below to calibrate the detection model. Accurate selection improves diagnostic confidence by up to 14%.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {crops.map((crop, i) => (
              <motion.button
                key={crop.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredCrop(crop.name)}
                onMouseLeave={() => setHoveredCrop(null)}
                className="group relative flex flex-col items-start p-5 bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-[0_4px_20px_-4px_rgba(16,185,129,0.1)] transition-all duration-300 text-left overflow-hidden"
              >
                {/* Top header of card */}
                <div className="w-full flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded bg-slate-50 border border-slate-100 text-xl group-hover:scale-110 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-300">
                    {crop.emoji}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">
                    <span>CONF</span>
                    <span className="text-slate-700 font-medium">{crop.scanRate}</span>
                  </div>
                </div>

                {/* Typography */}
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                    {crop.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm italic text-slate-500 font-serif leading-tight">
                      {crop.sci}
                    </p>
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
        <div className="hidden lg:block w-72 shrink-0 border-l border-slate-200 pl-10 py-2">
          <div className="sticky top-12">
            <h4 className="text-xs font-mono font-semibold text-slate-400 tracking-widest mb-6">ANALYSIS PROTOCOL</h4>
            
            <div className="space-y-8 relative">
              <div className="absolute left-[11px] top-4 bottom-4 w-px bg-slate-200" />
              
              <div className="relative flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center shrink-0 z-10 text-emerald-700">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-slate-900 mb-1">Verify Quality</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">Checking for blur, lighting, and leaf presence.</p>
                </div>
              </div>
              
              <div className="relative flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center shrink-0 z-10 text-slate-400">
                  <Leaf className="w-3 h-3" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-slate-900 mb-1">Confirm Species</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">Matching selected crop to visual signatures.</p>
                </div>
              </div>
              
              <div className="relative flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center shrink-0 z-10 text-slate-400">
                  <Microscope className="w-3 h-3" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-slate-900 mb-1">Diagnose Health</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">Scanning for 40+ known pathogens and deficiencies.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-500 font-mono leading-relaxed">
              <span className="text-emerald-600 block mb-2 font-semibold">/// READY</span>
              Select a crop from the grid to proceed to image capture.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
