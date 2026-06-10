import MediaCard from "./MediaCard";
import SkeletonCard from "../ui/SkeletonCard";

const MediaGrid = ({ title, items, type, loading, onCardClick }) => (
  <section className="mb-12">
    <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 px-1">{title}</h2>
    {loading ? (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array(12).fill(0).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    ) : items?.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map((item) => (
          <MediaCard
            key={`${item.media_type || type}-${item.id}`}
            item={item}
            type={item.media_type || type}
            onClick={onCardClick}
          />
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-center py-8">No results found.</p>
    )}
  </section>
);

export default MediaGrid;
