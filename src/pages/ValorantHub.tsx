import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // Importante para voltar pra Home
import { Sword, Shield, Settings, ChevronLeft } from "lucide-react";

// === HEADER DA COLLAB (ONSITE x VALORANT) ===
const HubHeader = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 mix-blend-difference text-white">
    <div className="flex items-center gap-6">
      
      {/* 1. LOGO ONSITE (OS) - SIMPLIFICADA E NA COR DO HUB */}
      <Link to="/" className="group relative">
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 512 512" 
          className="fill-[#FF4654] transition-transform group-hover:scale-110 duration-300" // COR DO VALORANT
        >
          {/* MÁSCARA DO CORTE DIAGONAL */}
          <defs>
            <mask id="cut-header">
              <rect width="512" height="512" fill="white"/>
              <rect x="-100" y="226" width="800" height="60" fill="black" transform="rotate(-45 256 256)"/>
            </mask>
          </defs>
          <g mask="url(#cut-header)">
             {/* Círculo Completo (Unificado) */}
             <circle cx="256" cy="256" r="200" stroke="currentColor" strokeWidth="64" fill="none" />
          </g>
          {/* A Cruz Central */}
          <rect x="236" y="156" width="40" height="200" fill="white" rx="6" />
          <rect x="156" y="236" width="200" height="40" fill="white" rx="6" />
        </svg>
      </Link>

      {/* 2. BARRA DE SEPARAÇÃO (COLLAB STYLE) */}
      <div className="h-8 w-[2px] bg-white/20 -skew-x-12" />

      {/* 3. LOGO DO JOGO (TEXTO) */}
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-black tracking-[0.2em] leading-none text-white">
          VALORANT
        </h1>
        <span className="text-[10px] font-bold tracking-widest text-[#FF4654] uppercase opacity-80">
          Hub 2026
        </span>
      </div>

    </div>
  </nav>
);

// === DADOS (Mantive os seus, estão ótimos) ===
// IDs OFICIAIS E FIXOS DA RIOT API (v1)
const AGENT_IDS = {
  jett: "add6443a-41bd-29cd-27f6-256975cae690",
  sova: "ded3520f-4264-bfed-162d-3080e6b7a948",
  cypher: "117ed9e3-49f3-6512-3ccf-0cada7e3823b",
  killjoy: "1e58de9c-4950-5125-93e9-a0aee9f98746",
  omen: "8e253930-4c05-31dd-1b6c-968525494517",
  sage: "569fdd95-4d10-43ab-ca64-399336159554",
  phoenix: "eb93336a-449b-9c1b-0a54-a891f7921d69",
  viper: "707eab51-4836-f488-046a-cda6bf494859",
  brimstone: "9f0d8ba9-4140-b941-57d3-a7ad57c6b417",
  raze: "f94c3b30-42be-e959-889c-5aa313dba261",
  gekko: "e370fa57-4757-3604-3648-499e1f642d3f",
  iso: "0e38b510-41a8-5780-5e8f-568b2a4f2d6c",
  harbor: "95b78ed7-4637-86d9-7e41-71ba8c293152",
  neon: "bb2a4828-46eb-8cd1-e765-15848195d751",
  kayo: "601dbbe6-8aa3-53e1-762d-578130388baf",
  fade: "ade4ef5f-43e9-9512-5261-26a5bef7d2dd"
};

const MAPS = [
  { id: "ascent", name: "Ascent" },
  { id: "bind", name: "Bind" },
  { id: "haven", name: "Haven" },
  { id: "lotus", name: "Lotus" },
  { id: "abyss", name: "Abyss" },
];

const ROLE_COLORS = {
  Duelist: "#E74856",
  Controller: "#5B3C99",
  Initiator: "#C47F2B",
  Sentinel: "#28A55F",
};

const AGENTS = {
  jett: { name: "Jett", role: "Duelist", id: AGENT_IDS.jett },
  sova: { name: "Sova", role: "Initiator", id: AGENT_IDS.sova },
  cypher: { name: "Cypher", role: "Sentinel", id: AGENT_IDS.cypher },
  killjoy: { name: "Killjoy", role: "Sentinel", id: AGENT_IDS.killjoy },
  omen: { name: "Omen", role: "Controller", id: AGENT_IDS.omen },
  sage: { name: "Sage", role: "Sentinel", id: AGENT_IDS.sage },
  phoenix: { name: "Phoenix", role: "Duelist", id: AGENT_IDS.phoenix },
  viper: { name: "Viper", role: "Controller", id: AGENT_IDS.viper },
  brimstone: { name: "Brimstone", role: "Controller", id: AGENT_IDS.brimstone },
  raze: { name: "Raze", role: "Duelist", id: AGENT_IDS.raze },
  gekko: { name: "Gekko", role: "Initiator", id: AGENT_IDS.gekko },
  iso: { name: "Iso", role: "Duelist", id: AGENT_IDS.iso },
  harbor: { name: "Harbor", role: "Controller", id: AGENT_IDS.harbor },
  neon: { name: "Neon", role: "Duelist", id: AGENT_IDS.neon },
  kayo: { name: "KAY/O", role: "Initiator", id: AGENT_IDS.kayo },
  fade: { name: "Fade", role: "Initiator", id: AGENT_IDS.fade }
};

