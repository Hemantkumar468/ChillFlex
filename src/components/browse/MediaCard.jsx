import { Star } from "lucide-react";
import { getImageUrl } from "../../api/tmdb";

const MediaCard = ({ item, type, onClick }) => {
  const title = item.title || item.name;
  const rating = item.vote_average?.toFixed(1);
  const poster = getImageUrl(item.poster_path);

  return (
    <button
      type="button"
      onClick={() => onClick(item, type)}
      className="group text-left w-full rounded-xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-red-500/10"
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-gray-800">
        {poster ? (
          <img
            src={poster}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🎬</div>
        )}
        {rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 text-xs font-bold">{rating}</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white text-sm font-semibold line-clamp-2">{title}</p>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm line-clamp-2 leading-snug">{title}</h3>
        <p className="text-gray-500 text-xs mt-1 capitalize">{type === "tv" ? "TV Show" : "Movie"}</p>
      </div>
    </button>
  );
};

export default MediaCard;
