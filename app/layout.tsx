import type { Viewport } from "next";
import { Geist } from "next/font/google";
import { Providers } from "@/context";
import { Header } from "@/components/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true,
});

export const dynamic = "force-static";

export const viewport: Viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

// Static settings configuration - EDIT THESE VALUES
const appSettings = {
  defaultTheme: "system" as const,
  forcedTheme: null,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased max-w-screen min-h-svh bg-slate-1 text-slate-12 opacity-100 duration-75 transition-opacity`}
        suppressHydrationWarning
      >
        <Providers
          defaultTheme={appSettings.defaultTheme}
          forcedTheme={appSettings.forcedTheme}
        >
          {/* Blurred background image */}
          <div 
            className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/assets/background.jpg')",
              filter: "blur(2px)",
              transform: "scale(1.1)", // Prevents blur edges from showing
            }}
          />
          
          {/* Background overlay for better readability */}
          <div className="fixed inset-0 z-0 bg-white/30 dark:bg-black/40" />
          
          <div className="max-w-screen-sm mx-auto w-full relative z-[1] flex flex-col min-h-screen">
            <div className="px-5 gap-8 flex flex-col flex-1 py-[12vh]">
              <Header />
              <main className="flex justify-center">{children}</main>
            </div>
            
            {/* Footer */}
            <footer className="px-5 py-6 mt-auto">
              <div className="text-center text-sm font-bold text-black dark:text-white border-t border-slate-6 pt-4">
                <p>Recruitment Realities</p>
                <p className="mt-1">Powered By WeNext Africa Pvt Ltd</p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
      generator: 'v0.dev'
    };
