import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/mockData";
import { getSession } from "@/lib/authStore";
import { useToast } from "@/hooks/use-toast";

const GIG_FORM_URL = "https://airtable.com/appbUibQs2XIrnY6U/pagk2kYlarqT5xltv/form";

const PostGig = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getSession();

  const [form, setForm] = useState({
    title: "",
    category: "",
    locationType: "",
    description: "",
    meetupDetails: "",
    whatINeedHelp: "",
    budget: "",
    deadline: "",
    skills: "",
    posterName: user?.name || "",
    posterDepartment: user?.department || "",
    posterYear: user?.year || "",
  });

  const update = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.budget || !form.description) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    // Redirect to Airtable Form
    window.open(GIG_FORM_URL, "_blank");

    toast({
      title: "Redirecting to secure submission...",
    });

    navigate("/browse");
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all";

  const labelClass =
    "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block";

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8"
        >
          <h1 className="font-heading text-2xl font-bold mb-1">
            Create a New Gig
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Ready to find your next star performer? Post it in minutes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass}>Gig Title *</label>
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Category *</label>
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Budget (₹) *</label>
              <input
                type="number"
                className={inputClass}
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Description *</label>
              <textarea
                className={`${inputClass} min-h-[120px]`}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="gradient-btn w-full rounded-xl py-3.5 text-sm flex items-center justify-center gap-2"
            >
              Publish Gig <Send className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PostGig;
