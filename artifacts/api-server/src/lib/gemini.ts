import { ai } from "@workspace/integrations-gemini-ai";
import type { CropDef } from "./crops";

const MODEL = "gemini-2.5-flash";

export type DiagnosisResult = {
  status: "healthy" | "diseased" | "unknown";
  diseaseName: string | null;
  confidence: number | null;
  severity: "mild" | "moderate" | "severe" | null;
  summary: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
};

export type ValidationResult = {
  isLeaf: boolean;
  isCorrectCrop: boolean;
  detectedSubject: string;
  reason: string;
};

function parseDataUrl(dataUrl: string): { mimeType: string; data: string } {
  const m = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!m) throw new Error("invalid_image_format");
  return { mimeType: m[1], data: m[2] };
}

function extractJson<T>(text: string): T {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = (fenced ? fenced[1] : text).trim();
  return JSON.parse(raw) as T;
}

export async function validateLeafImage(
  dataUrl: string,
  crop: CropDef,
): Promise<ValidationResult> {
  const { mimeType, data } = parseDataUrl(dataUrl);
  const prompt = `You are an expert botanist. Look at this image and determine:
1. Is this image clearly a photograph of a plant leaf? (not an animal, person, object, drawing, screenshot, food dish, or general scenery)
2. Is the leaf from a ${crop.name} (${crop.scientificName}) plant?

Respond with ONLY valid JSON in this exact shape:
{
  "isLeaf": boolean,
  "isCorrectCrop": boolean,
  "detectedSubject": "short description of what is actually in the image",
  "reason": "one short sentence explaining the decision"
}`;

  const resp = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          { inlineData: { mimeType, data } },
        ],
      },
    ],
    config: { responseMimeType: "application/json" },
  });

  const text = resp.text ?? "";
  return extractJson<ValidationResult>(text);
}

export async function diagnoseLeaf(
  dataUrl: string,
  crop: CropDef,
): Promise<DiagnosisResult> {
  const { mimeType, data } = parseDataUrl(dataUrl);
  const prompt = `You are an expert plant pathologist analyzing a ${crop.name} (${crop.scientificName}) leaf.
Common diseases for this crop include: ${crop.commonDiseases.join(", ")}.

Examine the leaf image and provide a diagnosis. Respond with ONLY valid JSON:
{
  "status": "healthy" | "diseased" | "unknown",
  "diseaseName": "name of disease if diseased, otherwise null",
  "confidence": number between 0 and 1,
  "severity": "mild" | "moderate" | "severe" | null,
  "summary": "2-3 sentence plain-language summary for a farmer",
  "symptoms": ["specific symptom 1", "specific symptom 2", ...],
  "treatment": ["actionable treatment step 1", ...],
  "prevention": ["prevention tip 1", ...]
}

Be specific, practical, and farmer-friendly. Provide 3-5 items in each list.`;

  const resp = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          { inlineData: { mimeType, data } },
        ],
      },
    ],
    config: { responseMimeType: "application/json" },
  });

  const text = resp.text ?? "";
  return extractJson<DiagnosisResult>(text);
}

export async function generateDailyTips(crops: string[]): Promise<
  { id: string; title: string; body: string; category: string }[]
> {
  const prompt = `Generate 4 short, practical farming tips for crops: ${crops.join(", ")}.
Mix categories: disease prevention, irrigation, soil health, weather. Return ONLY JSON:
[
  { "id": "tip-1", "title": "...", "body": "1-2 sentence tip", "category": "prevention|irrigation|soil|weather" }
]`;
  try {
    const resp = await ai.models.generateContent({
      model: MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { responseMimeType: "application/json" },
    });
    return extractJson(resp.text ?? "[]");
  } catch {
    return [];
  }
}
