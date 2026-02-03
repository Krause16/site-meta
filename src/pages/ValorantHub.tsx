import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sword, Shield, Map as MapIcon, Target, Timer, Anchor, RefreshCcw, MousePointer2, Monitor, Eye, Crosshair, Copy, Check, Zap, Layers } from "lucide-react";

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

// DADOS DE PLAYER (MOCK)
const PLAYER_STATS: Record<string, any> = {
    default: { sens: "0.35", dpi: "800", res: "1920x1080", crosshair: "SOON", color: "Yellow" },
    aspas: { sens: "0.4", dpi: "800", res: "1280x960", crosshair: "0;P;c;5;h;0;f;0;0l;4;0o;2;0a;1;0f;0;1b;0", color: "Yellow (Deut)" },
    less: { sens: "0.58", dpi: "400", res: "1920x1080", crosshair: "1;s;1;P;c;5;h;0;0l;4;0o;2;0a;1;0f;0;1b;0", color: "Cyan" },
    zekken: { sens: "0.175", dpi: "1600", res: "1920x1080", crosshair: "1;s;1;P;c;1;o;1;f;0;0l;4;0o;2;0a;1;0f;0;1b;0", color: "Yellow" },
    jinggg: { sens: "0.25", dpi: "1600", res: "1920x1080", crosshair: "1;s;1;P;c;1;o;1;f;0;0l;4;0o;2;0a;1;0f;0;1b;0", color: "Green" },
    boaster: { sens: "0.52", dpi: "400", res: "1920x1080", crosshair: "1;s;1;P;c;1;o;1;f;0;0l;4;0o;2;0a;1;0f;0;1b;0", color: "Green" },
    demon1: { sens: "0.1", dpi: "1600", res: "1920x1080", crosshair: "1;s;1;P;o;1;f;0;0t;1;0l;3;0o;2;0a;1;0f;0;1b;0", color: "Red" },
    ethan: { sens: "0.34", dpi: "800", res: "1920x1080", crosshair: "1;s;1;P;c;5;o;1;f;0;0t;1;0l;3;0o;2;0a;1;0f;0;1b;0", color: "Cyan" },
    kaajak: { sens: "0.45", dpi: "800", res: "1920x1080", crosshair: "SOON", color: "Purple" },
};

