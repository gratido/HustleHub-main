import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, CheckCircle2, Zap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { getSession, User } from "@/lib/authStore";
import { getGigs } from "@/lib/mockData";

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
  const postedGigs = allGigs.filter(
    (g) => g.postedBy.email === user.email
  );

  const isHustler = user.role === "hustler" || user.role === "both";
  const isPoster = user.role === "poster" || user.role === "both";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background-dark text-white pt-24 pb-16">

      {/* Background Glow Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-secondary/20 blur-[100px] rounded-full -z-10"></div>

      <div className="container max-w-6xl">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* ================= HEADER ================= */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 mb-16">

            {/* Profile Image */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>

              <img
                src={user.avatar}
                alt={user.name}
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover border-4 border-white/10 shadow-2xl"
              />

              {isHustler && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-surface-dark px-4 py-1.5 rounded-full shadow-lg border border-white/10 flex items-center gap-2 whitespace-nowrap">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold tracking-tight">
                    Verified Hustler
                  </span>
                </div>
              )}
            </div>

            {/* Name + Stats */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  {user.name}
                </h1>

                {isHustler && (
                  <span className="bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 w-fit mx-auto md:mx-0">
                    <Zap className="h-3 w-3" /> PRO PEER
                  </span>
                )}
              </div>

              <p className="text-lg font-medium text-slate-400">
                {user.year} • {user.department} • {user.college}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-lg font-bold">
                    {user.rating || "New"}
                  </span>
                  <span className="text-slate-400 text-sm font-medium">
                    Reputation
                  </span>
                </div>

                <div className="hidden md:block h-4 w-px bg-white/20"></div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-lg font-bold">
                    {user.gigsCompleted}
                  </span>
                  <span className="text-slate-400 text-sm font-medium">
                    Gigs Completed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= MAIN GRID ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT COLUMN */}
            <div className="space-y-8">

              {/* BIO */}
              <section className="glass-card p-8 rounded-3xl">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">
                  Bio
                </h2>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {user.bio || "No bio added yet."}
                </p>
              </section>

              {/* SKILLS */}
              {isHustler && user.skills.length > 0 && (
                <section className="glass-card p-8 rounded-3xl">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6">
                    Skill Badges
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {user.skills.map((skill) => (
                      <div
                        key={skill}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold flex items-center gap-2 hover:border-primary/50 transition-colors"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-2">
              <section className="glass-card p-8 rounded-3xl h-full">

                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-8">
                  {isPoster ? "Posted Gigs" : "Hustle History"}
                </h2>

                {postedGigs.length > 0 ? (
                  <div className="relative pl-6 border-l-2 border-primary/30 space-y-6">

                    {postedGigs.map((gig) => (
                      <div
                        key={gig.id}
                        onClick={() => navigate(`/gig/${gig.id}`)}
                        className="bg-primary/5 border border-primary/20 p-6 rounded-2xl hover:bg-primary/10 transition-all cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[10px] bg-primary text-white px-3 py-1 rounded font-black uppercase tracking-wider">
                            {gig.status}
                          </span>
                          <span className="text-primary font-black">
                            ₹{gig.budget.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-lg mb-1">
                          {gig.title}
                        </h3>

                        <p className="text-sm text-slate-400">
                          {gig.description}
                        </p>
                      </div>
                    ))}

                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Briefcase className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">
                      No gigs yet. Start posting or applying!
                    </p>
                  </div>
                )}

              </section>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Floating Milestone */}
      <div className="fixed bottom-10 right-10 z-50">
        <div className="glass-card p-4 rounded-2xl flex items-center gap-4 border-l-4 border-primary">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center text-white">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-primary">
              Reputation Milestone
            </p>
            <p className="text-sm font-bold">
              Top 5% of campus developers!
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
