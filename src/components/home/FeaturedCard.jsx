import { motion } from "framer-motion";
import { Play, Plus, Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../api/tmdb";
import useWatchlistStore from "../../store/useWatchlistStore";
import useRequireLogin from "../../hooks/useRequireLogin";

const FeaturedCard = ({ item, type = "movie" }) => {
  const navigate = useNavigate();
  const { goToPlayer } = useRequireLogin();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
  const inWatchlist = isInWatchlist(item.id);
  const mediaType = item.media_type || type;

  const title = item.title || item.name;
  const imageUrl = getImageUrl(item.poster_path);
  const rating = item.vote_average?.toFixed(1);

  const handleWatchlist = (e) => {
    e.stopPropagation();
    inWatchlist
      ? removeFromWatchlist(item.id)
      : addToWatchlist({ ...item, media_type: mediaType });
  };

  return (
    <motion.div
      className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-900"
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/detail/${mediaType}/${item.id}`)}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3"
        >
          <p className="text-white font-semibold text-sm line-clamp-2 mb-2">{title}</p>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                goToPlayer(mediaType, item.id);
              }}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
            >
              <Play size={14} className="text-black fill-black ml-0.5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWatchlist}
              className="w-8 h-8 bg-gray-700/80 border border-gray-500 rounded-full flex items-center justify-center"
            >
              {inWatchlist ? (
                <Check size={14} className="text-green-400" />
              ) : (
                <Plus size={14} className="text-white" />
              )}
            </motion.button>

            {rating && (
              <div className="flex items-center gap-1 ml-auto">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 text-xs font-bold">{rating}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeaturedCard;
