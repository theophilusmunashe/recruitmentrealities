import { WaitlistWrapper } from "@/components/box";
import { Alex_Brush } from "next/font/google";
import clsx from "clsx";
import { Metadata } from "next";

const font = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
});

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Manifesto | Recruitment Realities",
  description: "Our mission and vision for the future of recruiting",
  openGraph: {
    type: "website",
    title: "Manifesto | Recruitment Realities",
    description: "Our mission and vision for the future of recruiting",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manifesto | Recruitment Realities",
    description: "Our mission and vision for the future of recruiting",
  },
};

// Static manifesto content - EDIT THESE VALUES
const manifestoContent = {
  body: [
    "The recruiting industry is broken. For too long, candidates have been treated as commodities, reduced to keywords on a resume and filtered by algorithms that miss the human story behind every career.",
    "We believe that every person deserves to be seen, heard, and valued for their unique talents and aspirations. Recruiting should be about connection, not just collection of data points.",
    "At WeNext Africa, we're building a platform that puts humanity back into hiring. We're creating tools that help recruiters see beyond the resume, understand the person behind the application, and make meaningful connections that benefit both candidates and companies.",
    "This isn't just about finding jobs or filling positions. It's about building careers, fostering growth, and creating opportunities that transform lives.",
    "Join us in reimagining what recruiting can be through conversations about Recruitment Realities. Together, we'll build a future where every talent finds their place, and every company finds the people who will drive their success.",
  ],
  author: {
    signatureName: "Geoffrey Kambare",
    
    name: "Geoffrey Nhamo Kambare",
    
    role: "CEO-WeNext Africa",
  },
};

export default function Manifesto() {
  return (
    <WaitlistWrapper>
      <div className="flex flex-col gap-4">
        <div className="text-slate-11 text-pretty text-start">
          {manifestoContent.body.map((paragraph, index) => (
            <p 
              key={index} 
              className="tracking-tight leading-[1.6] mb-3 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 items-start">
            <p
              className={clsx(
                "text-slate-12 text-4xl font-medium italic transform -rotate-12 mb-2",
                font.className
              )}
            >
              {manifestoContent.author.signatureName}
            </p>
            <p className="text-slate-11 text-sm font-medium">
              {manifestoContent.author.name}
            </p>
            <p className="text-slate-10 text-xs">
              {manifestoContent.author.role}
            </p>
          </div>
        </div>
      </div>
    </WaitlistWrapper>
  );
}
