import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sword, Shield, Settings, Tv, Users, Play, Radio } from "lucide-react";

// === HEADER DA COLLAB ===
const HubHeader = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-[2px] pointer-events-none">
        
        <div className="flex items-center gap-6 pointer-events-auto">
            <Link to="/" className="group relative shrink-0">
                <svg width="42" height="42" viewBox="0 0 512 512" className="fill-[#FF4654] transition-transform group-hover:scale-110 duration-300">
                <defs>
                    <mask id="cut-header"><rect width="512" height="512" fill="white"/><rect x="-100" y="226" width="800" height="60" fill="black" transform="rotate(-45 256 256)"/></mask>
                </defs>
                <g mask="url(#cut-header)"><circle cx="256" cy="256" r="200" stroke="currentColor" strokeWidth="64" fill="none" /></g>
                <rect x="236" y="156" width="40" height="200" fill="white" rx="6" />
                <rect x="156" y="236" width="200" height="40" fill="white" rx="6" />
                </svg>
            </Link>
            <div className="h-6 w-[2px] bg-white/20 -skew-x-12 shrink-0" />
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Valorant_pink_version_logo.svg/2560px-Valorant_pink_version_logo.svg.png"
                alt="V Logo" className="h-8 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,70,84,0.5)]"
            />
        </div>

        <div className="hidden md:flex items-center gap-8 pointer-events-auto">
            {['MAPS', 'COMPS', 'AGENTS', 'STREAMS'].map((item) => (
                <button 
                    key={item} 
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-sm font-bold tracking-widest text-white/60 hover:text-[#FF4654] transition-colors uppercase relative group"
                >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF4654] transition-all group-hover:w-full" />
                </button>
            ))}
        </div>
    </nav>
  );
};

// === DADOS DO HUB ===
const MAPS = [
  { id: "abyss", name: "Abyss", image: "/maps/abyss.webp" },
  { id: "bind", name: "Bind", image: "/maps/bind.webp" },
  { id: "corrode", name: "Corrode", image: "/maps/corrode.webp" }, 
  { id: "haven", name: "Haven", image: "/maps/haven.webp" },
  { id: "pearl", name: "Pearl", image: "/maps/pearl.webp" },
  { id: "breeze", name: "Breeze", image: "/maps/breeze.webp" },
  { id: "split", name: "Split", image: "/maps/split.webp" },
];

