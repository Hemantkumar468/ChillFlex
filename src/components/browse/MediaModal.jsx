import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Calendar, Film } from "lucide-react";
import { getMovieVideos, getTVVideos, getImageUrl } from "../../api/tmdb";
import useRequireLogin from "../../hooks/useRequireLogin";
import LoginToWatch from "../auth/LoginToWatch";

const MediaModal = ({ item, type, isOpen, onClose }) => {
  const { isGoogleLoggedIn } = useRequireLogin();
  const [trailerKey, setTrailerKey] = useState(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  useEffect(() => {
    if (!isOpen || !item) return;

    const fetchTrailer = async () => {
      setLoadingTrailer(true);
      setTrailerKey(null);
      try {
        const videoFn = type === "tv" ? getTVVideos : getMovieVideos;
        const res = await videoFn(item.id);
        const videos = res.data.results?.filter((v) => v.site === "YouTube") || [];
        const trailer =
          videos.find((v) => v.type === "Trailer") ||
          videos.find((v) => v.type === "Teaser") ||
          videos[0];
        setTrailerKey(trailer?.key || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingTrailer(false);
      }
    };

    fetchTrailer();
  }, [isOpen, item, type]);

  if (!item) return null;

  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const backdrop = getImageUrl(item.backdrop_path, "w780");
  const rating = item.vote_average?.toFixed(1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            className="bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {backdrop && (
              <div className="relative h-48 sm:h-56">
                <img src={backdrop} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            <div className="p-6 -mt-8 relative">
              {!backdrop && (
                <button
                  onClick={onClose}
                  className="absolute top-0 right-6 w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700"
                >
                  <X size={18} />
                </button>
              )}

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 pr-10">{title}</h2>

              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-400">
                {rating && (
                  <span className="flex items-center gap-1 text-yellow-400 font-bold">
                    <Star size={14} className="fill-yellow-400" />
                    {rating}
                  </span>
                )}
                {releaseDate && (
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(releaseDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
                <span className="flex items-center gap-1 capitalize">
                  <Film size={14} />
                  {type === "tv" ? "TV Show" : "Movie"}
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                {item.overview || "No description available."}
              </p>

              <h3 className="text-lg font-bold text-white mb-3">Official Trailer</h3>
              {loadingTrailer ? (
                <div className="aspect-video bg-gray-800 rounded-xl flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : !isGoogleLoggedIn ? (
                <LoginToWatch />
              ) : trailerKey ? (
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}?rel=0`}
                    title={`${title} Trailer`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">
                  No trailer available
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MediaModal;
