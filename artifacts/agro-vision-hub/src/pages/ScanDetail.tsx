import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react/custom-fetch";
import { useRoute, Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2, Leaf, AlertTriangle, Sparkles, Shield, Pill } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import type { Scan } from "@/lib/api";

export default function ScanDetail() {
  const [, params] = useRoute("/scans/:id");
  const [, navigate] = useLocation();
  const qc = useQueryClient();
  const id = params?.id;

  const { data, isLoading } = useQuery<Scan>({
    queryKey: ["scan", id],
    queryFn: () => customFetch(`/api/scans/${id}`),
    enabled: Boolean(id),
  });

  const del = useMutation({
    mutationFn: () => customFetch(`/api/scans/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["scans"] });
      qc.invalidateQueries({ queryKey: ["dashboard-summary"] });
      qc.invalidateQueries({ queryKey: ["dashboard-recent"] });
      navigate("/history");
    },
  });

  if (isLoading) return <div className="max-w-4xl mx-auto px-4 py-8"><div className="h-96 rounded-xl animate-shimmer bg-muted" /></div>;
  if (!data) return <div className="max-w-4xl mx-auto px-4 py-8">Scan not found.</div>;

  const healthy = data.status === "healthy";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/history"><Button variant="ghost" size="sm" className="mb-4" data-testid="button-back"><ArrowLeft className="h-4 w-4 mr-2" />Back to history</Button></Link>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <div className="aspect-square bg-muted relative">
            <img src={data.imageDataUrl} alt={data.cropName} className="w-full h-full object-cover" />
            <Badge className={`absolute top-3 left-3 ${healthy ? "bg-emerald-600" : "bg-amber-500"}`}>{data.status}</Badge>
          </div>
        </Card>

        <div className="space-y-4">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{data.cropName}</div>
            <h1 className="text-3xl font-bold mt-1">{data.diseaseName || "Healthy leaf"}</h1>
            <div className="text-sm text-muted-foreground mt-1">Scanned {new Date(data.createdAt).toLocaleString()}</div>
          </div>

          {data.confidence > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Confidence</span><span className="font-bold">{Math.round(data.confidence * 100)}%</span></div>
                <Progress value={data.confidence * 100} />
                {data.severity && <div className="mt-3 text-sm">Severity: <Badge variant="outline" className="ml-1 capitalize">{data.severity}</Badge></div>}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-emerald-600" />Summary</CardTitle></CardHeader>
            <CardContent><p className="text-sm leading-relaxed">{data.summary}</p></CardContent>
          </Card>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <DetailList icon={AlertTriangle} title="Symptoms" items={data.symptoms} tone="warning" />
        <DetailList icon={Pill} title="Treatment" items={data.treatment} tone="primary" />
        <DetailList icon={Shield} title="Prevention" items={data.prevention} tone="success" />
      </div>

      <div className="mt-8 flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="text-destructive" data-testid="button-delete-scan"><Trash2 className="h-4 w-4 mr-2" />Delete scan</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>Delete this scan?</AlertDialogTitle><AlertDialogDescription>This permanently removes the scan and its analysis from your history.</AlertDialogDescription></AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => del.mutate()} data-testid="button-confirm-delete">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

function DetailList({ icon: Icon, title, items, tone }: { icon: any; title: string; items: string[]; tone: "warning" | "primary" | "success" }) {
  const colors = {
    warning: "text-amber-600 dark:text-amber-400",
    primary: "text-emerald-600 dark:text-emerald-400",
    success: "text-lime-600 dark:text-lime-400",
  }[tone];
  return (
    <Card>
      <CardHeader><CardTitle className={`flex items-center gap-2 text-base ${colors}`}><Icon className="h-4 w-4" />{title}</CardTitle></CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {items.map((it, i) => (
              <li key={i} className="flex items-start gap-2"><Leaf className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${colors}`} /><span>{it}</span></li>
            ))}
          </ul>
        ) : <p className="text-sm text-muted-foreground italic">None listed.</p>}
      </CardContent>
    </Card>
  );
}
