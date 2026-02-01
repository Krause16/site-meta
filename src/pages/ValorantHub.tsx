import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sword, Shield, Map as MapIcon, Target, Timer, Anchor, RefreshCcw, MousePointer2, Monitor, Eye, Crosshair, Copy, Check } from "lucide-react";

// === HEADER ===
const HubHeader = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent backdrop-blur-sm pointer-events-none transition-all duration-300">
        <div className="flex items-center gap-6 pointer-events-auto">
            <Link to="/" className="group relative shrink-0">
                <svg width="42" height="42" viewBox="0 0 512 512" className="transition-transform group-hover:scale-110 duration-300">
                    <defs><mask id="cut-header"><rect width="512" height="512" fill="white"/><rect x="-100" y="226" width="800" height="60" fill="black" transform="rotate(-45 256 256)"/></mask></defs>
                    <g mask="url(#cut-header)">
                        <circle cx="256" cy="256" r="200" stroke="white" strokeWidth="64" fill="none" />
                    </g>
                    <rect x="236" y="156" width="40" height="200" fill="#FF4654" rx="6" />
                    <rect x="156" y="236" width="200" height="40" fill="#FF4654" rx="6" />
                </svg>
            </Link>
            <div className="h-6 w-[2px] bg-white/20 -skew-x-12 shrink-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Valorant_pink_version_logo.svg/2560px-Valorant_pink_version_logo.svg.png" alt="V Logo" className="h-8 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,70,84,0.5)]" />
        </div>
        <div className="hidden md:flex items-center gap-8 pointer-events-auto">
            {['MAPS', 'COMPS', 'MASTERY', 'STREAMS'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-sm font-bold tracking-widest text-white/60 hover:text-[#FF4654] transition-colors uppercase relative group">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF4654] transition-all group-hover:w-full" />
                </button>
            ))}
        </div>
    </nav>
  );
};

// === DADOS ===
const MAPS = [
  { id: "abyss", name: "Abyss", uuid: "224b0a95-48b9-f703-1bd8-67aca101a61f", image: "/maps/abyss.webp" },
  { id: "bind", name: "Bind", uuid: "2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba", image: "/maps/bind.webp" },
  { id: "split", name: "Split", uuid: "d960549e-485c-e861-8d71-aa9d1aed12a2", image: "/maps/split.webp" },
  { id: "breeze", name: "Breeze", uuid: "2fb9a4fd-47b8-4e7d-a969-74b4046ebd53", image: "/maps/breeze.webp" },
  { id: "corrode", name: "Corrode", uuid: "1c18ab1f-420d-0d8b-71d0-77ad3c439115", image: "/maps/corrode.webp" },
  { id: "pearl", name: "Pearl", uuid: "fd267378-4d1d-484f-ff52-77821ed10dc2", image: "/maps/pearl.webp" },
  { id: "haven", name: "Haven", uuid: "2bee0dc9-4ffe-519b-1cbd-7fbe763a6047", image: "/maps/haven.webp" },
];

const ROLES = [
    { name: "Duelist", id: "dbe8757e-9e92-4ed4-b39f-9dfc589691d4" },
    { name: "Initiator", id: "1b47567f-8f7b-444b-aae3-b0c634622d10" },
    { name: "Controller", id: "4ee40330-ecdd-4f2f-98a8-eb1243428373" },
    { name: "Sentinel", id: "5fc02f99-4091-4486-a531-98459a3e95e9" },
];

