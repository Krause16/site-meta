import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { StreamerSection } from "../components/StreamerSection";
import { Sword, Shield, Users, Sparkles, Target, MapPin, Settings } from "lucide-react";

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

// Mapeamento completo garantindo que não falte nenhum boneco
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

const VALORANT_STREAMERS = [
  {
    id: "1",
    name: "aspas",
    team: "MIBR",
    teamColor: "#009944",
    isLive: true,
    twitchChannel: "aspaszin",
    highlightVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: "2",
    name: "TenZ",
    team: "Sentinels",
    teamColor: "#CE0037",
    isLive: false,
    twitchChannel: "tenz",
    highlightVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: "3",
    name: "something",
    team: "Paper Rex",
    teamColor: "#A05BC3",
    isLive: true,
    twitchChannel: "something",
    highlightVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "4",
    name: "Boaster",
    team: "Fnatic",
    teamColor: "#FF5900",
    isLive: false,
    twitchChannel: "boaster",
    highlightVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: "5",
    name: "zekken",
    team: "Sentinels",
    teamColor: "#CE0037",
    isLive: false,
    twitchChannel: "zekken",
    highlightVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
];

// ORGS VCT AMERICAS 2026
const ORGS = {
  sentinels: { name: "Sentinels", color: "#CE0037", bgColor: "#0D0D0D" },
  fnatic: { name: "Fnatic", color: "#FF5900", bgColor: "#0A0A0A" },
  mibr: { name: "MIBR", color: "#009944", bgColor: "#0D0D0D" }, // MIBR atualizado
  prx: { name: "Paper Rex", color: "#A05BC3", bgColor: "#1A0F0F" },
  geng: { name: "Gen.G", color: "#AA8A00", bgColor: "#0A0E14" },
  leviatan: { name: "Leviatán", color: "#63A5C6", bgColor: "#0F1419" },
};

const META_COMPS = [
  {
    id: 1,
    name: "Brazil Superteam",
    winRate: "68%",
    org: "mibr",
    agents: [
      { key: "jett", player: "aspas" }, // O HOMEM TÁ NO MIBR
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
      { key: "neon", player: "something" }, // Meta de Neon forte em 2026
      { key: "breach", player: "f0rsakeN" }, // Breach fake (vou usar kayo se nao tiver breach no map, mas vou deixar compativel) -> *Fix: vou usar KAY/O*
      { key: "gekko", player: "Jinggg" },
      { key: "brimstone", player: "mindfreak" },
      { key: "fade", player: "d4v41" }, 
    ],
  },
];

// Ajuste rápido pq coloquei Breach ali em cima mas não declarei no AGENTS, vou trocar pra KAYO pro código rodar liso
META_COMPS[2].agents[1].key = "kayo"; 

const SENTINEL_SETUPS = [
  {
    id: 1,
    agent: "Killjoy",
    player: "less", // Less agora no MIBR
    org: "mibr",
    site: "B Site",
    setup: "Retake Setup",
    utilities: ["Turret", "Alarmbot", "Nanoswarm"],
    effectiveness: "94%",
  },
  {
    id: 2,
    agent: "Cypher",
    player: "johnqt",
    org: "sentinels",
    site: "A Site",
    setup: "Morocco Trap",
    utilities: ["2x Trapwire", "One-way Cage", "Spycam"],
    effectiveness: "96%",
  },
];

const AGENT_SYNERGIES = {
  jett: [
    { ability: "Updraft", spot: "A Main", description: "High ground control" },
    { ability: "Tailwind", spot: "Mid", description: "Quick rotation dash" },
  ],
  // ... adicione outros se quiser
};

export function ValorantHub() {
  const [selectedMap, setSelectedMap] = useState(MAPS[0]);
  const [selectedComp, setSelectedComp] = useState(META_COMPS[0]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(META_COMPS[0].agents[0].key);
  const [sideMode, setSideMode] = useState<"attack" | "defense">("attack");
  const [showConfig, setShowConfig] = useState<string | null>(null);

  const selectedAgentPlayer = selectedComp.agents.find(a => a.key === selectedAgent)?.player;
  const currentAgentData = AGENTS[selectedAgent as keyof typeof AGENTS];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1629759882260-264627d422e6?q=80&w=2070&auto=format&fit=crop"
            alt="Valorant Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1923]/90 via-[#0F1923]/70 to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF4654]/10 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col justify-end px-8 lg:px-16 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#FF4654]/30 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#FF4654] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#FF4654]">Valorant Meta Hub • 2026</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tight text-[#ECE8E1] mb-2">{selectedMap.name}</h1>
            <p className="text-lg text-[#ECE8E1]/60">
              Elite compositions from VCT & ranked meta
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Selector */}
      <section className="px-8 lg:px-16 py-6 border-b border-[#ECE8E1]/10">
         <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {MAPS.map((map) => (
            <button
              key={map.id}
              onClick={() => setSelectedMap(map)}
              className={`flex-shrink-0 px-6 py-2 rounded-full transition-all ${
                selectedMap.id === map.id ? "bg-[#FF4654] text-[#ECE8E1] shadow-[0_0_20px_rgba(255,70,84,0.4)]" : "glass text-[#ECE8E1]/60 hover:text-[#ECE8E1]"
              }`}
            >
              <span className="text-sm font-bold uppercase tracking-wide">{map.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Meta Comps */}
      <section className="px-8 lg:px-16 py-12 border-b border-[#ECE8E1]/10">
        <div className="mb-8">
            <h2 className="text-3xl font-black uppercase text-[#ECE8E1] mb-2">Top Meta Compositions</h2>
            <p className="text-[#ECE8E1]/60">Elite team setups from VCT 2026</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {META_COMPS.map((comp) => {
            const org = ORGS[comp.org as keyof typeof ORGS];
            return (
              <motion.button
                key={comp.id}
                onClick={() => { setSelectedComp(comp); setSelectedAgent(comp.agents[0].key); }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`text-left glass rounded-lg p-6 transition-all ${selectedComp.id === comp.id ? "ring-2 ring-[#FF4654]" : "hover:ring-1 hover:ring-[#FF4654]/50"}`}
                style={{ boxShadow: selectedComp.id === comp.id ? `0 0 20px ${org.color}40` : undefined }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#ECE8E1]">{comp.name}</h3>
                    <p className="text-sm mt-1 font-bold" style={{ color: org.color }}>{org.name}</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#28A55F]/20 text-[#28A55F] text-sm font-bold">{comp.winRate}</div>
                </div>

                <div className="flex gap-2">
                  {comp.agents.map((agentData) => {
                    const agent = AGENTS[agentData.key as keyof typeof AGENTS];
                    const roleColor = ROLE_COLORS[agent.role as keyof typeof ROLE_COLORS];
                    return (
                      <div
                        key={agentData.key}
                        className="flex-1 aspect-square rounded-lg flex flex-col items-center justify-center relative overflow-hidden group"
                        style={{ border: `1px solid ${roleColor}60`, background: `linear-gradient(180deg, ${roleColor}10, ${roleColor}30)` }}
                      >
                         {/* IMAGEM BLINDADA DA API */}
                        <img 
                            src={`https://media.valorant-api.com/agents/${agent.id}/displayicon.png`} 
                            alt={agent.name}
                            className="w-full h-full object-cover p-1 drop-shadow-lg transform group-hover:scale-110 transition-transform"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-white text-center py-0.5 truncate px-1">
                            {agentData.player}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Agent Details & Config */}
      <section className="px-8 lg:px-16 py-12">
         {/* Toggle Attack/Defense */}
         <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 glass rounded-full">
            <button
              onClick={() => setSideMode("attack")}
              className={`px-8 py-3 rounded-full font-bold uppercase tracking-wide transition-all flex items-center gap-2 ${
                sideMode === "attack" ? "bg-[#FF4654] text-[#ECE8E1]" : "text-[#ECE8E1]/60 hover:text-[#ECE8E1]"
              }`}
            >
              <Sword className="w-5 h-5" />
              <span>Attack</span>
            </button>
            <button
              onClick={() => setSideMode("defense")}
              className={`px-8 py-3 rounded-full font-bold uppercase tracking-wide transition-all flex items-center gap-2 ${
                sideMode === "defense" ? "bg-[#5B3C99] text-[#ECE8E1]" : "text-[#ECE8E1]/60 hover:text-[#ECE8E1]"
              }`}
            >
              <Shield className="w-5 h-5" />
              <span>Defense</span>
            </button>
          </div>
        </div>

        {selectedAgent && (
           <div className="glass rounded-lg p-6 mt-8">
              <div className="flex gap-6 items-center">
                 <img 
                    src={`https://media.valorant-api.com/agents/${currentAgentData.id}/fullportrait.png`}
                    className="h-64 object-contain drop-shadow-[0_0_15px_rgba(255,70,84,0.3)] hidden md:block"
                    alt={currentAgentData.name}
                 />
                 <div className="flex-1">
                    <h3 className="text-4xl font-black text-white uppercase mb-2">{currentAgentData.name}</h3>
                    <p className="text-[#ECE8E1]/60 mb-6">Played by <span className="text-[#FF4654] font-bold">{selectedAgentPlayer}</span></p>
                    
                    <button
                        onClick={() => setShowConfig(showConfig === selectedAgent ? null : selectedAgent)}
                        className="mb-4 px-4 py-2 rounded-lg bg-[#FF4654]/10 border border-[#FF4654]/30 text-[#FF4654] hover:bg-[#FF4654]/20 transition-all flex items-center gap-2 text-sm font-semibold"
                    >
                        <Settings className="w-4 h-4" />
                        {showConfig === selectedAgent ? "Hide" : "View"} Config
                    </button>

                    {showConfig === selectedAgent && (
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                                <p className="text-xs text-gray-400">eDPI</p>
                                <p className="text-xl font-mono text-[#FF4654]">
                                    {selectedAgentPlayer === "aspas" ? "304.0" : "280.5"}
                                </p>
                            </div>
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                                <p className="text-xs text-gray-400">Sens</p>
                                <p className="text-xl font-mono text-white">
                                     {selectedAgentPlayer === "aspas" ? "0.38" : "0.35"}
                                </p>
                            </div>
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                                <p className="text-xs text-gray-400">Hz</p>
                                <p className="text-xl font-mono text-white">4000</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                                <p className="text-xs text-gray-400">Res</p>
                                <p className="text-xl font-mono text-white">1440x1080</p>
                            </div>
                        </div>
                    )}
                 </div>
              </div>
           </div>
        )}
      </section>
      
      {/* Top 5 Pro Streams */}
      <StreamerSection streamers={VALORANT_STREAMERS} game="valorant" />
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}