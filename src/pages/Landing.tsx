import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, Zap } from "lucide-react";
import { Link } from "react-router-dom";

// === LISTA DE MAPAS (OTIMIZADOS WEBP) ===
const CS_MAPS = [
  "/maps/mirage.webp",
  "/maps/inferno.webp",
  "/maps/overpass.webp", 
  "/maps/ancient.webp",
  "/maps/anubis.webp",
  "/maps/dust2.webp",
  "/maps/nuke.webp",
];

const VAL_MAPS = [
  "/maps/abyss.webp",
  "/maps/bind.webp",
  "/maps/corrode.webp", 
  "/maps/haven.webp",
  "/maps/pearl.webp",
  "/maps/breeze.webp",
  "/maps/split.webp",
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
      const allMaps = [...CS_MAPS, ...VAL_MAPS];
      allMaps.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };
    preloadImages();
  }, []);

  const handleMouseEnter = (side: "cs2" | "valorant") => {
    setHoveredSide(side);
    if (side === "cs2") {
      setCsMapIndex((prev) => (prev + 1) % CS_MAPS.length);
    } else {
      setValMapIndex((prev) => (prev + 1) % VAL_MAPS.length);
    }
  };

  // Curva de Bezier para movimento "Apple-like" (Suave e magnético)
  const layoutTransition = { 
    duration: 0.55, 
    ease: [0.16, 1, 0.3, 1] 
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden relative bg-black selection:bg-white/20 font-sans">
      
      {/* === LADO CS2 === */}
      <motion.div
        // Use 'layout' para o Framer Motion tratar isso como mudança de geometria (mais suave que animar width/flex manualmente)
        layout
        animate={{ 
          flex: hoveredSide === "cs2" ? 3 : hoveredSide === "valorant" ? 1 : 2,
          // TRUQUE DE MESTRE: O lado ativo sempre fica por cima (z-20) pra esconder a costura
          zIndex: hoveredSide === "cs2" ? 20 : 10
        }}
        transition={layoutTransition}
        className="relative h-full overflow-hidden border-r border-white/10 group cursor-pointer will-change-auto"
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
                transition={{ duration: 0.5, ease: "easeOut" }}
                src={CS_MAPS[csMapIndex]}
                loading="eager"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                alt="CS2 Map"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-90 z-10" />
          </div>

          <div className="absolute inset-y-0 left-0 w-[50vw] flex flex-col justify-center px-8 lg:px-24 z-20 pointer-events-none">
            <motion.div
              animate={{ 
                opacity: hoveredSide === "valorant" ? 0 : 1,
                x: hoveredSide === "cs2" ? 20 : 0 
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
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
        layout
        animate={{ 
          flex: hoveredSide === "valorant" ? 3 : hoveredSide === "cs2" ? 1 : 2,
          // TRUQUE DE MESTRE: Se o Valorant ativa, ele sobe. Se não, ele fica embaixo.
          zIndex: hoveredSide === "valorant" ? 20 : 10
        }}
        transition={layoutTransition}
        className="relative h-full overflow-hidden group cursor-pointer will-change-auto"
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
                transition={{ duration: 0.5, ease: "easeOut" }}
                src={VAL_MAPS[valMapIndex]}
                loading="eager"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Valorant Map"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-transparent to-transparent opacity-90 z-10" />
          </div>

          <div className="absolute inset-y-0 right-0 w-[50vw] flex flex-col justify-center items-end px-8 lg:px-24 z-20 pointer-events-none">
            <motion.div
              animate={{ 
                opacity: hoveredSide === "cs2" ? 0 : 1,
                x: hoveredSide === "valorant" ? -20 : 0 
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
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