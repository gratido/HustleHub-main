import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, CheckCircle2, Zap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { getSession, User } from "@/lib/authStore";
import { getGigs, type Gig } from "@/lib/mockData";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUser(session);
  }, [navigate]);

  if (!user) return null;

  const allGigs = getGigs();
  const postedGigs = allGigs.filter(g => g.postedBy.email === user.email);
  const isHustler = user.role === "hustler" || user.role === "both";
  const isPoster = user.role === "poster" || user.role === "both";

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="h-24 w-24 rounded-2xl bg-muted" />
              {isHustler && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-primary/20 border border-primary/30 px-3 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider whitespace-nowrap">
                  ✓ Verified Hustler
                </span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="font-heading text-2xl font-bold">{user.name}</h1>
                {isHustler && (
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent flex items-center gap-1">
                    <Zap className="h-3 w-3" /> Pro Peer
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {user.year} • {user.department} • {user.college}
              </p>
              <div className="flex items-center gap-6 mt-3">
                <span className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-yellow fill-yellow" />
                  <span className="font-semibold">{user.rating || "New"}</span>
                  <span className="text-muted-foreground text-xs">Reputation</span>
                </span>
                <span className="flex items-center gap-1 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{user.gigsCompleted}</span>
                  <span className="text-muted-foreground text-xs">Gigs Completed</span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Bio */}
              <div className="glass-card p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Bio</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {user.bio || "No bio added yet. Tell the community about yourself!"}
                </p>
              </div>

              {/* Skills - only for hustlers */}
              {isHustler && user.skills.length > 0 && (
                <div className="glass-card p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">My Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map(skill => (
                      <span key={skill} className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - History */}
            <div className="lg:col-span-2">
              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {isPoster ? "Posted Gigs" : "Hustle Portfolio"}
                  </h3>
                </div>

                {postedGigs.length > 0 ? (
                  <div className="space-y-4">
                    {postedGigs.map(gig => (
                      <div key={gig.id} className="glass-card p-4 cursor-pointer hover:border-primary/30 transition-colors" onClick={() => navigate(`/gig/${gig.id}`)}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                            gig.status === "Open" ? "bg-emerald-500/20 text-emerald-400" : "bg-yellow/20 text-yellow"
                          }`}>
                            {gig.status}
                          </span>
                          <span className="text-sm font-semibold text-primary">₹{gig.budget.toLocaleString("en-IN")}</span>
                        </div>
                        <h4 className="font-heading text-sm font-semibold mt-1">{gig.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{gig.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Briefcase className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No gigs yet. Start posting or applying!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
