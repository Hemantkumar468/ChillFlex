import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { searchMulti } from "../api/tmdb";
import useDebounce from "../hooks/useDebounce";
import SkeletonCard from "../components/ui/SkeletonCard";
import SearchBar from "../components/search/SearchBar";
import SearchResults from "../components/search/SearchResults";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    const search = async () => {
      setLoading(true);
      try {
        const res = await searchMulti(debouncedQuery);
        setResults(res.data.results.filter((r) => r.media_type !== "person"));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    search();
  }, [debouncedQuery]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-16">
      <div className="max-w-2xl mx-auto mb-10">
        <SearchBar
          query={query}
          onChange={setQuery}
          onClear={() => setQuery("")}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array(12).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <AnimatePresence>
          {results.length > 0 ? (
            <SearchResults results={results} query={query} />
          ) : query && !loading ? (
            <SearchResults results={[]} query={query} />
          ) : !query ? (
            <div className="text-center text-gray-600 py-20">
              <div className="text-5xl mb-4">🎬</div>
              <p className="text-xl">Search for movies and TV shows</p>
            </div>
          ) : null}
        </AnimatePresence>
      )}
    </div>
  );
};

export default SearchPage;