const ORGS = {
  sentinels: { name: "Sentinels", color: "#CE0037" },
  fnatic: { name: "Fnatic", color: "#FF5900" },
  mibr: { name: "MIBR", color: "#009944" },
  prx: { name: "Paper Rex", color: "#A05BC3" },
};

const META_COMPS = [
  {
    id: 1,
    name: "Brazil Superteam",
    winRate: "68%",
    org: "mibr",
    agents: [
      { key: "jett", player: "aspas" },
      { key: "gekko", player: "cauanzin" },
      { key: "sova", player: "nzr" },
      { key: "omen", player: "art" }, 
      { key: "killjoy", player: "less" }, 
    ],
  },
  {
    id: 2,
    name: "Double Controller Meta",
    winRate: "64%",
    org: "sentinels",
    agents: [
      { key: "raze", player: "zekken" },
      { key: "sova", player: "N4RRATE" },
      { key: "cypher", player: "johnqt" },
      { key: "omen", player: "bang" },
      { key: "viper", player: "Zellsis" },
    ],
  },
  {
    id: 3,
    name: "W-Gaming 3.0",
    winRate: "59%",
    org: "prx",
    agents: [
      { key: "neon", player: "something" },
      { key: "kayo", player: "f0rsakeN" },
      { key: "gekko", player: "Jinggg" },
      { key: "brimstone", player: "mindfreak" },
      { key: "fade", player: "d4v41" }, 
    ],
  },
];


