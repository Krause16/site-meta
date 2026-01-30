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

  // === CÁLCULO DA POSIÇÃO (TEORIA DA FAIXA DE 5%) ===
  // Container tem 200vw.
  // -50vw = Centro (50/50 na tela).
  // -5vw = Mostra 95% do CS (Esquerda) e sobra 5% do Val na direita.
  // -95vw = Mostra 5% do CS na esquerda e 95% do Val (Direita).
  const xValue = hoveredSide === "cs2" ? "-5vw" : hoveredSide === "valorant" ? "-95vw" : "-50vw";

  return (
    <div className="h-screen w-screen overflow-hidden bg-black font-sans relative">
      
      {/* CONTAINER MESTRE */}
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
          // Removemos o onMouseLeave global para evitar "flicker". 
          // O estado muda quando entra no outro lado.
        >
          <Link to="/cs2" className="block w-full h-full relative">
            
            {/* Background */}
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
              
              {/* INDICADOR DE RETORNO (Só aparece quando o CS está encolhido) */}
              <motion.div 
                className="absolute inset-y-0 right-0 w-full flex items-center justify-end pr-4 bg-black/40 backdrop-blur-[2px]"
                animate={{ opacity: hoveredSide === "valorant" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                 <ChevronRight className="text-white/50 w-12 h-12 animate-pulse" />
              </motion.div>
            </motion.div>

            {/* Conteúdo */}
            <motion.div 
              className="absolute inset-0 flex items-center px-8 lg:px-24 z-20 pointer-events-none"
              animate={{ x: hoveredSide === "cs2" ? "0vw" : "12.5vw", opacity: hoveredSide === "valorant" ? 0 : 1 }} 
              transition={transition}
            >
              <div className="max-w-xl space-y-6">
                 <img src={LOGO_CS2} className="w-48 lg:w-64 drop-shadow-2xl" alt="CS2" />
                 
                 {/* PR-4 Adicionado para evitar corte do itálico */}
                 <div className="overflow-hidden pr-4">
                   <motion.h2 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     className="text-[#ECE8E1] text-4xl lg:text-6xl font-black italic tracking-tighter leading-none"
                   >
                     MASTER <span className="text-[#DE9B35]">STRATS</span>
                   </motion.h2>
                 </div>

                 <motion.div 
                   className="flex items-center gap-3 text-[#DE9B35] font-bold tracking-widest uppercase border border-[#DE9B35] w-fit px-6 py-3 pointer-events-auto hover:bg-[#DE9B35] hover:text-black transition-colors"
                 >
                   <Crosshair size={20} /> Enter Hub
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
            
            {/* Background */}
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

              {/* INDICADOR DE RETORNO (Só aparece quando o Val está encolhido) */}
              <motion.div 
                className="absolute inset-y-0 left-0 w-full flex items-center justify-start pl-4 bg-black/40 backdrop-blur-[2px]"
                animate={{ opacity: hoveredSide === "cs2" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                 <ChevronLeft className="text-white/50 w-12 h-12 animate-pulse" />
              </motion.div>
            </motion.div>

            {/* Conteúdo */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-end px-8 lg:px-24 z-20 pointer-events-none"
              animate={{ x: hoveredSide === "valorant" ? "0vw" : "-12.5vw", opacity: hoveredSide === "cs2" ? 0 : 1 }}
              transition={transition}
            >
              <div className="max-w-xl space-y-6 text-right flex flex-col items-end">
                 <img src={LOGO_VALORANT} className="w-48 lg:w-64 drop-shadow-2xl" alt="Valorant" />
                 
                 {/* PR-4 Adicionado aqui também */}
                 <div className="overflow-hidden pr-4">
                   <motion.h2 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     className="text-[#ECE8E1] text-4xl lg:text-6xl font-black italic tracking-tighter leading-none"
                   >
                     MASTER <span className="text-[#FF4654]">META</span>
                   </motion.h2>
                 </div>

                 <motion.div 
                   className="flex items-center gap-3 text-[#FF4654] font-bold tracking-widest uppercase border border-[#FF4654] w-fit px-6 py-3 pointer-events-auto hover:bg-[#FF4654] hover:text-white transition-colors"
                 >
                   Enter Hub <Zap size={20} fill="currentColor" />
                 </motion.div>
              </div>
            </motion.div>
          </Link>
        </div>

      </motion.div>
    </div>
  );
}