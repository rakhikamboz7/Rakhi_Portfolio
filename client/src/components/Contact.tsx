import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";
import { useState } from "react";

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function ContactPanel({ isOpen, onClose, onOpen }: ContactPanelProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); onClose(); }, 2500);
  };

  return (
    <>
      {/* Floating trigger button (always visible when panel closed) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={onOpen}
            data-testid="button-contact-trigger"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--accent)] text-black flex items-center justify-center shadow-[0_4px_24px_var(--accent-glow)] hover:scale-105 transition-transform duration-200"
            aria-label="Open contact"
          >
            <MessageCircle size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Slide-in panel from right-bottom — matches benrobo image */}
            <motion.div
              initial={{ opacity: 0, x: 80, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, y: 20, scale: 0.92 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-6 right-6 z-50 w-[340px] md:w-[380px] rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl overflow-hidden"
              data-testid="contact-panel"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                <h3 className="font-display font-bold text-[var(--text-primary)] text-lg">Contact Me</h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                  aria-label="Close"
                  data-testid="button-close-contact"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 flex flex-col items-center gap-3 text-center"
                  >
                    <span className="text-4xl">🎉</span>
                    <p className="font-display font-bold text-[var(--text-primary)]">Message sent!</p>
                    <p className="text-[var(--text-muted)] text-sm">I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                      data-testid="input-name"
                    />
                    <input
                      type="email"
                      placeholder="johndoe@mail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                      data-testid="input-email"
                    />
                    <textarea
                      placeholder="Message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                      data-testid="input-message"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[var(--text-primary)] text-[var(--bg)] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[var(--accent)] hover:text-black transition-all duration-200"
                      data-testid="button-send-message"
                    >
                      Send Message
                      <Send size={14} />
                    </button>
                  </>
                )}
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}