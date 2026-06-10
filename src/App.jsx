import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import PlayerPage from "./pages/PlayerPage";
import SearchPage from "./pages/SearchPage";
import WatchlistPage from "./pages/WatchlistPage";
import MoviesPage from "./pages/MoviesPage";
import TVShowsPage from "./pages/TVShowsPage";
import BrowsePage from "./pages/BrowsePage";

const AppContent = () => {
  const location = useLocation();
  const isPlayerRoute = location.pathname.startsWith("/player/");

  return (
    <div className="bg-black min-h-screen">
      {!isPlayerRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tv-shows" element={<TVShowsPage />} />
        <Route path="/detail/:type/:id" element={<DetailPage />} />
        <Route path="/player/:type/:id" element={<PlayerPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/my-list" element={<WatchlistPage />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
