export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  department: string;
  year: string;
  college: string;
  bio: string;
  avatar: string;
  role: "poster" | "hustler" | "both";
  skills: string[];
  gigsPosted: number;
  gigsCompleted: number;
  rating: number;
  createdAt: string;
}

const USERS_KEY = "hustlehub_users";
const SESSION_KEY = "hustlehub_session";

export const getUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const registerUser = (user: Omit<User, "id" | "gigsPosted" | "gigsCompleted" | "rating" | "createdAt" | "avatar">): User => {
  const users = getUsers();
  if (users.find(u => u.email === user.email)) {
    throw new Error("Email already registered");
  }
  const newUser: User = {
    ...user,
    id: crypto.randomUUID(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name.replace(/\s/g, '')}`,
    gigsPosted: 0,
    gigsCompleted: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
  return newUser;
};

export const loginUser = (email: string, password: string): User => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid email or password");
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
};

export const getSession = (): User | null => {
  const stored = localStorage.getItem(SESSION_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};
