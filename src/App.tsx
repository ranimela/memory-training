import { useState, useCallback } from "react";
import {
  SessionState,
  SessionConfig,
  initSession,
  startSession,
  submitAnswer,
  advanceCard,
} from "./engine/sessionStateMachine";
import { SetupView } from "./components/SetupView";
import { CueCardView } from "./components/CueCardView";
import { ScoreView } from "./components/ScoreView";
import { StandardsGuideModal } from "./components/StandardsGuideModal";
import { ShieldCheck, BarChart2, BookOpen, Layers } from "lucide-react";

export function App() {
  const [session, setSession] = useState<SessionState | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  const handleStart = useCallback((config: SessionConfig) => {
    const initialized = initSession(config);
    const started = startSession(initialized, performance.now());
    setSession(started);
  }, []);

  const handleSubmit = useCallback((answer: string) => {
    setSession((prev) => {
      if (!prev) return null;
      return submitAnswer(prev, answer, performance.now(), false);
    });
  }, []);

  const handleTimeout = useCallback(() => {
    setSession((prev) => {
      if (!prev || prev.phase !== "in_progress") return prev;
      return submitAnswer(prev, "", performance.now(), true);
    });
  }, []);

  const handleAdvance = useCallback(() => {
    setSession((prev) => {
      if (!prev) return null;
      return advanceCard(prev, performance.now());
    });
  }, []);

  const handleAbort = useCallback(() => {
    setSession(null);
  }, []);

  const handleRestart = useCallback(() => {
    setSession(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col justify-between text-[#1E293B]">
      {/* VERIQ-Styled Deep Navy Header */}
      <header className="bg-[#0B1F3A] text-white border-b border-[#1E293B]/20 px-6 py-4 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#155EEF] flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">VERIQ</span>
                <span className="text-[10px] font-semibold tracking-wider bg-[#0E9F9A] text-white px-2 py-0.5 rounded-full uppercase">
                  Memory Suite
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] font-normal leading-none mt-0.5">
                Mnemonic Compliance & Training Platform
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-xs text-[#CBD5E1] font-medium">
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <Layers className="w-4 h-4 text-[#155EEF]" /> Major System
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <BarChart2 className="w-4 h-4 text-[#0E9F9A]" /> Audit Logs
            </span>
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="flex items-center gap-1.5 text-[#CBD5E1] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-xs font-medium"
            >
              <BookOpen className="w-4 h-4 text-[#0E9F9A]" /> Standards Guide
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="max-w-5xl w-full mx-auto px-4 py-10 flex-1 flex flex-col justify-center">
        {!session && <SetupView onStart={handleStart} />}
        {session && (session.phase === "in_progress" || session.phase === "feedback") && (
          <CueCardView
            state={session}
            onSubmit={handleSubmit}
            onTimeout={handleTimeout}
            onAdvance={handleAdvance}
            onAbort={handleAbort}
          />
        )}
        {session && session.phase === "completed" && session.metrics && (
          <ScoreView
            metrics={session.metrics}
            trials={session.trials}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Standards Guide Modal */}
      <StandardsGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] py-4 px-6 text-xs text-[#64748B]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>VERIQ Training Engine &middot; Standardized Phonetic Declarations</span>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#16A34A] font-semibold flex items-center gap-1">
              &bull; Monotonic Clock Synced
            </span>
            <span>v1.2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

