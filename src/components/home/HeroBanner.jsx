import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, Volume2, VolumeX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../api/tmdb";
import useRequireLogin from "../../hooks/useRequireLogin";

const HeroBanner = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const navigate = useNavigate();
  const { goToPlayer } = useRequireLogin();

  const current = items?.[currentIndex];

  useEffect(() => {
    if (!items?.length) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(items.length, 5));
    }, 6000);
    return () => clearInterval(timer);
  }, [items]);

  if (!current) return null;

  const title = current.title || current.name;
  const backdrop = getImageUrl(current.backdrop_path, "original");
  const overview = current.overview?.substring(0, 150) + "...";
  const mediaType = current.media_type || "movie";

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {backdrop && (
            <img
              src={backdrop}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col justify-end h-full pb-24 px-6 md:px-16 max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              {title}
            </motion.h1>
            <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed max-w-xl">
              {overview}
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToPlayer(mediaType, current.id)}
                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-200 transition-colors"
              >
                <Play size={22} className="fill-black" />
                Play
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/detail/${mediaType}/${current.id}`)}
                className="flex items-center gap-2 bg-gray-600/80 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-500/80 transition-colors backdrop-blur-sm"
              >
                <Info size={22} />
                More Info
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-8 flex gap-2 z-10">
        {Array(Math.min(items?.length || 0, 5)).fill(0).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-8 bg-red-500" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => setMuted(!muted)}
        className="absolute bottom-8 left-6 md:left-16 z-10 w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white hover:border-white transition-colors"
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </motion.button>
    </div>
  );
};

export default HeroBanner;
