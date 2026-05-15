import { useEffect, useState } from 'react';
import { MessageSquare, ChevronUp, ChevronDown, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GlobalChat() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const scriptId = 'disqus-script';
    const configName = 'disqus_config';

    // Set configuration
    (window as any)[configName] = function() {
      this.page.url = window.location.origin;
      this.page.identifier = 'capital-prime-global-chat';
    };

    if (!document.getElementById(scriptId)) {
      const s = document.createElement('script');
      s.id = scriptId;
      s.src = 'https://capital-prime.disqus.com/embed.js';
      s.setAttribute('data-timestamp', String(+new Date()));
      s.async = true;
      s.onerror = () => {
        // Log quietly to avoid triggering generic "Script error" alerts if possible
        console.debug('Disqus loading failed - likely blocked');
        const thread = document.getElementById('disqus_thread');
        if (thread) {
          thread.innerHTML = `
            <div class="flex flex-col items-center justify-center py-10 text-center gap-3">
              <p class="text-on-surface-variant text-xs font-mono uppercase tracking-widest">Discussion Terminal Offline</p>
              <p class="text-on-surface-variant/60 text-[10px] max-w-[200px]">The external chat service could not be reached. This may be due to an ad-blocker or connection issue.</p>
            </div>
          `;
        }
      };
      document.body.appendChild(s);
    } else if (typeof (window as any).DISQUS !== 'undefined') {
      try {
        (window as any).DISQUS.reset({
          reload: true,
          config: (window as any)[configName]
        });
      } catch (err) {
        // Silently handle reset errors
      }
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 px-4 pointer-events-none">
      <div className="max-w-4xl mx-auto flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 400, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full bg-surface-container border border-outline-variant rounded-t-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
            >
              <div className="bg-surface-container-high px-5 py-3 border-b border-outline-variant flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <span className="font-mono text-xs font-black uppercase tracking-widest text-on-surface">Live Terminal Chat</span>
                 </div>
                 <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-surface-container-highest rounded-lg transition-colors"
                 >
                    <ChevronDown className="w-5 h-5 text-on-surface-variant" />
                 </button>
              </div>
              <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
                <div id="disqus_thread"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <motion.button
            layoutId="chat-trigger"
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto flex items-center gap-3 bg-primary text-on-primary px-5 py-2.5 rounded-t-2xl rounded-b-sm shadow-xl shadow-primary/30 hover:brightness-110 hover:-translate-y-0.5 transition-all border border-primary/40 active:scale-95"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5" />
              <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-loss rounded-full border-2 border-primary"></div>
            </div>
            <span className="font-mono text-xs font-black uppercase tracking-widest">Open Chat Terminal</span>
            <ChevronUp className="w-5 h-5 opacity-70" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
