import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, Zap } from "lucide-react";
import { Link } from "react-router-dom";

// === LISTA DE MAPAS CS2
const CS_MAPS = [
  "/maps/mirage.png",
  "/maps/inferno.png",
  "/maps/overpass.png", 
  "/maps/ancient.png",
  "/maps/anubis.png",
  "/maps/dust2.png",
  "/maps/nuke.png",
];

// === LISTA DE MAPAS VALORANT

const VAL_MAPS = [
  "/maps/abyss.png",
  "/maps/bind.png",
  "/maps/corrode.png", 
  "/maps/haven.png",
  "/maps/pearl.png",
  "/maps/breeze.png",
  "/maps/split.png",
];

export default function Landing() {
  const [hoveredSide, setHoveredSide] = useState<"cs2" | "valorant" | null>(null);
  const [csMapIndex, setCsMapIndex] = useState(0);
  const [valMapIndex, setValMapIndex] = useState(0);

  // LOGOS BLINDADAS (Wikimedia CDN)
  const LOGO_CS2 = "https://upload.wikimedia.org/wikipedia/commons/archive/b/b8/20230323152745%21Counter-Strike_2_logo.svg";
  const LOGO_VALORANT = "https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg";

  const handleMouseEnter = (side: "cs2" | "valorant") => {
    setHoveredSide(side);
    if (side === "cs2") {
      setCsMapIndex((prev) => (prev + 1) % CS_MAPS.length);
    } else {
      setValMapIndex((prev) => (prev + 1) % VAL_MAPS.length);
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden relative bg-black selection:bg-white/20 font-sans">
      
      {/* === LADO CS2 === */}
      <motion.div
        animate={{ 
          width: hoveredSide === "cs2" ? "75%" : hoveredSide === "valorant" ? "25%" : "50%" 
        }}
        transition={{ type: "spring", damping: 30, stiffness: 120 }}
        className="relative h-full overflow-hidden border-r border-white/10 group cursor-pointer z-10"
        onMouseEnter={() => handleMouseEnter("cs2")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <Link to="/cs2" className="block h-full w-full relative">
          
          <div className="absolute inset-0 bg-[#1a1a1a]">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={csMapIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: 1, 
                  scale: hoveredSide === "cs2" ? 1.05 : 1,
                  filter: hoveredSide === "cs2" ? "grayscale(0%) brightness(0.9)" : "grayscale(100%) brightness(0.5)"
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={CS_MAPS[csMapIndex]}
                // referrerPolicy ainda é útil aqui para as imagens externas do CS
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
                alt="CS2 Map"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-90 z-10" />
          </div>

          <div className="absolute inset-y-0 left-0 w-[50vw] flex flex-col justify-center px-8 lg:px-24 z-20 pointer-events-none">
            <motion.div
              animate={{ 
                opacity: hoveredSide === "valorant" ? 0.2 : 1,
                x: hoveredSide === "cs2" ? 20 : 0 
              }}
              className="max-w-xl space-y-8 flex flex-col items-start"
            >
              <img 
                src={LOGO_CS2} 
                className="w-48 lg:w-80 h-auto object-contain drop-shadow-[0_0_30px_rgba(222,155,53,0.3)]" 
                alt="CS2"
              />
              <h2 className="text-[#ECE8E1] text-3xl lg:text-5xl font-black uppercase italic tracking-tighter leading-[0.9]">
                MASTER <span className="text-[#DE9B35]">LINEUPS</span>,<br />
                EXECUTES & STRATS.
              </h2>
              <div className="pointer-events-auto group/btn relative inline-flex items-center gap-4 px-8 py-4 border-2 border-[#DE9B35] text-[#DE9B35] font-black uppercase italic tracking-wide transition-all hover:bg-[#DE9B35] hover:text-black hover:scale-105 active:scale-95">
                <Crosshair className="w-6 h-6" />
                <span>ENTER HUB</span>
              </div>
            </motion.div>
          </div>
        </Link>
      </motion.div>

      {/* === LADO VALORANT === */}
      <motion.div
        animate={{ 
          width: hoveredSide === "valorant" ? "75%" : hoveredSide === "cs2" ? "25%" : "50%" 
        }}
        transition={{ type: "spring", damping: 30, stiffness: 120 }}
        className="relative h-full overflow-hidden group cursor-pointer z-10"
        onMouseEnter={() => handleMouseEnter("valorant")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <Link to="/valorant" className="block h-full w-full relative">
          
          <div className="absolute inset-0 bg-[#0f1923]">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={valMapIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: 1, 
                  scale: hoveredSide === "valorant" ? 1.05 : 1,
                  filter: hoveredSide === "valorant" ? "brightness(0.8)" : "brightness(0.3) grayscale(80%)"
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={VAL_MAPS[valMapIndex]}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Valorant Map"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-transparent to-transparent opacity-90 z-10" />
          </div>

          <div className="absolute inset-y-0 right-0 w-[50vw] flex flex-col justify-center items-end px-8 lg:px-24 z-20 pointer-events-none">
            <motion.div
              animate={{ 
                opacity: hoveredSide === "cs2" ? 0.2 : 1,
                x: hoveredSide === "valorant" ? -20 : 0 
              }}
              className="max-w-xl space-y-8 text-right flex flex-col items-end"
            >
              <img 
                src={LOGO_VALORANT} 
                className="w-48 lg:w-80 h-auto object-contain drop-shadow-[0_0_30px_rgba(255,70,84,0.4)]" 
                alt="VALORANT"
              />
              <h2 className="text-[#ECE8E1] text-3xl lg:text-5xl font-black uppercase italic tracking-tighter leading-[0.9]">
                MASTER <span className="text-[#FF4654]">AGENT SETUPS</span>,<br />
                UTILITY & SYNERGIES.
              </h2>
              <div className="pointer-events-auto group/btn relative inline-flex items-center gap-4 px-8 py-4 border-2 border-[#FF4654] text-[#FF4654] font-black uppercase italic tracking-wide transition-all hover:bg-[#FF4654] hover:text-white hover:scale-105 active:scale-95">
                <span>ENTER HUB</span>
                <Zap className="w-6 h-6 fill-current" />
              </div>
            </motion.div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}