import { Link, useLocation } from "react-router-dom";
import { Zap, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSession, logout } from "@/lib/authStore";

const GIG_FORM_URL =
  "https://airtable.com/appbUibQs2XIrnY6U/pagk2kYlarqT5xltv/form";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState(getSession());

  useEffect(() => {
    setUser(getSession());
  }, [location]);

  const navLinks = [
    { to: "/browse", label: "Browse Gigs" },
    { to: "/#how-it-works", label: "How It Works" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span>
            Hustle<span className="text-primary">Hub</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* 🔥 Direct Gig Form Link */}
          <a
            href={GIG_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Post a Gig
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <img
                  src={user.avatar}
                  alt=""
                  className="h-7 w-7 rounded-full bg-muted"
                />
                {user.name.split(" ")[0]}
              </Link>
              <button
                onClick={() => {
                  logout();
                  setUser(null);
                  window.location.href = "/";
                }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Log In
              </Link>

              {/* 🔥 Button Version */}
              <a
                href={GIG_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-btn rounded-full px-5 py-2 text-sm"
              >
                Post a Gig
              </a>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/50 bg-background md:hidden"
          >
            <div className="container flex flex-col gap-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}

              {/* 🔥 Mobile Form Button */}
              <a
                href={GIG_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="gradient-btn rounded-full px-5 py-2 text-sm text-center"
              >
                Post a Gig
              </a>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setUser(null);
                      setOpen(false);
                      window.location.href = "/";
                    }}
                    className="text-sm font-medium text-muted-foreground hover:text-primary text-left"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Log In / Sign Up
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
