import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../api/tmdb";

const SearchResults = ({ results, query }) => {
  const navigate = useNavigate();

  if (!results.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-500 py-20"
      >
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-xl">No results for &quot;{query}&quot;</p>
      </motion.div>
    );
  }

  return (
    <>
      <p className="text-gray-400 mb-4 text-sm">
        {results.length} results for &quot;{query}&quot;
      </p>
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        {results.map((item, i) => {
          const title = item.title || item.name;
          const img = getImageUrl(item.poster_path);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/detail/${item.media_type || "movie"}/${item.id}`)}
              className="cursor-pointer group"
            >
              <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 mb-2">
                {img ? (
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    🎬
                  </div>
                )}
              </div>
              <p className="text-sm font-medium text-white line-clamp-2">{title}</p>
              <p className="text-xs text-gray-500 capitalize">{item.media_type}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
};

export default SearchResults;