// LISTA OFICIAL VERIFICADA (IDs Corretos + Cores Temáticas)
const AGENTS: Record<string, { name: string; role: string; id: string; color: string }> = {
  jett: { name: "Jett", role: "Duelist", id: "add6443a-41bd-29cd-27f6-256975cae690", color: "#92E0EB" },
  sova: { name: "Sova", role: "Initiator", id: "ded3520f-4264-bfed-162d-3080e6b7a948", color: "#3F4F8F" },
  cypher: { name: "Cypher", role: "Sentinel", id: "117ed9e3-49f3-6512-3ccf-0cada7e3823b", color: "#C3CED6" },
  killjoy: { name: "Killjoy", role: "Sentinel", id: "1e58de9c-4950-5125-93e9-a0aee9f98746", color: "#F5D342" },
  omen: { name: "Omen", role: "Controller", id: "8e253930-4c05-31dd-1b6c-968525494517", color: "#4D5575" },
  brimstone: { name: "Brimstone", role: "Controller", id: "9f0d8ba9-4140-b941-57d3-a7ad57c6b417", color: "#D96C2B" },
  raze: { name: "Raze", role: "Duelist", id: "f94c3b30-42be-e959-889c-5aa313dba261", color: "#F28B3D" },
  gekko: { name: "Gekko", role: "Initiator", id: "e370fa57-4757-3604-3648-499e1f642d3f", color: "#C7F458" },
  viper: { name: "Viper", role: "Controller", id: "707eab51-4836-f488-046a-cda6bf494859", color: "#4FB363" },
  neon: { name: "Neon", role: "Duelist", id: "bb2a4828-46eb-8cd1-e765-15848195d751", color: "#F5F93F" },
  kayo: { name: "KAY/O", role: "Initiator", id: "601dbbe6-8aa3-53e1-762d-578130388baf", color: "#41B1C4" },
  fade: { name: "Fade", role: "Initiator", id: "ade4ef5f-43e9-9512-5261-26a5bef7d2dd", color: "#5C5C5C" },
  breach: { name: "Breach", role: "Initiator", id: "5f8d3a7f-467b-97f3-062c-13acf203c006", color: "#D96C2B" },
  astra: { name: "Astra", role: "Controller", id: "41fb69c1-4189-7b37-f117-bcaf1e96f1bf", color: "#6A3B9E" },
  harbor: { name: "Harbor", role: "Controller", id: "95b78ed7-4637-86d9-7e41-71ba8c293152", color: "#2B8F8F" },
  iso: { name: "Iso", role: "Duelist", id: "0e38b510-41a8-5780-5e8f-568b2a4f2d6c", color: "#6A3B9E" },
  skye: { name: "Skye", role: "Initiator", id: "6f2a04ca-43e0-be17-7f36-a3908627744d", color: "#6A9E3B" },
  yoru: { name: "Yoru", role: "Duelist", id: "7f94d92c-4234-0a36-9006-c67d09106433", color: "#3F4F8F" },
  reyna: { name: "Reyna", role: "Duelist", id: "a3bf3253-43b2-9b34-0bbc-11850741cc81", color: "#9E3B9E" },
  chamber: { name: "Chamber", role: "Sentinel", id: "22697a3d-45bf-8dd7-4fec-84a9e28c69d7", color: "#D9BA3B" },
  deadlock: { name: "Deadlock", role: "Sentinel", id: "cc8b64c8-4b25-4ff9-6e7f-37b4da43d234", color: "#9E3B3B" },
  clove: { name: "Clove", role: "Controller", id: "709e9188-43d6-119a-a45e-4999c6736a53", color: "#E66AB4" }
};

const META_COMPS = [
  {
    id: 1, name: "Brazil Superteam", winRate: "68%", org: "MIBR", color: "#009944",
    agents: [
      { key: "jett", player: "aspas" }, { key: "gekko", player: "cauanzin" },
      { key: "sova", player: "nzr" }, { key: "omen", player: "art" }, { key: "killjoy", player: "less" }, 
    ],
  },
  {
    id: 2, name: "Double Controller", winRate: "64%", org: "Sentinels", color: "#CE0037",
    agents: [
      { key: "raze", player: "zekken" }, { key: "sova", player: "N4RRATE" },
      { key: "cypher", player: "johnqt" }, { key: "omen", player: "bang" }, { key: "viper", player: "Zellsis" },
    ],
  },
  {
    id: 3, name: "W-Gaming 3.0", winRate: "59%", org: "Paper Rex", color: "#A05BC3",
    agents: [
      { key: "neon", player: "something" }, { key: "breach", player: "f0rsakeN" },
      { key: "gekko", player: "Jinggg" }, { key: "brimstone", player: "mindfreak" }, { key: "fade", player: "d4v41" }, 
    ],
  },
];

