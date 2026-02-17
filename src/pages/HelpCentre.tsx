import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const helpData: Record<string, { title: string; items: { q: string; a: string }[] }> = {
  help: {
    title: "Help Centre",
    items: [
      { q: "How do I post a gig?", a: "Click 'Post a Gig' from the navbar, fill in the details like title, category, budget, and description, then hit Publish." },
      { q: "How do I apply for a gig?", a: "Browse gigs, click on one you're interested in, and click 'Apply Now'. Fill in your details and submit." },
      { q: "How does payment work?", a: "Payments are handled directly between the poster and the hustler. HustleHub facilitates the connection — budget is agreed upfront in INR." },
      { q: "Can I edit or delete my gig after posting?", a: "Currently, once a gig is posted it stays live. We're working on edit/delete functionality." },
      { q: "How do I contact the gig poster?", a: "After your application is accepted, the poster's contact details will be shared with you via email notification." },
      { q: "Is HustleHub free to use?", a: "Yes! HustleHub is completely free for students. No hidden fees." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    items: [
      { q: "What data do we collect?", a: "We collect your name, email, college, department, and year of study to create your profile and facilitate gig connections." },
      { q: "How is my data used?", a: "Your data is used solely to match you with gigs and hustlers. We never sell your data to third parties." },
      { q: "Can I delete my account?", a: "Yes, you can request account deletion by contacting us. All your data will be permanently removed." },
      { q: "Is my information visible to everyone?", a: "Only your name, department, year, and rating are visible on gig listings. Your email is only shared when a connection is made." },
    ],
  },
  terms: {
    title: "Terms of Service",
    items: [
      { q: "Who can use HustleHub?", a: "HustleHub is open to all college students. You must be currently enrolled in a recognized institution." },
      { q: "What kind of gigs are allowed?", a: "Only legal, academic, and professional micro-gigs. No illegal activities, spam, or misleading listings." },
      { q: "What happens if a dispute arises?", a: "We encourage users to resolve disputes directly. HustleHub can mediate but is not responsible for payment disputes." },
      { q: "Can my account be suspended?", a: "Yes, accounts violating community guidelines (spam, fraud, harassment) may be suspended without notice." },
    ],
  },
  guidelines: {
    title: "Community Guidelines",
    items: [
      { q: "Be Respectful", a: "Treat every student with respect. No harassment, discrimination, or abusive language." },
      { q: "Be Honest", a: "Provide accurate information about your skills, experience, and gig requirements. Don't misrepresent yourself." },
      { q: "Deliver Quality Work", a: "If you commit to a gig, deliver quality work on time. Your reputation depends on it." },
      { q: "Fair Pricing", a: "Set reasonable budgets. Remember, these are student-to-student gigs — keep it fair and accessible." },
    ],
  },
  contact: {
    title: "Contact Us",
    items: [
      { q: "How can I reach HustleHub?", a: "Email us at verifiedhustlehub@gmail.com" },
      { q: "How quickly will I get a response?", a: "We aim to respond within 24 hours during weekdays." },
      { q: "I found a bug, where do I report it?", a: "Send bug reports to verifiedhustlehub@gmail.com with a screenshot and description of the issue." },
    ],
  },
};

const HelpCentre = () => {
  const location = useLocation();
  const page = new URLSearchParams(location.search).get("page") || "help";
  const data = helpData[page] || helpData.help;
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold mb-2">{data.title}</h1>
          <p className="text-muted-foreground mb-8">Everything you need to know.</p>

          <div className="space-y-3">
            {data.items.map((item, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-heading text-sm font-semibold">{item.q}</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
                </button>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCentre;