const AGENTS: Record<string, { name: string; role: string; id: string; color: string }> = {
  jett: { name: "Jett", role: "Duelist", id: "add6443a-41bd-e414-f6ad-e58d267f4e95", color: "#92E0EB" },
  sova: { name: "Sova", role: "Initiator", id: "320b2a48-4d9b-a075-30f1-1f93a9b638fa", color: "#3F4F8F" },
  cypher: { name: "Cypher", role: "Sentinel", id: "117ed9e3-49f3-6512-3ccf-0cada7e3823b", color: "#C3CED6" },
  killjoy: { name: "Killjoy", role: "Sentinel", id: "1e58de9c-4950-5125-93e9-a0aee9f98746", color: "#F5D342" },
  omen: { name: "Omen", role: "Controller", id: "8e253930-4c05-31dd-1b6c-968525494517", color: "#4D5575" },
  brimstone: { name: "Brimstone", role: "Controller", id: "9f0d8ba9-4140-b941-57d3-a7ad57c6b417", color: "#D96C2B" },
  raze: { name: "Raze", role: "Duelist", id: "f94c3b30-42be-e959-889c-5aa313dba261", color: "#F28B3D" },
  gekko: { name: "Gekko", role: "Initiator", id: "e370fa57-4757-3604-3648-499e1f642d3f", color: "#C7F458" },
  viper: { name: "Viper", role: "Controller", id: "707eab51-4836-f488-046a-cda6bf494859", color: "#4FB363" },
  neon: { name: "Neon", role: "Duelist", id: "bb2a4828-46eb-8cd1-e765-15848195d751", color: "#F5F93F" },
  kayo: { name: "KAY/O", role: "Initiator", id: "601dbbe7-43ce-be57-2a40-4abd24953621", color: "#41B1C4" },
  fade: { name: "Fade", role: "Initiator", id: "dade69b4-4f5a-8528-247b-219e5a1facd6", color: "#5C5C5C" },
  breach: { name: "Breach", role: "Initiator", id: "5f8d3a7f-467b-97f3-062c-13acf203c006", color: "#D96C2B" },
  astra: { name: "Astra", role: "Controller", id: "41fb69c1-4189-7b37-f117-bcaf1e96f1bf", color: "#6A3B9E" },
  harbor: { name: "Harbor", role: "Controller", id: "95b78ed7-4637-86d9-7e41-71ba8c293152", color: "#2B8F8F" },
  phoenix: { name: "Phoenix", role: "Duelist", id: "eb93336a-449b-9c1b-0a54-a891f7921d69", color: "#E25327" },
  iso: { name: "Iso", role: "Duelist", id: "0e38b510-41a8-5780-5e8f-568b2a4f2d6c", color: "#6A3B9E" },
  waylay: { name: "Waylay", role: "Duelist", id: "df1cb487-4902-002e-5c17-d28e83e78588", color: "#c0ff2d" },
  skye: { name: "Skye", role: "Initiator", id: "6f2a04ca-43e0-be17-7f36-b3908627744d", color: "#6A9E3B" },
  tejo: { name: "Tejo", role: "Initiator", id: "b444168c-4e35-8076-db47-ef9bf368f384", color: "#fffb00" },
  yoru: { name: "Yoru", role: "Duelist", id: "7f94d92c-4234-0a36-9646-3a87eb8b5c89", color: "#3F4F8F" },
  reyna: { name: "Reyna", role: "Duelist", id: "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc", color: "#E04296" },
  chamber: { name: "Chamber", role: "Sentinel", id: "22697a3d-45bf-8dd7-4fec-84a9e28c69d7", color: "#D9BA3B" },
  deadlock: { name: "Deadlock", role: "Sentinel", id: "cc8b64c8-4b25-4ff9-6e7f-37b4da43d235", color: "#9E3B3B" },
  sage: { name: "Sage", role: "Sentinel", id: "569fdd95-4d10-43ab-ca70-79becc718b46", color: "#00ffea" },
  veto: { name: "Veto", role: "Sentinel", id: "92eeef5d-43b5-1d4a-8d03-b3927a09034b", color: "#005177" },
  vyse: { name: "Vyse", role: "Sentinel", id: "efba5359-4016-a1e5-7626-b1ae76895940", color: "#811097" },
  clove: { name: "Clove", role: "Controller", id: "1dbf2edd-4729-0984-3115-daa5eed44993", color: "#E66AB4" }
};

// DADOS MOCKADOS (Crosshairs & Stats)
const PLAYER_STATS: Record<string, any> = {
    default: { sens: "0.35", dpi: "800", res: "1920x1080", crosshair: "SOON", color: "Yellow" },
    aspas: { sens: "0.4", dpi: "800", res: "1280x960", crosshair: "0;P;c;5;h;0;f;0;0l;4;0o;2;0a;1;0f;0;1b;0", color: "Yellow (Deut)" },
    less: { sens: "0.58", dpi: "400", res: "1920x1080", crosshair: "1;s;1;P;c;5;h;0;0l;4;0o;2;0a;1;0f;0;1b;0", color: "Cyan" },
    demon1: { sens: "0.1", dpi: "1600", res: "1920x1080", crosshair: "1;s;1;P;o;1;f;0;0t;1;0l;3;0o;2;0a;1;0f;0;1b;0", color: "Red" },
    boaster: { sens: "0.52", dpi: "400", res: "1920x1080", crosshair: "1;s;1;P;c;1;o;1;f;0;0l;4;0o;2;0a;1;0f;0;1b;0", color: "Green" },
};

