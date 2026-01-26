import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useRotate } from "../context/RotateContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);
  const { toggleRotate } = useRotate();
  const navigate = useNavigate();

  /* ───────── SCROLL BACKGROUND ───────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ───────── AUTO FOCUS SEARCH ───────── */
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  /* ───────── SEARCH HANDLER ───────── */
  const handleSearch = () => {
    if (!searchValue.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    setSearchOpen(false);
    setSearchValue("");
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        backgroundColor: scrolled
          ? "rgba(11,13,18,0.9)"
          : "rgba(11,13,18,1)",
        backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 border-b border-white/10"
    >
      <div className="w-full max-w-7xl mx-auto px-10 h-[88px] flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/home"
          className="text-[35px] tracking-[0.3em] uppercase text-purple-500 drop-shadow"
        >
          CINE HUB
        </Link>

        {/* CENTER */}
        <div className="flex items-center gap-10 font-bold text-white">

          {/* SEARCH */}
          <div className="relative flex items-center">

            {/* INPUT (EXPANDS TO RIGHT) */}
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              onBlur={() => setSearchOpen(false)}
              className={`
                absolute right-[44px]
                h-[44px]
                bg-white text-black text-[16px]
                rounded-full
                pl-4 pr-4
                transition-all duration-300 ease-in-out
                ${searchOpen
                  ? "w-[220px] opacity-100 pointer-events-auto"
                  : "w-[44px] opacity-0 pointer-events-none"}
                z-10
              `}
            />

            {/* SEARCH BUTTON */}
            <button
              onClick={() => {
                if (searchOpen && searchValue.trim()) {
                  handleSearch();
                } else {
                  setSearchOpen(true);
                }
              }}
              className={`
                relative
                h-[44px] w-[44px]
                flex items-center justify-center
                transition-all duration-300
                z-20
                ${searchOpen
                  ? "bg-transparent text-white"
                  : "bg-white text-black rounded-full"}
              `}
            >
              <Search size={22} strokeWidth={2.2} />
            </button>
          </div>

          {/* LINKS */}
          <Link to="/home" className="tracking-[0.25em] hover:text-purple-400 transition">
            Home
          </Link>
        </div>

        {/* MENU */}
        <motion.div
          whileHover={{ scale: 0.85 }}
          className="cursor-pointer text-white hover:text-purple-400 transition mr-[10px]"
        >
           <button onClick={toggleRotate} className="text-white">
            <Menu size={34} strokeWidth={2.5}/>
          </button>
        </motion.div>

      </div>
    </motion.nav>
  );
}
