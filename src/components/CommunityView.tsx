import { useEffect } from 'react';

/**
 * CommunityView component integrates Disqus for discussion.
 */
export default function CommunityView() {
  useEffect(() => {
    // Check if script already exists to avoid duplication
    if (!document.getElementById('disqus-script')) {
      const d = document;
      const s = d.createElement('script');
      s.id = 'disqus-script';
      s.src = 'https://capital-prime.disqus.com/embed.js';
      s.setAttribute('data-timestamp', String(+new Date()));
      (d.head || d.body).appendChild(s);
    } else {
      // If it exists, we might need to reset/reload it for the new page view if it was cached
      // But standard Disqus behavior often handles this or needs a 'reset' call if dynamic
      // For this applet, a fresh render of the thread div is usually enough
      if (typeof (window as any).DISQUS !== 'undefined') {
        (window as any).DISQUS.reset({
          reload: true,
        });
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="space-y-2 mb-4">
        <h2 className="text-2xl font-bold text-on-surface font-display">Trader Community</h2>
        <p className="text-on-surface-variant text-sm font-medium">Discuss market trends, SGX news, and portfolio strategies with other traders.</p>
      </div>

      <div className="bg-surface-container rounded-xl p-6 border border-outline-variant shadow-lg mb-10 min-h-[400px]">
        <div id="disqus_thread"></div>
        <noscript>
          Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
        </noscript>
      </div>
    </div>
  );
}