// COMPS ATUALIZADAS (SEM NICKNAMES)
const META_COMPS = [
  {
    id: 1, org: "NRG", color: "#FF5900", winRate: "62%",
    agents: [
      { key: "jett", player: "Demon1" }, { key: "kayo", player: "Ethan" },
      { key: "omen", player: "Marved" }, { key: "sova", player: "crashies" }, { key: "raze", player: "Victor" },
    ],
  },
  {
    id: 2, org: "MIBR", color: "#009944", winRate: "68%",
    agents: [
      { key: "jett", player: "aspas" }, { key: "gekko", player: "cauanzin" },
      { key: "sova", player: "nzr" }, { key: "omen", player: "art" }, { key: "killjoy", player: "less" },
    ],
  },
  {
    id: 3, org: "FNATIC", color: "#FF5900", winRate: "71%",
    agents: [
      { key: "omen", player: "Boaster" }, { key: "jett", player: "Derke" },
      { key: "killjoy", player: "Alfajer" }, { key: "sova", player: "Leo" }, { key: "viper", player: "Chronicle" },
    ],
  },
];

const STREAMERS = [
    { name: "Sacy", team: "MIBR", channel: "sacy", avatar: "https://liquipedia.net/commons/images/thumb/0/07/Sentinels_Sacy_at_VCT_2024_Masters_Madrid.png/600px-Sentinels_Sacy_at_VCT_2024_Masters_Madrid.png" },
    { name: "TcK", team: "Cloud9", channel: "tck10", avatar: "https://pbs.twimg.com/profile_images/1676678229986500608/s3Xo78W3_400x400.jpg" },
    { name: "TenZ", team: "Sentinels", channel: "tenz", avatar: "https://static.wikia.nocookie.net/valorant_esports_gamepedia_en/images/6/61/TenZ_at_VCT_2024_Masters_Madrid.png" },
    { name: "Tarik", team: "Sentinels", channel: "tarik", avatar: "https://static.wikia.nocookie.net/valorant_esports_gamepedia_en/images/c/ca/Sentinels_tarik_at_VCT_2023_Lock_In.png" }
];

