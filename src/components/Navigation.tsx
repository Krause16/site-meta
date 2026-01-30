import { Link } from "react-router-dom";
import { Target, Crosshair } from "lucide-react";

export function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Se for Home, não mostra nada (já que a Landing cuida disso)
  if (isHome) return null;

  const isCS2 = location.pathname === "/cs2";

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-6 py-3 border border-white/10 shadow-lg shadow-black/20">
      <div className="flex items-center gap-6">
        {/* Lógica: Se estou no CS2, mostro botão pro Valorant. Se estou no Valorant, mostro pro CS2. */}
        
        {isCS2 ? (
          <Link
            to="/valorant"
            className="flex items-center gap-2 text-sm uppercase tracking-wider transition-all hover:scale-105 text-[#ECE8E1]/70 hover:text-[#FF4654]"
          >
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline font-bold">Ir para Valorant</span>
          </Link>
        ) : (
          <Link
            to="/cs2"
            className="flex items-center gap-2 text-sm uppercase tracking-wider transition-all hover:scale-105 text-[#ECE8E1]/70 hover:text-[#DE9B35]"
          >
            <Crosshair className="w-4 h-4" />
            <span className="hidden sm:inline font-bold">Ir para CS2</span>
          </Link>
        )}
      </div>
    </nav>
  );
}