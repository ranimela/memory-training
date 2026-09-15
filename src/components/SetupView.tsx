import { useState } from "react";
import { Play, Clock, Hash, ShieldCheck, BookOpen } from "lucide-react";
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
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      {/* Platform Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#155EEF] text-xs font-semibold tracking-wide w-fit">
            <ShieldCheck className="w-4 h-4 text-[#155EEF]" /> Mnemonic Certification Protocol
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] tracking-tight">
            Major System Mnemonic Drill
          </h1>
          <p className="text-sm text-[#64748B] max-w-lg leading-relaxed">
            Convert numerical digits into standard phonetic consonant sounds. Select your test parameters and configure the verification clock to initiate the training session.
          </p>
        </div>
        <div className="hidden sm:flex flex-col items-center justify-center p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-center min-w-[120px]">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Standard</span>
          <span className="text-xl font-bold text-[#0B1F3A] mt-0.5">0 – 9</span>
          <span className="text-[11px] text-[#0E9F9A] font-medium mt-0.5">Phonetic ISO</span>
        </div>
      </div>

      {/* Main Configuration Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-8">
        {/* Card Count Selector */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-[#1E293B] flex items-center gap-2">
              <Hash className="w-4 h-4 text-[#155EEF]" /> Deck Volume
            </label>
            <span className="text-xs font-semibold text-[#155EEF] bg-[#EFF6FF] px-2.5 py-1 rounded-md">
              {cardCount} Cards Selected
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[5, 10, 20, 50].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setCardCount(count)}
                className={`py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  cardCount === count
                    ? "bg-[#155EEF] text-white shadow-sm ring-2 ring-[#155EEF]/20"
                    : "bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9]"
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
            <label className="text-sm font-semibold text-[#1E293B] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#155EEF]" /> Clock & Timing Mode
            </label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "none", label: "Untimed", sub: "Learn without pressure" },
              { id: "stopwatch", label: "Pace Tracker", sub: "Latency measurement" },
              { id: "perCard", label: "Per-Card Limit", sub: "Rapid reflex drill" },
              { id: "total", label: "Total Session", sub: "Exam countdown" },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setClockType(mode.id as any)}
                className={`p-3.5 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                  clockType === mode.id
                    ? "bg-[#EFF6FF] border-2 border-[#155EEF] text-[#155EEF]"
                    : "bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9]"
                }`}
              >
                <span className={`text-sm font-semibold ${clockType === mode.id ? "text-[#155EEF]" : "text-[#1E293B]"}`}>
                  {mode.label}
                </span>
                <span className="text-[11px] text-[#64748B] mt-1">
                  {mode.sub}
                </span>
              </button>
            ))}
          </div>

          {/* Sub-parameters for Per-Card */}
          {clockType === "perCard" && (
            <div className="flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl mt-1">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#1E293B]">Card Timeout Threshold:</span>
                <span className="text-[11px] text-[#64748B]">Auto-submits a failure on timeout</span>
              </div>
              <div className="flex gap-2">
                {[2000, 3000, 5000].map((ms) => (
                  <button
                    key={ms}
                    type="button"
                    onClick={() => setPerCardLimit(ms)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                      perCardLimit === ms
                        ? "bg-[#155EEF] text-white"
                        : "bg-white border border-[#CBD5E1] text-[#64748B] hover:text-[#1E293B]"
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
            <div className="flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl mt-1">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#1E293B]">Session Total Duration:</span>
                <span className="text-[11px] text-[#64748B]">Entire test finishes when time expires</span>
              </div>
              <div className="flex gap-2">
                {[30000, 60000, 120000].map((ms) => (
                  <button
                    key={ms}
                    type="button"
                    onClick={() => setTotalLimit(ms)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                      totalLimit === ms
                        ? "bg-[#155EEF] text-white"
                        : "bg-white border border-[#CBD5E1] text-[#64748B] hover:text-[#1E293B]"
                    }`}
                  >
                    {ms / 1000}s
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleStart}
          className="w-full py-4 rounded-xl font-semibold text-base text-white bg-[#155EEF] hover:bg-[#124bbf] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.99]"
        >
          <Play className="w-4 h-4 fill-white" /> Start Memory Drill
        </button>
      </div>

      {/* Cheatsheet Accordion */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setShowCheatsheet((prev) => !prev)}
          className="self-center inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-[#155EEF] transition-colors cursor-pointer py-1"
        >
          <BookOpen className="w-3.5 h-3.5" />
          {showCheatsheet ? "Hide Phonetic Mapping Reference" : "View Phonetic Mapping Reference"}
        </button>

        {showCheatsheet && (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <h2 className="text-sm font-bold text-[#0B1F3A]">Standard Major System Mappings</h2>
              <span className="text-xs text-[#64748B]">Digits 0 through 9</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {MAJOR_SYSTEM_MAPPINGS.map((m) => (
                <div key={m.digit} className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0] flex flex-col">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[#155EEF] font-bold text-lg font-mono">{m.digit}</span>
                    <span className="text-[10px] font-semibold text-[#64748B] bg-[#E2E8F0] px-1.5 py-0.5 rounded">DIGIT</span>
                  </div>
                  <div className="text-[#1E293B] font-bold text-sm">{m.primaryLetters}</div>
                  <div className="text-[#64748B] text-xs mt-1.5 leading-snug">{m.hint}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

