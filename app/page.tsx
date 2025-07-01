import { InputForm } from "@/components/waitlist-form";
import { WaitlistWrapper } from "@/components/box";
import { CountdownTimer } from "@/components/countdown-timer";
import { NewsletterDownloadButton } from "@/components/newsletter-download-button";
import { Metadata } from "next";

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
      <div className="w-full -mt-4">
        <div className="text-center space-y-3">
          <h3 className="text-lg font-semibold text-slate-12">
            🚀 Recruitment Realities 1.0 Launch
          </h3>
          <div className="bg-gradient-to-r from-orange-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-orange-200 dark:border-slate-600">
            <CountdownTimer targetDate="2025-07-22T00:00:00Z" />
          </div>
        </div>
      </div>
      
      {/* Heading */}
      <div className="space-y-1 mt-6">
        <h1 className="text-2xl sm:text-3xl font-medium text-slate-12 whitespace-pre-wrap text-pretty">
          {waitlistContent.title}
        </h1>
        <div className="text-slate-10 tracking-tight text-pretty">
          <p>{waitlistContent.subtitle}</p>
        </div>
      </div>
      {/* Form */}
      <div className="px-1 flex flex-col w-full self-stretch">
        <InputForm
          buttonCopy={{
            idle: waitlistContent.button.idle,
            success: waitlistContent.button.success,
            loading: waitlistContent.button.loading,
          }}
          formAction={async (data) => {
            "use server";
            try {
              const email = data.get("email")?.toString();
              const phone = data.get("phone")?.toString();
              const userType = data.get("userType")?.toString();
              
              // Validate email
              if (!email || !email.includes("@")) {
                return {
                  success: false,
                  error: "Please enter a valid email address",
                };
              }
              
              // Validate phone
              if (!phone || phone.length < 8) {
                return {
                  success: false,
                  error: "Please enter a valid phone number",
                };
              }
              
              // Validate user type
              if (!userType || !["job-seeker", "hr-expert", "recruiter"].includes(userType)) {
                return {
                  success: false,
                  error: "Please select your role",
                };
              }
              
              // Send email notification (using test endpoint for now)
              const response = await fetch('/api/test-form', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, phone, userType }),
              });

              const result = await response.json();
              
              if (!result.success) {
                return {
                  success: false,
                  error: result.error || "Failed to send notification email",
                };
              }

              return { success: true };
            } catch (error) {
              console.error("Waitlist signup error:", error);
              return {
                success: false,
                error: "There was an error while submitting the form",
              };
            }
          }}
        />
        
        {/* Newsletter Download Button */}
        <div className="mt-4">
          <NewsletterDownloadButton />
        </div>
      </div>
    </WaitlistWrapper>
  );
}
