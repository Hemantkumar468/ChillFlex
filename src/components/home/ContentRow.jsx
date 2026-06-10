import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FeaturedCard from "./FeaturedCard";
import { SkeletonRow } from "../ui/SkeletonCard";

const ContentRow = ({ title, items, loading, type = "movie" }) => {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: dir === "left" ? -600 : 600,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <SkeletonRow />;
  if (!items?.length) return null;

  return (
    <div className="mb-8 group/row">
      <h2 className="text-white text-xl font-bold mb-4 px-6">{title}</h2>

      <div className="relative">
        <motion.button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-gradient-to-r from-black/80 to-transparent flex items-center justify-start pl-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronLeft className="text-white" size={28} />
        </motion.button>

        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-6 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item) => (
            <div key={item.id} className="flex-none w-36 sm:w-44 md:w-48">
              <FeaturedCard item={item} type={type} />
            </div>
          ))}
        </div>

        <motion.button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-gradient-to-l from-black/80 to-transparent flex items-center justify-end pr-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronRight className="text-white" size={28} />
        </motion.button>
      </div>
    </div>
  );
};

export default ContentRow;
