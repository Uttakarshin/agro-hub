import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Leaf, Star, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const crops = [
  { name: "Tomato",       sci: "Solanum lycopersicum", img: "/__mockup/images/leaf-tomato.jpg", popular: true },
  { name: "Potato",       sci: "Solanum tuberosum",    img: "/__mockup/images/leaf-potato.jpg", popular: true },
  { name: "Corn (Maize)", sci: "Zea mays",             img: "/__mockup/images/leaf-corn.jpg" },
  { name: "Rice",         sci: "Oryza sativa",         img: "/__mockup/images/leaf-rice.jpg" },
  { name: "Wheat",        sci: "Triticum aestivum",    img: "/__mockup/images/leaf-wheat.jpg" },
  { name: "Apple",        sci: "Malus domestica",      img: "/__mockup/images/leaf-apple.jpg" },
  { name: "Grape",        sci: "Vitis vinifera",       img: "/__mockup/images/leaf-grape.jpg" },
  { name: "Bell Pepper",  sci: "Capsicum annuum",      img: "/__mockup/images/leaf-bellpepper.jpg" },
  { name: "Soybean",      sci: "Glycine max",          img: "/__mockup/images/leaf-soybean.jpg" },
  { name: "Cotton",       sci: "Gossypium hirsutum",   img: "/__mockup/images/leaf-cotton.jpg" },
];

export function Warm() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-emerald-200 relative">
      {/* Beautiful leaf overlay background */}
      <div 
        className="fixed top-0 left-0 w-full h-[60vh] pointer-events-none z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/__mockup/images/hero-leaf-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-[#FDFBF7]" />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 py-12 lg:py-16">
        
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="outline" className="bg-white/90 text-emerald-700 border-emerald-200 px-3 py-1 text-xs font-medium rounded-full shadow-sm flex items-center gap-1.5 hover:bg-white transition-colors backdrop-blur-md">
              <Leaf className="w-3.5 h-3.5 fill-emerald-600/20" />
              10 crops supported
            </Badge>
            <Badge variant="outline" className="bg-white/80 text-slate-600 border-slate-200 px-3 py-1 text-xs font-medium rounded-full backdrop-blur-md shadow-sm">
              Powered by Gemini Vision
            </Badge>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-emerald-950 mb-4 font-serif drop-shadow-sm">
                New scan
              </h1>
              <div className="flex items-start gap-3 text-slate-700 max-w-lg bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm">
                <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">
                  Pick the crop you want to scan. We'll use this to validate the leaf and improve diagnosis accuracy.
                </p>
              </div>
            </div>

            {/* Stepper */}
            <div className="flex flex-col items-start lg:items-end shrink-0">
              <div className="flex items-center gap-2 mb-3 bg-white/70 backdrop-blur-md p-2 rounded-full border border-white shadow-sm">
                <StepIndicator step={1} label="Choose crop" status="current" />
                <div className="w-6 h-[2px] bg-emerald-200 rounded-full" />
                <StepIndicator step={2} label="Upload leaf" status="upcoming" />
                <div className="w-6 h-[2px] bg-slate-200 rounded-full" />
                <StepIndicator step={3} label="Analyze" status="upcoming" />
              </div>
              <p className="text-xs font-medium text-emerald-800/80 mr-2 lg:mr-0 pl-1 drop-shadow-sm">
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
                
                <Card className="relative h-full border-0 bg-white/95 backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-300 rounded-[24px] overflow-hidden ring-1 ring-slate-900/5 group-hover:ring-emerald-500/30 group-hover:-translate-y-1">
                  
                  {/* Subtle hover gradient inside */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                  {/* Crop Photo Header */}
                  <div className="relative h-28 w-full overflow-hidden bg-emerald-50/50">
                    <img 
                      src={crop.img} 
                      alt={crop.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                    
                    {crop.popular && (
                      <div className="absolute top-2 right-2 z-20 bg-white/95 backdrop-blur-sm rounded-full p-1.5 shadow-sm text-amber-500 border border-white">
                        <Star className="w-3 h-3 fill-amber-400" />
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 p-4 md:p-5 flex flex-col min-h-[90px]">
                    <div className="mt-auto">
                      <h3 className="font-semibold text-[15px] text-slate-800 group-hover:text-emerald-900 transition-colors duration-200">
                        {crop.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 italic mt-0.5 line-clamp-1 group-hover:text-emerald-700/70 transition-colors duration-200">
                        {crop.sci}
                      </p>
                    </div>

                    {/* Hover Hint */}
                    <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <div className="bg-emerald-100 text-emerald-700 text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
                        <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
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
      <div className="flex items-center gap-2 pr-2">
        <div className={`
          flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors shadow-sm
          ${isCompleted ? 'bg-emerald-500 text-white border border-emerald-600' : 
            isCurrent ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-500/50 ring-offset-1 ring-offset-white border border-emerald-200' : 
            'bg-slate-100 text-slate-500 border border-slate-200'}
        `}>
          {isCompleted ? <Check className="w-3.5 h-3.5" /> : step}
        </div>
        <span className={`text-xs font-semibold tracking-wide ${isCurrent ? 'text-emerald-900' : isCompleted ? 'text-slate-700' : 'text-slate-500'}`}>
          {label}
        </span>
      </div>
    </div>
  );
}
