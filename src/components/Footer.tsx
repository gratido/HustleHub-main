import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { getSession } from "@/lib/authStore";

const GIG_FORM_URL =
  "https://airtable.com/appbUibQs2XIrnY6U/pagk2kYlarqT5xltv/form";

const Footer = () => {
  const user = getSession();

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 font-heading text-lg font-bold"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              Hustle<span className="text-primary">Hub</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              The student marketplace for micro-gigs. Find, post, and earn — all on campus.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-3">
              Marketplace
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link
                to="/browse"
                className="hover:text-primary transition-colors"
              >
                Browse Gigs
              </Link>

              {/* 🔥 Direct Form Instead of /post */}
              <a
                href={GIG_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Post a Gig
              </a>

              {user && (
                <Link
                  to="/profile"
                  className="hover:text-primary transition-colors"
                >
                  My Profile
                </Link>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-3">
              Support
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link
                to="/help?page=help"
                className="hover:text-primary transition-colors"
              >
                Help Centre
              </Link>
              <Link
                to="/help?page=privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/help?page=terms"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-3">
              Community
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link
                to="/help?page=guidelines"
                className="hover:text-primary transition-colors"
              >
                Community Guidelines
              </Link>
              <Link
                to="/help?page=contact"
                className="hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          © 2026 HustleHub. Built for students, by students.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
