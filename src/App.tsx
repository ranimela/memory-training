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

export function App() {
  const [session, setSession] = useState<SessionState | null>(null);

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
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between p-4 sm:p-8 selection:bg-cyan-500 selection:text-black font-sans">
      {/* Top Application Bar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-neutral-900">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          <span className="font-mono text-sm tracking-widest uppercase font-bold text-neutral-200">
            MnemonicCore // Major System
          </span>
        </div>
        <div className="text-xs font-mono text-neutral-500">
          v1.0.0
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="my-auto py-8">
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
      </div>

      {/* Footer System Status */}
      <footer className="max-w-4xl w-full mx-auto pt-6 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-600">
        <span>Hardware Monotonic Clock Sync</span>
        <span>Phonetic Sound Equivalence: Active</span>
      </footer>
    </main>
  );
}

export default App;

