import { useState } from "react";
import { Play, Clock, Hash, Zap, HelpCircle } from "lucide-react";
import { ClockConfig, SessionConfig } from "../engine/sessionStateMachine";
import { MAJOR_SYSTEM_MAPPINGS } from "../domain/majorSystem";

interface SetupViewProps {
  readonly onStart: (config: SessionConfig) => void;
}

export const SetupView = ({ onStart }: SetupViewProps) => {
  const [cardCount, setCardCount] = useState<number>(10);
  const [clockType, setClockType] = useState<"none" | "stopwatch" | "perCard" | "total">("none");
  const [perCardLimit, setPerCardLimit] = useState<number>(3000);
  const [totalLimit, setTotalLimit] = useState<number>(60000);
  const [showCheatsheet, setShowCheatsheet] = useState<boolean>(false);

  const handleStart = () => {
    let clock: ClockConfig = { type: "none" };
    if (clockType === "stopwatch") {
      clock = { type: "stopwatch" };
    } else if (clockType === "perCard") {
      clock = { type: "perCard", limitMs: perCardLimit };
    } else if (clockType === "total") {
      clock = { type: "total", limitMs: totalLimit };
    }

    onStart({
      cardCount,
      clock,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      {/* Title & Badge */}
      <div className="flex flex-col items-center text-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs tracking-widest uppercase font-mono">
          <Zap className="w-3.5 h-3.5" /> Protocol: Major Mnemonic
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Neural Digit Engine
        </h1>
        <p className="text-neutral-400 text-sm max-w-md">
          Train your subconscious to convert numerical sequences into phonetic consonant sounds instantly.
        </p>
      </div>

      {/* Configuration Card */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col gap-6 shadow-2xl">
        {/* Card Count Selector */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-cyan-400" /> Deck Size
            </span>
            <span className="text-cyan-400 font-mono font-bold text-sm">
              {cardCount} Cards
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 20, 50].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setCardCount(count)}
                className={`py-2 rounded-xl text-sm font-mono font-medium transition-all ${
                  cardCount === count
                    ? "bg-cyan-500 text-neutral-950 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Clock Mode Selector */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> Clock Mode
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: "none", label: "Zen (No Clock)" },
              { id: "stopwatch", label: "Stopwatch" },
              { id: "perCard", label: "Per-Card Rush" },
              { id: "total", label: "Total Countdown" },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setClockType(mode.id as any)}
                className={`p-2.5 rounded-xl text-xs font-mono font-medium text-center transition-all ${
                  clockType === mode.id
                    ? "bg-cyan-500 text-neutral-950 shadow-[0_0_15px_rgba(6,182,212,0.5)] font-bold"
                    : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Sub-parameters for Per-Card */}
          {clockType === "perCard" && (
            <div className="flex items-center justify-between bg-neutral-950/60 border border-neutral-800 p-3 rounded-xl mt-1">
              <span className="text-xs text-neutral-400 font-mono">Card Expiry:</span>
              <div className="flex gap-2">
                {[2000, 3000, 5000].map((ms) => (
                  <button
                    key={ms}
                    type="button"
                    onClick={() => setPerCardLimit(ms)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono ${
                      perCardLimit === ms
                        ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300"
                        : "bg-neutral-900 text-neutral-400"
                    }`}
                  >
                    {ms / 1000}s
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sub-parameters for Total Countdown */}
          {clockType === "total" && (
            <div className="flex items-center justify-between bg-neutral-950/60 border border-neutral-800 p-3 rounded-xl mt-1">
              <span className="text-xs text-neutral-400 font-mono">Session Limit:</span>
              <div className="flex gap-2">
                {[30000, 60000, 120000].map((ms) => (
                  <button
                    key={ms}
                    type="button"
                    onClick={() => setTotalLimit(ms)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono ${
                      totalLimit === ms
                        ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300"
                        : "bg-neutral-900 text-neutral-400"
                    }`}
                  >
                    {ms / 1000}s
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Start Button */}
        <button
          type="button"
          onClick={handleStart}
          className="w-full py-4 rounded-xl font-mono font-bold tracking-wider uppercase text-neutral-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer active:scale-[0.99]"
        >
          <Play className="w-5 h-5 fill-neutral-950" /> Initiate Drill
        </button>
      </div>

      {/* Cheatsheet Toggle */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setShowCheatsheet((prev) => !prev)}
          className="self-center flex items-center gap-1.5 text-xs text-neutral-400 hover:text-cyan-400 transition-colors font-mono cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          {showCheatsheet ? "Hide Phonetic Cheatsheet" : "Show Phonetic Cheatsheet"}
        </button>

        {showCheatsheet && (
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
            {MAJOR_SYSTEM_MAPPINGS.map((m) => (
              <div key={m.digit} className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/80 flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-cyan-400 font-bold text-base">{m.digit}</span>
                  <span className="text-neutral-500 text-[10px]">DIGIT</span>
                </div>
                <div className="text-neutral-200 font-bold">{m.primaryLetters}</div>
                <div className="text-neutral-500 text-[10px] mt-1 line-clamp-2">{m.hint}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

