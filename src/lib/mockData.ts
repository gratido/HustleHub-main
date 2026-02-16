export type GigCategory = "Design" | "Video" | "Data" | "Code" | "Writing" | "Others";

export interface Gig {
  id: string;
  title: string;
  description: string;
  category: GigCategory;
  budget: number;
  deadline: string;
  skills: string[];
  postedBy: {
    name: string;
    email: string;
    department: string;
    year: string;
    college: string;
    rating: number;
    hustlesCompleted: number;
    verified: boolean;
    avatar: string;
  };
  status: "Open" | "In Progress" | "Closed";
  datePosted: string;
  location: string;
  locationType: "On Campus" | "Remote" | "Hybrid";
  meetupDetails: string;
  whatINeedHelp: string[];
  applicants: number;
}

export interface Application {
  name: string;
  email: string;
  course: string;
  year: string;
  department: string;
  driveLink: string;
  whyYou: string;
}

export const CATEGORIES: GigCategory[] = ["Design", "Video", "Data", "Code", "Writing", "Others"];

export const categoryStyles: Record<GigCategory, string> = {
  Design: "category-chip--design",
  Video: "category-chip--video",
  Code: "category-chip--code",
  Data: "category-chip--data",
  Writing: "category-chip--writing",
  Others: "category-chip--misc",
};

const avatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Kiran",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
];

// Gig store - combines mock gigs with user-posted gigs from localStorage
export const getGigs = (): Gig[] => {
  const stored = localStorage.getItem("hustlehub_gigs");
  const userGigs: Gig[] = stored ? JSON.parse(stored) : [];
  return [...mockGigs, ...userGigs];
};

export const addGig = (gig: Gig) => {
  const stored = localStorage.getItem("hustlehub_gigs");
  const userGigs: Gig[] = stored ? JSON.parse(stored) : [];
  userGigs.push(gig);
  localStorage.setItem("hustlehub_gigs", JSON.stringify(userGigs));
};

export const incrementApplicants = (gigId: string) => {
  // Check user gigs first
  const stored = localStorage.getItem("hustlehub_gigs");
  const userGigs: Gig[] = stored ? JSON.parse(stored) : [];
  const userGigIdx = userGigs.findIndex(g => g.id === gigId);
  if (userGigIdx !== -1) {
    userGigs[userGigIdx].applicants += 1;
    localStorage.setItem("hustlehub_gigs", JSON.stringify(userGigs));
    return;
  }
  // For mock gigs, store increments separately
  const increments = JSON.parse(localStorage.getItem("hustlehub_applicant_increments") || "{}");
  increments[gigId] = (increments[gigId] || 0) + 1;
  localStorage.setItem("hustlehub_applicant_increments", JSON.stringify(increments));
};

export const getApplicantCount = (gig: Gig): number => {
  const increments = JSON.parse(localStorage.getItem("hustlehub_applicant_increments") || "{}");
  return gig.applicants + (increments[gig.id] || 0);
};

