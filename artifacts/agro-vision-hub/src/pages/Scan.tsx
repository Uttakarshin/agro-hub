import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch, ApiError } from "@workspace/api-client-react/custom-fetch";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, X, Loader2, ChevronRight, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Crop, Scan } from "@/lib/api";

export default function ScanPage() {
  const [step, setStep] = useState<"crop" | "image" | "analyzing" | "error">("crop");
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();
  const qc = useQueryClient();

  const crops = useQuery<Crop[]>({ queryKey: ["crops"], queryFn: () => customFetch("/api/crops"), staleTime: Infinity });

  const submit = useMutation({
    mutationFn: async (vars: { cropId: string; imageDataUrl: string }) =>
      customFetch<Scan>("/api/scans", { method: "POST", body: JSON.stringify(vars) }),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["dashboard-summary"] });
      qc.invalidateQueries({ queryKey: ["dashboard-recent"] });
      qc.invalidateQueries({ queryKey: ["scans"] });
      navigate(`/scans/${data.id}`);
    },
    onError: (err: unknown) => {
      let msg = "Something went wrong analyzing the image. Please try again.";
      if (err instanceof ApiError && err.data && typeof err.data === "object" && "reason" in err.data) {
        msg = String((err.data as { reason?: string }).reason ?? msg);
      }
      setErrorMsg(msg);
      setStep("error");
    },
  });

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please select an image file.");
      setStep("error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const startAnalysis = () => {
    if (!selectedCrop || !imageDataUrl) return;
    setStep("analyzing");
    setErrorMsg(null);
    submit.mutate({ cropId: selectedCrop.id, imageDataUrl });
  };

  const reset = () => {
    setImageDataUrl(null);
    setErrorMsg(null);
    setStep(selectedCrop ? "image" : "crop");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">New scan</h1>
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
          <StepDot label="Choose crop" active={step === "crop"} done={selectedCrop !== null} />
          <ChevronRight className="h-3 w-3" />
          <StepDot label="Upload leaf" active={step === "image"} done={imageDataUrl !== null} />
          <ChevronRight className="h-3 w-3" />
          <StepDot label="Analyze" active={step === "analyzing"} done={false} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "crop" && (
          <motion.div key="crop" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <p className="text-muted-foreground mb-4">Pick the crop you want to scan. We'll use this to validate the leaf and improve diagnosis accuracy.</p>
            {crops.isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-32 rounded-xl animate-shimmer bg-muted" />)}</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {crops.data?.map((c, i) => (
                  <motion.button
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => { setSelectedCrop(c); setStep("image"); }}
                    data-testid={`crop-${c.id}`}
                    className="group relative rounded-2xl border bg-card p-5 text-left hover-elevate active-elevate-2 transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 leaf-gradient-soft opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="text-4xl">{c.emoji}</div>
                      <div className="font-semibold mt-2">{c.name}</div>
                      <div className="text-xs text-muted-foreground italic mt-0.5 line-clamp-1">{c.scientificName}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {step === "image" && selectedCrop && (
          <motion.div key="image" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedCrop.emoji}</span>
                    <div>
                      <div className="font-semibold">{selectedCrop.name}</div>
                      <div className="text-xs text-muted-foreground italic">{selectedCrop.scientificName}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setStep("crop")} data-testid="button-change-crop">Change crop</Button>
                </div>

                {imageDataUrl ? (
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden bg-muted aspect-video flex items-center justify-center">
                      <img src={imageDataUrl} alt="Selected leaf" className="max-h-[400px] object-contain" />
                      <Button variant="secondary" size="icon" className="absolute top-3 right-3" onClick={() => setImageDataUrl(null)} data-testid="button-clear-image"><X className="h-4 w-4" /></Button>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={startAnalysis} className="flex-1" size="lg" data-testid="button-analyze">
                        <Leaf className="h-4 w-4 mr-2" />Analyze leaf
                      </Button>
                      <Button variant="outline" onClick={() => fileRef.current?.click()} data-testid="button-replace">Replace</Button>
                    </div>
                  </div>
                ) : (
                  <div onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer hover-elevate active-elevate-2 leaf-gradient-soft"
                    data-testid="dropzone-upload">
                    <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 animate-pulse-ring">
                      <Camera className="h-8 w-8 text-emerald-700 dark:text-emerald-300" />
                    </div>
                    <div className="font-semibold text-lg">Take or upload a leaf photo</div>
                    <div className="text-sm text-muted-foreground mt-1">Tap to select. Use a clear, close-up photo of a single {selectedCrop.name} leaf.</div>
                    <Button variant="outline" className="mt-4"><Upload className="h-4 w-4 mr-2" />Choose file</Button>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} data-testid="input-file" />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === "analyzing" && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16">
            <div className="max-w-md mx-auto text-center">
              <div className="relative h-32 w-32 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full leaf-gradient animate-pulse-ring" />
                <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                  <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />
                </div>
              </div>
              <h2 className="text-2xl font-bold">Analyzing your leaf</h2>
              <p className="text-muted-foreground mt-2">Validating the image and running disease detection...</p>
              <div className="mt-6 space-y-2 text-sm text-left max-w-xs mx-auto">
                <AnalyzeStep label="Verifying it's a leaf" delay={0} />
                <AnalyzeStep label={`Confirming it's ${selectedCrop?.name}`} delay={1500} />
                <AnalyzeStep label="Diagnosing health" delay={3000} />
              </div>
            </div>
          </motion.div>
        )}

        {step === "error" && (
          <motion.div key="error" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Alert variant="destructive">
              <AlertTitle>We couldn't process that image</AlertTitle>
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
            <div className="mt-4 flex gap-3">
              <Button onClick={reset} data-testid="button-try-again">Try again</Button>
              <Button variant="outline" onClick={() => { setSelectedCrop(null); setImageDataUrl(null); setErrorMsg(null); setStep("crop"); }}>Pick different crop</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepDot({ label, active, done }: { label: string; active: boolean; done: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 font-medium" : done ? "text-emerald-600" : ""}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-600" : done ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
      {label}
    </span>
  );
}

function AnalyzeStep({ label, delay }: { label: string; delay: number }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div className="flex items-center gap-2">
      {done ? <span className="text-emerald-600">✓</span> : <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
      <span className={done ? "text-foreground" : "text-muted-foreground"}>{label}</span>
    </div>
  );
}