export default function ValorantHub() {
  const [selectedMap, setSelectedMap] = useState(MAPS[0]);
  const [selectedComp, setSelectedComp] = useState(META_COMPS[0]);
  const [selectedCompAgent, setSelectedCompAgent] = useState<string | null>(META_COMPS[0].agents[0].key);
  const [hostname, setHostname] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
      if (typeof window !== "undefined") {
          setHostname(window.location.hostname);
      }
  }, []);
 
  const [masteryRole, setMasteryRole] = useState("Duelist");
  const [masteryAgent, setMasteryAgent] = useState(AGENTS["jett"]);
  const [masteryPhase, setMasteryPhase] = useState<"attack" | "defense">("attack");

  const selectedAgentPlayer = selectedComp.agents.find(a => a.key === selectedCompAgent)?.player || "Player";
  const playerStats = PLAYER_STATS[selectedAgentPlayer.toLowerCase()] || PLAYER_STATS["default"];

  const abilitySlots = ['Grenade', 'Ability1', 'Ability2', 'Ultimate'];

  const handleCopyCrosshair = () => {
      const code = playerStats.crosshair || "SOON";
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0A0A0A] font-sans selection:bg-[#FF4654] selection:text-white overflow-y-auto overflow-x-hidden">
      
      <HubHeader />

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
                                ? "ring-2 ring-[#FF4654] shadow-[0_0_30px_rgba(255,70,84,0.4)] z-10 scale-105" 
                                : "grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:scale-105"
                            }`}
                        >
                            <img src={map.image} className="absolute inset-0 w-full h-full object-cover" />
                            <div className={`absolute inset-0 transition-colors ${isSelected ? 'bg-[#FF4654]/10' : 'bg-black/60 group-hover:bg-transparent'}`} />
                            
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

      {/* === SEÇÃO 2: META COMPS & PLAYER INTEL === */}
      <section id="comps" className="px-8 lg:px-16 py-24 bg-[#0A0A0A] border-t border-white/5">
        <div className="mb-12 flex items-end gap-4">
             <h2 className="text-4xl font-black uppercase text-white italic">Meta <span className="text-[#FF4654]">Comps</span></h2>
             <div className="h-[2px] bg-white/10 flex-1 mb-2"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">
            {/* COLUNA ESQUERDA: LISTA DE TIMES (SEM APELIDOS) */}
            <div className="xl:col-span-5 flex flex-col gap-4 h-full">
                {META_COMPS.map((comp) => {
                    const isActive = selectedComp.id === comp.id;
                    return (
                        <div
                            key={comp.id}
                            onClick={() => {
                                setSelectedComp(comp);
                                if (!comp.agents.some(a => a.key === selectedCompAgent)) setSelectedCompAgent(comp.agents[0].key);
                            }}
                            className={`flex-1 p-6 rounded-xl border cursor-pointer transition-all relative overflow-hidden group flex flex-col justify-center gap-4 ${
                                isActive 
                                ? "bg-gradient-to-r from-white/10 to-[#111] border-[#FF4654] shadow-[0_0_30px_rgba(255,70,84,0.15)]" 
                                : "bg-[#111] border-white/5 hover:bg-white/10 hover:border-white/20"
                            }`}
                            style={{ minHeight: '180px' }}
                        >
                            {/* NOME DA ORG COMO PRINCIPAL */}
                            <div className="flex justify-between items-center relative z-10">
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter" style={{color: comp.color}}>
                                    {comp.org}
                                </h3>
                                <span className="text-3xl font-black text-white/10 group-hover:text-white/30 transition-colors">{comp.winRate}</span>
                            </div>

                            {/* AGENTES */}
                            <div className="flex gap-2 relative z-10 mt-auto">
                                {comp.agents.map((a) => {
                                    const isAgentSelected = selectedCompAgent === a.key && isActive;
                                    return (
                                        <button 
                                            key={a.key} 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                setSelectedComp(comp);
                                                setSelectedCompAgent(a.key); 
                                            }}
                                            className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all relative group/agent ${isAgentSelected ? 'border-[#FF4654] scale-110 z-20 shadow-lg' : 'border-white/10 opacity-70 hover:opacity-100 hover:scale-105'}`}
                                        >
                                            <img src={`https://media.valorant-api.com/agents/${AGENTS[a.key as keyof typeof AGENTS]?.id}/displayicon.png`} className="w-full h-full object-cover bg-black" />
                                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase opacity-0 group-hover/agent:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                                                {a.player}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {isActive && (
                                <motion.div layoutId="activeGlow" className="absolute inset-0 bg-gradient-to-r from-[#FF4654]/5 to-transparent pointer-events-none" />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* COLUNA DIREITA: DETALHES DO PLAYER */}
            <div className="xl:col-span-7 bg-[#111] rounded-2xl border border-white/10 p-10 relative overflow-hidden flex flex-col justify-center min-h-[500px]">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF4654] opacity-5 blur-[150px] rounded-full pointer-events-none" />

                {/* HEADER DIREITO: NOME DA ORG AGORA */}
                <div className="relative z-10">
                     <div className="flex items-end justify-between border-b border-white/5 pb-6 mb-8">
                         <div>
                             <h4 className="text-white/40 font-bold uppercase tracking-widest text-sm mb-1" style={{color: selectedComp.color}}>
                                {selectedComp.org} // ROSTER
                             </h4>
                             <h3 className="text-5xl font-black uppercase text-white italic tracking-tighter">{selectedAgentPlayer}</h3>
                         </div>
                         <div className="text-right">
                            <span className="block text-xs text-[#FF4654] font-bold uppercase tracking-widest mb-1">Role</span>
                            <span className="text-xl font-bold text-white">{AGENTS[selectedCompAgent as keyof typeof AGENTS]?.role}</span>
                         </div>
                     </div>
                     
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "Sensitivity", val: playerStats.sens, icon: MousePointer2 },
                            { label: "DPI / eDPI", val: playerStats.dpi, icon: Target },
                            { label: "Resolution", val: playerStats.res, icon: Monitor },
                            { label: "Enemy Color", val: playerStats.color, icon: Eye }
                        ].map((stat, idx) => (
                            <div key={idx} className="p-4 rounded-lg bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                                <stat.icon className="text-[#FF4654] mb-2 w-5 h-5" />
                                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{stat.label}</span>
                                <span className="text-lg font-mono font-bold text-white">{stat.val}</span>
                            </div>
                        ))}
                     </div>

                     <button 
                        onClick={handleCopyCrosshair}
                        className="w-full p-5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between group hover:border-[#FF4654]/50 transition-all active:scale-[0.99]"
                     >
                        <div className="flex items-center gap-4">
                            <Crosshair className={`w-6 h-6 transition-colors ${copied ? 'text-green-500' : 'text-[#FF4654]'}`} />
                            <span className="text-sm font-bold text-white uppercase tracking-widest">
                                {copied ? "Copied to Clipboard!" : "Copy Crosshair Code"}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <code className="font-mono text-xs text-white/60 bg-white/5 px-4 py-2 rounded-md group-hover:text-white group-hover:bg-white/10 transition-colors">
                                {playerStats.crosshair}
                            </code>
                            {copied ? <Check className="text-green-500 w-5 h-5" /> : <Copy className="text-white/40 w-5 h-5 group-hover:text-white" />}
                        </div>
                     </button>
                </div>
            </div>
        </div>
      </section>

      {/* === SEÇÃO 4: AGENT MASTERY === */}
      <section id="mastery" className="px-8 lg:px-16 py-24 bg-[#0A0A0A] border-t border-white/5">
          <div className="text-center mb-16 px-4">
              <h2 className="text-5xl font-black uppercase text-white italic mb-0 leading-[1.3] py-4 inline-block">
                  Agent <span className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-[#FF4654] via-[#ff7e89] to-white ml-2">MASTERY</span>
              </h2>
          </div>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
              {ROLES.map(role => (
                  <button
                    key={role.name}
                    onClick={() => setMasteryRole(role.name)}
                    className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all ${
                        masteryRole === role.name
                        ? "bg-white border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-110"
                        : "bg-white/5 border-white/10 hover:border-white/50"
                    }`}
                  >
                      <img
                        src={`https://media.valorant-api.com/agents/roles/${role.id}/displayicon.png`}
                        className={`w-8 h-8 ${masteryRole === role.name ? 'brightness-0' : 'invert opacity-60'}`}
                      />
                  </button>
              ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
              {Object.values(AGENTS).filter(a => a.role === masteryRole).map(agent => (
                  <button
                    key={agent.id}
                    onClick={() => setMasteryAgent(agent)}
                    className={`w-16 h-16 rounded-xl border-2 transition-all overflow-hidden relative group ${
                        masteryAgent.id === agent.id ? "border-[#FF4654] scale-110 shadow-[0_0_20px_rgba(255,70,84,0.4)]" : "border-white/10 hover:border-white/50 grayscale hover:grayscale-0"
                    }`}
                  >
                      <img src={`https://media.valorant-api.com/agents/${agent.id}/displayicon.png`} className="w-full h-full object-cover" />
                  </button>
              ))}
          </div>

          <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden min-h-[500px] flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 bg-[#161616] p-10 flex flex-col justify-between border-r border-white/5 relative overflow-hidden">
                  <div className="relative z-20">
                    <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-2">{masteryAgent.name}</h3>
                    <div className="inline-block px-3 py-1 bg-white/5 rounded text-xs font-bold tracking-[0.2em] text-[#FF4654] uppercase mb-8 border border-[#FF4654]/20">
                        {masteryAgent.role}
                    </div>

                    <div className="grid grid-cols-4 gap-3 mb-12">
                        {abilitySlots.map((slot, i) => (
                            <div key={i} className="aspect-square bg-black/40 rounded-lg border border-white/10 p-2 flex items-center justify-center hover:border-white/40 transition-colors cursor-help group" title={slot}>
                                <img 
                                    src={`https://media.valorant-api.com/agents/${masteryAgent.id}/abilities/${slot.toLowerCase()}/displayicon.png`} 
                                    alt={slot}
                                    className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                        ))}
                    </div>
                  </div>

                  <div className="w-full space-y-3 relative z-20">
                      <button onClick={() => setMasteryPhase('attack')} className={`w-full py-4 rounded font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${masteryPhase === 'attack' ? 'bg-[#FF4654] text-white shadow-lg shadow-[#FF4654]/20' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
                          <Sword size={18} /> Attack
                      </button>
                      <button onClick={() => setMasteryPhase('defense')} className={`w-full py-4 rounded font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${masteryPhase === 'defense' ? 'bg-white text-black shadow-lg shadow-white/10' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
                          <Shield size={18} /> Defense
                      </button>
                  </div>
              </div>

              <div className="w-full md:w-2/3 p-8 md:p-12 bg-[#0A0A0A]/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                      <div className="bg-[#0A0A0A] rounded-xl border border-white/10 p-6 hover:border-white/30 transition-all group flex flex-col">
                          <div className="flex items-center gap-3 mb-4">
                              <div className={`p-2 rounded ${masteryPhase === 'attack' ? 'bg-[#FF4654]/20 text-[#FF4654]' : 'bg-white/20 text-white'}`}>
                                  {masteryPhase === 'attack' ? <Target size={20} /> : <Anchor size={20} />}
                              </div>
                              <h4 className="font-bold text-white uppercase tracking-widest text-sm">
                                  {masteryPhase === 'attack' ? 'Entry / Execution' : 'Site Hold'}
                              </h4>
                          </div>
                          <div className="aspect-video bg-[#1A1A1A] rounded border border-white/5 mb-4 flex items-center justify-center relative overflow-hidden group-hover:border-white/20 transition-colors">
                              <div className="absolute inset-0 bg-[url('/maps/tactical_grid.png')] opacity-10" />
                              <span className="text-white/20 text-xs font-mono">PLAY VIDEO</span>
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed mt-auto">
                              {masteryPhase === 'attack'
                                ? `Execute fast utilizing ${masteryAgent.name}'s kit to clear angles.`
                                : `Anchor the site. Delay execution until rotation arrives.`}
                          </p>
                      </div>

                      <div className="bg-[#0A0A0A] rounded-xl border border-white/10 p-6 hover:border-white/30 transition-all group flex flex-col">
                          <div className="flex items-center gap-3 mb-4">
                              <div className={`p-2 rounded ${masteryPhase === 'attack' ? 'bg-[#FF4654]/20 text-[#FF4654]' : 'bg-white/20 text-white'}`}>
                                  {masteryPhase === 'attack' ? <Timer size={20} /> : <RefreshCcw size={20} />}
                              </div>
                              <h4 className="font-bold text-white uppercase tracking-widest text-sm">
                                  {masteryPhase === 'attack' ? 'Post-Plant' : 'Retake Setup'}
                              </h4>
                          </div>
                          <div className="aspect-video bg-[#1A1A1A] rounded border border-white/5 mb-4 flex items-center justify-center relative overflow-hidden group-hover:border-white/20 transition-colors">
                              <div className="absolute inset-0 bg-[url('/maps/tactical_grid.png')] opacity-10" />
                              <span className="text-white/20 text-xs font-mono">PLAY VIDEO</span>
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed mt-auto">
                              {masteryPhase === 'attack'
                                ? `Lineups and positioning to deny defuse.`
                                : `Coordinate utility with team for efficient retake.`}
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* === STREAMS === */}
      <section id="streams" className="px-8 lg:px-16 py-20 bg-black border-t border-white/10">
         <div className="flex items-end justify-between mb-12">
             <div>
                <h2 className="text-4xl font-black uppercase text-white italic">Live <span className="text-[#9146FF]">Hub</span></h2>
             </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {STREAMERS.map((streamer, idx) => (
                 <div key={idx} className="bg-[#18181B] rounded-xl overflow-hidden group border border-white/5 hover:border-[#9146FF] transition-all cursor-pointer relative aspect-video">
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
                         <img src={streamer.avatar} className="w-10 h-10 rounded-full border-2 border-[#9146FF]" />
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