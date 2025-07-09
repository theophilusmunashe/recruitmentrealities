"use client";

import { useState } from "react";

export default function EmailTestPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<any>(null);

  const testEmail = async () => {
    try {
      setStatus("loading");
      const response = await fetch("/api/test-email");
      const data = await response.json();
      
      setResult(data);
      setStatus(data.success ? "success" : "error");
    } catch (error) {
      console.error("Test email error:", error);
      setResult({ error: "Failed to test email" });
      setStatus("error");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Email Configuration Test</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Current Email Configuration</h2>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex flex-col">
            <span className="font-medium">SMTP Host:</span>
            <code className="bg-gray-200 px-2 py-1 rounded">{process.env.NEXT_PUBLIC_SMTP_HOST || "Not set (using .env.local)"}</code>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">SMTP Port:</span>
            <code className="bg-gray-200 px-2 py-1 rounded">{process.env.NEXT_PUBLIC_SMTP_PORT || "Not set (using .env.local)"}</code>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Notification Email:</span>
            <code className="bg-gray-200 px-2 py-1 rounded">{process.env.NEXT_PUBLIC_NOTIFICATION_EMAIL || "Not set (using .env.local)"}</code>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <button
          onClick={testEmail}
          disabled={status === "loading"}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
        >
          {status === "loading" ? "Sending Test Email..." : "Send Test Email"}
        </button>
        
        {result && (
          <div className={`p-4 rounded-lg ${status === "success" ? "bg-green-100" : "bg-red-100"}`}>
            <h3 className="font-semibold mb-2">
              {status === "success" ? "Email Sent Successfully!" : "Email Test Failed"}
            </h3>
            <pre className="bg-white p-3 rounded overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div className="mt-8 border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Troubleshooting Tips</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Make sure your SMTP credentials are correct in <code>.env.local</code></li>
          <li>Check if your email provider requires specific security settings</li>
          <li>For Gmail, you need to use an App Password if 2FA is enabled</li>
          <li>Some email providers may block emails sent from local development environments</li>
          <li>Check the browser console and server logs for detailed error messages</li>
        </ul>
      </div>
    </div>
  );
}