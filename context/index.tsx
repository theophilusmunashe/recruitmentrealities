import { ThemeProvider } from "next-themes";

export function Providers({
  children,
  defaultTheme,
  forcedTheme,
}: {
  children: React.ReactNode;
  defaultTheme: "light" | "dark" | "system";
  forcedTheme: "light" | "dark" | null;
}) {
  return (
    <ThemeProvider
      enableSystem
      disableTransitionOnChange
      attribute="class"
      defaultTheme={defaultTheme || "system"}
      forcedTheme={forcedTheme || undefined}
    >
      {children}
    </ThemeProvider>
  );
}
