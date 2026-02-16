import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, User, Mail, Lock, Eye, EyeOff, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { registerUser, loginUser } from "@/lib/authStore";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    year: "",
    college: "",
    bio: "",
    role: "both" as "poster" | "hustler" | "both",
    skills: "",
  });

  const update = (key: string, value: string) => setForm(p => ({ ...p, [key]: value }));

  const inputClass = "w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 pl-11 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        loginUser(form.email, form.password);
        toast({ title: "Welcome back! 🎉" });
      } else {
        if (form.password !== form.confirmPassword) {
          toast({ title: "Passwords don't match", variant: "destructive" });
          return;
        }
        if (form.password.length < 8) {
          toast({ title: "Password must be at least 8 characters", variant: "destructive" });
          return;
        }
        registerUser({
          name: form.name,
          email: form.email,
          password: form.password,
          department: form.department,
          year: form.year,
          college: form.college,
          bio: form.bio,
          role: form.role,
          skills: form.skills.split(",").map(s => s.trim()).filter(Boolean),
        });
        toast({ title: "Account created! 🚀", description: "Welcome to HustleHub." });
      }
      navigate("/");
      window.location.reload();
    } catch (err: any) {
      toast({ title: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden" style={{ background: "linear-gradient(160deg, hsl(252, 60%, 30%), hsl(344, 70%, 45%), hsl(300, 50%, 40%))" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-transparent" />
        <div className="relative z-10 p-12 max-w-lg">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-2xl font-bold text-white">
              Hustle<span className="text-primary">Hub</span>
            </span>
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-tight text-white mb-4">
            Your Campus{" "}
            <span className="gradient-text">Hustle Starts Here.</span>
          </h1>

          <p className="text-white/70 text-lg mb-8">
            The peer-to-peer marketplace where you hire your classmates for tasks, and get paid for your skills.
          </p>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["Aneka", "Rohan", "Priya"].map(seed => (
                <img key={seed} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} className="h-8 w-8 rounded-full border-2 border-white/20 bg-muted" alt="" />
              ))}
            </div>
            <span className="text-sm text-white/80">Join 320+ student earners</span>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <h2 className="font-heading text-2xl font-bold mb-1">
            {isLogin ? "Welcome Back" : "Create Account!"}
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            {isLogin ? "Log in with your credentials." : "Join your university's exclusive hustle network."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
                <User className="absolute left-3 top-[34px] h-4 w-4 text-muted-foreground" />
                <input className={inputClass} placeholder="Alex Johnson" value={form.name} onChange={e => update("name", e.target.value)} required />
              </div>
            )}

            <div className="relative">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{isLogin ? "University Email" : "Email"}</label>
              <Mail className="absolute left-3 top-[34px] h-4 w-4 text-muted-foreground" />
              <input type="email" className={inputClass} placeholder="name@university.edu" value={form.email} onChange={e => update("email", e.target.value)} required />
            </div>

            <div className="relative">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{isLogin ? "Password" : "Create Password"}</label>
              <Lock className="absolute left-3 top-[34px] h-4 w-4 text-muted-foreground" />
              <input type={showPassword ? "text" : "password"} className={inputClass} placeholder={isLogin ? "••••••••" : "Min. 8 characters"} value={form.password} onChange={e => update("password", e.target.value)} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[34px] text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {!isLogin && (
              <>
                <div className="relative">
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Confirm Password</label>
                  <Lock className="absolute left-3 top-[34px] h-4 w-4 text-muted-foreground" />
                  <input type="password" className={inputClass} placeholder="Repeat your password" value={form.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} required />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">College</label>
                    <GraduationCap className="absolute left-3 top-[34px] h-4 w-4 text-muted-foreground" />
                    <input className={inputClass} placeholder="IIT Delhi" value={form.college} onChange={e => update("college", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Department</label>
                    <input className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" placeholder="CSE" value={form.department} onChange={e => update("department", e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Year of Study</label>
                  <select className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" value={form.year} onChange={e => update("year", e.target.value)}>
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="PG">PG</option>
                  </select>
                </div>
              </>
            )}

            <button type="submit" className="gradient-btn w-full rounded-xl py-3.5 text-sm font-semibold">
              {isLogin ? "Login to HustleHub" : "Join the Hub"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "New to the hub? " : "Already a member? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
              {isLogin ? "Create account" : "Log in"}
            </button>
          </p>

          <div className="flex justify-center gap-6 mt-6 text-xs text-muted-foreground uppercase tracking-wider">
            <span className="hover:text-primary cursor-pointer">Privacy</span>
            <span className="hover:text-primary cursor-pointer">Terms</span>
            <span className="hover:text-primary cursor-pointer">Support</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
