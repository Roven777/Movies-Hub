import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,watch/providers`
      );
      const data = await res.json();

      setMovie(data);
      setCast(data.credits?.cast?.slice(0, 10) || []);

      // 🎬 Trailer
      const trailer =
        data.videos?.results?.find(
          (v) =>
            v.site === "YouTube" &&
            (v.type === "Trailer" || v.type === "Teaser")
        ) ||
        data.videos?.results?.find((v) => v.site === "YouTube");

      setTrailerKey(trailer?.key || null);

      // 📺 OTT PROVIDERS (US)
      const us = data["watch/providers"]?.results?.US;

      if (us) {
        const combined = [
          ...(us.flatrate || []),
          ...(us.rent || []),
          ...(us.buy || []),
        ];

        // remove duplicates
        const unique = Array.from(
          new Map(combined.map((p) => [p.provider_id, p])).values()
        );

        setProviders(unique);
      } else {
        setProviders([]);
      }
    }

    fetchMovie();
  }, [id]);

  if (!movie) return null;

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";

  return (
    <div className="min-h-screen bg-[#0b0d12] text-white">
      <Navbar />

      {/* ================= HERO ================= */}
      <section
        className="relative h-[85vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-[#0b0d12]/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-12 h-full flex items-end pb-20 gap-12">
          <img
            src={poster}
            alt={movie.title}
            className="w-[260px] rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.85)]"
          />

          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

            <div className="flex gap-4 text-sm text-white/80 mb-6">
              <span>{movie.release_date?.slice(0, 4)}</span>
              <span>•</span>
              <span>{movie.runtime} min</span>
              <span>•</span>
              <span>⭐ {movie.vote_average?.toFixed(1)}</span>
            </div>

            <p className="text-white/80 leading-relaxed mb-6">
              {movie.overview}
            </p>

          </div>
        </div>
      </section>

      {/* ================= OTT PROVIDERS ================= */}
      <section className="max-w-7xl mx-auto px-12 py-16">
        <h2 className="text-sm tracking-[0.35em] uppercase text-white/80 mb-8">
          Watch trailer
        </h2>
        {/* 🎬 Trailer */}
            {trailerKey && (
              <a
                href={`https://www.youtube.com/watch?v=${trailerKey}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-full text-sm font-semibold"
              >
                Watch Trailer
              </a>
            )}
        <h2 className="text-sm tracking-[0.35em] uppercase text-white/80 mb-8">
          Available On
        </h2>

        {providers.length > 0 ? (
    <div className="flex gap-4 flex-wrap">
      {providers.map((p) => (
        <img
          key={p.provider_id}
          src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
          alt={p.provider_name}
          title={p.provider_name}
          className="h-10 rounded-lg bg-white/10 p-1"
        />
      ))}
    </div>
  ) : (
    <p className="text-sm text-white/40 italic">
      Not available for streaming in your region
    </p>
  )}
      </section>

      {/* ================= CAST ================= */}
      <section className="max-w-7xl mx-auto px-12 py-24">
        <h2 className="text-sm tracking-[0.35em] uppercase text-white/80 mb-10">
          Cast
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-10">
          {cast.map((actor) => (
            <div key={actor.id} className="text-center">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : "/avatar-placeholder.png"
                }
                alt={actor.name}
                className="w-[140px] h-[140px] mx-auto rounded-2xl object-cover shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              />
              <p className="mt-4 text-sm font-medium">{actor.name}</p>
              <p className="text-xs text-white/60">{actor.character}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
