import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Star, CheckCircle2, Zap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { getSession, User } from "@/lib/authStore";
import { getGigs } from "@/lib/mockData";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ THIS WAS MISSING
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUser(session);
  }, [location.pathname, navigate]); // ✅ Now it works

  if (!user) return null;

  const allGigs = getGigs();
  const postedGigs = allGigs.filter(
    (g) => g.postedBy.email === user.email
  );

  const isHustler = user.role === "hustler" || user.role === "both";

  return (
    <div className="relative bg-background pt-20 pb-20">
      <div className="container max-w-6xl">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* HEADER */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 mb-14">

            {/* Avatar */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25"></div>

              <img
                src={user.avatar}
                alt={user.name}
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover border-4 border-border shadow-xl"
              />
            </div>

            {/* Name & Stats */}
            <div className="flex-1 text-center md:text-left">

              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight gradient-text">
                  {user.name}
                </h1>

                {isHustler && (
                  <span className="gradient-btn px-4 py-1 text-xs rounded-full uppercase tracking-wider flex items-center gap-1 w-fit mx-auto md:mx-0">
                    <Zap className="h-3 w-3" /> PRO PEER
                  </span>
                )}
              </div>

              <p className="text-muted-foreground">
                {user.year} • {user.department} • {user.college}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow fill-yellow" />
                  <span className="font-bold">{user.rating || "New"}</span>
                  <span className="text-muted-foreground text-sm">
                    Reputation
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-bold">{user.gigsCompleted}</span>
                  <span className="text-muted-foreground text-sm">
                    Gigs Completed
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-center md:justify-start">
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="border border-border px-6 py-2 rounded-full text-sm hover:bg-muted transition"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column */}
            <div className="space-y-8">

              <div className="glass-card p-8">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">
                  Bio
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {user.bio || "No bio added yet."}
                </p>
              </div>

              {user.skills?.length > 0 && (
                <div className="glass-card p-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6">
                    Skill Badges
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {user.skills.map((skill) => (
                      <div
                        key={skill}
                        className="px-4 py-2 bg-muted rounded-2xl text-sm font-semibold"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8">

                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-8">
                  Hustle History
                </h3>

                {postedGigs.length > 0 ? (
                  <div className="relative pl-6 border-l-2 border-primary/30 space-y-6">
                    {postedGigs.map((gig) => (
                      <div
                        key={gig.id}
                        onClick={() => navigate(`/gig/${gig.id}`)}
                        className="bg-muted p-6 rounded-2xl hover:shadow-lg transition cursor-pointer"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-xs bg-primary text-white px-3 py-1 rounded-full uppercase">
                            {gig.status}
                          </span>
                          <span className="font-bold text-primary">
                            ₹{gig.budget.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <h4 className="font-bold">{gig.title}</h4>
                        <p className="text-muted-foreground text-sm mt-1">
                          {gig.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No gigs yet. Start posting or applying!
                    </p>
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
