import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

// Logo configuration - UPDATE THESE PATHS TO YOUR LOGO FILES
const logoConfig = {
  light: "/assets/logo-light.svg", // Logo for light mode (dark logo on light background)
  dark: "/assets/logo-dark.svg",   // Logo for dark mode (light logo on dark background)
  alt: "Recruit Realities Logo",
  defaultWidth: 480,
  defaultHeight: 240,
};

export function Logo({ 
  className = "", 
  width = logoConfig.defaultWidth, 
  height = logoConfig.defaultHeight,
  priority = false 
}: LogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder during SSR to avoid hydration mismatch
    return (
      <div 
        className={`${className} animate-pulse bg-slate-3 rounded`}
        style={{ width, height }}
      />
    );
  }

  // Determine which logo to show based on theme
  const logoSrc = resolvedTheme === 'dark' ? logoConfig.dark : logoConfig.light;

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Image
        src={logoSrc}
        alt={logoConfig.alt}
        width={width}
        height={height}
        priority={priority}
        className="w-auto h-auto object-contain"
        style={{ maxWidth: width, maxHeight: height }}
      />
    </div>
  );
}