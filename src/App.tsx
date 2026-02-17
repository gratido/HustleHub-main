import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import BrowseGigs from "./pages/BrowseGigs";
import GigDetail from "./pages/GigDetail";
import PostGig from "./pages/PostGig";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import HelpCentre from "./pages/HelpCentre";
import NotFound from "./pages/NotFound";
import EditProfile from "./pages/EditProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={
            <>
              <Navbar />
              <Routes>
  <Route path="/" element={<Index />} />
  <Route path="/browse" element={<BrowseGigs />} />
  <Route path="/gig/:id" element={<GigDetail />} />
  <Route path="/post" element={<PostGig />} />
  <Route path="/profile" element={<Profile />} />  {/* ADD THIS */}
  <Route path="/edit-profile" element={<EditProfile />} />
  <Route path="/help" element={<HelpCentre />} />
  <Route path="*" element={<NotFound />} />
</Routes>
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