const STREAMERS = {
    pros: [
        { name: "TenZ", team: "Sentinels", viewers: "42.1K", live: true, avatar: "https://static.wikia.nocookie.net/valorant_esports_gamepedia_en/images/6/61/TenZ_at_VCT_2024_Masters_Madrid.png" },
        { name: "aspas", team: "MIBR", viewers: "28.5K", live: true, avatar: "https://static.wikia.nocookie.net/valorant_esports_gamepedia_en/images/2/22/Leviat%C3%A1n_aspas_at_VCT_Americas_2024_Stage_1.png" },
        { name: "Demon1", team: "NRG", viewers: "15K", live: false, avatar: "https://static.wikia.nocookie.net/valorant_esports_gamepedia_en/images/4/40/NRG_Demon1_at_VCT_Americas_2024_Kickoff.png" },
        { name: "Boaster", team: "Fnatic", viewers: "12K", live: true, avatar: "https://static.wikia.nocookie.net/valorant_esports_gamepedia_en/images/3/30/Fnatic_Boaster_at_VCT_2024_Masters_Shanghai.png" },
    ],
    creators: [
        { name: "Tarik", team: "Content", viewers: "85K", live: true, avatar: "https://static.wikia.nocookie.net/valorant_esports_gamepedia_en/images/c/ca/Sentinels_tarik_at_VCT_2023_Lock_In.png" },
        { name: "Kyedae", team: "Content", viewers: "22K", live: false, avatar: "https://static.wikia.nocookie.net/valorant_esports_gamepedia_en/images/9/98/100_Thieves_Kyedae_at_VCT_2023_Lock_In.png" },
        { name: "Coreano", team: "LOUD", viewers: "18K", live: true, avatar: "https://pbs.twimg.com/profile_images/1615456997455085573/1G5-1-1-_400x400.jpg" },
        { name: "FRTTT", team: "Liquid", viewers: "15K", live: true, avatar: "https://pbs.twimg.com/profile_images/1620967584553394176/E-1-1-_400x400.jpg" },
    ]
}

