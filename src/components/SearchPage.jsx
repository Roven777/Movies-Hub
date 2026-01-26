import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "./MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results || []);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="min-h-screen pt-[120px] px-12 max-w-7xl mx-auto">
      <h2 className="text-white text-xl mb-6">
        Search results for: <span className="text-purple-400">{query}</span>
      </h2>

      {loading ? (
        <p className="text-white/60">Searching...</p>
      ) : results.length === 0 ? (
        <p className="text-white/60">No results found.</p>
      ) : (
        <div className="grid gap-x-10 gap-y-16 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
