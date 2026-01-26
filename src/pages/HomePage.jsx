import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { fetchTrendingMovies } from "../api/tmdb";
import { useRotate } from "../context/RotateContext";

export default function HomePage() {
  const [trending, setTrending] = useState([]);
  const { rotated } = useRotate();

  useEffect(() => {
    fetchTrendingMovies().then(setTrending);
  }, []);

  return (
    <>
      {/* REVEALED SIDE CONTENT */}
      {rotated && (
  <>
    {/* DIM OVERLAY */}
    <div className="fixed inset-0 bg-black/40 z-[9000]" />

    {/* TOP-LEFT MENU */}
    <motion.div
      initial={{ opacity: 0, x: -30, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-24 left-10 z-[9999]"
    >
      <ul className="space-y-4 text-white text-xs tracking-[0.45em] uppercase">
        <li className="cursor-pointer hover:text-purple-400 transition">
          About Us
        </li>
        <li className="cursor-pointer hover:text-purple-400 transition">
          Contact Us
        </li>
      </ul>
    </motion.div>
  </>
)}


      {/* ROTATING PAGE */}
      <motion.div
        className="min-h-screen bg-[#0b0d12] relative z-40"
        animate={{
          rotateZ: rotated ? -10 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transformOrigin: "top right",
        }}
      >
        <Navbar />

        {/* spacer for navbar */}
        <div className="h-[88px]" />

        {/* HERO */}
        <section className="px-12 pt-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold tracking-[0.35em] mb-4">
            DISCOVER MOVIES
          </h1>
        </section>

        {/* TRENDING */}
        <section className="px-12 pb-24 max-w-7xl mx-auto">
          <h2 className="text-sm tracking-[0.3em] mb-8 text-white/80">
            TRENDING THIS WEEK
          </h2>

          <div className="grid gap-x-10 gap-y-16 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
            {trending.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </motion.div>
    </>
  );
}
