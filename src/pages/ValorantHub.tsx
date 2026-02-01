import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sword, Shield, Settings, Map as MapIcon, Target, Timer, Anchor, RefreshCcw, PlayCircle } from "lucide-react";

// === HEADER ===
const HubHeader = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent backdrop-blur-sm pointer-events-none transition-all duration-300">
        <div className="flex items-center gap-6 pointer-events-auto">
            {/* LOGO ONSITE CORRIGIDA: BRANCO FORA, ROSA DENTRO */}
            <Link to="/" className="group relative shrink-0">
                <svg width="42" height="42" viewBox="0 0 512 512" className="transition-transform group-hover:scale-110 duration-300">
                    <defs><mask id="cut-header"><rect width="512" height="512" fill="white"/><rect x="-100" y="226" width="800" height="60" fill="black" transform="rotate(-45 256 256)"/></mask></defs>
                    
                    {/* Círculo Externo Branco */}
                    <g mask="url(#cut-header)">
                        <circle cx="256" cy="256" r="200" stroke="white" strokeWidth="64" fill="none" />
                    </g>
                    
                    {/* Cruz Interna Rosa Valorant */}
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

// LISTA UNIFICADA (TOP 4)
const STREAMERS = [
    { name: "Sacy", team: "MIBR", channel: "sacy", live: false, avatar: "https://liquipedia.net/commons/images/thumb/0/07/Sentinels_Sacy_at_VCT_2024_Masters_Madrid.png/600px-Sentinels_Sacy_at_VCT_2024_Masters_Madrid.png" },
    { name: "TcK", team: "Cloud9", channel: "tck10", live: true, avatar: "https://pbs.twimg.com/profile_images/1676678229986500608/s3Xo78W3_400x400.jpg" },
    { name: "TenZ", team: "Sentinels", channel: "tenz", live: true, avatar: "https://static.wikia.nocookie.net/valorant_esports_gamepedia_en/images/6/61/TenZ_at_VCT_2024_Masters_Madrid.png" },
    { name: "Tarik", team: "Sentinels", channel: "tarik", live: true, avatar: "https://static.wikia.nocookie.net/valorant_esports_gamepedia_en/images/c/ca/Sentinels_tarik_at_VCT_2023_Lock_In.png" }
];

