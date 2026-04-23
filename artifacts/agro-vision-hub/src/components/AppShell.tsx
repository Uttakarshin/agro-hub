import { type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { UserButton } from "@clerk/react";
import { LayoutDashboard, ScanLine, History, Settings as SettingsIcon, User, Info, Moon, Sun, Monitor } from "lucide-react";
import { Logo } from "./Logo";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/scan", label: "New Scan", icon: ScanLine },
  { href: "/history", label: "History", icon: History },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
  { href: "/about", label: "About", icon: Info },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" data-testid="button-theme-toggle"><Icon className="h-4 w-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} data-testid="menuitem-theme-light"><Sun className="h-4 w-4 mr-2" />Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} data-testid="menuitem-theme-dark"><Moon className="h-4 w-4 mr-2" />Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} data-testid="menuitem-theme-system"><Monitor className="h-4 w-4 mr-2" />System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [loc] = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b glass">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
          <Logo />
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => {
              const active = loc === n.href || (n.href !== "/dashboard" && loc.startsWith(n.href));
              return (
                <Link key={n.href} href={n.href} data-testid={`nav-${n.label.toLowerCase().replace(" ", "-")}`}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover-elevate active-elevate-2 ${active ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"}`}>
                  <n.icon className="h-4 w-4" />{n.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserButton afterSignOutUrl={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"} />
          </div>
        </div>
        <nav className="md:hidden border-t flex overflow-x-auto px-2 py-1.5 gap-1">
          {NAV.map((n) => {
            const active = loc === n.href || (n.href !== "/dashboard" && loc.startsWith(n.href));
            return (
              <Link key={n.href} href={n.href}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs whitespace-nowrap hover-elevate active-elevate-2 ${active ? "bg-accent font-medium" : "text-muted-foreground"}`}>
                <n.icon className="h-3.5 w-3.5" />{n.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          Agro Vision Hub · AI-powered crop health · Made with care for farmers worldwide
        </div>
      </footer>
    </div>
  );
}
