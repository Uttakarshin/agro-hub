import { useAuth } from "@clerk/react";
import { useEffect } from "react";
import { setAuthTokenGetter } from "@workspace/api-client-react/custom-fetch";

export function useApiAuth() {
  const { getToken, isSignedIn } = useAuth();
  useEffect(() => {
    if (isSignedIn) {
      setAuthTokenGetter(() => getToken());
    } else {
      setAuthTokenGetter(null);
    }
    return () => setAuthTokenGetter(null);
  }, [isSignedIn, getToken]);
}

export type Crop = {
  id: string;
  name: string;
  scientificName: string;
  emoji: string;
  description: string;
  commonDiseases: string[];
};

export type ScanItem = {
  id: string;
  cropId: string;
  cropName: string;
  status: string;
  diseaseName: string;
  confidence: number;
  severity: string;
  summary: string;
  createdAt: string;
};

export type Scan = ScanItem & {
  imageDataUrl: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
};

export type DashboardSummary = {
  totalScans: number;
  healthyCount: number;
  diseasedCount: number;
  healthScore: number;
  diseaseBreakdown: { name: string; count: number }[];
  weeklyTrend: { day: string; scans: number; healthy: number }[];
};

export type Tip = { id: string; title: string; body: string; category: string };

export type Settings = {
  userId: string;
  language: string;
  theme: string;
  units: string;
  temperatureUnit: string;
  notificationsEnabled: boolean;
  scanReminders: boolean;
  weatherAlerts: boolean;
  marketingEmails: boolean;
  autoSaveScans: boolean;
  highAccuracyMode: boolean;
  offlineMode: boolean;
};

export type Profile = {
  id: string;
  email: string;
  fullName: string;
  farmName: string;
  location: string;
  bio: string;
  photoUrl: string;
};