export default function ValorantHub() {
  const [selectedMap, setSelectedMap] = useState(MAPS[0]);
  const [selectedComp, setSelectedComp] = useState(META_COMPS[0]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(META_COMPS[0].agents[0].key);
  const [sideMode, setSideMode] = useState<"attack" | "defense">("attack");
  const [showConfig, setShowConfig] = useState<string | null>(null);

  const selectedAgentPlayer = selectedComp.agents.find(a => a.key === selectedAgent)?.player;
  const currentAgentData = AGENTS[selectedAgent as keyof typeof AGENTS];

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-[#FF4654] selection:text-white">
      
      {/* HEADER NOVO */}
      <HubHeader />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          {/* Adicionei um parallax leve aqui se quiser depois */}
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2 }}
            src="https://images.unsplash.com/photo-1629759882260-264627d422e6?q=80&w=2070&auto=format&fit=crop"
            alt="Valorant Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1923]/80 via-[#0F1923]/60 to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#FF4654]/20 via-transparent to-transparent" />
        </div>

        <div className="relative h-full flex flex-col justify-end px-8 lg:px-16 pb-16 pt-32">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            
            {/* TAG DO MAPA */}
            <div className="inline-flex items-center gap-3 mb-6">
                <div className="px-3 py-1 border border-[#FF4654] text-[#FF4654] text-xs font-bold tracking-widest uppercase bg-[#FF4654]/10">
                    Active Map
                </div>
                <div className="h-[1px] w-12 bg-white/20"></div>
            </div>

            <h1 className="text-6xl lg:text-9xl font-black uppercase tracking-tighter text-white mb-4 leading-none">
              {selectedMap.name}
            </h1>
            
            <p className="text-xl text-[#ECE8E1]/60 max-w-xl border-l-2 border-[#FF4654] pl-6">
              Dominating the meta with elite compositions directly from VCT 2026.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Selector (Estilo High End) */}
      <section className="px-8 lg:px-16 py-8 border-y border-white/5 bg-white/[0.02]">
         <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide items-center">
          <span className="text-xs font-bold text-white/30 uppercase tracking-widest mr-4">Select Map:</span>
          {MAPS.map((map) => (
            <button
              key={map.id}
              onClick={() => setSelectedMap(map)}
              className={`flex-shrink-0 px-8 py-3 transition-all uppercase tracking-widest font-bold text-sm border ${
                selectedMap.id === map.id 
                ? "bg-[#FF4654] text-white border-[#FF4654]" 
                : "bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {map.name}
            </button>
          ))}
        </div>
      </section>

      {/* Meta Comps */}
      <section className="px-8 lg:px-16 py-20">
        <div className="mb-12 flex items-end justify-between">
            <div>
                <h2 className="text-4xl font-black uppercase text-white mb-2 italic">Meta <span className="text-[#FF4654]">Comps</span></h2>
                <p className="text-white/40">Select a team composition to analyze</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {META_COMPS.map((comp) => {
            const org = ORGS[comp.org as keyof typeof ORGS];
            return (
              <motion.button
                key={comp.id}
                onClick={() => { setSelectedComp(comp); setSelectedAgent(comp.agents[0].key); }}
                whileHover={{ y: -5 }}
                className={`text-left relative group overflow-hidden ${selectedComp.id === comp.id ? "grayscale-0" : "grayscale opacity-60 hover:grayscale-0 hover:opacity-100"} transition-all duration-500`}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-[#1A1A1A] border border-white/10 group-hover:border-[#FF4654]/50 transition-colors" />
                
                <div className="relative p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-xs font-bold text-[#FF4654] tracking-widest uppercase mb-1 block">{org.name}</span>
                            <h3 className="text-2xl font-black text-white uppercase italic">{comp.name}</h3>
                        </div>
                        <div className="text-3xl font-black text-white/10">{comp.winRate}</div>
                    </div>

                    <div className="flex justify-between items-center gap-2 mt-4">
                        {comp.agents.map((agentData) => {
                            const agent = AGENTS[agentData.key as keyof typeof AGENTS];
                            const roleColor = ROLE_COLORS[agent.role as keyof typeof ROLE_COLORS];
                            return (
                                <div key={agentData.key} className="relative w-12 h-12 rounded bg-black/50 border border-white/10 flex items-center justify-center group/icon">
                                    <img 
                                        src={`https://media.valorant-api.com/agents/${agent.id}/displayicon.png`} 
                                        alt={agent.name}
                                        className="w-10 h-10 object-cover"
                                    />
                                    {/* Role Indicator Dot */}
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#1A1A1A]" style={{ backgroundColor: roleColor }} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                
                {/* Active Indicator Strip */}
                {selectedComp.id === comp.id && (
                    <motion.div layoutId="activeComp" className="absolute bottom-0 left-0 w-full h-1 bg-[#FF4654]" />
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Agent Detail Section */}
      <section className="px-8 lg:px-16 py-12 border-t border-white/5">
        
        {/* Toggle Attack/Defense */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <button
              onClick={() => setSideMode("attack")}
              className={`px-8 py-3 rounded font-bold uppercase tracking-widest transition-all flex items-center gap-3 ${
                sideMode === "attack" ? "bg-[#FF4654] text-white shadow-lg" : "text-white/40 hover:text-white"
              }`}
            >
              <Sword className="w-4 h-4" /> Attack
            </button>
            <button
              onClick={() => setSideMode("defense")}
              className={`px-8 py-3 rounded font-bold uppercase tracking-widest transition-all flex items-center gap-3 ${
                sideMode === "defense" ? "bg-[#5B3C99] text-white shadow-lg" : "text-white/40 hover:text-white"
              }`}
            >
              <Shield className="w-4 h-4" /> Defense
            </button>
          </div>
        </div>

        {/* Selected Agent Display */}
        {selectedAgent && (
           <div className="relative bg-[#111] border border-white/10 rounded-xl overflow-hidden min-h-[400px]">
             {/* Background Decoration */}
             <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#FF4654]/10 to-transparent" />
             
             <div className="relative z-10 flex flex-col md:flex-row items-center">
                 
                 {/* Agent Portrait */}
                 <div className="w-full md:w-1/3 h-[400px] relative flex items-center justify-center bg-white/5">
                    <img 
                       src={`https://media.valorant-api.com/agents/${currentAgentData.id}/fullportrait.png`}
                       className="h-[110%] object-cover absolute bottom-0 drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                       alt={currentAgentData.name}
                    />
                 </div>

                 {/* Stats & Config */}
                 <div className="w-full md:w-2/3 p-12">
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <span className="text-[#FF4654] font-bold tracking-widest uppercase mb-2 block">Current Operator</span>
                            <h3 className="text-6xl font-black text-white uppercase italic leading-none">{selectedAgentPlayer}</h3>
                        </div>
                        <div className="text-right">
                             <div className="text-8xl font-black text-white/5 uppercase select-none">{currentAgentData.name}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-black/40 p-6 border-l-2 border-[#FF4654]">
                            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">eDPI</p>
                            <p className="text-3xl font-mono text-white">{selectedAgentPlayer === "aspas" ? "304.0" : "280.5"}</p>
                        </div>
                        <div className="bg-black/40 p-6 border-l-2 border-white/10">
                            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Sens</p>
                            <p className="text-3xl font-mono text-white">{selectedAgentPlayer === "aspas" ? "0.38" : "0.35"}</p>
                        </div>
                        <div className="bg-black/40 p-6 border-l-2 border-white/10">
                            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Resolution</p>
                            <p className="text-2xl font-mono text-white">1440x1080</p>
                        </div>
                         <button
                            onClick={() => setShowConfig(showConfig === selectedAgent ? null : selectedAgent)}
                            className="bg-[#FF4654] text-white hover:bg-[#D93542] transition-colors flex flex-col items-center justify-center gap-2 group"
                        >
                            <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-widest">Full Config</span>
                        </button>
                    </div>
                 </div>
             </div>
           </div>
        )}
      </section>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}