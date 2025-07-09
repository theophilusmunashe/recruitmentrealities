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
    "**The recruiting field is broken**. Or **Is It**. For too long, candidates have felt they are treated as **commodities**. Reduced to **statistics**. Known and referred to by \"keywords on their resume\". Worst of all **filtered by algorithms** that miss the **human story** behind every applicant and every position.",
    "We at **WeNext Africa** strongly believe that every person deserves to be seen, heard, and valued for their **unique talents, skills, attributes diversity and aspirations**. Recruiting should therefore, be about **connection of and not just collection of data points**.",
    "At WeNext Africa, we are building a **solution that puts humanity back into hiring**. We're creating **tools and a platform** that help recruiters **see beyond the resume**, and **understand the person behind the application**, and **make meaningful connections that benefit both candidates and companies**.",
    "The solution comes as **a tool for candidates** to **upskill**, increase their **employability level** and help them become **industry-ready**. This is more than a **mere job board,** it leverages on AI to rank candidates and match them to potential employers and vice versa.",
    "This **revolution and innovation** is not just about **finding jobs or filling positions**. It's about **building careers, fostering growth, and creating opportunities that transform lives**.",
    "WeNext Africa brings you **Recruitment Realities**.",
    "Join us in **reimagining what recruiting can be through conversations**.",
    "These are **candid dialogue episodes**, which **highlight issues and challenges,** as well as **create a robust platform to collectively co-create sustainable solutions**.",
    "Thus is an **open invitation** to all **right minded and progressive job seekers, talent experts and employers** to **come forward and we build a future** where every **genuine talent finds their place**, and every **employer finds the right talent mix** who will drive their success.",
    "**The next best thing in Talent Processing**",
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
              {paragraph.split(/(\*\*.*?\*\*)/).map((part, partIndex) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  // Extract the text between ** markers and render it bold
                  const boldText = part.slice(2, -2);
                  return <strong key={partIndex}>{boldText}</strong>;
                }
                return part;
              })}
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