// COMPS DINÂMICAS (NRG, MIBR, FNATIC ATUALIZADAS)
const META_COMPS = [
  {
    id: 1, org: "NRG", color: "#FF6B00",
    rosters: {
        haven: [
            { key: "sova", player: "brawk" }, { key: "viper", player: "keiko" },
            { key: "neon", player: "mada" }, { key: "killjoy", player: "skuba" }, { key: "omen", player: "Ethan" }
        ],
        corrode: [
            { key: "sova", player: "brawk" }, { key: "omen", player: "keiko" },
            { key: "astra", player: "mada" }, { key: "viper", player: "skuba" }, { key: "kayo", player: "Ethan" }
        ],
        abyss: [
            { key: "iso", player: "mada" }, { key: "viper", player: "skuba" },
            { key: "sova", player: "brawk" }, { key: "breach", player: "Ethan" }, { key: "omen", player: "keiko" }
        ],
        split: [
            { key: "iso", player: "mada" }, { key: "viper", player: "skuba" },
            { key: "breach", player: "brawk" }, { key: "skye", player: "Ethan" }, { key: "astra", player: "keiko" }
        ],
        breeze: [
            { key: "yoru", player: "mada" }, { key: "viper", player: "skuba" },
            { key: "sova", player: "brawk" }, { key: "astra", player: "Ethan" }, { key: "neon", player: "keiko" }
        ],
        pearl: [
            { key: "killjoy", player: "keiko" }, { key: "sova", player: "brawk" },
            { key: "jett", player: "mada" }, { key: "breach", player: "Ethan" }, { key: "astra", player: "skuba" }
        ],
        bind: [
            { key: "brimstone", player: "keiko" }, { key: "raze", player: "mada" },
            { key: "viper", player: "skuba" }, { key: "kayo", player: "Ethan" }, { key: "fade", player: "brawk" }
        ]
    },
    agents: [
        { key: "kayo", player: "Ethan" }, { key: "raze", player: "mada" }, 
        { key: "sova", player: "brawk" }, { key: "omen", player: "skuba" }, { key: "jett", player: "keiko" }
    ],
  },
  {
    id: 2, org: "MIBR", color: "#002758",
    rosters: {
        haven: [
            { key: "neon", player: "aspas" }, { key: "sova", player: "Verno" }, 
            { key: "killjoy", player: "tex" }, { key: "viper", player: "Mazino" }, { key: "omen", player: "zekken" }
        ],
        corrode: [
            { key: "phoenix", player: "aspas" }, { key: "sova", player: "Verno" }, 
            { key: "kayo", player: "Mazino" }, { key: "viper", player: "tex" }, { key: "omen", player: "zekken" }
        ],
        abyss: [
            { key: "yoru", player: "zekken" }, { key: "fade", player: "Verno" }, 
            { key: "omen", player: "Mazino" }, { key: "raze", player: "aspas" }, { key: "viper", player: "tex" }
        ],
        split: [
            { key: "raze", player: "zekken" }, { key: "sova", player: "Verno" }, 
            { key: "kayo", player: "Mazino" }, { key: "jett", player: "aspas" }, { key: "cypher", player: "tex" }
        ],
        breeze: [
            { key: "yoru", player: "zekken" }, { key: "sova", player: "Verno" }, 
            { key: "astra", player: "Mazino" }, { key: "jett", player: "aspas" }, { key: "viper", player: "tex" }
        ],
        pearl: [
            { key: "killjoy", player: "tex" }, { key: "sova", player: "Verno" }, 
            { key: "jett", player: "aspas" }, { key: "phoenix", player: "zekken" }, { key: "astra", player: "Mazino" }
        ],
        bind: [
            { key: "raze", player: "aspas" }, { key: "viper", player: "tex" }, 
            { key: "fade", player: "Verno" }, { key: "brimstone", player: "Mazino" }, { key: "yoru", player: "zekken" }
        ]
    },
    agents: [
      { key: "jett", player: "aspas" }, { key: "sova", player: "Verno" }, 
      { key: "omen", player: "Mazino" }, { key: "chamber", player: "tex" }, { key: "raze", player: "zekken" }, 
    ],
  },
  {
    id: 3, org: "FNATIC", color: "#FF5900",
    rosters: {
        breeze: [
            { key: "neon", player: "kaajak" }, { key: "viper", player: "Veqaj" },
            { key: "sova", player: "crashies" }, { key: "sage", player: "Alfajer" }, { key: "astra", player: "Boaster" }
        ],
        haven: [
            { key: "yoru", player: "kaajak" }, { key: "viper", player: "Veqaj" },
            { key: "sova", player: "crashies" }, { key: "killjoy", player: "Alfajer" }, { key: "omen", player: "Boaster" }
        ],
        split: [
            { key: "raze", player: "Alfajer" }, { key: "fade", player: "crashies" },
            { key: "astra", player: "Boaster" }, { key: "yoru", player: "kaajak" }, { key: "omen", player: "Veqaj" }
        ],
        bind: [
            { key: "gekko", player: "Alfajer" }, { key: "skye", player: "crashies" },
            { key: "brimstone", player: "Boaster" }, { key: "raze", player: "kaajak" }, { key: "viper", player: "Veqaj" }
        ],
        corrode: [
            { key: "fade", player: "Alfajer" }, { key: "sova", player: "crashies" },
            { key: "omen", player: "Boaster" }, { key: "yoru", player: "kaajak" }, { key: "viper", player: "Veqaj" }
        ],
        abyss: [
            { key: "chamber", player: "Alfajer" }, { key: "sova", player: "crashies" },
            { key: "astra", player: "Boaster" }, { key: "jett", player: "kaajak" }, { key: "breach", player: "Veqaj" }
        ],
        pearl: [
            { key: "sova", player: "crashies" }, { key: "yoru", player: "kaajak" },
            { key: "astra", player: "Boaster" }, { key: "chamber", player: "Veqaj" }, { key: "neon", player: "Alfajer" }
        ]
    },
    agents: [
      { key: "omen", player: "Boaster" }, { key: "killjoy", player: "Alfajer" }, 
      { key: "jett", player: "kaajak" }, { key: "sova", player: "crashies" }, { key: "breach", player: "Veqaj" }, 
    ],
  },
  {
    id: 4, org: "Paper Rex", color: "#BF216B",
    agents: [
      { key: "skye", player: "d4v41" }, { key: "yoru", player: "f0rsakeN" }, 
      { key: "jett", player: "something" }, { key: "raze", player: "Jinggg" }, { key: "breach", player: "invy" }, 
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
  const [selectedCompAgent, setSelectedCompAgent] = useState<string | null>(null); 
  const [hostname, setHostname] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
      if (typeof window !== "undefined") {
          setHostname(window.location.hostname);
      }
  }, []);

  useEffect(() => {
      const currentRoster = (selectedComp.rosters && selectedComp.rosters[selectedMap.id]) 
                            ? selectedComp.rosters[selectedMap.id] 
                            : selectedComp.agents;
      
      if (!currentRoster.some(a => a.key === selectedCompAgent)) {
          setSelectedCompAgent(currentRoster[0].key);
      }
  }, [selectedMap, selectedComp, selectedCompAgent]);
 
  const [masteryRole, setMasteryRole] = useState("Duelist");
  const [masteryAgent, setMasteryAgent] = useState(AGENTS["jett"]);

  const activeAgents = (selectedComp.rosters && selectedComp.rosters[selectedMap.id]) 
                       ? selectedComp.rosters[selectedMap.id] 
                       : selectedComp.agents;

  const selectedAgentObj = activeAgents.find(a => a.key === selectedCompAgent);
  const selectedAgentPlayer = selectedAgentObj?.player || "Player";
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
            {/* COLUNA ESQUERDA: LISTA DE TIMES */}
            <div className="xl:col-span-4 flex flex-col gap-4 h-full">
                {META_COMPS.map((comp) => {
                    const isActive = selectedComp.id === comp.id;
                    
                    const rosterToDisplay = (comp.rosters && comp.rosters[selectedMap.id]) 
                                            ? comp.rosters[selectedMap.id] 
                                            : comp.agents;

                    return (
                        <div
                            key={comp.id}
                            onClick={() => {
                                setSelectedComp(comp);
                                if (rosterToDisplay.length > 0) setSelectedCompAgent(rosterToDisplay[0].key);
                            }}
                            className={`flex-1 p-6 rounded-xl border cursor-pointer transition-all relative overflow-hidden group flex flex-col justify-center gap-4 ${
                                isActive 
                                ? "bg-gradient-to-r from-white/10 to-[#111] shadow-[0_0_30px_rgba(255,255,255,0.05)]" 
                                : "bg-[#111] border-white/5 hover:bg-white/10 hover:border-white/20"
                            }`}
                            style={{ 
                                minHeight: '160px',
                                borderColor: isActive ? comp.color : 'rgba(255,255,255,0.05)'
                            }}
                        >
                            <div className="flex justify-between items-center relative z-10">
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter" style={{color: comp.color}}>
                                    {comp.org}
                                </h3>
                            </div>

                            <div className="flex gap-2 relative z-10 mt-auto">
                                {rosterToDisplay.map((a) => {
                                    const isAgentSelected = selectedCompAgent === a.key && isActive;
                                    return (
                                        <button 
                                            key={a.key} 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                setSelectedComp(comp);
                                                setSelectedCompAgent(a.key); 
                                            }}
                                            className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all relative group/agent ${
                                                isAgentSelected 
                                                ? 'scale-110 z-20 shadow-lg' 
                                                : 'border-white/10 opacity-70 hover:opacity-100 hover:scale-105'
                                            }`}
                                            style={{ borderColor: isAgentSelected ? comp.color : 'rgba(255,255,255,0.1)' }}
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
                                <motion.div 
                                    layoutId="activeGlow" 
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ background: `linear-gradient(to right, ${comp.color}15, transparent)` }} 
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* COLUNA DIREITA: DETALHES DO PLAYER */}
            <div className="xl:col-span-8 bg-[#111] rounded-2xl border border-white/10 p-12 relative overflow-hidden flex flex-col justify-center min-h-[600px]">
                <div 
                    className="absolute top-0 right-0 w-96 h-96 opacity-5 blur-[180px] rounded-full pointer-events-none transition-colors duration-500"
                    style={{ backgroundColor: selectedComp.color }}
                />

                <div className="relative z-10 flex flex-col h-full justify-center">
                     <div className="flex items-end justify-between border-b border-white/5 pb-8 mb-12">
                         <div>
                             <h4 className="font-bold uppercase tracking-widest text-sm mb-2 opacity-60" style={{color: selectedComp.color}}>
                                {selectedComp.org} // ROSTER
                             </h4>
                             <h3 className="text-7xl font-black uppercase text-white italic tracking-tighter leading-none">{selectedAgentPlayer}</h3>
                         </div>
                         <div className="text-right">
                            <span className="block text-xs font-bold uppercase tracking-widest mb-1 opacity-60" style={{color: selectedComp.color}}>Role</span>
                            <span className="text-2xl font-bold text-white">{AGENTS[selectedCompAgent as keyof typeof AGENTS]?.role}</span>
                         </div>
                     </div>
                     
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: "Sensitivity", val: playerStats.sens, icon: MousePointer2 },
                            { label: "DPI / eDPI", val: playerStats.dpi, icon: Target },
                            { label: "Resolution", val: playerStats.res, icon: Monitor },
                            { label: "Enemy Color", val: playerStats.color, icon: Eye }
                        ].map((stat, idx) => (
                            <div key={idx} className="h-32 p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group">
                                <stat.icon className="mb-3 w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" style={{color: selectedComp.color}} />
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
                                <Crosshair className={`w-6 h-6 transition-colors ${copied ? 'text-green-500' : ''}`} style={{ color: copied ? undefined : selectedComp.color }} />
                            </div>
                            <span className="text-lg font-bold text-white uppercase tracking-widest">
                                {copied ? "Copied to Clipboard!" : "Copy Crosshair Code"}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <code className="hidden md:block font-mono text-sm text-white/40 bg-white/5 px-4 py-2 rounded-md group-hover:text-white group-hover:bg-white/10 transition-colors">
                                {playerStats.crosshair}
                            </code>
                            {copied ? <Check className="text-green-500 w-6 h-6" /> : <Copy className="text-white/40 w-6 h-6 group-hover:text-white" />}
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
                  Agent <span className="not-italic text-[#FF4654] ml-2">MASTERY</span>
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
              <div className="w-full md:w-1/3 bg-[#161616] p-10 flex flex-col justify-center border-r border-white/5 relative overflow-hidden">
                  <div className="relative z-20 text-center md:text-left">
                    <h3 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-4">{masteryAgent.name}</h3>
                    <div className="inline-block px-4 py-2 bg-white/5 rounded text-sm font-bold tracking-[0.2em] text-[#FF4654] uppercase mb-12 border border-[#FF4654]/20">
                        {masteryAgent.role}
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {abilitySlots.map((slot, i) => (
                            <div key={i} className="aspect-square bg-black/40 rounded-xl border border-white/10 p-3 flex items-center justify-center hover:border-white/40 transition-colors cursor-help group shadow-lg" title={slot}>
                                <img 
                                    src={`https://media.valorant-api.com/agents/${masteryAgent.id}/abilities/${slot.toLowerCase()}/displayicon.png`} 
                                    alt={slot}
                                    className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                />
                            </div>
                        ))}
                    </div>
                  </div>
              </div>

              <div className="w-full md:w-2/3 p-8 md:p-12 bg-[#0A0A0A]/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                      <div className="bg-[#0A0A0A] rounded-xl border border-white/10 overflow-hidden hover:border-white/30 transition-all group shadow-2xl relative h-full">
                          <div className="absolute inset-0 bg-[url('/maps/tactical_grid.png')] opacity-10 pointer-events-none" />
                          <div className="w-full h-full flex items-center justify-center bg-[#1A1A1A]">
                              <span className="text-white/20 text-xs font-mono tracking-widest">VIDEO PLACEHOLDER 1</span>
                          </div>
                      </div>

                      <div className="bg-[#0A0A0A] rounded-xl border border-white/10 overflow-hidden hover:border-white/30 transition-all group shadow-2xl relative h-full">
                          <div className="absolute inset-0 bg-[url('/maps/tactical_grid.png')] opacity-10 pointer-events-none" />
                          <div className="w-full h-full flex items-center justify-center bg-[#1A1A1A]">
                              <span className="text-white/20 text-xs font-mono tracking-widest">VIDEO PLACEHOLDER 2</span>
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