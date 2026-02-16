import { Link } from "react-router-dom";
import { Clock, IndianRupee } from "lucide-react";
import { Gig, categoryStyles, getApplicantCount } from "@/lib/mockData";
import { motion } from "framer-motion";

interface GigCardProps {
  gig: Gig;
  index?: number;
}

const GigCard = ({ gig, index = 0 }: GigCardProps) => {
  const timeAgo = () => {
    const diff = Date.now() - new Date(gig.datePosted).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Link to={`/gig/${gig.id}`} className="block">
        <div className="glass-card gig-card-hover p-5 h-full flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className={`category-chip ${categoryStyles[gig.category]}`}>
              {gig.category}
            </span>
            <span className="text-xs text-muted-foreground">{timeAgo()}</span>
          </div>

          <h3 className="font-heading text-base font-semibold mb-2 line-clamp-2 leading-snug">
            {gig.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {gig.description}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <img
              src={gig.postedBy.avatar}
              alt={gig.postedBy.name}
              className="h-7 w-7 rounded-full bg-muted"
            />
            <div>
              <p className="text-xs font-medium">{gig.postedBy.name}</p>
              <p className="text-[10px] text-muted-foreground">
                {gig.postedBy.department} • {gig.postedBy.year}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <IndianRupee className="h-3 w-3" />
                <span className="font-semibold text-foreground">₹{gig.budget.toLocaleString("en-IN")}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(gig.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </span>
            </div>
            <span className="gradient-btn rounded-full px-4 py-1.5 text-xs">
              Apply Now
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GigCard;
