
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { User, Bookmark, Cog, Home, LayoutDashboard, Activity } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProfilePage from "../components/dashboard/ProfilePage";
import SavedToolsPage from "../components/dashboard/SavedToolsPage";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import UserActivityPage from "../components/dashboard/UserActivityPage";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Dashboard | AIDirectory</title>
        <meta
          name="description"
          content="Manage your AIDirectory account, view your saved tools, and update your profile."
        />
      </Helmet>

      <Navbar />

      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "border-r bg-background h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300",
            collapsed ? "w-[70px]" : "w-[240px]"
          )}
        >
          <div className="p-4 flex justify-between items-center">
            <span className={cn("font-semibold", collapsed && "hidden")}>
              Dashboard
            </span>
            <button onClick={() => setCollapsed(!collapsed)}>
              <Cog className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          <nav className="space-y-1 px-2">
            <Link
              to="/dashboard"
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm",
                location.pathname === "/dashboard"
                  ? "bg-secondary font-medium"
                  : "hover:bg-secondary/50"
              )}
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              <span className={cn(collapsed && "hidden")}>Overview</span>
            </Link>
            <Link
              to="/dashboard/profile"
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm",
                location.pathname === "/dashboard/profile"
                  ? "bg-secondary font-medium"
                  : "hover:bg-secondary/50"
              )}
            >
              <User className="h-5 w-5 mr-3" />
              <span className={cn(collapsed && "hidden")}>Profile</span>
            </Link>
            <Link
              to="/dashboard/saved-tools"
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm",
                location.pathname === "/dashboard/saved-tools"
                  ? "bg-secondary font-medium"
                  : "hover:bg-secondary/50"
              )}
            >
              <Bookmark className="h-5 w-5 mr-3" />
              <span className={cn(collapsed && "hidden")}>Saved Tools</span>
            </Link>
            <Link
              to="/dashboard/activity"
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm",
                location.pathname === "/dashboard/activity"
                  ? "bg-secondary font-medium"
                  : "hover:bg-secondary/50"
              )}
            >
              <Activity className="h-5 w-5 mr-3" />
              <span className={cn(collapsed && "hidden")}>My Activity</span>
            </Link>
            <Link
              to="/"
              className="flex items-center px-3 py-2 rounded-md text-sm hover:bg-secondary/50"
            >
              <Home className="h-5 w-5 mr-3" />
              <span className={cn(collapsed && "hidden")}>Back to Home</span>
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/saved-tools" element={<SavedToolsPage />} />
            <Route path="/activity" element={<UserActivityPage />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
