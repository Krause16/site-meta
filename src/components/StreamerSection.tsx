import { useState } from "react";
import { motion } from "motion/react";
import { Radio, Users } from "lucide-react";

interface Streamer {
  id: string;
  name: string;
  team: string;
  teamColor: string;
  isLive: boolean;
  twitchChannel: string;
  highlightVideo: string;
}

interface StreamerSectionProps {
  streamers: Streamer[];
  game: "cs2" | "valorant";
}

export function StreamerSection({ streamers, game }: StreamerSectionProps) {
  const [selectedStreamer, setSelectedStreamer] = useState(streamers[0]);
  
  const accentColor = game === "cs2" ? "#DE9B35" : "#FF4654";
  const bgColor = game === "cs2" ? "#1B202E" : "#0F1923";

  return (
    <section className="px-8 lg:px-16 py-16 border-t border-[#ECE8E1]/10">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Radio className="w-8 h-8" style={{ color: accentColor }} />
          <h2 className="text-4xl font-black uppercase text-[#ECE8E1]">
            Top 5 Pro Streams
          </h2>
        </div>
        <p className="text-[#ECE8E1]/60">
          Watch the best players live or catch their highlight reels
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Streamer List */}
        <div className="lg:col-span-3 space-y-3">
          {streamers.map((streamer, index) => (
            <motion.button
              key={streamer.id}
              onClick={() => setSelectedStreamer(streamer)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-4 rounded-lg transition-all text-left ${
                selectedStreamer.id === streamer.id
                  ? "ring-2"
                  : "glass hover:bg-[#ECE8E1]/5"
              }`}
              style={{
                backgroundColor:
                  selectedStreamer.id === streamer.id ? `${bgColor}` : "transparent",
                ringColor: selectedStreamer.id === streamer.id ? accentColor : "transparent",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${streamer.teamColor}60, ${streamer.teamColor}30)`,
                    }}
                  >
                    <Users className="w-6 h-6" style={{ color: streamer.teamColor }} />
                  </div>
                  {streamer.isLive && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF0000] border-2 border-[#0A0A0A] animate-pulse" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-[#ECE8E1]">{streamer.name}</p>
                    {streamer.isLive && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FF0000] text-white">
                        Live
                      </span>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: streamer.teamColor }}>
                    {streamer.team}
                  </p>
                </div>
                <div className="text-xs font-bold text-[#ECE8E1]/50">#{index + 1}</div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Stream/Video Player */}
        <div className="lg:col-span-9">
          <motion.div
            key={selectedStreamer.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-video rounded-lg overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${bgColor}, #0A0A0A)`,
            }}
          >
            {selectedStreamer.isLive ? (
              // Twitch Embed (live stream)
              <iframe
                src={`https://player.twitch.tv/?channel=${selectedStreamer.twitchChannel}&parent=${window.location.hostname}&autoplay=true&muted=false`}
                className="w-full h-full"
                allowFullScreen
                title={`${selectedStreamer.name} Twitch Stream`}
              />
            ) : (
              // Highlight Video (looped)
              <div className="relative w-full h-full">
                <video
                  key={selectedStreamer.highlightVideo}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={selectedStreamer.highlightVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="px-3 py-1 rounded-full bg-black/70 text-white text-xs font-bold uppercase">
                      Highlights Reel
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedStreamer.name} - Best Moments
                  </h3>
                  <p className="text-sm text-white/70">{selectedStreamer.team}</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Stream Info */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#ECE8E1] mb-1">
                {selectedStreamer.name}
              </h3>
              <p className="text-sm text-[#ECE8E1]/60">
                {selectedStreamer.isLive ? "🔴 Currently Live" : "📹 Highlight Reel Playing"}
              </p>
            </div>
            <a
              href={`https://twitch.tv/${selectedStreamer.twitchChannel}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-bold uppercase tracking-wide transition-all"
              style={{
                backgroundColor: accentColor,
                color: game === "cs2" ? "#1B202E" : "#ECE8E1",
                boxShadow: `0 0 20px ${accentColor}40`,
              }}
            >
              Watch on Twitch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
