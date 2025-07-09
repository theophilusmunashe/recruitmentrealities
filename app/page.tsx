import { InputForm } from "@/components/waitlist-form";
import { WaitlistWrapper } from "@/components/box";
import { CountdownTimer } from "@/components/countdown-timer";
import { NewsletterDownloadButton } from "@/components/newsletter-download-button";
import { Metadata } from "next";
import { submitWaitlistForm } from "./actions";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Join Those Attending   | Recruitment Realities",
  description: "Be the first to register to attend. Join our attendance list today.",
  openGraph: {
    type: "website",
    title: "Join Those Attending | Recruitment Realities",
    description: "Be the first to register to attend. Join our attendance list today.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Those Attending | Recruitment Realities",
    description: "Be the first to register to attend. Join our attendance list today.",
  },
};

// Static content configuration - EDIT THESE VALUES
const waitlistContent = {
  title: "Recruitment Is Broken. Let's Fix It Together!",
  subtitle: "Are you a job seeker, recruiter, or HR Professional? Join our attendance list for the upcoming Recruitment Realities event! We're excited to have you. Don't miss out on this opportunity to connect with industry professionals and learn about recruitment realities. Read our Manifesto at the top for more !!! See you there!",
  button: {
    idle: "Join Attendance List",
    success: "Successfully joined!",
    loading: "Joining...",
  },
};

export default function Home() {
  return (
    <WaitlistWrapper>
      {/* Countdown Timer */}
      <div className="w-full -mt-2 sm:-mt-4">
        <div className="text-center space-y-2 sm:space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-slate-12">
            🚀 Recruitment Realities 1.0 Launch
          </h3>
          <div className="bg-gradient-to-r from-orange-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-2xl p-3 sm:p-6 border border-orange-200 dark:border-slate-600">
            <CountdownTimer targetDate="2025-07-22T00:00:00Z" />
          </div>
        </div>
      </div>
      
      {/* Heading */}
      <div className="space-y-1 mt-4 sm:mt-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-12 text-pretty break-words">
          {waitlistContent.title}
        </h1>
        <div className="text-sm sm:text-base text-slate-10 tracking-tight text-pretty">
          <p className="break-words">{waitlistContent.subtitle}</p>
        </div>
      </div>
      {/* Form */}
      <div className="px-0 sm:px-1 flex flex-col w-full self-stretch">
        <InputForm
          buttonCopy={{
            idle: waitlistContent.button.idle,
            success: waitlistContent.button.success,
            loading: waitlistContent.button.loading,
          }}
          formAction={submitWaitlistForm}
        />
        
        {/* Newsletter Download Button */}
        <div className="mt-4">
          <NewsletterDownloadButton />
        </div>
      </div>
    </WaitlistWrapper>
  );
}
