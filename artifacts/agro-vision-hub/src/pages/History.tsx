import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react/custom-fetch";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search, Leaf, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ScanItem } from "@/lib/api";

export default function History() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const { data, isLoading } = useQuery<ScanItem[]>({ queryKey: ["scans"], queryFn: () => customFetch("/api/scans") });

  const filtered = (data ?? []).filter((s) => {
    if (filter !== "all" && s.status !== filter) return false;
    if (q && !`${s.cropName} ${s.diseaseName} ${s.summary}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Scan history</h1>
      <p className="text-muted-foreground mb-6">All your past leaf scans and diagnoses.</p>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by crop, disease, or notes..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-10" data-testid="input-search" />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40" data-testid="select-filter"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="healthy">Healthy</SelectItem>
            <SelectItem value="diseased">Diseased</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 gap-3">{[0, 1, 2, 3].map(i => <div key={i} className="h-28 rounded-xl animate-shimmer bg-muted" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <Leaf className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground">{data?.length === 0 ? "No scans yet. Start by scanning a leaf." : "No scans match your filters."}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {filtered.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Link href={`/scans/${s.id}`}>
                <Card className="hover-elevate active-elevate-2 cursor-pointer" data-testid={`history-item-${s.id}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold">{s.cropName}</div>
                        <div className="text-sm text-muted-foreground">{s.diseaseName || "Healthy"}</div>
                      </div>
                      <Badge className={s.status === "healthy" ? "bg-emerald-600" : s.status === "diseased" ? "bg-amber-500" : ""}>{s.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{s.summary}</p>
                    <div className="text-xs text-muted-foreground mt-2">{new Date(s.createdAt).toLocaleString()}</div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
