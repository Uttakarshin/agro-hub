import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const apiZodIndex = resolve(import.meta.dirname, "../api-zod/src/index.ts");
writeFileSync(apiZodIndex, 'export * from "./generated/api";\n');