export const mockGigs: Gig[] = [
  {
    id: "1",
    title: "UI Design for Fintech App Landing Page",
    description: "Need a clean, modern dark-mode landing page for a crypto wallet app. High-fidelity Figma file required.",
    category: "Design",
    budget: 2500,
    deadline: "2026-02-22",
    skills: ["Figma", "UI/UX", "Dark Mode"],
    postedBy: {
      name: "Arjun Mehta",
      email: "arjun@college.edu",
      department: "Computer Science",
      year: "3rd Year",
      college: "IIT Delhi",
      rating: 4.8,
      hustlesCompleted: 8,
      verified: true,
      avatar: avatars[0],
    },
    status: "Open",
    datePosted: "2026-02-14",
    location: "Central Library, IIT Delhi",
    locationType: "On Campus",
    meetupDetails: "Let's sync at the Central Library cafe on weekdays after 4 PM.",
    whatINeedHelp: [
      "Create a high-fidelity landing page with hero, features, and CTA sections",
      "Design 3 responsive variants (desktop, tablet, mobile)",
      "Follow crypto/fintech dark aesthetic with neon accents",
    ],
    applicants: 7,
  },
  {
    id: "2",
    title: "TikTok/Reels Editor for Campus Event",
    description: "Edit 5 raw clips into high-energy, subtitled Reels. Must understand Gen-Z pacing and trends.",
    category: "Video",
    budget: 1500,
    deadline: "2026-02-20",
    skills: ["CapCut", "Reels", "Trending Audio"],
    postedBy: {
      name: "Priya Sharma",
      email: "priya@college.edu",
      department: "Mass Communication",
      year: "2nd Year",
      college: "Christ University",
      rating: 4.5,
      hustlesCompleted: 3,
      verified: true,
      avatar: avatars[2],
    },
    status: "Open",
    datePosted: "2026-02-13",
    location: "Remote",
    locationType: "Remote",
    meetupDetails: "All communication via Google Meet. Raw files will be shared on Drive.",
    whatINeedHelp: [
      "Edit 5 short-form videos (15-30 seconds each)",
      "Add trending audio, captions, and transitions",
      "Deliver in vertical format optimized for Instagram Reels",
    ],
    applicants: 12,
  },
  {
    id: "3",
    title: "Python Script for Web Scraping",
    description: "Need a script to scrape product prices from 3 specific sites daily. Output to CSV/Google Sheets.",
    category: "Code",
    budget: 3000,
    deadline: "2026-02-25",
    skills: ["Python", "BeautifulSoup", "Automation"],
    postedBy: {
      name: "Rohan Gupta",
      email: "rohan@college.edu",
      department: "Economics",
      year: "4th Year",
      college: "SRCC Delhi",
      rating: 4.9,
      hustlesCompleted: 15,
      verified: true,
      avatar: avatars[1],
    },
    status: "Open",
    datePosted: "2026-02-15",
    location: "E-commerce Lab",
    locationType: "Hybrid",
    meetupDetails: "Initial meeting at campus, then remote collaboration.",
    whatINeedHelp: [
      "Write a Python web scraper for 3 e-commerce websites",
      "Automate daily price tracking with cron/scheduler",
      "Export data to Google Sheets via API",
    ],
    applicants: 5,
  },
  {
    id: "4",
    title: "Market Research for Sustainability Brand",
    description: "Find 50 eco-conscious clothing brands and catalog their pricing strategies in Google Sheets.",
    category: "Data",
    budget: 1000,
    deadline: "2026-02-28",
    skills: ["Research", "Google Sheets", "Analysis"],
    postedBy: {
      name: "Sneha Patel",
      email: "sneha@college.edu",
      department: "Business Administration",
      year: "2nd Year",
      college: "NMIMS Mumbai",
      rating: 4.3,
      hustlesCompleted: 2,
      verified: false,
      avatar: avatars[4],
    },
    status: "Open",
    datePosted: "2026-02-12",
    location: "Remote",
    locationType: "Remote",
    meetupDetails: "Weekly check-in on Zoom. All docs shared on Google Drive.",
    whatINeedHelp: [
      "Research and list 50 sustainable fashion brands",
      "Catalog pricing tiers, target audience, and USP for each",
      "Create a comparative analysis spreadsheet",
    ],
    applicants: 3,
  },
  {
    id: "5",
    title: "Campus Event Poster Design",
    description: "Design an eye-catching poster for our annual tech fest. Need both print and social media versions.",
    category: "Design",
    budget: 800,
    deadline: "2026-02-19",
    skills: ["Canva", "Illustrator", "Typography"],
    postedBy: {
      name: "Kiran Rao",
      email: "kiran@college.edu",
      department: "Electronics",
      year: "3rd Year",
      college: "VIT Vellore",
      rating: 4.6,
      hustlesCompleted: 5,
      verified: true,
      avatar: avatars[5],
    },
    status: "Open",
    datePosted: "2026-02-14",
    location: "Design Lab, Block A",
    locationType: "On Campus",
    meetupDetails: "Meet at Design Lab on Monday and Wednesday evenings.",
    whatINeedHelp: [
      "Design a vibrant A3 poster for the tech fest",
      "Create Instagram story and post variants",
      "Include QR code for registration link",
    ],
    applicants: 9,
  },
  {
    id: "6",
    title: "Blog Writing for Student Newsletter",
    description: "Write 4 engaging blog posts about campus life, internships, and student hacks. 800-1000 words each.",
    category: "Writing",
    budget: 1200,
    deadline: "2026-03-01",
    skills: ["Content Writing", "SEO", "Blogging"],
    postedBy: {
      name: "Neha Singh",
      email: "neha@college.edu",
      department: "Journalism",
      year: "1st Year",
      college: "Symbiosis Pune",
      rating: 4.1,
      hustlesCompleted: 1,
      verified: false,
      avatar: avatars[6],
    },
    status: "Open",
    datePosted: "2026-02-13",
    location: "Remote",
    locationType: "Remote",
    meetupDetails: "All briefs shared via Notion. Async communication on WhatsApp.",
    whatINeedHelp: [
      "Write 4 blog posts on assigned campus-life topics",
      "Include relevant keywords for SEO optimization",
      "Submit in Google Docs with proper formatting",
    ],
    applicants: 6,
  },
];

export const stats = [
  { label: "Active Hustlers", value: "320+" },
  { label: "Gigs Completed", value: "85+" },
  { label: "Avg. Earnings", value: "₹1,800" },
];
