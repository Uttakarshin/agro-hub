import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react/custom-fetch";
import { useClerk } from "@clerk/react";
import { useLocation } from "wouter";
import { Camera, Save, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Profile } from "@/lib/api";

export default function ProfilePage() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { signOut } = useClerk();
  const [, navigate] = useLocation();
  const fileRef = useRef<HTMLInputElement>(null);
  const { data } = useQuery<Profile>({ queryKey: ["profile"], queryFn: () => customFetch("/api/profile") });
  const [form, setForm] = useState<Profile | null>(null);

  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = useMutation({
    mutationFn: (p: Partial<Profile>) => customFetch<Profile>("/api/profile", { method: "PUT", body: JSON.stringify(p) }),
    onSuccess: (d) => { qc.setQueryData(["profile"], d); setForm(d); toast({ title: "Profile updated" }); },
    onError: () => toast({ title: "Could not save profile", variant: "destructive" }),
  });

  const del = useMutation({
    mutationFn: () => customFetch("/api/profile", { method: "DELETE" }),
    onSuccess: async () => {
      toast({ title: "Account deleted" });
      await signOut();
      navigate("/");
    },
    onError: () => toast({ title: "Could not delete account", variant: "destructive" }),
  });

  const handlePhoto = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "Photo too large", description: "Use an image under 2MB.", variant: "destructive" });
      return;
    }
    const r = new FileReader();
    r.onload = () => setForm((f) => f && ({ ...f, photoUrl: r.result as string }));
    r.readAsDataURL(file);
  };

  if (!form) return <div className="max-w-3xl mx-auto px-4 py-8"><div className="h-96 rounded-xl animate-shimmer bg-muted" /></div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-1">Tell us about you and your farm.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 ring-2 ring-emerald-500/40">
                <AvatarImage src={form.photoUrl} />
                <AvatarFallback className="text-2xl leaf-gradient text-white">{(form.fullName || form.email || "U").charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <button onClick={() => fileRef.current?.click()} className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center hover-elevate active-elevate-2" data-testid="button-upload-photo">
                <Camera className="h-4 w-4" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handlePhoto(e.target.files[0])} />
            </div>
            <div>
              <div className="text-xl font-semibold">{form.fullName || "Set your name"}</div>
              <div className="text-sm text-muted-foreground">{form.email}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>About you</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Full name</Label><Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} data-testid="input-fullname" /></div>
          <div><Label>Farm name</Label><Input value={form.farmName} onChange={(e) => setForm({ ...form, farmName: e.target.value })} data-testid="input-farmname" /></div>
          <div><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="City, region, country" data-testid="input-location" /></div>
          <div><Label>Bio</Label><Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} placeholder="What you grow, your mission, anything..." data-testid="input-bio" /></div>
          <Button onClick={() => save.mutate({ fullName: form.fullName, farmName: form.farmName, location: form.location, bio: form.bio, photoUrl: form.photoUrl })} disabled={save.isPending} data-testid="button-save-profile">
            <Save className="h-4 w-4 mr-2" />Save changes
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader><CardTitle className="text-destructive">Danger zone</CardTitle><CardDescription>Permanently delete your account and all data.</CardDescription></CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="destructive" data-testid="button-delete-account"><Trash2 className="h-4 w-4 mr-2" />Delete account</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                <AlertDialogDescription>This permanently removes your profile, settings, and every scan. This cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => del.mutate()} className="bg-destructive text-destructive-foreground" data-testid="button-confirm-delete-account">Yes, delete everything</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
