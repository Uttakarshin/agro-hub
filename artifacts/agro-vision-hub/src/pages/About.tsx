import { motion } from "framer-motion";
import { Brain, ShieldCheck, Camera, Sparkles, Leaf, BarChart3, Heart, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About Agro Vision Hub</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          Agro Vision Hub puts plant pathology in your pocket. Snap a photo of a leaf, get an AI-powered diagnosis,
          and a clear, practical plan — built for farmers, students, and gardeners everywhere.
        </p>
      </motion.section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <img src={`${BASE}/about-farmer.jpg`} alt="Farmer using app" className="rounded-2xl shadow-xl" />
        <div>
          <Heart className="h-8 w-8 text-emerald-600 mb-3" />
          <h2 className="text-3xl font-bold">Why we built this</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Crop loss from disease costs farmers billions every year — and the pain falls hardest on smallholders without easy access to expert advice.
            We wanted to give every grower a second pair of trained eyes, instantly, with a phone they already own.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-10">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Camera, title: "Capture", body: "Photograph a single leaf in good light. We accept any clear leaf image — phone camera or upload." },
            { icon: Brain, title: "Validate &amp; analyze", body: "A vision model first verifies the image is genuinely a crop leaf (and the right crop) before running disease detection." },
            { icon: ShieldCheck, title: "Act", body: "You get severity, confidence, symptoms, treatment, and prevention — in plain language tailored to your crop." },
          ].map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl leaf-gradient-soft flex items-center justify-center mb-4">
                    <f.icon className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
                  </div>
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: f.body }} />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl leaf-gradient-soft p-8 md:p-12">
        <Sparkles className="h-10 w-10 text-emerald-600 mb-4" />
        <h2 className="text-3xl font-bold">The technology</h2>
        <p className="mt-3 text-muted-foreground max-w-3xl leading-relaxed">
          We use Google's Gemini multimodal vision model — guided by domain prompts that mirror how a plant pathologist examines a leaf.
          That means we can detect dozens of common diseases across 10+ major crops, and we can refuse images that aren't real leaves so you never get a hallucinated answer.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <Stat icon={Leaf} label="Crops supported" value="10+" />
          <Stat icon={BarChart3} label="Diseases detected" value="40+" />
          <Stat icon={Lock} label="Data is yours" value="100%" />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">FAQ</h2>
        <div className="space-y-4">
          <Faq q="Is this a replacement for an agronomist?" a="No. Agro Vision Hub is a fast first-line tool. For severe outbreaks or unusual symptoms, please consult a local agricultural extension officer." />
          <Faq q="What happens to my photos?" a="Your scans are stored privately under your account and used to power your dashboard. They aren't shared. You can delete any scan or your entire account at any time." />
          <Faq q="Why does it reject my photo sometimes?" a="We require the image to actually be a crop leaf — and to match the crop you selected. This prevents misleading diagnoses on flowers, soil, or unrelated objects." />
          <Faq q="What if I forget my password?" a="On the sign-in page, click 'Forgot password' and we'll email you a reset link." />
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-card rounded-xl p-4 border">
      <Icon className="h-5 w-5 text-emerald-600" />
      <div className="text-2xl font-bold mt-2">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="font-semibold">{q}</div>
        <div className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{a}</div>
      </CardContent>
    </Card>
  );
}
