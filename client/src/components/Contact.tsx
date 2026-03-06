import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function ContactPanel({ isOpen, onClose, onOpen }: ContactPanelProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setSent(false);
        setForm({ name: "", email: "", message: "" });
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => onClose(), 2500);
  };

  return (
    <>
      {/* 
        Trigger bubble — always rendered, just toggled with CSS scale.
        Using CSS instead of AnimatePresence unmount avoids the click-race bug
        where the button unmounts before the click event fires.
      */}
      <button
        onClick={onOpen}
        data-testid="button-contact-trigger"
        aria-label="Open contact form"
        style={{
          transform: isOpen ? "scale(0)" : "scale(1)",
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? "none" : "auto",
          transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease",
        }}
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-[var(--accent)] text-black flex items-center justify-center shadow-[0_4px_24px_var(--accent-glow)] hover:scale-110"
      >
        <MessageCircle size={22} />
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[998] bg-black/30 backdrop-blur-[2px]"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.94 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-[999] w-[340px] md:w-[380px] rounded-2xl color-white border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl overflow-hidden"
            data-testid="contact-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
              <h3 className="font-display font-bold text-[var(--text-primary)] text-lg">Contact Me</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Close contact form"
                data-testid="button-close-contact"
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-8 flex flex-col items-center gap-3 text-center"
                  >
                    <span className="text-5xl">🎉</span>
                    <p className="font-display font-bold text-[var(--text-primary)] text-lg">Message sent!</p>
                    <p className="text-[var(--text-muted)] text-sm">I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
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
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                      data-testid="input-message"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[var(--accent)] text-black font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                      data-testid="button-send-message"
                    >
                      Send Message
                      <Send size={14} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}