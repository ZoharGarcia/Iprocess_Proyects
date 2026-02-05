import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2.5 rounded-lg bg-muted border border-border shadow-md">
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 rounded-lg bg-muted hover:bg-primary/10 border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg group"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-foreground group-hover:text-primary group-hover:-rotate-12 transition-all duration-300" />
      )}
    </button>
  );
}
