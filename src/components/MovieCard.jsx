import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import genreMap from "../utils/genreMap";

export default function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";

  // Convert genre IDs → names (max 2 for clean UI)
  const genres =
    movie.genre_ids?.slice(0, 2).map((id) => genreMap[id]) || [];

  return (
    <Link to={`/movie/${movie.id}`}>
      <motion.div
        layout
        whileHover={{
          y: -16,
          scale: 1.04,
          zIndex: 30,
          boxShadow: "0px 0px 50px rgba(255, 2, 2, 0.5)",
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
        }}
        className="
          relative
          w-full
          max-w-[220px]
          mx-auto
          rounded-3xl
          overflow-hidden
          bg-gradient-to-br
          from-[#8E92A6]
          via-[#7A7F96]
          to-[#5F647C]
          shadow-[0_20px_50px_rgba(0,0,0,0.35)]
          transition-all
          duration-500
          group
        "
      >
        {/* POSTER */}
        <div className="relative overflow-hidden rounded-2xl m-3">
          <img
            src={posterUrl}
            alt={movie.title}
            className="
              w-full
              h-[260px]
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

          {/* IMAGE HOVER OVERLAY */}
          <div
            className="
              absolute
              inset-0
              bg-black/0
              group-hover:bg-black/35
              transition-colors
              duration-300
            "
          />
        </div>

        {/* INFO */}
        <div className="px-5 pb-5 pt-2 text-white">
          <h3 className="text-sm font-semibold leading-tight mb-1 truncate">
            {movie.title}
          </h3>

          <p className="text-xs text-white/70">
            {genres.length > 0 ? genres.join(" • ") : "Genre"} •{" "}
            {movie.release_date?.slice(0, 4)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
