import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../../store/useAuthStore";
import { APP_NAME, APP_LOGO } from "../../constants";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { googleUser, isGoogleLoggedIn } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="flex items-center gap-2.5">
        <motion.div
          className="flex items-center gap-2.5"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={APP_LOGO}
            alt={`${APP_NAME} logo`}
            className="h-9 w-9 object-contain"
          />
          <span className="text-xl md:text-2xl font-black text-white tracking-wide">
            {APP_NAME}
          </span>
        </motion.div>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {["Home", "Movies", "TV Shows", "My List"].map((item) => (
          <Link
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
            className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/search")}
          className="text-gray-300 hover:text-white transition-colors"
        >
          <Search size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="text-gray-300 hover:text-white transition-colors hidden md:block"
        >
          <Bell size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate(isGoogleLoggedIn ? "/profile" : "/login")}
          className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center overflow-hidden"
        >
          {isGoogleLoggedIn && googleUser?.picture ? (
            <img
              src={googleUser.picture}
              alt={googleUser.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <User size={16} className="text-white" />
          )}
        </motion.button>

        {!isGoogleLoggedIn && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/login")}
            className="hidden md:block text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition-colors"
          >
            Sign In
          </motion.button>
        )}

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md p-6 flex flex-col gap-4 md:hidden"
          >
            {["Home", "Movies", "TV Shows", "My List", "Search", isGoogleLoggedIn ? "Profile" : "Sign In"].map(
              (item) => (
                <Link
                  key={item}
                  to={
                    item === "Home"
                      ? "/"
                      : item === "Sign In"
                        ? "/login"
                        : item === "Profile"
                          ? "/profile"
                          : `/${item.toLowerCase().replace(" ", "-")}`
                  }
                  className="text-gray-300 hover:text-white text-lg font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
