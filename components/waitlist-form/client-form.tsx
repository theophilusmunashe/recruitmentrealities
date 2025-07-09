"use client";

import { useState } from "react";
import { InputForm } from "./index";

type ClientFormProps = {
  buttonCopy: {
    idle: string;
    success: string;
    loading: string;
  };
};

export function ClientWaitlistForm({ buttonCopy }: ClientFormProps) {
  const handleFormSubmit = async (formData: FormData) => {
    try {
      const email = formData.get("email")?.toString();
      const phone = formData.get("phone")?.toString();
      const userType = formData.get("userType")?.toString();
      
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
      
      // Send email notification
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
  };

  return (
    <InputForm
      buttonCopy={buttonCopy}
      formAction={handleFormSubmit}
    />
  );
}