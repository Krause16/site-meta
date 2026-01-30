import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// === LISTA DE MAPAS ===
const CS_MAPS = [
  "/maps/mirage.webp", "/maps/inferno.webp", "/maps/overpass.webp", 
  "/maps/ancient.webp", "/maps/anubis.webp", "/maps/dust2.webp", "/maps/nuke.webp",
];

const VAL_MAPS = [
  "/maps/abyss.webp", "/maps/bind.webp", "/maps/corrode.webp", 
  "/maps/haven.webp", "/maps/pearl.webp", "/maps/breeze.webp", "/maps/split.webp",
];

export default function Landing() {
  const [hoveredSide, setHoveredSide] = useState<"cs2" | "valorant" | null>(null);
  const [csMapIndex, setCsMapIndex] = useState(0);
  const [valMapIndex, setValMapIndex] = useState(0);

  const LOGO_CS2 = "https://upload.wikimedia.org/wikipedia/commons/archive/b/b8/20230323152745%21Counter-Strike_2_logo.svg";
  const LOGO_VALORANT = "https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg";

  // === PRELOAD ===
  useEffect(() => {
    const preloadImages = async () => {
      [...CS_MAPS, ...VAL_MAPS].forEach((src) => {
        new Image().src = src;
      });
    };
    preloadImages();
  }, []);

  const handleMouseEnter = (side: "cs2" | "valorant") => {
    setHoveredSide(side);
    if (side === "cs2") setCsMapIndex((p) => (p + 1) % CS_MAPS.length);
    else setValMapIndex((p) => (p + 1) % VAL_MAPS.length);
  };

  const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  // Lógica da posição da câmera
  const xValue = hoveredSide === "cs2" ? "-5vw" : hoveredSide === "valorant" ? "-95vw" : "-50vw";

  return (
    <div className="h-screen w-screen overflow-hidden bg-black font-sans relative">
      
      {/* CONTAINER MESTRE (200vw) */}
      <motion.div 
        className="flex h-full w-[200vw] absolute top-0"
        initial={false}
        animate={{ x: xValue }}
        transition={transition}
      >

        {/* === BLOCO CS2 === */}
        <div 
          className="w-screen h-full relative border-r border-white/10 overflow-hidden group/cs"
          onMouseEnter={() => handleMouseEnter("cs2")}
        >
          <Link to="/cs2" className="block w-full h-full relative">
            
            {/* Background Parallax */}
            <motion.div 
              className="absolute inset-0"
              animate={{ 
                x: hoveredSide === "cs2" ? "0vw" : hoveredSide === "valorant" ? "25vw" : "12.5vw",
                scale: hoveredSide === "cs2" ? 1.05 : 1
              }}
              transition={transition}
            >
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={csMapIndex}
                  src={CS_MAPS[csMapIndex]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, filter: hoveredSide === "cs2" ? "grayscale(0%)" : "grayscale(100%) brightness(0.4)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              
              {/* Seta de Retorno */}
              <motion.div 
                className="absolute inset-y-0 right-0 w-32 flex items-center justify-center bg-gradient-to-l from-black/60 to-transparent"
                animate={{ opacity: hoveredSide === "valorant" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                 <ChevronRight className="text-white/80 w-16 h-16 animate-pulse drop-shadow-lg" />
              </motion.div>
            </motion.div>

            {/* CONTEÚDO CS2 */}
            {/* Aumentei o padding-left (pl) para desgrudar da borda */}
            <motion.div 
              className="absolute inset-0 flex items-center pl-16 lg:pl-48 z-20 pointer-events-none"
              animate={{ x: hoveredSide === "cs2" ? "0vw" : "12.5vw", opacity: hoveredSide === "valorant" ? 0 : 1 }} 
              transition={transition}
            >
              <div className="max-w-2xl space-y-8">
                 {/* Logo do CS AUMENTADA (w-96 no desktop) */}
                 <img src={LOGO_CS2} className="w-64 lg:w-[500px] drop-shadow-2xl" alt="CS2" />
                 
                 <div className="overflow-hidden pr-4">
                   <motion.h2 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     className="text-[#ECE8E1] text-5xl lg:text-7xl font-black italic tracking-tighter leading-[0.9]"
                   >
                     MASTER <span className="text-[#DE9B35]">STRATS</span>
                   </motion.h2>
                 </div>

                 <motion.div 
                   className="flex items-center gap-3 text-[#DE9B35] font-bold tracking-widest uppercase border border-[#DE9B35] w-fit px-8 py-4 text-lg pointer-events-auto hover:bg-[#DE9B35] hover:text-black transition-colors"
                 >
                   <Crosshair size={24} /> Enter Hub
                 </motion.div>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* === BLOCO VALORANT === */}
        <div 
          className="w-screen h-full relative overflow-hidden group/val"
          onMouseEnter={() => handleMouseEnter("valorant")}
        >
          <Link to="/valorant" className="block w-full h-full relative">
            
            {/* Background Parallax */}
            <motion.div 
              className="absolute inset-0"
              animate={{ 
                x: hoveredSide === "valorant" ? "0vw" : hoveredSide === "cs2" ? "-25vw" : "-12.5vw",
                scale: hoveredSide === "valorant" ? 1.05 : 1
              }}
              transition={transition}
            >
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={valMapIndex}
                  src={VAL_MAPS[valMapIndex]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, filter: hoveredSide === "valorant" ? "brightness(0.9)" : "brightness(0.3) grayscale(100%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />

              {/* Seta de Retorno */}
              <motion.div 
                className="absolute inset-y-0 left-0 w-32 flex items-center justify-center bg-gradient-to-r from-black/60 to-transparent"
                animate={{ opacity: hoveredSide === "cs2" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                 <ChevronLeft className="text-white/80 w-16 h-16 animate-pulse drop-shadow-lg" />
              </motion.div>
            </motion.div>

            {/* CONTEÚDO VALORANT */}
            {/* Aumentei o padding-right (pr) para desgrudar da borda */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-end pr-16 lg:pr-48 z-20 pointer-events-none"
              animate={{ x: hoveredSide === "valorant" ? "0vw" : "-12.5vw", opacity: hoveredSide === "cs2" ? 0 : 1 }}
              transition={transition}
            >
              <div className="max-w-2xl space-y-8 text-right flex flex-col items-end">
                 {/* Logo Valorant ajustada */}
                 <img src={LOGO_VALORANT} className="w-56 lg:w-80 drop-shadow-2xl" alt="Valorant" />
                 
                 <div className="overflow-hidden pr-2">
                   <motion.h2 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     className="text-[#ECE8E1] text-5xl lg:text-7xl font-black italic tracking-tighter leading-[0.9]"
                   >
                     MASTER <span className="text-[#FF4654]">META</span>
                   </motion.h2>
                 </div>

                 <motion.div 
                   className="flex items-center gap-3 text-[#FF4654] font-bold tracking-widest uppercase border border-[#FF4654] w-fit px-8 py-4 text-lg pointer-events-auto hover:bg-[#FF4654] hover:text-white transition-colors"
                 >
                   Enter Hub <Zap size={24} fill="currentColor" />
                 </motion.div>
              </div>
            </motion.div>
          </Link>
        </div>

      </motion.div>
    </div>
  );
}