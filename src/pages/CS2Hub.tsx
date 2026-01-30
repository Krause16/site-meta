import { useState } from "react";
import { motion } from "motion/react";
import { Navigation } from "../components/Navigation";
import { StreamerSection } from "../components/StreamerSection";
import { Play, Flame, Eye, Zap, Settings, Target, Shield } from "lucide-react";

const MAPS = [
  { 
    id: "mirage", 
    name: "Mirage", 
    image: "https://images.unsplash.com/photo-1594383472097-47b2931a2936?q=80&w=2070&auto=format&fit=crop" // Arquitetura similar a Mirage
  },
  { 
    id: "nuke", 
    name: "Nuke", 
    image: "https://images.unsplash.com/photo-1621503348633-5c8290f23024?q=80&w=2070&auto=format&fit=crop" // Estilo industrial
  },
  { 
    id: "anubis", 
    name: "Anubis", 
    image: "https://images.unsplash.com/photo-1591189320294-82559648945e?q=80&w=2070&auto=format&fit=crop" // Deserto/Ruínas
  },
  { 
    id: "ancient", 
    name: "Ancient", 
    image: "https://images.unsplash.com/photo-1548685167-938363765108?q=80&w=2070&auto=format&fit=crop" // Pedra/Selva
  },
  { 
    id: "inferno", 
    name: "Inferno", 
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=2070&auto=format&fit=crop" // Vila europeia
  },
  { 
    id: "dust2", 
    name: "Dust 2", 
    image: "https://images.unsplash.com/photo-1579766986618-2041933010b9?q=80&w=2070&auto=format&fit=crop" // Areia clássica
  },
];

const ORGS = {
  spirit: { name: "Team Spirit", color: "#00FF88", bgColor: "#0F1419" },
  vitality: { name: "Team Vitality", color: "#FFB800", bgColor: "#08080E" },
  g2: { name: "G2 Esports", color: "#FF5733", bgColor: "#0A2235" },
  faze: { name: "FaZe Clan", color: "#E61E1E", bgColor: "#0A0A0A" },
  mouz: { name: "MOUZ", color: "#FF5E00", bgColor: "#1A1A1D" },
  navi: { name: "Natus Vincere", color: "#FFDD00", bgColor: "#1B1B1B" },
};

const STRATBOOKS = [
  {
    id: 1,
    team: "spirit",
    player: "donk",
    strategy: "Aggressive A Ramp Push",
    map: "mirage",
    tags: ["Entry", "Aim", "Flash"],
    views: "892K",
    duration: "1:45",
  },
  {
    id: 2,
    team: "vitality",
    player: "ZywOo",
    strategy: "AWP Mid Connection Hold",
    map: "mirage",
    tags: ["AWP", "Hold", "Smoke"],
    views: "540K",
    duration: "2:20",
  },
  {
    id: 3,
    team: "g2",
    player: "m0NESY",
    strategy: "Window Smoke Bug + Pick",
    map: "mirage",
    tags: ["AWP", "Trick", "Smoke"],
    views: "720K",
    duration: "1:55",
  },
  {
    id: 4,
    team: "faze",
    player: "ropz",
    strategy: "Lurk Palace Late Round",
    map: "mirage",
    tags: ["Lurk", "Clutch", "Silent"],
    views: "320K",
    duration: "3:10",
  },
  {
    id: 5,
    team: "navi",
    player: "jL",
    strategy: "B Site Anchor Setup",
    map: "mirage",
    tags: ["Defense", "Multi-kill"],
    views: "210K",
    duration: "2:05",
  },
  {
    id: 6,
    team: "mouz",
    player: "Jimpphat",
    strategy: "Connector Pop-flash",
    map: "mirage",
    tags: ["Support", "Flash"],
    views: "150K",
    duration: "1:30",
  },
];

const TAG_ICONS: Record<string, React.ReactNode> = {
  Smoke: <Flame className="w-3 h-3" />,
  Flash: <Zap className="w-3 h-3" />,
  Entry: <Play className="w-3 h-3" />,
  Lurk: <Eye className="w-3 h-3" />,
  AWP: <Target className="w-3 h-3" />,
  Defense: <Shield className="w-3 h-3" />,
  Support: <Zap className="w-3 h-3" />,
  Aim: <Target className="w-3 h-3" />,
  Hold: <Shield className="w-3 h-3" />,
  Trick: <Eye className="w-3 h-3" />,
  Clutch: <Flame className="w-3 h-3" />,
  Silent: <Eye className="w-3 h-3" />,
  "Multi-kill": <Flame className="w-3 h-3" />
};

