import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sword, Shield, Map as MapIcon, Target, Timer, Anchor, RefreshCcw, MousePointer2, Monitor, Keyboard } from "lucide-react";

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
                    <circle cx="256" cy="256" r="200" stroke="white" strokeWidth="64" fill="none" mask="url(#cut-header)" />
                    <rect x="236" y="156" width="40" height="200" fill="#FF4654" rx="6" />
                    <rect x="156" y="236" width="200" height="40" fill="#FF4654" rx="6" />
                </svg>
            </Link>
            <div className="h-6 w-[2px] bg-white/20 -skew-x-12 shrink-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Valorant_pink_version_logo.svg/2560px-Valorant_pink_version_logo.svg.png" alt="V Logo" className="h-8 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,70,84,0.5)]" />
        </div>
        <div className="hidden md:flex items-center gap-8 pointer-events-auto">
            {['MAPS', 'COMPS', 'INTEL', 'MASTERY', 'STREAMS'].map((item) => (
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
  raze: { name: "Raze", role: "Duelist", id: "f94c3b30-42be-e959-889c-5aa313dba261", color: "#F28B3D" },
  gekko: { name: "Gekko", role: "Initiator", id: "e370fa57-4757-3604-3648-499e1f642d3f", color: "#C7F458" },
  viper: { name: "Viper", role: "Controller", id: "707eab51-4836-f488-046a-cda6bf494859", color: "#4FB363" },
  neon: { name: "Neon", role: "Duelist", id: "bb2a4828-46eb-8cd1-e765-15848195d751", color: "#F5F93F" },
  kayo: { name: "KAY/O", role: "Initiator", id: "601dbbe7-43ce-be57-2a40-4abd24953621", color: "#41B1C4" },
  fade: { name: "Fade", role: "Initiator", id: "dade69b4-4f5a-8528-247b-219e5a1facd6", color: "#5C5C5C" },
};

const META_COMPS = [
  {
    id: 1, name: "Brazil Superteam", winRate: "68%", org: "MIBR", color: "#009944",
    agents: [{ key: "jett", player: "aspas" }, { key: "gekko", player: "cauanzin" }, { key: "sova", player: "nzr" }, { key: "omen", player: "art" }, { key: "killjoy", player: "less" }],
  },
  {
    id: 2, name: "Double Controller", winRate: "64%", org: "Sentinels", color: "#CE0037",
    agents: [{ key: "raze", player: "zekken" }, { key: "sova", player: "N4RRATE" }, { key: "cypher", player: "johnqt" }, { key: "omen", player: "bang" }, { key: "viper", player: "Zellsis" }],
  },
];

const STREAMERS = [
    { name: "Sacy", team: "MIBR", channel: "sacy", avatar: "https://pbs.twimg.com/profile_images/1765103603417759744/rM0lYm9m_400x400.jpg" },
    { name: "TcK", team: "Cloud9", channel: "tck10", avatar: "https://pbs.twimg.com/profile_images/1676678229986500608/s3Xo78W3_400x400.jpg" },
    { name: "TenZ", team: "Sentinels", channel: "tenz", avatar: "https://pbs.twimg.com/profile_images/1831440841961136128/9GjD4m0p_400x400.jpg" },
    { name: "Tarik", team: "Sentinels", channel: "tarik", avatar: "https://pbs.twimg.com/profile_images/1734685012583559168/vDqF1H8m_400x400.jpg" }
];

export default function ValorantHub() {
  const [selectedMap, setSelectedMap] = useState(MAPS[0]);
  const [selectedComp, setSelectedComp] = useState(META_COMPS[0]);
  const [activeCompSelections, setActiveCompSelections] = useState<Record<number, string>>({
    1: "jett",
    2: "raze"
  });
  
  const [hostname, setHostname] = useState("");
  const [masteryRole, setMasteryRole] = useState("Duelist");
  const [masteryAgent, setMasteryAgent] = useState(AGENTS["jett"]);
  const [masteryPhase, setMasteryPhase] = useState<"attack" | "defense">("attack");

  useEffect(() => { if (typeof window !== "undefined") setHostname(window.location.hostname); }, []);

  const currentSelectionKey = activeCompSelections[selectedComp.id];
  const selectedAgentPlayer = selectedComp.agents.find(a => a.key === currentSelectionKey)?.player;
  const currentCompAgentData = AGENTS[currentSelectionKey as keyof typeof AGENTS];

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0A0A0A] font-sans selection:bg-[#FF4654] selection:text-white overflow-y-auto overflow-x-hidden">
      <HubHeader />

      {/* === HERO: MAPAS === */}
      <section id="maps" className="relative h-[65vh] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div key={selectedMap.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            <img src={selectedMap.image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-transparent to-[#0A0A0A]" />
          </motion.div>
        </AnimatePresence>
        <div className="relative h-full flex flex-col justify-end px-8 lg:px-16 pb-12">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {MAPS.map((map) => (
                    <button 
                        key={map.id} 
                        onClick={() => setSelectedMap(map)} 
                        className={`relative w-48 h-24 shrink-0 rounded-lg border-2 transition-all group overflow-hidden ${
                            selectedMap.id === map.id ? "border-[#FF4654] scale-105" : "border-white/10 opacity-60"
                        }`}
                    >
                        {selectedMap.id === map.id ? (
                            <div className="absolute inset-0 bg-[#FF4654] flex items-center justify-center z-10">
                                <span className="text-xl font-black italic uppercase text-white">{map.name}</span>
                            </div>
                        ) : (
                            <>
                                <img src={map.image} className="absolute inset-0 w-full h-full object-cover grayscale" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center font-bold uppercase text-white">{map.name}</div>
                            </>
                        )}
                    </button>
                ))}
            </div>
        </div>
      </section>

      {/* === SEÇÃO 2: META COMPS & PRO SETTINGS (ALINHADO) === */}
      <section id="comps" className="px-8 lg:px-16 py-12 bg-[#0A0A0A]">
        <h2 className="text-4xl font-black uppercase text-white italic mb-10">Meta <span className="text-[#FF4654]">Comps</span></h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-4 space-y-4">
                {META_COMPS.map((comp) => (
                    <div 
                        key={comp.id} 
                        onClick={() => setSelectedComp(comp)} 
                        className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between h-[155px] ${
                            selectedComp.id === comp.id ? "bg-white/5 border-[#FF4654] shadow-[0_0_20px_rgba(255,70,84,0.1)]" : "border-white/5 bg-white/5"
                        }`}
                    >
                        <div>
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{color: comp.color}}>{comp.org}</span>
                            <h3 className="text-xl font-black text-white uppercase italic">{comp.name}</h3>
                        </div>
                        <div className="flex gap-2">
                            {comp.agents.map((a) => (
                                <button 
                                    key={a.key} 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        setSelectedComp(comp); 
                                        setActiveCompSelections(prev => ({...prev, [comp.id]: a.key}));
                                    }} 
                                    className={`w-10 h-10 rounded border transition-all ${
                                        activeCompSelections[comp.id] === a.key ? "border-[#FF4654] bg-[#FF4654] scale-110 z-10" : "border-white/10 hover:border-white/30"
                                    }`}
                                >
                                    <img src={`https://media.valorant-api.com/agents/${AGENTS[a.key as keyof typeof AGENTS]?.id}/displayicon.png`} className="w-full h-full object-contain" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="lg:col-span-8 bg-[#111] rounded-2xl border border-white/10 p-8 flex flex-col md:flex-row gap-8 items-center h-full min-h-[330px]">
                <div className="flex-1 text-center md:text-left">
                    <span className="text-[#FF4654] font-black tracking-widest text-[11px] uppercase border-b-2 border-[#FF4654] pb-1">Professional Setup</span>
                    <h3 className="text-7xl font-black text-white italic uppercase leading-[1.1] my-4 tracking-tighter">{selectedAgentPlayer}</h3>
                    <div className="grid grid-cols-2 gap-3 max-w-md">
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center gap-3">
                            <MousePointer2 size={18} className="text-[#FF4654]" />
                            <div><p className="text-[9px] text-white/40 uppercase font-bold">eDPI / Sens</p><p className="font-mono text-lg text-white">280.5 / 0.35</p></div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center gap-3">
                            <Monitor size={18} className="text-[#FF4654]" />
                            <div><p className="text-[9px] text-white/40 uppercase font-bold">Res / Hz</p><p className="font-mono text-lg text-white">1280x960</p></div>
                        </div>
                        <div className="col-span-2 bg-white/5 p-4 rounded-lg border border-white/10 flex items-center gap-3">
                            <Keyboard size={18} className="text-[#FF4654]" />
                            <div className="truncate"><p className="text-[9px] text-white/40 uppercase font-bold">Crosshair Code</p><p className="font-mono text-xs text-white truncate">0;P;c;5;o;1;f;0;0t;1;0l;2;0o;2;0a;1;0f;0;1b;0</p></div>
                        </div>
                    </div>
                </div>
                <div className="relative h-full flex items-end">
                    <img src={`https://media.valorant-api.com/agents/${currentCompAgentData?.id}/fullportrait.png`} className="h-[300px] object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.5)] z-10" />
                </div>
            </div>
        </div>
      </section>

      {/* === SEÇÃO 3: AGENT MASTERY (RESGATE DOS AGENTES & FIX DO Y) === */}
      <section id="mastery" className="px-8 lg:px-16 py-24 bg-[#0A0A0A] border-t border-white/5">
          <div className="text-center mb-16">
              {/* O Y NÃO CORTA MAIS: respiro lateral garantido */}
              <h2 className="text-6xl font-black uppercase text-white italic pr-12 inline-block overflow-visible leading-[1.2]">
                  Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4654] to-white pb-2">Mastery</span>
              </h2>
          </div>

          <div className="flex justify-center gap-4 mb-8">
              {ROLES.map(role => (
                  <button key={role.name} onClick={() => setMasteryRole(role.name)} className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all ${masteryRole === role.name ? "bg-white border-white scale-110 shadow-lg" : "bg-white/5 border-white/10 hover:border-white/30"}`}>
                      <img src={`https://media.valorant-api.com/agents/roles/${role.id}/displayicon.png`} className={`w-8 h-8 ${masteryRole === role.name ? 'invert' : 'opacity-40'}`} />
                  </button>
              ))}
          </div>

          {/* LISTA DE AGENTES DE VOLTA (ESSENCIAL) */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto">
              {Object.values(AGENTS).filter(a => a.role === masteryRole).map(agent => (
                  <button key={agent.id} onClick={() => setMasteryAgent(agent)} className={`w-16 h-16 rounded-xl border-2 transition-all relative group overflow-hidden ${masteryAgent.id === agent.id ? "border-[#FF4654] scale-110 shadow-[0_0_15px_rgba(255,70,84,0.3)]" : "border-white/5 grayscale opacity-60 hover:opacity-100 hover:grayscale-0"}`}>
                      <img src={`https://media.valorant-api.com/agents/${agent.id}/displayicon.png`} className="w-full h-full object-cover" />
                  </button>
              ))}
          </div>

          <div className="bg-[#111] rounded-3xl border border-white/10 overflow-hidden flex flex-col lg:flex-row min-h-[550px]">
              <div className="w-full lg:w-80 bg-[#161616] p-10 border-r border-white/5 flex flex-col">
                  <h3 className="text-4xl font-black text-white uppercase italic mb-1 leading-none">{masteryAgent.name}</h3>
                  <span className="text-[#FF4654] text-[10px] font-bold uppercase tracking-[0.3em] mb-10">{masteryAgent.role}</span>
                  <div className="space-y-4">
                      <button onClick={() => setMasteryPhase('attack')} className={`w-full py-5 rounded-lg font-black uppercase flex items-center justify-center gap-3 transition-all ${masteryPhase === 'attack' ? 'bg-[#FF4654] text-white' : 'bg-white/5 text-white/20 hover:text-white/50'}`}>
                          <Sword size={20} /> Attack
                      </button>
                      <button onClick={() => setMasteryPhase('defense')} className={`w-full py-5 rounded-lg font-black uppercase flex items-center justify-center gap-3 transition-all ${masteryPhase === 'defense' ? 'bg-white text-black' : 'bg-white/5 text-white/20 hover:text-white/50'}`}>
                          <Shield size={20} /> Defense
                      </button>
                  </div>
              </div>

              <div className="flex-1 p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2].map((i) => (
                      <div key={i} className="bg-[#0A0A0A] rounded-2xl border border-white/5 p-6 group hover:border-white/20 transition-all">
                          <div className="aspect-video bg-[#151515] rounded-xl mb-6 relative overflow-hidden flex items-center justify-center border border-white/5">
                              <img src={`https://media.valorant-api.com/maps/${selectedMap.uuid}/displayicon.png`} className="absolute inset-0 w-full h-full object-contain opacity-10 grayscale group-hover:opacity-30 transition-all duration-500 scale-90 group-hover:scale-100" />
                              <div className="z-10 text-center">
                                  <div className="w-4 h-4 bg-[#FF4654] rounded-full animate-ping mx-auto mb-3 shadow-[0_0_15px_#FF4654]" />
                                  <span className="text-[10px] font-black font-mono text-white/40 tracking-widest uppercase">Tactical Setup // {selectedMap.name}</span>
                              </div>
                          </div>
                          <h4 className="font-black text-white uppercase text-lg mb-2">{masteryPhase === 'attack' ? 'Aggressive Entry' : 'Passive Hold'}</h4>
                          <p className="text-sm text-white/40 leading-relaxed font-medium">Detailed positioning for high rank {masteryAgent.name} utility usage.</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* === STREAMS === */}
      <section id="streams" className="px-8 lg:px-16 py-24 bg-black border-t border-white/10">
          <h2 className="text-4xl font-black uppercase text-white italic mb-12">Live <span className="text-[#9146FF]">Hub</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STREAMERS.map((s, idx) => (
                  <div key={idx} className="bg-[#18181B] rounded-2xl overflow-hidden border border-white/5 hover:border-[#9146FF] transition-all aspect-video relative group cursor-none">
                      <iframe src={`https://player.twitch.tv/?channel=${s.channel}&parent=${hostname}&muted=true`} height="100%" width="100%" allowFullScreen className="w-full h-full pointer-events-auto" />
                      <div className="absolute bottom-0 p-4 bg-gradient-to-t from-black to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-3">
                          <img src={s.avatar} className="w-10 h-10 rounded-full border-2 border-[#9146FF] shadow-lg" />
                          <div className="leading-none">
                              <p className="text-xs font-black text-white uppercase italic">{s.name}</p>
                              <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest">{s.team}</p>
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