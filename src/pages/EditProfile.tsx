import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { getSession, User } from "@/lib/authStore";

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleChange = (field: keyof User, value: string) => {
    setUser(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser(prev => prev ? { ...prev, avatar: reader.result as string } : null);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("session", JSON.stringify(user));
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      <div className="container max-w-3xl">

        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </button>

        <div className="glass-card p-10 space-y-8">

          <h1 className="text-3xl font-bold gradient-text">
            Edit Profile
          </h1>

          {/* Avatar */}
          <div className="flex items-center gap-6">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-24 h-24 rounded-2xl object-cover border border-border"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="border border-border px-4 py-2 rounded-md flex items-center gap-2 text-sm hover:bg-muted transition"
            >
              <Upload className="h-4 w-4" /> Change Avatar
            </button>

            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium mb-2 block">Name</label>
            <input
              value={user.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full bg-muted p-3 rounded-md"
            />
          </div>

          {/* Year */}
          <div>
            <label className="text-sm font-medium mb-2 block">Year</label>
            <input
              value={user.year}
              onChange={(e) => handleChange("year", e.target.value)}
              className="w-full bg-muted p-3 rounded-md"
            />
          </div>

          {/* Department */}
          <div>
            <label className="text-sm font-medium mb-2 block">Department</label>
            <input
              value={user.department}
              onChange={(e) => handleChange("department", e.target.value)}
              className="w-full bg-muted p-3 rounded-md"
            />
          </div>

          {/* College */}
          <div>
            <label className="text-sm font-medium mb-2 block">College</label>
            <input
              value={user.college}
              onChange={(e) => handleChange("college", e.target.value)}
              className="w-full bg-muted p-3 rounded-md"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-medium mb-2 block">Bio</label>
            <textarea
              value={user.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={4}
              className="w-full bg-muted p-3 rounded-md resize-none"
            />
          </div>

          <button
            onClick={handleSave}
            className="gradient-btn px-6 py-3 rounded-full text-sm"
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
};

export default EditProfile;