export default function ValorantHub() {
  const [selectedMap, setSelectedMap] = useState(MAPS[0]);
  const [selectedComp, setSelectedComp] = useState(META_COMPS[0]);
  const [selectedCompAgent, setSelectedCompAgent] = useState<string | null>(META_COMPS[0].agents[0].key);
  const [hostname, setHostname] = useState("");

  // FIX TWITCH
  useEffect(() => {
      if (typeof window !== "undefined") {
          setHostname(window.location.hostname);
      }
  }, []);
  
  // MASTERY STATES
  const [masteryRole, setMasteryRole] = useState("Duelist");
  const [masteryAgent, setMasteryAgent] = useState(AGENTS["jett"]);
  const [masteryPhase, setMasteryPhase] = useState<"attack" | "defense">("attack");

  const selectedAgentPlayer = selectedComp.agents.find(a => a.key === selectedCompAgent)?.player;
  const currentCompAgentData = AGENTS[selectedCompAgent as keyof typeof AGENTS];

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0A0A0A] font-sans selection:bg-[#FF4654] selection:text-white overflow-y-auto overflow-x-hidden">
      
      <HubHeader />

      {/* === HERO: MAPAS === */}
      <section id="maps" className="relative h-[70vh] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selectedMap.id} 
            initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
            className="absolute inset-0"
          >
            <img src={selectedMap.image} alt={selectedMap.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-[#0A0A0A]" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full flex flex-col justify-end px-8 lg:px-16 pb-12 z-10">
            {/* TÍTULO REMOVIDO PARA LIMPAR POLUIÇÃO VISUAL */}
            
            {/* MAP SELECTOR */}
            <div className="flex gap-4 overflow-x-auto pb-8 pt-8 scrollbar-hide px-6 -mx-6">
                {MAPS.map((map) => (
                    <button
                        key={map.id}
                        onClick={() => setSelectedMap(map)}
                        className={`relative w-48 h-24 shrink-0 rounded-lg transition-all duration-300 group overflow-hidden ${
                            selectedMap.id === map.id 
                            ? "border-2 border-[#FF4654] shadow-[0_0_25px_rgba(255,70,84,0.5)] scale-105" 
                            : "border border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                        }`}
                    >
                        {selectedMap.id === map.id ? (
                             <div className="absolute inset-0 bg-[#FF4654] flex items-center justify-center">
                                 <span className="text-2xl font-black italic uppercase tracking-tighter text-white">{map.name}</span>
                             </div>
                        ) : (
                            <>
                                <img src={map.image} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                <div 
                                    className="absolute inset-0" 
                                    style={{
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)'
                                    }}
                                />
                                <span className="absolute bottom-2 left-2 text-sm font-bold uppercase tracking-widest text-white">{map.name}</span>
                            </>
                        )}
                    </button>
                ))}
            </div>
        </div>
      </section>

      {/* === SEÇÃO 2: META COMPS === */}
      <section id="comps" className="px-8 lg:px-16 py-20 bg-[#0A0A0A]">
        <div className="mb-12">
             <h2 className="text-4xl font-black uppercase text-white italic">Meta <span className="text-[#FF4654]">Comps</span></h2>
             <p className="text-white/40">Select a composition to see pro intel on {selectedMap.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {META_COMPS.map((comp) => (
            <div
                key={comp.id}
                onClick={() => { 
                    setSelectedComp(comp); 
                    if (!comp.agents.some(a => a.key === selectedCompAgent)) setSelectedCompAgent(comp.agents[0].key);
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
                        const isSelected = selectedCompAgent === a.key && selectedComp.id === comp.id;
                        return (
                            <button 
                                key={a.key} 
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    setSelectedComp(comp);
                                    setSelectedCompAgent(a.key);
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

      {/* === SEÇÃO 3: OPERATOR INTEL === */}
      {currentCompAgentData && (
          <section id="intel" className="px-8 lg:px-16 py-12 border-t border-white/5 bg-[#0A0A0A]">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                 
                 <div className="lg:col-span-5 relative h-[500px] flex items-end justify-center group">
                      <img 
                           key={currentCompAgentData.id}
                           src={`https://media.valorant-api.com/agents/${currentCompAgentData.id}/fullportrait.png`}
                           className="h-[110%] object-cover relative z-0 drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                           style={{
                                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                           }}
                      />
                      
                      <div className="absolute bottom-10 z-20 text-center">
                          <h3 className="text-7xl font-black text-white uppercase italic leading-none">{selectedAgentPlayer}</h3>
                          <div className="flex items-center justify-center gap-4 mt-4">
                              <div className="px-4 py-2 bg-white/5 rounded border border-white/10 backdrop-blur">
                                  <span className="text-xs text-white/40 uppercase tracking-widest block">eDPI</span>
                                  <span className="text-xl font-mono text-[#FF4654]">280.5</span>
                              </div>
                              <div className="px-4 py-2 bg-white/5 rounded border border-white/10 backdrop-blur">
                                  <span className="text-xs text-white/40 uppercase tracking-widest block">Sens</span>
                                  <span className="text-xl font-mono text-white">0.35</span>
                              </div>
                          </div>
                      </div>
                 </div>

                 <div className="lg:col-span-7">
                      <div className="flex items-center gap-3 mb-6">
                          <MapIcon className="text-[#FF4654]" />
                          <h3 className="text-2xl font-black text-white uppercase">Operator GPS <span className="text-white/20">// {selectedMap.name}</span></h3>
                      </div>
                      
                      <div className="aspect-video w-full bg-[#151515] rounded-xl border border-white/10 relative overflow-hidden group">
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
                          <img 
                            src={`https://media.valorant-api.com/maps/${selectedMap.uuid}/displayicon.png`} 
                            className="absolute inset-0 w-full h-full object-contain opacity-40 grayscale"
                            alt="Minimap"
                          />
                          <div className="absolute top-1/3 left-1/4 z-10">
                              <div className="w-4 h-4 bg-[#FF4654] rounded-full animate-ping absolute" />
                              <div className="w-4 h-4 bg-[#FF4654] rounded-full relative border-2 border-white shadow-[0_0_20px_#FF4654]" />
                              <div className="absolute left-6 top-0 bg-black/80 px-3 py-1 rounded text-xs text-white whitespace-nowrap border-l-2 border-[#FF4654]">
                                  <strong>Start:</strong> A Main Control
                              </div>
                          </div>
                      </div>
                 </div>
             </div>
          </section>
      )}

      {/* === SEÇÃO 4: AGENT MASTERY === */}
      <section id="mastery" className="px-8 lg:px-16 py-24 bg-[#0A0A0A] border-t border-white/5">
          <div className="text-center mb-16 px-4">
              {/* Y RESOLVIDO: padding-right (pr-4) e py-2 */}
              <h2 className="text-5xl font-black uppercase text-white italic mb-0 leading-[1.2] py-2 inline-block pr-4">
                  Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4654] to-white">Mastery</span>
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
                    title={role.name}
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

          <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 bg-[#161616] p-8 flex flex-col items-center border-r border-white/5 relative overflow-hidden">
                  <img 
                      src={`https://media.valorant-api.com/agents/${masteryAgent.id}/fullportrait.png`} 
                      className="h-80 object-cover relative z-10 drop-shadow-2xl mb-4"
                      style={{
                          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                      }}
                  />
                  <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at top, ${masteryAgent.color}, transparent 70%)` }} />
                  <h3 className="text-4xl font-black text-white uppercase italic mt-[-2rem] relative z-20">{masteryAgent.name}</h3>
                  <p className="text-white/40 text-sm tracking-widest uppercase mb-8 relative z-20">{masteryAgent.role}</p>

                  <div className="w-full space-y-3 relative z-20">
                      <button onClick={() => setMasteryPhase('attack')} className={`w-full py-4 rounded font-bold uppercase flex items-center justify-center gap-3 transition-all ${masteryPhase === 'attack' ? 'bg-[#FF4654] text-white' : 'bg-white/5 text-white/40'}`}>
                          <Sword size={20} /> Attack Plays
                      </button>
                      <button onClick={() => setMasteryPhase('defense')} className={`w-full py-4 rounded font-bold uppercase flex items-center justify-center gap-3 transition-all ${masteryPhase === 'defense' ? 'bg-[#EBEBEB] text-[#0A0A0A]' : 'bg-white/5 text-white/40'}`}>
                          <Shield size={20} /> Defense Plays
                      </button>
                  </div>
              </div>

              <div className="w-full md:w-2/3 p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                      <div className="bg-[#0A0A0A] rounded-xl border border-white/10 p-6 hover:border-white/30 transition-all group">
                          <div className="flex items-center gap-3 mb-4">
                              <div className={`p-2 rounded ${masteryPhase === 'attack' ? 'bg-[#FF4654]/20 text-[#FF4654]' : 'bg-[#EBEBEB] text-[#0A0A0A]'}`}>
                                  {masteryPhase === 'attack' ? <Target size={20} /> : <Anchor size={20} />}
                              </div>
                              <h4 className="font-bold text-white uppercase tracking-widest">
                                  {masteryPhase === 'attack' ? 'Early Round' : 'Start Hold'}
                              </h4>
                          </div>
                          <div className="aspect-video bg-[#1A1A1A] rounded border border-white/5 mb-4 flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-[url('/maps/tactical_grid.png')] opacity-20" />
                              <span className="text-white/20 text-xs font-mono">VIDEO / LINEUP PLACEHOLDER</span>
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed">
                              {masteryPhase === 'attack' 
                                ? `Use ${masteryAgent.name}'s utility to break crosshair placement.` 
                                : `Hold passive angles. Delay push for rotations.`}
                          </p>
                      </div>

                      <div className="bg-[#0A0A0A] rounded-xl border border-white/10 p-6 hover:border-white/30 transition-all group">
                          <div className="flex items-center gap-3 mb-4">
                              <div className={`p-2 rounded ${masteryPhase === 'attack' ? 'bg-[#FF4654]/20 text-[#FF4654]' : 'bg-[#EBEBEB] text-[#0A0A0A]'}`}>
                                  {masteryPhase === 'attack' ? <Timer size={20} /> : <RefreshCcw size={20} />}
                              </div>
                              <h4 className="font-bold text-white uppercase tracking-widest">
                                  {masteryPhase === 'attack' ? 'Post-Plant' : 'Retake'}
                              </h4>
                          </div>
                          <div className="aspect-video bg-[#1A1A1A] rounded border border-white/5 mb-4 flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-[url('/maps/tactical_grid.png')] opacity-20" />
                              <span className="text-white/20 text-xs font-mono">VIDEO / SETUP PLACEHOLDER</span>
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed">
                              {masteryPhase === 'attack' 
                                ? `Play for time. Use lineup from safe distance.` 
                                : `Isolate 1v1 fights. Flash for teammates.`}
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
                     {streamer.live ? (
                         <div className="absolute inset-0 w-full h-full">
                             {/* TWITCH EMBED FIX: Usa o hostname dinâmico */}
                             <iframe
                                src={`https://player.twitch.tv/?channel=${streamer.channel}&parent=${hostname}&muted=true`}
                                height="100%"
                                width="100%"
                                allowFullScreen
                                className="w-full h-full object-cover"
                             />
                             <div className="absolute top-3 left-3 bg-[#9146FF] text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse pointer-events-none">LIVE</div>
                         </div>
                     ) : (
                         <div className="absolute inset-0 w-full h-full">
                             <video 
                                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" 
                                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                                autoPlay loop muted playsInline
                             />
                             <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-2">
                                <span className="w-2 h-2 bg-gray-500 rounded-full"></span> OFFLINE
                             </div>
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <PlayCircle className="w-12 h-12 text-white/50 group-hover:text-[#9146FF] transition-colors" />
                             </div>
                         </div>
                     )}
                     
                     <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center gap-3 pointer-events-none">
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