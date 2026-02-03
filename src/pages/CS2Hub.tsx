import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Target, MousePointer2, Monitor, Crosshair, Copy, Check, 
  Wind, Zap, Flame, Play, Crown, Swords, Shield, Ghost 
} from "lucide-react";

// === HEADER ===
const CS2Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent backdrop-blur-sm pointer-events-none transition-all duration-300">
        <div className="flex items-center gap-6 pointer-events-auto">
            <Link to="/" className="group relative shrink-0">
                <svg width="42" height="42" viewBox="0 0 512 512" className="transition-transform group-hover:scale-110 duration-300">
                    <defs>
                      <mask id="cut-header-cs">
                        <rect width="512" height="512" fill="white"/>
                        <rect x="-100" y="226" width="800" height="60" fill="black" transform="rotate(-45 256 256)"/>
                      </mask>
                    </defs>
                    <g mask="url(#cut-header-cs)">
                        <circle cx="256" cy="256" r="200" stroke="white" strokeWidth="64" fill="none" />
                    </g>
                    <rect x="236" y="156" width="40" height="200" fill="#DE9B35" rx="6" />
                    <rect x="156" y="236" width="200" height="40" fill="#DE9B35" rx="6" />
                </svg>
            </Link>
            <div className="h-8 w-[2px] bg-white/20 -skew-x-12 shrink-0" />
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/archive/b/b8/20230323152745%21Counter-Strike_2_logo.svg" 
                alt="CS2 Logo" 
                className="h-10 w-auto object-contain drop-shadow-[0_0_20px_rgba(222,155,53,0.8)] filter brightness-110 contrast-125" 
            />
        </div>
        <div className="hidden md:flex items-center gap-8 pointer-events-auto">
            {['MAPS', 'COMPS', 'UTILITY', 'STREAMS'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-sm font-bold tracking-widest text-white/60 hover:text-[#DE9B35] transition-colors uppercase relative group">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#DE9B35] transition-all group-hover:w-full" />
                </button>
            ))}
        </div>
    </nav>
  );
};

// === HELPER: ÍCONES DE FUNÇÃO ===
const getRoleIcon = (roleName: string, color: string) => {
    const roleLower = roleName.toLowerCase();
    const props = { size: 20, style: { color: color } };

    if (roleLower.includes("igl")) return <Crown {...props} strokeWidth={2.5} />;
    if (roleLower.includes("awp")) return <Crosshair {...props} strokeWidth={2.5} />;
    if (roleLower.includes("entry") || roleLower.includes("fragger")) return <Swords {...props} strokeWidth={2.5} />;
    if (roleLower.includes("anchor") || roleLower.includes("support")) return <Shield {...props} strokeWidth={2.5} />;
    if (roleLower.includes("lurker")) return <Ghost {...props} strokeWidth={2.5} />;
    
    return <Target {...props} />; // Rifler Padrão
};

// === DADOS ===
const MAPS = [
  { id: "mirage", name: "Mirage", image: "/maps/mirage.webp" },
  { id: "inferno", name: "Inferno", image: "/maps/inferno.webp" },
  { id: "nuke", name: "Nuke", image: "/maps/nuke.webp" },
  { id: "ancient", name: "Ancient", image: "/maps/ancient.webp" },
  { id: "anubis", name: "Anubis", image: "/maps/anubis.webp" },
  { id: "dust2", name: "Dust 2", image: "/maps/dust2.webp" },
  { id: "overpass", name: "Overpass", image: "/maps/overpass.webp" },
];

const UTIL_TYPES = [
    { id: "smoke", name: "Smokes", icon: Wind, color: "#D1D5DB" }, 
    { id: "flash", name: "Flashes", icon: Zap, color: "#FDE047" }, 
    { id: "molotov", name: "Molotovs", icon: Flame, color: "#EF4444" },
];

const SITES = ["A Site", "B Site", "Mid", "Retake"];

