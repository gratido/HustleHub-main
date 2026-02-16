import { useState } from "react";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Gig } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const APPLICATION_FORM_URL = "https://airtable.com/appbUibQs2XIrnY6U/pag9Pwiqmunz7vThL/form";

interface ApplyModalProps {
  gig: Gig;
  open: boolean;
  onClose: () => void;
}

const ApplyModal = ({ gig, open, onClose }: ApplyModalProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    whyYou: "",
  });

  const update = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.whyYou) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    window.open(APPLICATION_FORM_URL, "_blank");

    toast({
      title: "Redirecting to application form...",
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="relative glass-card w-full max-w-lg p-6"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-heading text-xl font-bold mb-6">
              Apply to {gig.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5"
              />

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5"
              />

              <textarea
                placeholder="Why are you the best fit?"
                value={form.whyYou}
                onChange={(e) => update("whyYou", e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 min-h-[100px]"
              />

              <button
                type="submit"
                className="gradient-btn w-full rounded-xl py-3 text-sm flex items-center justify-center gap-2"
              >
                Submit Application <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ApplyModal;
