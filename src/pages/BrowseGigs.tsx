import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import GigCard from "@/components/GigCard";
import { getGigs, CATEGORIES } from "@/lib/mockData";

const BASE_ID = "appbUibQs2XIrnY6U";
const TABLE_NAME = "Gigs";
const AIRTABLE_TOKEN = "patIMvTRcNbKHY9QT.84139eabfc846778d5155593a9c922964fc262f425b5cf3e2a37d8cacaf5537a";

const BrowseGigs = () => {
  const [airtableGigs, setAirtableGigs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const mockGigs = getGigs();

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await fetch(
          `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
          {
            headers: {
              Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            },
          }
        );

        const data = await response.json();

        const formatted = data.records.map((record: any) => ({
          id: record.id,
          title: record.fields.Title || "Untitled",
          category: record.fields.Category || "Design",
          budget: record.fields.Budget || 0,
          deadline: record.fields.Deadline || new Date().toISOString(),
          skills: record.fields.Skills || [],

          // Description → What I Need Help With
          whatINeedHelp: record.fields.Description
            ? [record.fields.Description]
            : [],

          description: record.fields.Description || "",

          locationType: "Remote",
          meetupDetails: "To be decided.",

          postedBy: {
            name: record.fields["Poster Name"] || "Anonymous",
            department: "",
            year: "",
            college: "Your Campus",
            rating: 5,
            hustlesCompleted: 0,
            avatar: ""
          },

          datePosted: new Date().toISOString()
        }));

        setAirtableGigs(formatted);
      } catch (error) {
        console.log("Airtable fetch failed. Using mock data only.");
      }
    };

    fetchGigs();
  }, []);

  const allGigs = [...mockGigs, ...airtableGigs];

  const filtered = useMemo(() => {
  return allGigs.filter((gig) => {
    // 🔥 Only show Open gigs
    const isOpen = gig.status ? gig.status === "Open" : true;

    const matchesCategory =
      activeCategory === "All" || gig.category === activeCategory;

    const matchesSearch =
      !search ||
      gig.title.toLowerCase().includes(search.toLowerCase());

    return isOpen && matchesCategory && matchesSearch;
  });
}, [search, activeCategory, allGigs]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="font-heading text-3xl font-bold mb-1">
            Explore Gigs
          </h1>
          <p className="text-muted-foreground mb-8">
            Your next hustle starts here.
          </p>
        </motion.div>

        <div className="flex gap-3 mb-6">
          <div className="flex-1 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              className="flex-1 bg-transparent text-sm outline-none"
              placeholder="Search gigs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("All")}
            className={`rounded-full px-4 py-2 text-sm ${
              activeCategory === "All"
                ? "gradient-btn"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            All Categories
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm ${
                activeCategory === cat
                  ? "gradient-btn"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((gig, i) => (
              <GigCard key={gig.id} gig={gig} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No gigs found — be the first to post and earn ₹.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseGigs;