const PLAYER_STATS: Record<string, any> = {
    default: { sens: "1.20", dpi: "800", res: "1280x960", crosshair: "CSGO-xxx" },
    // Stats reais simulados... (mantendo a lista anterior)
    donk: { sens: "1.25", dpi: "800", res: "1280x960", crosshair: "CSGO-GftnU-w9F74-Uo4y8-M4pbc-6rG6P" },
    sh1ro: { sens: "1.04", dpi: "800", res: "1024x768", crosshair: "CSGO-v6A6G-C8w7P-q3j6c-y5b8D-6rG6P" },
    chopper: { sens: "1.50", dpi: "400", res: "1280x960", crosshair: "CSGO-7rG6P-..." },
    zont1x: { sens: "1.60", dpi: "400", res: "1280x960", crosshair: "CSGO-9rG6P-..." },
    magixx: { sens: "2.00", dpi: "400", res: "1280x960", crosshair: "CSGO-1rG6P-..." },
    zywoo: { sens: "2.00", dpi: "400", res: "1280x960", crosshair: "CSGO-Qzpx5-BRLw8-xFPCS-hTns4-GHDhP" },
    apex: { sens: "1.90", dpi: "400", res: "1280x960", crosshair: "CSGO-..." },
    spinx: { sens: "1.45", dpi: "800", res: "1280x960", crosshair: "CSGO-..." },
    flamez: { sens: "1.60", dpi: "800", res: "1280x960", crosshair: "CSGO-..." },
    mezii: { sens: "1.80", dpi: "400", res: "1280x960", crosshair: "CSGO-..." },
    fallen: { sens: "2.30", dpi: "400", res: "1280x960", crosshair: "CSGO-TpORA-p9jyT-6rG6P-..." },
    kscerato: { sens: "3.20", dpi: "400", res: "1280x960", crosshair: "CSGO-..." },
    yuurih: { sens: "1.30", dpi: "800", res: "1280x960", crosshair: "CSGO-..." },
    chelo: { sens: "1.90", dpi: "400", res: "1280x960", crosshair: "CSGO-..." },
    skullz: { sens: "1.70", dpi: "400", res: "1280x960", crosshair: "CSGO-..." },
    s1mple: { sens: "3.09", dpi: "400", res: "1280x960", crosshair: "CSGO-w9F74-Uo4y8-..." },
    niko: { sens: "1.40", dpi: "400", res: "1280x960", crosshair: "CSGO-Kt7MO-..." },
    magisk: { sens: "1.50", dpi: "400", res: "1280x960", crosshair: "CSGO-..." },
    dupreeh: { sens: "1.70", dpi: "400", res: "1280x960", crosshair: "CSGO-..." },
    snappi: { sens: "1.80", dpi: "400", res: "1280x960", crosshair: "CSGO-..." },
};

const TEAMS_DATA = [
  {
    id: 1, org: "SPIRIT", color: "#C6F53D", 
    players: [
        { name: "donk", role: "Rifler (Entry)" },
        { name: "sh1ro", role: "AWPer" },
        { name: "chopper", role: "IGL" },
        { name: "zont1x", role: "Rifler" },
        { name: "magixx", role: "Lurker" }
    ]
  },
  {
    id: 2, org: "VITALITY", color: "#D0F307", 
    players: [
        { name: "ZywOo", role: "AWPer" },
        { name: "apEX", role: "IGL" },
        { name: "Spinx", role: "Lurker" },
        { name: "flameZ", role: "Entry" },
        { name: "mezii", role: "Anchor" }
    ]
  },
  {
    id: 3, org: "FURIA", color: "#FFFFFF", 
    players: [
        { name: "FalleN", role: "IGL / AWP" },
        { name: "KSCERATO", role: "Rifler" },
        { name: "yuurih", role: "Rifler" },
        { name: "chelo", role: "Entry" },
        { name: "skullz", role: "Anchor" }
    ]
  },
  {
    id: 4, org: "FALCONS", color: "#00B464", 
    players: [
        { name: "s1mple", role: "Rifler/AWP" },
        { name: "NiKo", role: "Rifler" },
        { name: "Magisk", role: "Anchor" },
        { name: "dupreeh", role: "Entry" },
        { name: "Snappi", role: "IGL" }
    ]
  },
];

