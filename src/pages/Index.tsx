import { Link } from "react-router-dom";
import { ArrowRight, Zap, Search, Send, Rocket, TrendingUp, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import GigCard from "@/components/GigCard";
import { getGigs, stats } from "@/lib/mockData";
import heroImage from "@/assets/hero-illustration.png";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Index = () => {
  const allGigs = getGigs();
  const featuredGigs = allGigs.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-6">
                <Zap className="h-3 w-3" /> JOIN 320+ HUSTLERS
              </div>
              <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl mb-6">
                Turn your skills into{" "}
                <span className="gradient-text">side income.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                The campus micro-gig marketplace built for students. Post a task, find skilled peers, and earn — all within your college network.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/post" className="gradient-btn rounded-full px-6 py-3 text-sm flex items-center gap-2">
                  Post a Gig <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/browse"
                  className="rounded-full border border-border bg-secondary px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Explore Marketplace
                </Link>
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }} className="hidden lg:block">
              <img src={heroImage} alt="Students collaborating" className="w-full rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="container py-8">
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-heading text-2xl font-bold gradient-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground">Three simple steps to start hustling</p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Send, title: "Post a Gig", desc: "Describe what you need help with, set a budget in ₹, and publish it to your campus network." },
              { icon: Search, title: "Find Talent", desc: "Browse skilled students who match your needs. Check their profiles, ratings, and past work." },
              { icon: Zap, title: "Get It Done", desc: "Connect, collaborate, and complete the gig. Pay securely and leave a review." },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                {...fadeUp}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gigs */}
      <section className="py-20 bg-card/20">
        <div className="container">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl font-bold">Featured Gigs</h2>
              <p className="text-muted-foreground mt-1">Hand-picked opportunities this week</p>
            </div>
            <Link to="/browse" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredGigs.map((gig, i) => (
              <GigCard key={gig.id} gig={gig} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why HustleHub */}
      <section className="py-20">
        <div className="container">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-3">Why HustleHub?</h2>
            <p className="text-muted-foreground">Skip the corporate ladder. Gain real-world experience through meaningful short-term projects.</p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Rocket, title: "Launch Your Portfolio", desc: "Every gig you complete adds to your skill graph and portfolio. Build experience that actually matters to employers." },
              { icon: Wallet, title: "Fair Payouts", desc: "Student-friendly budgets in ₹. No hidden fees. Earn real side income between classes." },
              { icon: TrendingUp, title: "Skill Growth", desc: "Work on real projects across design, code, video, and more. Level up faster than any classroom." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <motion.div {...fadeUp} className="rounded-3xl p-10 text-center" style={{ background: "var(--gradient-primary)" }}>
            <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">
              Ready to start your next <span className="text-yellow">hustle</span>?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Join the community of makers, creators, and builders shaping the future of campus work.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/browse"
                className="rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                Get Started Now
              </Link>
              <Link
                to="/post"
                className="rounded-full border-2 border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                Post a Listing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