const CS2_STREAMERS = [
  {
    id: "1",
    name: "donk",
    team: "Team Spirit",
    teamColor: "#00FF88",
    isLive: true,
    twitchChannel: "donk",
    highlightVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: "2",
    name: "ZywOo",
    team: "Team Vitality",
    teamColor: "#FFB800",
    isLive: false,
    twitchChannel: "zywoo",
    highlightVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: "3",
    name: "m0NESY",
    team: "G2 Esports",
    teamColor: "#FF5733",
    isLive: false,
    twitchChannel: "m0nesy",
    highlightVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "4",
    name: "ropz",
    team: "FaZe Clan",
    teamColor: "#E61E1E",
    isLive: true,
    twitchChannel: "ropz",
    highlightVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: "5",
    name: "NiKo",
    team: "G2 Esports",
    teamColor: "#FF5733",
    isLive: false,
    twitchChannel: "niko",
    highlightVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
];

export function CS2Hub() {
  const [selectedMap, setSelectedMap] = useState(MAPS[0]);
  const [showConfig, setShowConfig] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={selectedMap.image}
            alt={selectedMap.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B202E]/80 via-[#1B202E]/60 to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#DE9B35]/10 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col justify-end px-8 lg:px-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#DE9B35]/30 mb-4">
               <span className="text-xs uppercase tracking-widest text-[#DE9B35]">CS2 Major Meta • 2026</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tight text-[#ECE8E1] mb-2">
              {selectedMap.name}
            </h1>
            <p className="text-lg text-[#ECE8E1]/60">
              Stratbooks dos melhores times do mundo (Spirit, Vitality, G2)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Selector */}
      <section className="px-8 lg:px-16 py-8 border-b border-[#ECE8E1]/10">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {MAPS.map((map) => (
            <motion.button
              key={map.id}
              onClick={() => setSelectedMap(map)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden transition-all ${
                selectedMap.id === map.id
                  ? "ring-2 ring-[#DE9B35] shadow-[0_0_20px_rgba(222,155,53,0.4)]"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={map.image}
                alt={map.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B202E]/90 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-sm font-bold uppercase text-[#ECE8E1]">
                  {map.name}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Stratbooks Grid */}
      <section className="px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STRATBOOKS.map((strat, index) => {
            const org = ORGS[strat.team as keyof typeof ORGS];
            return (
              <motion.div
                key={strat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group glass rounded-lg overflow-hidden hover:ring-1 hover:ring-[#DE9B35] transition-all cursor-pointer"
              >
                <div className="relative aspect-video bg-gradient-to-br from-[#1B202E] to-[#0A0A0A]">
                    <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-16 h-16 rounded-full bg-[#DE9B35]/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-[#DE9B35] fill-[#DE9B35]" />
                         </div>
                    </div>
                     <div className="absolute top-3 left-3 px-3 py-1.5 rounded text-xs font-bold" style={{ backgroundColor: org.bgColor, color: org.color, border: `1px solid ${org.color}40` }}>
                        {org.name}
                     </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#ECE8E1] mb-1">{strat.strategy}</h3>
                      <p className="text-sm" style={{ color: org.color }}>{strat.player} • {org.name}</p>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#DE9B35]/20 text-[#DE9B35] text-sm font-bold">#{index + 1}</div>
                  </div>

                   <div className="flex flex-wrap gap-2 mb-3">
                    {strat.tags.map((tag) => (
                      <div key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECE8E1]/5 border border-[#ECE8E1]/10 text-xs text-[#ECE8E1]/70">
                        {TAG_ICONS[tag] || <Target className="w-3 h-3" />}
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => setShowConfig(showConfig === strat.id ? null : strat.id)} className="w-full px-4 py-2 rounded-lg bg-[#DE9B35]/10 border border-[#DE9B35]/30 text-[#DE9B35] hover:bg-[#DE9B35]/20 transition-all flex items-center justify-center gap-2 text-sm font-semibold">
                    <Settings className="w-4 h-4" />
                    {showConfig === strat.id ? "Hide" : "View"} Config
                  </button>
                  
                  {showConfig === strat.id && (
                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 p-3 rounded-lg bg-[#1B202E]/50 border border-[#DE9B35]/20">
                        <div className="space-y-2 text-xs">
                           <div className="flex justify-between"><span className="text-gray-400">Sens:</span><span className="text-white">1.25</span></div>
                           <div className="flex justify-between"><span className="text-gray-400">DPI:</span><span className="text-white">800</span></div>
                           <div className="flex justify-between"><span className="text-gray-400">Res:</span><span className="text-[#DE9B35]">1280x960 (Stretched)</span></div>
                        </div>
                     </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Top 5 Pro Streams */}
      <StreamerSection streamers={CS2_STREAMERS} game="cs2" />

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