const STREAMERS = [
    { name: "Gaules", team: "Tribo", channel: "gaules", avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/f4b12683-133b-4853-b3eb-362240562c27-profile_image-70x70.png" },
    { name: "chopper", team: "Spirit", channel: "chopperinho", avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/b204680e-3156-4c9f-861c-438db02222a7-profile_image-70x70.png" },
    { name: "ohnePixel", team: "Skin God", channel: "ohnepixel", avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/e82b090c-5184-47f9-8dca-6701c9535041-profile_image-70x70.png" },
    { name: "m0NESY", team: "G2", channel: "m0nesyof", avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/c648408d-871d-4876-b6d3-2df70058b752-profile_image-70x70.png" }
];

export default function CS2Hub() {
  const [selectedMap, setSelectedMap] = useState(MAPS[0]);
  const [selectedTeam, setSelectedTeam] = useState(TEAMS_DATA[0]);
  const [selectedPlayer, setSelectedPlayer] = useState(TEAMS_DATA[0].players[0]);
  const [hostname, setHostname] = useState("");
  const [copied, setCopied] = useState(false);

  // States para Utility Hub
  const [utilSite, setUtilSite] = useState("A Site");
  const [utilType, setUtilType] = useState("smoke");

  useEffect(() => {
      if (typeof window !== "undefined") {
          setHostname(window.location.hostname);
      }
  }, []);

  const playerStats = PLAYER_STATS[selectedPlayer.name.toLowerCase()] || PLAYER_STATS["default"];

  const handleCopyCrosshair = () => {
      const code = playerStats.crosshair || "SOON";
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0A0A0A] font-sans selection:bg-[#DE9B35] selection:text-black overflow-y-auto overflow-x-hidden">
      <CS2Header />

      {/* === HERO: MAPAS === */}
      <section id="maps" className="relative h-[65vh] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selectedMap.id}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img src={selectedMap.image} alt={selectedMap.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#DE9B35]/5 to-transparent mix-blend-overlay" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full flex flex-col justify-end px-4 lg:px-8 pb-8 z-10">
            <div className="flex w-full gap-4 h-32 items-end">
                {MAPS.map((map) => {
                    const isSelected = selectedMap.id === map.id;
                    return (
                        <button
                            key={map.id}
                            onClick={() => setSelectedMap(map)}
                            className={`flex-1 h-full rounded-xl overflow-hidden transition-all duration-300 group relative ${
                                isSelected 
                                ? "ring-2 ring-[#DE9B35] shadow-[0_0_30px_rgba(222,155,53,0.4)] z-10 scale-105" 
                                : "grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:scale-105"
                            }`}
                        >
                            <img src={map.image} className="absolute inset-0 w-full h-full object-cover" />
                            <div className={`absolute inset-0 transition-colors ${isSelected ? 'bg-[#DE9B35]/10' : 'bg-black/60 group-hover:bg-transparent'}`} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className={`text-2xl font-black uppercase italic tracking-tighter drop-shadow-lg transition-all ${isSelected ? 'text-white scale-110' : 'text-white/60'}`}>
                                    {map.name}
                                </span>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
      </section>

      {/* === SEÇÃO 2: PRO COMPS (TIMES & PLAYERS) === */}
      <section id="comps" className="px-8 lg:px-16 py-24 bg-[#0A0A0A] border-t border-white/5 relative">
        <div className="mb-12 flex items-end gap-4 relative z-10">
             <h2 className="text-4xl font-black uppercase text-white italic">Pro <span className="text-[#DE9B35]">Comps</span></h2>
             <div className="h-[2px] bg-white/10 flex-1 mb-2"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full relative z-10">
            {/* COLUNA ESQUERDA: LISTA DE TIMES */}
            <div className="xl:col-span-4 flex flex-col gap-4 h-full">
                {TEAMS_DATA.map((team) => {
                    const isActive = selectedTeam.id === team.id;
                    
                    return (
                        <div
                            key={team.id}
                            // Clique no CARD do time: seleciona time + primeiro player (comportamento padrão)
                            onClick={() => {
                                if (!isActive) {
                                    setSelectedTeam(team);
                                    setSelectedPlayer(team.players[0]);
                                }
                            }}
                            className={`flex-1 p-6 rounded-xl border cursor-pointer transition-all relative overflow-hidden group flex flex-col justify-center gap-4 ${
                                isActive 
                                ? "bg-gradient-to-r from-white/5 to-[#111]" 
                                : "bg-[#111] border-white/5 hover:bg-white/5 hover:border-white/10"
                            }`}
                            style={{ 
                                minHeight: '160px',
                                borderColor: isActive ? team.color : 'rgba(255,255,255,0.05)',
                                boxShadow: isActive ? `0 0 30px ${team.color}10` : 'none'
                            }}
                        >
                            <div className="flex justify-between items-center relative z-10">
                                {/* Nome do Time sempre com a cor (suave quando inativo, forte quando ativo) */}
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter transition-all duration-300" 
                                    style={{
                                        color: team.color,
                                        opacity: isActive ? 1 : 0.6,
                                        filter: isActive ? `drop-shadow(0 0 10px ${team.color}40)` : 'grayscale(30%)'
                                    }}>
                                    {team.org}
                                </h3>
                            </div>

                            <div className="flex gap-2 relative z-10 mt-auto overflow-x-auto scrollbar-hide pb-2">
                                {team.players.map((p) => {
                                    const isPlayerSelected = selectedPlayer.name === p.name && isActive;
                                    return (
                                        <button 
                                            key={p.name} 
                                            // Clique no PLAYER: seleciona time + player específico (stop propagation)
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                setSelectedTeam(team);
                                                setSelectedPlayer(p); 
                                            }}
                                            className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all relative group/player flex items-center justify-center bg-[#1A1A1A] ${
                                                isPlayerSelected 
                                                ? 'scale-110 z-20 shadow-lg' 
                                                : 'border-white/10 opacity-70 hover:opacity-100 hover:scale-105'
                                            }`}
                                            style={{ 
                                                borderColor: isPlayerSelected ? team.color : 'rgba(255,255,255,0.1)',
                                                color: isPlayerSelected ? team.color : 'white'
                                            }}
                                        >
                                            {/* ÍCONE DE FUNÇÃO AO INVÉS DE FOTO */}
                                            {getRoleIcon(p.role, isPlayerSelected ? team.color : '#FFFFFF')}
                                            
                                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase opacity-0 group-hover/player:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                                                {p.name}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* FADE MINIMALISTA E HIGH-END NO FUNDO */}
                            {isActive && (
                                <motion.div 
                                    layoutId="activeGlowCS" 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ 
                                        background: `linear-gradient(120deg, ${team.color}08, transparent 60%)`,
                                    }} 
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* COLUNA DIREITA: DETALHES DO PLAYER */}
            <div className="xl:col-span-8 bg-[#111] rounded-2xl border border-white/10 p-12 relative overflow-hidden flex flex-col justify-center min-h-[600px]">
                {/* AMBIENT GLOW */}
                <div 
                    className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 blur-[120px] rounded-full pointer-events-none transition-colors duration-700"
                    style={{ backgroundColor: selectedTeam.color }}
                />

                <div className="relative z-10 flex flex-col h-full justify-center">
                     <div className="flex items-end justify-between border-b border-white/5 pb-8 mb-12">
                         <div>
                             <h4 className="font-bold uppercase tracking-widest text-sm mb-2 opacity-60 transition-colors" style={{color: selectedTeam.color}}>
                                {selectedTeam.org} // ROSTER
                             </h4>
                             <h3 className="text-7xl font-black uppercase text-white italic tracking-tighter leading-none">{selectedPlayer.name}</h3>
                         </div>
                         <div className="text-right">
                            <span className="block text-xs font-bold uppercase tracking-widest mb-1 opacity-60 transition-colors" style={{color: selectedTeam.color}}>Role</span>
                            <div className="flex items-center justify-end gap-3 text-2xl font-bold text-white">
                                {getRoleIcon(selectedPlayer.role, selectedTeam.color)}
                                <span>{selectedPlayer.role}</span>
                            </div>
                         </div>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { label: "Sensitivity", val: playerStats.sens, icon: MousePointer2 },
                            { label: "DPI / eDPI", val: playerStats.dpi, icon: Target },
                            { label: "Resolution", val: playerStats.res, icon: Monitor }
                        ].map((stat, idx) => (
                            <div key={idx} className="h-32 p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group">
                                <stat.icon className="mb-3 w-6 h-6 opacity-80 group-hover:opacity-100 transition-colors" style={{color: selectedTeam.color}} />
                                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{stat.label}</span>
                                <span className="text-2xl font-mono font-bold text-white">{stat.val}</span>
                            </div>
                        ))}
                     </div>

                     <button 
                        onClick={handleCopyCrosshair}
                        className="w-full h-20 px-8 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between group hover:border-opacity-50 transition-all active:scale-[0.99]"
                        style={{ borderColor: copied ? '#22c55e' : 'rgba(255,255,255,0.1)' }}
                     >
                        <div className="flex items-center gap-5">
                            <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                <Crosshair className={`w-6 h-6 transition-colors ${copied ? 'text-green-500' : ''}`} style={{ color: copied ? undefined : selectedTeam.color }} />
                            </div>
                            <span className="text-lg font-bold text-white uppercase tracking-widest">
                                {copied ? "Copied to Clipboard!" : "Copy Crosshair Code"}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <code className="hidden md:block font-mono text-sm text-white/40 bg-white/5 px-4 py-2 rounded-md group-hover:text-white group-hover:bg-white/10 transition-colors">
                                {playerStats.crosshair.substring(0, 20)}...
                            </code>
                            {copied ? <Check className="text-green-500 w-6 h-6" /> : <Copy className="text-white/40 w-6 h-6 group-hover:text-white" />}
                        </div>
                     </button>
                </div>
            </div>
        </div>
      </section>

      {/* === SEÇÃO 4: UTILITY HUB === */}
      <section id="utility" className="px-8 lg:px-16 py-24 bg-[#0A0A0A] border-t border-white/5">
          <div className="text-center mb-12 px-4">
              <h2 className="text-5xl font-black uppercase text-white italic mb-4 leading-[1.3] inline-block">
                  Utility <span className="not-italic text-[#DE9B35] ml-2">HUB</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto">
                  Master the map geometry. Select a site and utility type to view the best lineups used by pros.
              </p>
          </div>

          <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden min-h-[600px] flex flex-col xl:flex-row">
              <div className="w-full xl:w-1/3 bg-[#161616] p-10 flex flex-col border-r border-white/5 relative overflow-hidden">
                  <div className="relative z-20">
                      <div className="flex items-center gap-3 mb-8">
                          <img src={selectedMap.image} className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                          <div>
                              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{selectedMap.name}</h3>
                              <span className="text-[#DE9B35] text-xs font-bold tracking-widest uppercase">Map Selected</span>
                          </div>
                      </div>

                      <div className="mb-8">
                          <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-3 block">Position / Situation</label>
                          <div className="grid grid-cols-2 gap-2">
                              {SITES.map((site) => (
                                  <button
                                      key={site}
                                      onClick={() => setUtilSite(site)}
                                      className={`py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all border ${
                                          utilSite === site 
                                          ? "bg-[#DE9B35] text-black border-[#DE9B35]" 
                                          : "bg-white/5 text-white/60 border-transparent hover:bg-white/10"
                                      }`}
                                  >
                                      {site}
                                  </button>
                              ))}
                          </div>
                      </div>

                      <div>
                          <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-3 block">Utility Type</label>
                          <div className="flex flex-col gap-2">
                              {UTIL_TYPES.map((type) => (
                                  <button
                                      key={type.id}
                                      onClick={() => setUtilType(type.id)}
                                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                                          utilType === type.id 
                                          ? "bg-white/10 border-white/20" 
                                          : "bg-transparent border-white/5 hover:bg-white/5"
                                      }`}
                                  >
                                      <div 
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${utilType === type.id ? 'bg-white text-black' : 'bg-white/10 text-white/40'}`}
                                      >
                                          <type.icon size={20} />
                                      </div>
                                      <div className="text-left">
                                          <span className={`block font-bold uppercase tracking-wider ${utilType === type.id ? 'text-white' : 'text-white/60'}`}>{type.name}</span>
                                          <span className="text-[10px] text-white/30 uppercase tracking-widest">View Lineups</span>
                                      </div>
                                  </button>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>

              <div className="w-full xl:w-2/3 p-8 md:p-12 bg-[#0A0A0A]/50 relative">
                  <div className="absolute top-4 right-4 flex gap-2">
                       <span className="px-3 py-1 rounded bg-[#DE9B35]/20 text-[#DE9B35] text-xs font-bold uppercase border border-[#DE9B35]/30">
                           {utilSite}
                       </span>
                       <span className="px-3 py-1 rounded bg-white/10 text-white text-xs font-bold uppercase border border-white/20">
                           {utilType}
                       </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                      <div className="bg-[#0A0A0A] rounded-xl border border-white/10 overflow-hidden hover:border-[#DE9B35]/50 transition-all group shadow-2xl relative h-64 md:h-auto cursor-pointer">
                          <div className="absolute inset-0 bg-[url('/maps/tactical_grid.png')] opacity-10 pointer-events-none" />
                          <div className="w-full h-full flex flex-col items-center justify-center bg-[#1A1A1A] group-hover:bg-[#222] transition-colors">
                              <Play className="w-12 h-12 text-[#DE9B35] opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all mb-4" fill="currentColor" />
                              <span className="text-white/40 text-xs font-mono tracking-widest uppercase">Lineup 1: Main to Site</span>
                          </div>
                      </div>

                      <div className="bg-[#0A0A0A] rounded-xl border border-white/10 overflow-hidden hover:border-[#DE9B35]/50 transition-all group shadow-2xl relative h-64 md:h-auto cursor-pointer">
                          <div className="absolute inset-0 bg-[url('/maps/tactical_grid.png')] opacity-10 pointer-events-none" />
                          <div className="w-full h-full flex flex-col items-center justify-center bg-[#1A1A1A] group-hover:bg-[#222] transition-colors">
                              <Play className="w-12 h-12 text-[#DE9B35] opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all mb-4" fill="currentColor" />
                              <span className="text-white/40 text-xs font-mono tracking-widest uppercase">Lineup 2: Support Flash</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* === STREAMS === */}
      <section id="streams" className="px-8 lg:px-16 py-20 bg-black border-t border-white/10">
         <div className="flex items-end justify-between mb-12">
             <div>
                <h2 className="text-4xl font-black uppercase text-white italic">Live <span className="text-[#DE9B35]">Hub</span></h2>
             </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {STREAMERS.map((streamer, idx) => (
                 <div key={idx} className="bg-[#18181B] rounded-xl overflow-hidden group border border-white/5 hover:border-[#DE9B35] transition-all cursor-pointer relative aspect-video">
                     <div className="absolute inset-0 w-full h-full">
                         <iframe
                           src={`https://player.twitch.tv/?channel=${streamer.channel}&parent=${hostname}&muted=true`}
                           height="100%"
                           width="100%"
                           allowFullScreen
                           className="w-full h-full object-cover"
                         />
                     </div>
                     <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center gap-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                         <img src={streamer.avatar} className="w-10 h-10 rounded-full border-2 border-[#DE9B35]" />
                         <div>
                             <h4 className="text-white font-bold leading-none shadow-black drop-shadow-md">{streamer.name}</h4>
                             <p className="text-white/60 text-xs mt-1">{streamer.team}</p>
                         </div>
                     </div>
                 </div>
             ))}
         </div>
      </section>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}