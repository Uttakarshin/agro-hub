import type { Request, Response, NextFunction } from "express";
import { getAuth, clerkClient } from "@clerk/express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = getAuth(req);
  if (!auth?.userId) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
}

export function userId(req: Request): string {
  const auth = getAuth(req);
  if (!auth?.userId) throw new Error("not authenticated");
  return auth.userId;
}

export { clerkClient };