export default function ValorantHub() {
  const [selectedMap, setSelectedMap] = useState(MAPS[0]);
  const [selectedComp, setSelectedComp] = useState(META_COMPS[0]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(META_COMPS[0].agents[0].key);
  const [sideMode, setSideMode] = useState<"attack" | "defense">("attack");
  const [streamTab, setStreamTab] = useState<"pros" | "creators">("pros");
  const [showConfig, setShowConfig] = useState<string | null>(null);

  const selectedAgentPlayer = selectedComp.agents.find(a => a.key === selectedAgent)?.player;
  const currentAgentData = AGENTS[selectedAgent as keyof typeof AGENTS];

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0A0A0A] font-sans selection:bg-[#FF4654] selection:text-white overflow-y-auto overflow-x-hidden">
      
      <HubHeader />

      {/* === MAPAS (HERO) === */}
      <section id="maps" className="relative h-[70vh] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selectedMap.id} 
            initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
            className="absolute inset-0"
          >
            <img src={selectedMap.image} alt={selectedMap.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0A0A0A]" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full flex flex-col justify-end px-8 lg:px-16 pb-12 z-10">
            <h1 className="text-8xl lg:text-[10rem] font-black uppercase tracking-tighter text-white leading-[0.8] drop-shadow-2xl opacity-90">
              {selectedMap.name}
            </h1>
            
            <div className="flex gap-4 overflow-x-auto pb-4 pt-8 scrollbar-hide">
                {MAPS.map((map) => (
                    <button
                        key={map.id}
                        onClick={() => setSelectedMap(map)}
                        // CORREÇÃO DO BOTÃO: flex items-center justify-center para centralizar o texto perfeitamente
                        className={`relative w-48 h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 group ${
                            selectedMap.id === map.id 
                            ? "border-[#FF4654] shadow-[0_0_30px_rgba(255,70,84,0.4)] scale-105 bg-[#FF4654] flex items-center justify-center" 
                            : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
                        }`}
                    >
                        {selectedMap.id === map.id ? (
                             // Texto centralizado sem div extra
                             <span className="text-2xl font-black italic uppercase tracking-tighter text-white">{map.name}</span>
                        ) : (
                            <>
                                <img src={map.image} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors" />
                                <span className="absolute bottom-2 left-2 text-sm font-bold uppercase tracking-widest text-white">{map.name}</span>
                            </>
                        )}
                    </button>
                ))}
            </div>
        </div>
      </section>

      {/* === COMPS === */}
      <section id="comps" className="px-8 lg:px-16 py-20 bg-[#0A0A0A]">
        <div className="mb-12">
             <h2 className="text-4xl font-black uppercase text-white italic">Meta <span className="text-[#FF4654]">Comps</span></h2>
             <p className="text-white/40">Select a team composition to analyze</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {META_COMPS.map((comp) => (
            <div
                key={comp.id}
                onClick={() => { 
                    setSelectedComp(comp); 
                    if (!comp.agents.some(a => a.key === selectedAgent)) {
                        setSelectedAgent(comp.agents[0].key);
                    }
                }}
                className={`text-left p-6 rounded-xl border transition-all relative overflow-hidden group cursor-pointer ${
                    selectedComp.id === comp.id ? "bg-white/5 border-[#FF4654] shadow-lg" : "bg-white/5 border-white/5 hover:border-white/20"
                }`}
            >
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <span className="text-xs font-bold tracking-widest uppercase mb-1 block" style={{color: comp.color}}>{comp.org}</span>
                        <h3 className="text-xl font-black text-white uppercase italic">{comp.name}</h3>
                    </div>
                    <span className="text-2xl font-black text-white/20">{comp.winRate}</span>
                </div>
                
                <div className="flex gap-2 relative z-10">
                    {comp.agents.map((a) => {
                        const isSelected = selectedAgent === a.key && selectedComp.id === comp.id;
                        return (
                            <button 
                                key={a.key} 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedComp(comp);
                                    setSelectedAgent(a.key);
                                }}
                                className={`w-10 h-10 rounded overflow-hidden flex items-center justify-center transition-all ${
                                    isSelected 
                                    ? "ring-2 ring-[#FF4654] scale-110 z-20 bg-[#FF4654]" 
                                    : "bg-black/50 border border-white/10 hover:border-white/50 hover:scale-105"
                                }`}
                            >
                                <img 
                                    src={`https://media.valorant-api.com/agents/${AGENTS[a.key as keyof typeof AGENTS]?.id}/displayicon.png`} 
                                    className="w-8 h-8 object-cover" 
                                    alt={a.key}
                                />
                            </button>
                        )
                    })}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* === AGENTS & UTILITY (COM Fundo Temático) === */}
      {currentAgentData && (
          <section id="agents" className="px-8 lg:px-16 py-12 border-t border-white/5">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                 
                 {/* Left: Agent Portrait & Config */}
                 <div className="lg:col-span-4 relative h-[500px] rounded-2xl border border-white/10 overflow-hidden flex flex-col items-center justify-end group bg-[#1A1A1A]">
                      
                      {/* NOVO: Degradê Temático Dinâmico */}
                      <div 
                          className="absolute inset-0 opacity-40 transition-colors duration-500"
                          style={{
                              background: `radial-gradient(circle at center bottom, ${currentAgentData.color}, transparent 70%)`
                          }}
                      />

                      <div className="absolute top-0 inset-x-0 h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
                      
                      <img 
                           key={currentAgentData.id}
                           src={`https://media.valorant-api.com/agents/${currentAgentData.id}/fullportrait.png`}
                           className="h-[90%] object-cover relative z-10 drop-shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-transform group-hover:scale-105 duration-500"
                      />
                      
                      <div className="absolute bottom-6 z-20 text-center">
                          <h3 className="text-5xl font-black text-white uppercase italic leading-none">{selectedAgentPlayer}</h3>
                          <p className="text-[#FF4654] font-bold tracking-widest uppercase text-sm mt-1" style={{ color: currentAgentData.color }}>{currentAgentData.name}</p>
                      </div>
                 </div>

                 {/* Right: Tactics & Utility */}
                 <div className="lg:col-span-8 flex flex-col">
                      <div className="flex gap-4 mb-8">
                          <button onClick={() => setSideMode("attack")} className={`flex-1 py-4 rounded-lg font-black uppercase text-xl flex items-center justify-center gap-3 transition-all ${sideMode === 'attack' ? 'bg-[#FF4654] text-white shadow-lg' : 'bg-white/5 text-white/40 hover:text-white'}`}>
                              <Sword size={24} /> Attack Setups
                          </button>
                          <button onClick={() => setSideMode("defense")} className={`flex-1 py-4 rounded-lg font-black uppercase text-xl flex items-center justify-center gap-3 transition-all ${sideMode === 'defense' ? 'bg-[#5B3C99] text-white shadow-lg' : 'bg-white/5 text-white/40 hover:text-white'}`}>
                              <Shield size={24} /> Defense Holds
                          </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#FF4654]/50 transition-colors">
                              <h4 className="text-[#FF4654] font-bold uppercase tracking-widest text-xs mb-2">Key Position</h4>
                              <p className="text-white font-bold text-lg mb-4">{sideMode === 'attack' ? 'Execução Padrão' : 'Âncora do Site'}</p>
                              <div className="h-32 bg-black/40 rounded-lg flex items-center justify-center text-white/20 text-sm font-mono border border-white/5">
                                 [Minimap: {selectedMap.name}]
                              </div>
                          </div>
                          
                          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#FF4654]/50 transition-colors">
                              <h4 className="text-[#FF4654] font-bold uppercase tracking-widest text-xs mb-2">Essential Utility</h4>
                              <p className="text-white font-bold text-lg mb-4">{sideMode === 'attack' ? 'Utilitário de Entrada' : 'Utilitário de Retardo'}</p>
                              <div className="space-y-2">
                                 <div className="flex items-center gap-3 text-sm text-white/60"><div className="w-2 h-2 rounded-full bg-[#FF4654]" /> Use no início do round</div>
                                 <div className="flex items-center gap-3 text-sm text-white/60"><div className="w-2 h-2 rounded-full bg-[#FF4654]" /> Combine com a info do time</div>
                              </div>
                          </div>
                      </div>
                 </div>
             </div>
          </section>
      )}

      {/* === STREAMS === */}
      <section id="streams" className="px-8 lg:px-16 py-20 bg-black border-t border-white/10">
         <div className="flex items-end justify-between mb-12">
             <div>
                <h2 className="text-4xl font-black uppercase text-white italic">Live <span className="text-[#9146FF]">Hub</span></h2>
                <p className="text-white/40">Watch top players & creators live</p>
             </div>
             <div className="flex bg-white/5 rounded-lg p-1">
                 <button onClick={() => setStreamTab('pros')} className={`px-6 py-2 rounded font-bold uppercase text-sm transition-all ${streamTab === 'pros' ? 'bg-[#9146FF] text-white' : 'text-white/40 hover:text-white'}`}>Pro Players</button>
                 <button onClick={() => setStreamTab('creators')} className={`px-6 py-2 rounded font-bold uppercase text-sm transition-all ${streamTab === 'creators' ? 'bg-[#9146FF] text-white' : 'text-white/40 hover:text-white'}`}>Creators</button>
             </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {STREAMERS[streamTab].map((streamer, idx) => (
                 <div key={idx} className="bg-[#18181B] rounded-xl overflow-hidden group border border-white/5 hover:border-[#9146FF] transition-all cursor-pointer">
                     <div className="relative aspect-video bg-[#222]">
                         {streamer.live ? (
                             <div className="absolute top-2 left-2 bg-[#EF4444] text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">LIVE</div>
                         ) : (
                             <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">OFFLINE</div>
                         )}
                         <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" /> {streamer.viewers}
                         </div>
                     </div>
                     
                     <div className="p-4 flex gap-3">
                         <img src={streamer.avatar} className="w-10 h-10 rounded-full border-2 border-[#9146FF]" />
                         <div>
                             <h4 className="text-white font-bold leading-none">{streamer.name}</h4>
                             <p className="text-white/40 text-xs mt-1">{streamer.team}</p>
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