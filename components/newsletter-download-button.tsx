"use client";

export function NewsletterDownloadButton() {
  const handleDownload = () => {
    // For now, show an alert. Replace with actual download when PDF is ready
    alert('Newsletter download coming soon! 📧 Join our waitlist to be notified when it\'s available.');
    
    // TODO: Uncomment when you have the newsletter PDF ready
    // const link = document.createElement('a');
    // link.href = '/assets/recruit-realities-newsletter.pdf';
    // link.download = 'Recruit-Realities-Newsletter.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:bg-white dark:hover:bg-gray-100 text-black font-medium py-3 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 dark:border dark:border-gray-300"
    >
      <span>📥</span>
      <span>Download Our Newsletter</span>
    </button>
  );
}