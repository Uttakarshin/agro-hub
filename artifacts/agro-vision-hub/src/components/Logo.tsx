import { Link } from "wouter";

export function Logo({ size = 32, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 px-1 py-1 rounded-md" data-testid="link-logo">
      <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Agro Vision Hub" width={size} height={size} className="rounded-md" />
      {withText && (
        <span className="font-bold text-base tracking-tight bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-lime-300">
          Agro Vision Hub
        </span>
      )}
    </Link>
  );
}
