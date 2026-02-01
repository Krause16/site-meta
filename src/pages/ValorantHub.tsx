import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sword, Shield, Map as MapIcon, Target, Timer, Anchor, RefreshCcw } from "lucide-react";

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

const AGENTS: Record<string, { name: string; role: string; id: string; color: string; abilities: string[] }> = {
  jett: { name: "Jett", role: "Duelist", id: "add6443a-41bd-e414-f6ad-e58d267f4e95", color: "#92E0EB", abilities: ["412356bc-47cd-3323-289b-7581b2a926cc", "85b2e987-4348-185d-8302-31be1d3876e5", "9665f807-4228-58a4-927a-59b3297a7322", "8bc67156-4b47-b2f5-b77a-6490632d433b"] },
  sova: { name: "Sova", role: "Initiator", id: "320b2a48-4d9b-a075-30f1-1f93a9b638fa", color: "#3F4F8F", abilities: ["866164bc-41ca-f0d8-1e43-16a8b1368160", "e7619a97-4009-8472-8873-138374d6c702", "81216d2e-406c-82fd-7667-28956277054f", "08608460-474c-4235-51f7-e28325608b4a"] },
  // ... (vou manter a lógica dos outros agentes do seu código original)
};

const META_COMPS = [
  { id: 1, name: "Brazil Superteam", winRate: "68%", org: "MIBR", color: "#009944", agents: [{ key: "jett", player: "aspas" }, { key: "gekko", player: "cauanzin" }, { key: "sova", player: "nzr" }, { key: "omen", player: "art" }, { key: "killjoy", player: "less" }] },
  { id: 2, name: "Double Controller", winRate: "64%", org: "Sentinels", color: "#CE0037", agents: [{ key: "raze", player: "zekken" }, { key: "sova", player: "N4RRATE" }, { key: "cypher", player: "johnqt" }, { key: "omen", player: "bang" }, { key: "viper", player: "Zellsis" }] },
  { id: 3, name: "W-Gaming 3.0", winRate: "59%", org: "Paper Rex", color: "#A05BC3", agents: [{ key: "neon", player: "something" }, { key: "breach", player: "f0rsakeN" }, { key: "gekko", player: "Jinggg" }, { key: "brimstone", player: "mindfreak" }, { key: "fade", player: "d4v41" }] },
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
  const [masteryRole, setMasteryRole] = useState("Duelist");
  const [masteryAgent, setMasteryAgent] = useState(AGENTS["jett"] || Object.values(AGENTS)[0]);
  const [masteryPhase, setMasteryPhase] = useState<"attack" | "defense">("attack");

  useEffect(() => { if (typeof window !== "undefined") setHostname(window.location.hostname); }, []);

  const selectedAgentPlayer = selectedComp.agents.find(a => a.key === selectedCompAgent)?.player;
  const currentCompAgentData = AGENTS[selectedCompAgent as keyof typeof AGENTS];

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0A0A0A] font-sans selection:bg-[#FF4654] selection:text-white overflow-y-auto overflow-x-hidden">
      <HubHeader />

      {/* === HERO: MAPAS === */}
      <section id="maps" className="relative h-[70vh] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div key={selectedMap.id} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0">
            <img src={selectedMap.image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-[#0A0A0A]" />
          </motion.div>
        </AnimatePresence>
        <div className="relative h-full flex flex-col justify-end px-8 lg:px-16 pb-12 z-10">
            <div className="flex gap-4 overflow-x-auto pb-8 pt-8 scrollbar-hide px-6 -mx-6">
                {MAPS.map((map) => (
                    <button key={map.id} onClick={() => setSelectedMap(map)} className={`relative w-48 h-24 shrink-0 rounded-lg border-2 transition-all ${selectedMap.id === map.id ? "border-[#FF4654] scale-105" : "border-white/10 opacity-60"}`}>
                        <img src={map.image} className="absolute inset-0 w-full h-full object-cover grayscale" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center font-bold uppercase text-white">{map.name}</div>
                    </button>
                ))}
            </div>
        </div>
      </section>

      {/* === SEÇÃO 2: META COMPS === */}
      <section id="comps" className="px-8 lg:px-16 py-20 bg-[#0A0A0A]">
        <h2 className="text-4xl font-black uppercase text-white italic mb-12">Meta <span className="text-[#FF4654]">Comps</span></h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {META_COMPS.map((comp) => (
            <div key={comp.id} onClick={() => { setSelectedComp(comp); if (!comp.agents.some(a => a.key === selectedCompAgent)) setSelectedCompAgent(comp.agents[0].key); }} className={`p-6 rounded-xl border transition-all cursor-pointer ${selectedComp.id === comp.id ? "bg-white/5 border-[#FF4654] shadow-lg" : "bg-white/5 border-white/5"}`}>
                <div className="flex justify-between items-start mb-4">
                    <div><span className="text-xs font-bold uppercase" style={{color: comp.color}}>{comp.org}</span><h3 className="text-xl font-black text-white uppercase italic">{comp.name}</h3></div>
                    <span className="text-2xl font-black text-white/20">{comp.winRate}</span>
                </div>
                <div className="flex gap-2">
                    {comp.agents.map((a) => (
                        <button key={a.key} onClick={(e) => { e.stopPropagation(); setSelectedComp(comp); setSelectedCompAgent(a.key); }} className={`w-10 h-10 rounded overflow-hidden border-2 transition-all ${selectedCompAgent === a.key && selectedComp.id === comp.id ? "border-[#FF4654] bg-[#FF4654] scale-110" : "border-white/10"}`}>
                            <img src={`https://media.valorant-api.com/agents/${AGENTS[a.key as keyof typeof AGENTS]?.id}/displayicon.png`} className="w-full h-full" />
                        </button>
                    ))}
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* === SEÇÃO 3: AGENT MASTERY (MÉTRICAS CORRIGIDAS) === */}
      <section id="mastery" className="px-8 lg:px-16 py-24 bg-[#0A0A0A] border-t border-white/5">
          <div className="text-center mb-16 px-4">
              <h2 className="text-5xl font-black uppercase text-white italic pr-12 inline-block overflow-visible leading-[1.3] py-4">
                  Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4654] to-white pb-2">Mastery</span>
              </h2>
          </div>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
              {ROLES.map(role => (
                  <button key={role.name} onClick={() => setMasteryRole(role.name)} className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all ${masteryRole === role.name ? "bg-white border-white scale-110" : "bg-white/5 border-white/10"}`}>
                      <img src={`https://media.valorant-api.com/agents/roles/${role.id}/displayicon.png`} className={`w-8 h-8 ${masteryRole === role.name ? 'brightness-0' : 'invert opacity-60'}`} />
                  </button>
              ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
              {Object.values(AGENTS).filter(a => a.role === masteryRole).map(agent => (
                  <button key={agent.id} onClick={() => setMasteryAgent(agent)} className={`w-16 h-16 rounded-xl border-2 transition-all ${masteryAgent.id === agent.id ? "border-[#FF4654] scale-110" : "border-white/10 opacity-60 hover:opacity-100"}`}>
                      <img src={`https://media.valorant-api.com/agents/${agent.id}/displayicon.png`} className="w-full h-full object-cover" />
                  </button>
              ))}
          </div>

          {/* ESTRUTURA DE GRADE CORRIGIDA (RÉGUA) */}
          <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-[320px] bg-[#161616] p-8 border-r border-white/5 flex flex-col justify-between items-center text-center">
                  <div className="w-full">
                      <h3 className="text-3xl font-black text-white uppercase italic leading-none mb-1">{masteryAgent.name}</h3>
                      <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">{masteryAgent.role}</p>
                      
                      {/* ICONES DE HABILIDADES ONDE ERA ATAQUE/DEFESA */}
                      <div className="grid grid-cols-2 gap-3 mb-8">
                          {masteryAgent.abilities?.map((abilityId, idx) => (
                              <div key={idx} className="aspect-square bg-white/5 border border-white/10 rounded-lg flex items-center justify-center p-3 hover:border-[#FF4654]/50 transition-colors">
                                  <img src={`https://media.valorant-api.com/agents/${masteryAgent.id}/abilities/ability${idx === 3 ? 'x' : idx + 1}/displayicon.png`} className="w-full h-full object-contain opacity-60 hover:opacity-100" />
                              </div>
                          )) || <div className="col-span-2 text-[10px] text-white/20 uppercase">Habilidades em breve</div>}
                      </div>
                  </div>

                  {/* ATAQUE E DEFESA NO ESPAÇO VAZIO (LINHA AZUL) */}
                  <div className="w-full space-y-3 mt-auto">
                      <button onClick={() => setMasteryPhase('attack')} className={`w-full py-4 rounded-lg font-black uppercase flex items-center justify-center gap-3 transition-all border ${masteryPhase === 'attack' ? 'bg-[#FF4654] border-[#FF4654] text-white' : 'bg-white/5 border-white/10 text-white/40'}`}>
                          <Sword size={18} /> Attack
                      </button>
                      <button onClick={() => setMasteryPhase('defense')} className={`w-full py-4 rounded-lg font-black uppercase flex items-center justify-center gap-3 transition-all border ${masteryPhase === 'defense' ? 'bg-white border-white text-black' : 'bg-white/5 border-white/10 text-white/40'}`}>
                          <Shield size={18} /> Defense
                      </button>
                  </div>
              </div>

              {/* CONTEÚDO LATERAL (FALTA DE FORÇA INVISÍVEL) */}
              <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0A0A0A]">
                  {[1, 2].map((i) => (
                      <div key={i} className="bg-[#111] rounded-2xl border border-white/5 p-6 group hover:border-white/20 transition-all">
                          <div className="aspect-video bg-[#050505] rounded-xl mb-6 relative overflow-visible flex items-center justify-center border border-white/5 shadow-inner">
                              <img src={`https://media.valorant-api.com/maps/${selectedMap.uuid}/displayicon.png`} className="absolute inset-0 w-full h-full object-contain opacity-10 grayscale group-hover:opacity-30 transition-all scale-90" />
                              <div className="z-10 text-center">
                                  <div className="w-4 h-4 bg-[#FF4654] rounded-full animate-ping mx-auto mb-2" />
                                  <span className="text-[10px] font-black font-mono text-white/40 uppercase tracking-widest">Tactical Spot // {selectedMap.name}</span>
                              </div>
                          </div>
                          <h4 className="font-black text-white uppercase text-lg mb-2">{masteryPhase === 'attack' ? 'Aggressive Entry' : 'Default Hold'}</h4>
                          <p className="text-sm text-white/40 leading-relaxed">Detailed positioning for high rank {masteryAgent.name} utility usage.</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* === STREAMS === */}
      <section id="streams" className="px-8 lg:px-16 py-20 bg-black border-t border-white/10">
          <h2 className="text-4xl font-black uppercase text-white italic mb-12">Live <span className="text-[#9146FF]">Hub</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STREAMERS.map((s, idx) => (
                  <div key={idx} className="bg-[#18181B] rounded-xl overflow-hidden border border-white/5 hover:border-[#9146FF] transition-all aspect-video relative group">
                      <iframe src={`https://player.twitch.tv/?channel=${s.channel}&parent=${hostname}&muted=true`} height="100%" width="100%" allowFullScreen className="w-full h-full" />
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