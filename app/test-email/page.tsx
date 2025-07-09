'use client';

import { useState } from 'react';

export default function TestEmailPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);

  const sendTestEmail = async () => {
    try {
      setStatus('loading');
      
      const response = await fetch('/api/test-email');
      const data = await response.json();
      
      setResult(data);
      setStatus(data.success ? 'success' : 'error');
    } catch (error) {
      console.error('Test email error:', error);
      setResult({ error: String(error) });
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Email Configuration Test</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Current Email Configuration</h2>
        <p className="mb-2">This page will test your email configuration by sending a test email.</p>
        <p className="text-sm text-gray-600">
          The test will use the SMTP settings from your .env.local file.
        </p>
      </div>
      
      <button
        onClick={sendTestEmail}
        disabled={status === 'loading'}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Send Test Email'}
      </button>
      
      {result && (
        <div className={`mt-6 p-4 rounded-lg ${status === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
          <h3 className="font-semibold mb-2">
            {status === 'success' ? 'Email Sent Successfully!' : 'Email Test Failed'}
          </h3>
          <pre className="bg-white p-3 rounded overflow-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-8 border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Troubleshooting Tips</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Make sure your SMTP credentials are correct in <code>.env.local</code></li>
          <li>Check if your email provider requires specific security settings</li>
          <li>Some email providers may block emails sent from local development environments</li>
          <li>Check the browser console and server logs for detailed error messages</li>
        </ul>
      </div>
    </div>
  );
}