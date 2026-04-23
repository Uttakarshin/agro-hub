import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf, Camera, Sparkles, Image as ImageIcon, Send, ArrowRight, ShieldCheck, FileCheck2, UserRound } from "lucide-react";
import "./_group.css";

const chatSequence = [
  {
    id: 1,
    role: "user",
    text: "My tomato leaves are turning brown with dark concentric rings. Is it serious?",
    image: "/__mockup/images/tomato-leaf-chat.png",
    delay: 0.5
  },
  {
    id: 2,
    role: "ai",
    type: "analyzing",
    text: "Analyzing image...",
    delay: 1.5
  },
  {
    id: 3,
    role: "ai",
    type: "diagnosis",
    text: "I've analyzed the leaf. It looks like **Early Blight** (Alternaria solani) with **92% confidence**.",
    delay: 3.5
  },
  {
    id: 4,
    role: "ai",
    type: "treatment",
    text: "It's moderate, but treatable. I recommend removing the affected lower leaves immediately to improve airflow. Would you like the full treatment plan?",
    delay: 5.0
  }
];

export function Conversation() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    chatSequence.forEach((msg) => {
      const t = setTimeout(() => {
        setVisibleMessages(prev => [...prev, msg.id]);
      }, msg.delay * 1000);
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(60_30%_98%)] text-[hsl(150_25%_12%)] font-sans antialiased overflow-x-hidden selection:bg-[hsl(142_71%_38%)] selection:text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 px-6 py-6 md:px-12 flex items-center justify-between bg-[hsl(60_30%_98%)]/80 backdrop-blur-md border-b border-[hsl(140_15%_88%)]">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(142_71%_38%)] text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">Agro Vision Hub</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-[hsl(150_25%_12%)] hover:bg-[hsl(140_15%_92%)] text-base hidden sm:flex">Sign in</Button>
          <Button className="bg-[hsl(142_71%_38%)] text-white hover:bg-[hsl(142_71%_32%)] text-base rounded-full px-6">Get started</Button>
        </div>
      </header>

      {/* Hero Section - Chat Interface */}
      <section className="relative w-full min-h-[90vh] pt-12 pb-24 px-4 sm:px-6 flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[hsl(142_71%_95%)] via-[hsl(60_30%_98%)] to-[hsl(60_30%_98%)] -z-10" />
        
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(142_71%_85%)] bg-[hsl(142_71%_96%)] text-[hsl(142_71%_38%)] mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Powered by Gemini Vision</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium leading-tight mb-4 text-[hsl(150_25%_15%)]">
            AI crop diagnosis,<br/>as easy as sending a text.
          </h1>
          <p className="text-xl text-[hsl(150_10%_40%)] font-light">
            AI-powered crop disease detection from a leaf photo.
          </p>
        </div>

        <div className="w-full max-w-3xl bg-white border border-[hsl(140_15%_88%)] rounded-3xl shadow-xl overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-[hsl(140_15%_92%)] flex items-center gap-4 bg-[hsl(60_30%_99%)]">
            <div className="w-12 h-12 rounded-full leaf-gradient flex items-center justify-center shadow-sm">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold tracking-tight text-lg">Agro AI Assistant</h2>
              <p className="text-sm text-[hsl(150_10%_40%)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[hsl(142_71%_45%)]"></span> Online
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 md:p-8 bg-[hsl(60_20%_98%)] min-h-[400px] flex flex-col gap-6">
            <AnimatePresence>
              {chatSequence.filter(m => visibleMessages.includes(m.id)).map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`flex gap-4 w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'ai' && (
                    <div className="w-8 h-8 rounded-full leaf-gradient flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <Leaf className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`flex flex-col gap-2 max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    {msg.image && (
                      <div className="rounded-2xl overflow-hidden border border-black/10 shadow-sm w-48 sm:w-64">
                        <img src={msg.image} alt="Crop leaf uploaded" className="w-full h-auto object-cover" />
                      </div>
                    )}
                    
                    {msg.type === 'analyzing' ? (
                      <div className="bg-white border border-[hsl(140_15%_90%)] rounded-2xl rounded-tl-sm px-5 py-3 shadow-sm flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-[hsl(142_71%_60%)]" />
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-[hsl(142_71%_40%)]" />
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-[hsl(142_71%_20%)]" />
                        </div>
                        <span className="text-[hsl(150_10%_40%)] font-medium text-sm">{msg.text}</span>
                      </div>
                    ) : (
                      <div className={`px-5 py-3.5 shadow-sm text-[1.05rem] leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-[hsl(142_71%_38%)] text-white rounded-2xl rounded-tr-sm' 
                          : 'bg-white border border-[hsl(140_15%_90%)] text-[hsl(150_25%_15%)] rounded-2xl rounded-tl-sm'
                      }`}>
                        {/* Rendering bold tags simply for mockup purposes */}
                        {msg.text.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className={msg.role === 'user' ? 'text-white' : 'text-[hsl(150_25%_10%)] font-semibold'}>{part}</strong> : part)}
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[hsl(80_20%_90%)] overflow-hidden shrink-0 mt-1 border border-[hsl(140_15%_88%)]">
                      <img src="/__mockup/images/farmer-avatar.png" alt="User" className="w-full h-full object-cover" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {visibleMessages.includes(4) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-4 pt-6 border-t border-[hsl(140_15%_90%)] flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className="text-sm font-medium text-[hsl(150_10%_40%)]">See what it can do for your crops.</p>
                <Button size="lg" className="bg-[hsl(142_71%_38%)] text-white hover:bg-[hsl(142_71%_32%)] rounded-full px-8 shadow-md w-full sm:w-auto h-12 text-base group">
                  Try it with your own leaf <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            )}
          </div>
          
          {/* Chat Input Mockup */}
          <div className="p-4 bg-white border-t border-[hsl(140_15%_88%)] flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-[hsl(150_10%_40%)] hover:bg-[hsl(60_30%_95%)] shrink-0 rounded-full w-10 h-10">
              <Camera className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[hsl(150_10%_40%)] hover:bg-[hsl(60_30%_95%)] shrink-0 rounded-full w-10 h-10">
              <ImageIcon className="w-5 h-5" />
            </Button>
            <div className="flex-1 bg-[hsl(60_30%_95%)] border border-[hsl(140_15%_90%)] rounded-full h-11 px-4 flex items-center text-[hsl(150_10%_40%)] text-sm">
              Type your question or upload a photo...
            </div>
            <Button size="icon" className="bg-[hsl(142_71%_38%)] text-white hover:bg-[hsl(142_71%_32%)] shrink-0 rounded-full w-11 h-11 shadow-sm">
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-6 text-[hsl(150_25%_15%)] font-medium">Real conversations, real yields.</h2>
            <p className="text-xl text-[hsl(150_10%_40%)] font-light max-w-2xl mx-auto">
              Farmers worldwide use Agro Vision Hub to instantly diagnose issues across different crop types.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { crop: "Rice", issue: "Yellowing leaves", ai: "Looks like Nitrogen deficiency. Apply 20kg/ha of urea fertilizer this week." },
              { crop: "Wheat", issue: "White powdery spots", ai: "High confidence of Powdery Mildew. Consider a sulfur-based fungicide." },
              { crop: "Grapes", issue: "Shriveled berries", ai: "This matches Black Rot symptoms. Prune affected clusters immediately." }
            ].map((item, i) => (
              <div key={i} className="bg-[hsl(60_20%_98%)] rounded-3xl p-8 border border-[hsl(140_15%_88%)] transition-all hover:shadow-lg hover:border-[hsl(142_71%_80%)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 rounded-full bg-white border border-[hsl(140_15%_88%)] text-xs font-semibold text-[hsl(150_10%_40%)] uppercase tracking-wide">
                    {item.crop}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-[hsl(150_25%_15%)] shadow-sm border border-[hsl(140_15%_90%)] ml-4 relative">
                    <div className="absolute -left-2 top-3 w-4 h-4 bg-[hsl(140_15%_90%)] rotate-45 -z-10" />
                    "My {item.crop.toLowerCase()} has {item.issue.toLowerCase()}."
                  </div>
                  <div className="bg-[hsl(142_71%_95%)] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[hsl(150_25%_15%)] font-medium shadow-sm border border-[hsl(142_71%_80%)] mr-4 relative">
                    <div className="absolute -right-2 top-3 w-4 h-4 bg-[hsl(142_71%_80%)] rotate-45 -z-10" />
                    {item.ai}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prompts Section */}
      <section className="w-full py-24 px-6 md:px-12 bg-[hsl(60_30%_95%)] border-t border-[hsl(140_15%_88%)]">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-12 text-[hsl(150_25%_15%)] font-medium">Just ask. The AI knows.</h2>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                "Is this blight or just sunburn?",
                "What's the treatment for downy mildew?",
                "Are these spots spreading too fast?",
                "Can I save this tomato plant?",
                "When should I apply fungicide?",
                "Is it safe to harvest?"
              ].map((prompt, i) => (
                <div key={i} className="px-5 py-3 rounded-full bg-white border border-[hsl(140_15%_88%)] shadow-sm text-[hsl(150_10%_40%)] hover:border-[hsl(142_71%_50%)] hover:text-[hsl(142_71%_38%)] cursor-pointer transition-colors text-sm sm:text-base font-medium">
                  "{prompt}"
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-[hsl(142_71%_38%)] text-white hover:bg-[hsl(142_71%_32%)] rounded-full px-10 h-14 text-lg shadow-lg">
              Start your conversation
            </Button>
         </div>
      </section>
    </div>
  );
}
