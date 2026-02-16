import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, Clock, IndianRupee, MapPin, Star, CheckCircle2,
  Share2, Heart, Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { getGigs, getApplicantCount, categoryStyles } from "@/lib/mockData";
import ApplyModal from "@/components/ApplyModal";

const GigDetail = () => {
  const { id } = useParams();
  const allGigs = getGigs();
  const gig = allGigs.find((g) => g.id === id);
  const [applyOpen, setApplyOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  if (!gig) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Gig not found.</p>
      </div>
    );
  }

  const applicantCount = getApplicantCount(gig);
  const otherGigs = allGigs.filter((g) => g.id !== id).slice(0, 2);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <Link to="/browse" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Browse
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`category-chip ${categoryStyles[gig.category]}`}>{gig.category}</span>
                <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  {gig.locationType}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <h1 className="font-heading text-2xl font-bold sm:text-3xl leading-tight max-w-xl">{gig.title}</h1>
                <div className="flex gap-2">
                  <button className="rounded-full bg-secondary p-2.5 hover:bg-muted transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="rounded-full bg-secondary p-2.5 hover:bg-muted transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Posted {new Date(gig.datePosted).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {gig.locationType}
                </span>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {gig.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {skill}
                </span>
              ))}
            </div>

            {/* The Hustle */}
            <div>
              <h2 className="font-heading text-lg font-semibold mb-2">The Hustle</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{gig.description}</p>
            </div>

            {/* Meetup Location */}
            <div className="glass-card p-4 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold">Meetup Location</p>
                <p className="text-sm text-muted-foreground italic">"{gig.meetupDetails}"</p>
              </div>
            </div>

            {/* What I Need Help With */}
            <div>
              <h2 className="font-heading text-lg font-semibold mb-3">What I Need Help With</h2>
              <div className="space-y-2">
                {gig.whatINeedHelp.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Poster Profile */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-4">
                <img src={gig.postedBy.avatar} alt={gig.postedBy.name} className="h-16 w-16 rounded-2xl bg-muted" />
                <div>
                  <h3 className="font-heading text-base font-semibold">{gig.postedBy.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {gig.postedBy.department} • {gig.postedBy.year}
                  </p>
                  <p className="text-xs text-muted-foreground">{gig.postedBy.college}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-sm">
                      <Star className="h-3.5 w-3.5 text-yellow fill-yellow" />
                      <span className="font-medium">{gig.postedBy.rating}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {gig.postedBy.hustlesCompleted} Hustles Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-5"
          >
            <div className="glass-card p-6 sticky top-24">
              <div className="flex items-baseline justify-between mb-6">
                <p className="font-heading text-3xl font-bold">₹{gig.budget.toLocaleString("en-IN")}</p>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Project Budget</span>
              </div>

              <button onClick={() => setApplyOpen(true)} className="gradient-btn w-full rounded-xl py-3 text-sm font-semibold mb-4">
                Apply Now →
              </button>

              <div className="grid grid-cols-3 gap-3 text-center mb-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Deadline</p>
                  <p className="font-heading text-sm font-semibold">
                    {new Date(gig.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Response</p>
                  <p className="font-heading text-sm font-semibold">~4h</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Applicants</p>
                  <p className="font-heading text-sm font-semibold">{applicantCount}</p>
                </div>
              </div>

              {otherGigs.length > 0 && (
                <div className="mt-6 pt-5 border-t border-border/50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Other Campus Hustles
                  </p>
                  {otherGigs.map((g) => (
                    <Link key={g.id} to={`/gig/${g.id}`} className="block mb-3 hover:text-primary transition-colors">
                      <p className="text-sm font-medium">{g.title}</p>
                      <p className="text-xs text-muted-foreground">
                        ₹{g.budget.toLocaleString("en-IN")} •{" "}
                        {Math.ceil((new Date(g.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}d left
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <ApplyModal gig={gig} open={applyOpen} onClose={() => { setApplyOpen(false); setRefreshKey(k => k + 1); }} />
    </div>
  );
};

export default GigDetail;
