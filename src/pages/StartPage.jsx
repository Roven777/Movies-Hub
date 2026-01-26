import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../assets/collage-bg.jpg";

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Cinematic Background Image */}
      <motion.img
        src={bgImage}
        alt="Cine World Background"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.25 }}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.5)_70%,rgba(0,0,0,0.85)_100%)]" />
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="
            relative
            z-50
            text-7xl 
            md:text-9xl 
            lg:text-[10rem] 
            font-black 
            tracking-[0.25em] 
            mb-20 
            text-white
            title-outline
            glow-white
          "
        >
          WELCOME TO CINE WORLD
        </motion.h1>

        {/* Start Button */}
        <motion.button
          whileHover={{
            scale: 1.18,
            boxShadow: "0px 0px 50px rgba(0, 0, 0, 1)",
          }}
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate("/home")}
          className="
            px-24 
            py-7 
            rounded-full 
            text-3xl 
            font-black 
            tracking-[0.4em] 
            uppercase 
            text-white 
            bg-red-600
            border-4 
            border-black
            shadow-[0_0_30px_rgba(0,0,0,0.8)]
            backdrop-blur-md 
            transition-all
          "
        >
          START
        </motion.button>

      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
