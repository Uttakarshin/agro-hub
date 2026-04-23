import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Leaf, Star, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const crops = [
  { name: "Tomato", sci: "Solanum lycopersicum", emoji: "🍅", popular: true },
  { name: "Potato", sci: "Solanum tuberosum", emoji: "🥔", popular: true },
  { name: "Corn (Maize)", sci: "Zea mays", emoji: "🌽" },
  { name: "Rice", sci: "Oryza sativa", emoji: "🌾" },
  { name: "Wheat", sci: "Triticum aestivum", emoji: "🌾" },
  { name: "Apple", sci: "Malus domestica", emoji: "🍎" },
  { name: "Grape", sci: "Vitis vinifera", emoji: "🍇" },
  { name: "Bell Pepper", sci: "Capsicum annuum", emoji: "🫑" },
  { name: "Soybean", sci: "Glycine max", emoji: "🫘" },
  { name: "Cotton", sci: "Gossypium hirsutum", emoji: "🌱" },
];

export function Warm() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-emerald-200">
      <div className="max-w-[1000px] mx-auto px-6 py-12 lg:py-16">
        
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1 text-xs font-medium rounded-full shadow-sm flex items-center gap-1.5 hover:bg-emerald-100 transition-colors">
              <Leaf className="w-3.5 h-3.5 fill-emerald-600/20" />
              10 crops supported
            </Badge>
            <Badge variant="outline" className="bg-white/60 text-slate-500 border-slate-200 px-3 py-1 text-xs font-medium rounded-full">
              Powered by Gemini Vision
            </Badge>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 font-serif">
                New scan
              </h1>
              <div className="flex items-start gap-3 text-slate-600 max-w-lg bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-emerald-50 shadow-sm">
                <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">
                  Pick the crop you want to scan. We'll use this to validate the leaf and improve diagnosis accuracy.
                </p>
              </div>
            </div>

            {/* Stepper */}
            <div className="flex flex-col items-start lg:items-end shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <StepIndicator step={1} label="Choose crop" status="current" />
                <div className="w-8 h-[2px] bg-emerald-100 rounded-full" />
                <StepIndicator step={2} label="Upload leaf" status="upcoming" />
                <div className="w-8 h-[2px] bg-slate-200 rounded-full" />
                <StepIndicator step={3} label="Analyze" status="upcoming" />
              </div>
              <p className="text-xs font-medium text-emerald-600/80 mr-2 lg:mr-0 pl-1">
                Next: Upload a photo →
              </p>
            </div>
          </div>
        </header>

        {/* Grid Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          <AnimatePresence>
            {crops.map((crop, i) => (
              <motion.button
                key={crop.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
                className="group relative w-full focus:outline-none text-left"
              >
                {/* Glow effect behind card */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/20 to-lime-300/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <Card className="relative h-full border-0 bg-white/90 backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-300 rounded-[24px] p-5 md:p-6 overflow-hidden ring-1 ring-slate-900/5 group-hover:ring-emerald-500/30 group-hover:-translate-y-1">
                  
                  {/* Subtle hover gradient inside */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {crop.popular && (
                    <div className="absolute top-3 md:top-4 right-3 md:right-4 text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400/30" />
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col h-full min-h-[140px]">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 origin-bottom-left filter drop-shadow-sm">
                      {crop.emoji}
                    </div>
                    
                    <div className="mt-auto">
                      <h3 className="font-semibold text-lg text-slate-800 group-hover:text-emerald-900 transition-colors duration-200">
                        {crop.name}
                      </h3>
                      <p className="text-xs text-slate-500 italic mt-1 line-clamp-2 pr-4 group-hover:text-emerald-700/70 transition-colors duration-200">
                        {crop.sci}
                      </p>
                    </div>

                    {/* Hover Hint */}
                    <div className="absolute bottom-0 right-0 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <div className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        Choose <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

function StepIndicator({ step, label, status }: { step: number; label: string; status: "completed" | "current" | "upcoming" }) {
  const isCompleted = status === "completed";
  const isCurrent = status === "current";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-2">
        <div className={`
          flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors
          ${isCompleted ? 'bg-emerald-500 text-white' : 
            isCurrent ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500 ring-offset-2 ring-offset-[#FDFBF7]' : 
            'bg-slate-200 text-slate-500'}
        `}>
          {isCompleted ? <Check className="w-3.5 h-3.5" /> : step}
        </div>
        <span className={`text-xs font-semibold tracking-wide ${isCurrent ? 'text-emerald-800' : isCompleted ? 'text-slate-700' : 'text-slate-500'}`}>
          {label}
        </span>
      </div>
    </div>
  );
}
