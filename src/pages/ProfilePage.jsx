import { motion } from "framer-motion";
import { User, Bookmark, Clock, Settings, LogOut, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useWatchlistStore from "../store/useWatchlistStore";
import useAuthStore from "../store/useAuthStore";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { watchlist, continueWatching } = useWatchlistStore();
  const { googleUser, signOutGoogle } = useAuthStore();

  const stats = [
    { label: "Watchlist", value: watchlist.length, icon: Bookmark, color: "text-blue-400" },
    { label: "In Progress", value: continueWatching.length, icon: Clock, color: "text-green-400" },
  ];

  const menuItems = [
    { label: "My Watchlist", icon: Bookmark, path: "/my-list" },
    { label: "Continue Watching", icon: Clock, path: "/my-list" },
    { label: "Settings", icon: Settings, path: "/" },
  ];

  const handleSignOut = () => {
    signOutGoogle();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-16 pb-16">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-800 flex items-center justify-center mb-4 shadow-lg overflow-hidden">
            {googleUser?.picture ? (
              <img
                src={googleUser.picture}
                alt={googleUser.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <User size={40} className="text-white" />
            )}
          </div>

          <h1 className="text-2xl font-black">{googleUser?.name}</h1>
          <p className="text-gray-400 text-sm mt-1">{googleUser?.email}</p>
          <div className="mt-2 px-3 py-1 bg-blue-600/20 border border-blue-600/50 rounded-full">
            <span className="text-blue-400 text-xs font-semibold">GOOGLE ACCOUNT</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 rounded-xl p-5 text-center"
            >
              <Icon size={24} className={`${color} mx-auto mb-2`} />
              <p className="text-2xl font-black">{value}</p>
              <p className="text-gray-400 text-sm">{label}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-2">
          {menuItems.map(({ label, icon: Icon, path }) => (
            <motion.button
              key={label}
              whileHover={{ x: 4 }}
              onClick={() => navigate(path)}
              className="w-full flex items-center gap-4 p-4 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors"
            >
              <Icon size={20} className="text-gray-400" />
              <span className="flex-1 text-left font-medium">{label}</span>
              <ChevronRight size={18} className="text-gray-600" />
            </motion.button>
          ))}

          <motion.button
            whileHover={{ x: 4 }}
            onClick={handleSignOut}
            className="w-full flex items-center gap-4 p-4 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors text-red-400"
          >
            <LogOut size={20} />
            <span className="flex-1 text-left font-medium">Sign Out</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
