import { Link, useLocation } from "react-router-dom";
import { Home, Search, Bookmark, User } from "lucide-react";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Search", path: "/search", icon: Search },
  { label: "My List", path: "/my-list", icon: Bookmark },
  { label: "Profile", path: "/profile", icon: User },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-20 bg-black border-r border-gray-900 py-6 gap-2 fixed left-0 top-0 bottom-0 z-40">
      {navItems.map(({ label, path, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          className={`flex flex-col items-center gap-1 py-3 text-xs transition-colors ${
            location.pathname === path
              ? "text-red-500"
              : "text-gray-500 hover:text-white"
          }`}
        >
          <Icon size={22} />
          <span>{label}</span>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
