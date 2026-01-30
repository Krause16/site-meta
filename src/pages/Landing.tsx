import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, Zap } from "lucide-react";
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

  // === FÍSICA APPLE (Ultra Smooth) ===
  const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  // === CÁLCULO DE POSIÇÃO (GPU ONLY) ===
  // O container tem 200% de largura (100% pra cada jogo).
  // A gente só desliza ele pra esquerda ou direita.
  // Isso evita que o navegador tenha que recalcular largura.
  
  return (
    <div className="h-screen w-screen overflow-hidden bg-black font-sans relative">
      
      {/* CONTAINER MESTRE (O Segredo da Performance) */}
      <motion.div 
        className="flex h-full w-[200vw] absolute top-0" // 200vw = Dobro da tela
        initial={false}
        animate={{ 
          // Se CS focado: Puxa pra direita (mostra mais CS)
          // Se Valorant focado: Puxa pra esquerda (mostra mais Val)
          // Se nada: Centraliza (-50vw)
          x: hoveredSide === "cs2" ? "0vw" : hoveredSide === "valorant" ? "-100vw" : "-50vw" 
        }}
        transition={transition}
      >

        {/* === BLOCO CS2 (Ocupa 100vw fixo) === */}
        <div 
          className="w-screen h-full relative border-r border-white/10 overflow-hidden"
          onMouseEnter={() => handleMouseEnter("cs2")}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <Link to="/cs2" className="block w-full h-full relative cursor-none"> {/* cursor-none pra imersão */}
            
            {/* Background Parallax Reverso (Compensa o movimento do container) */}
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
            </motion.div>

            {/* Conteúdo (Texto Fixo na Tela) */}
            <motion.div 
              className="absolute inset-0 flex items-center px-24 z-20 pointer-events-none"
              // Mantém o texto parado enquanto o fundo mexe
              animate={{ x: hoveredSide === "cs2" ? "0vw" : "12.5vw" }} 
              transition={transition}
            >
              <div className="max-w-xl space-y-6">
                 <img src={LOGO_CS2} className="w-64 drop-shadow-2xl" alt="CS2" />
                 
                 <div className="overflow-hidden">
                   <motion.h2 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     className="text-[#ECE8E1] text-6xl font-black italic tracking-tighter leading-none"
                   >
                     MASTER <span className="text-[#DE9B35]">STRATS</span>
                   </motion.h2>
                 </div>

                 <motion.div 
                   animate={{ opacity: hoveredSide === "cs2" ? 1 : 0, y: hoveredSide === "cs2" ? 0 : 20 }}
                   className="flex items-center gap-3 text-[#DE9B35] font-bold tracking-widest uppercase border border-[#DE9B35] w-fit px-6 py-3"
                 >
                   <Crosshair size={20} /> Enter Hub
                 </motion.div>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* === BLOCO VALORANT (Ocupa 100vw fixo) === */}
        <div 
          className="w-screen h-full relative overflow-hidden"
          onMouseEnter={() => handleMouseEnter("valorant")}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <Link to="/valorant" className="block w-full h-full relative cursor-none">
            
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
            </motion.div>

            <motion.div 
              className="absolute inset-0 flex items-center justify-end px-24 z-20 pointer-events-none"
              animate={{ x: hoveredSide === "valorant" ? "0vw" : "-12.5vw" }}
              transition={transition}
            >
              <div className="max-w-xl space-y-6 text-right flex flex-col items-end">
                 <img src={LOGO_VALORANT} className="w-64 drop-shadow-2xl" alt="Valorant" />
                 
                 <div className="overflow-hidden">
                   <motion.h2 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     className="text-[#ECE8E1] text-6xl font-black italic tracking-tighter leading-none"
                   >
                     MASTER <span className="text-[#FF4654]">META</span>
                   </motion.h2>
                 </div>

                 <motion.div 
                   animate={{ opacity: hoveredSide === "valorant" ? 1 : 0, y: hoveredSide === "valorant" ? 0 : 20 }}
                   className="flex items-center gap-3 text-[#FF4654] font-bold tracking-widest uppercase border border-[#FF4654] w-fit px-6 py-3"
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