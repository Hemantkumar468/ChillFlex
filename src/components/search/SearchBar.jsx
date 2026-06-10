import { Search, X } from "lucide-react";

const SearchBar = ({ query, onChange, onClear }) => (
  <div className="relative">
    <Search
      size={20}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
    />
    <input
      type="text"
      value={query}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search movies, TV shows..."
      autoFocus
      className="w-full bg-gray-900 text-white pl-12 pr-12 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
    />
    {query && (
      <button
        onClick={onClear}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
      >
        <X size={20} />
      </button>
    )}
  </div>
);

export default SearchBar;
