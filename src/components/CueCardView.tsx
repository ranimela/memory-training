import { useState, useEffect, useRef } from "react";
import { CheckCircle2, XCircle, Timer } from "lucide-react";
import { SessionState } from "../engine/sessionStateMachine";
import { MAJOR_SYSTEM_MAPPINGS } from "../domain/majorSystem";

interface CueCardViewProps {
  readonly state: SessionState;
  readonly onSubmit: (answer: string) => void;
  readonly onTimeout: () => void;
  readonly onAdvance: () => void;
  readonly onAbort: () => void;
}

export const CueCardView = ({
  state,
  onSubmit,
  onTimeout,
  onAdvance,
  onAbort,
}: CueCardViewProps) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [perCardRemainingMs, setPerCardRemainingMs] = useState<number | null>(null);

  const currentDigit = state.deck[state.currentIndex];
  const mapping = MAJOR_SYSTEM_MAPPINGS.find((m) => m.digit === currentDigit);
  const feedback = state.lastTrialFeedback;

  useEffect(() => {
    if (state.phase === "in_progress") {
      setInputValue("");
      inputRef.current?.focus();
    }
  }, [state.currentIndex, state.phase]);

  useEffect(() => {
    if (state.phase !== "in_progress") return;

    const interval = setInterval(() => {
      const now = performance.now();
      const trialElapsed = Math.max(0, now - state.currentTrialStartTime);
      setElapsedMs(Math.round(trialElapsed));

      if (state.config.clock.type === "perCard") {
        const remaining = Math.max(0, state.config.clock.limitMs - trialElapsed);
        setPerCardRemainingMs(remaining);
        if (remaining <= 0) {
          onTimeout();
        }
      }

      if (state.config.clock.type === "total") {
        const sessionElapsed = now - state.sessionStartTime;
        const totalRemaining = Math.max(0, state.config.clock.limitMs - sessionElapsed);
        if (totalRemaining <= 0) {
          onTimeout();
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [
    state.phase,
    state.currentTrialStartTime,
    state.sessionStartTime,
    state.config.clock,
    onTimeout,
  ]);

  useEffect(() => {
    if (state.phase === "feedback") {
      const timer = setTimeout(() => {
        onAdvance();
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [state.phase, onAdvance]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.phase !== "in_progress") return;
    onSubmit(inputValue);
  };

  const isFeedback = state.phase === "feedback" && feedback !== null;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between font-mono text-xs text-neutral-400 bg-neutral-900/60 border border-neutral-800/80 px-4 py-2.5 rounded-xl backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold">CARD</span>
          <span className="text-neutral-100 font-bold">
            {state.currentIndex + 1}
          </span>
          <span className="text-neutral-600">/</span>
          <span>{state.deck.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <Timer className="w-3.5 h-3.5 text-cyan-400" />
          {state.config.clock.type === "perCard" && perCardRemainingMs !== null && (
            <span className={perCardRemainingMs < 1000 ? "text-rose-400 font-bold animate-pulse" : "text-neutral-300"}>
              {(perCardRemainingMs / 1000).toFixed(1)}s
            </span>
          )}
          {state.config.clock.type === "total" && (
            <span className="text-neutral-300">
              {Math.max(0, (state.config.clock.limitMs - (performance.now() - state.sessionStartTime)) / 1000).toFixed(0)}s
            </span>
          )}
          {state.config.clock.type === "stopwatch" && (
            <span className="text-neutral-300">
              {(elapsedMs / 1000).toFixed(1)}s
            </span>
          )}
          {state.config.clock.type === "none" && (
            <span className="text-neutral-500">ZEN</span>
          )}
        </div>

        <button
          type="button"
          onClick={onAbort}
          className="text-neutral-500 hover:text-rose-400 transition-colors uppercase tracking-wider cursor-pointer text-[11px]"
        >
          Abort
        </button>
      </div>

      <div
        className={`relative w-full aspect-[4/3] rounded-3xl border flex flex-col items-center justify-center p-8 transition-all duration-300 overflow-hidden ${
          isFeedback
            ? feedback.isCorrect
              ? "bg-emerald-950/20 border-emerald-500/80 shadow-[0_0_50px_rgba(16,185,129,0.3)]"
              : "bg-rose-950/20 border-rose-500/80 shadow-[0_0_50px_rgba(244,63,94,0.3)]"
            : "bg-neutral-900/90 border-cyan-500/30 neon-glow"
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="text-8xl sm:text-9xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            {currentDigit}
          </span>
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono mt-2">
            Target Cue
          </span>
        </div>

        {isFeedback && (
          <div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-xs flex flex-col items-center justify-center gap-3 animate-in fade-in zoom-in-95 duration-150 z-20">
            {feedback.isCorrect ? (
              <>
                <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                <span className="text-emerald-300 font-mono font-bold text-xl tracking-wider uppercase">
                  Correct
                </span>
                <span className="text-neutral-400 text-xs font-mono">
                  {feedback.latencyMs}ms response
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-16 h-16 text-rose-400" />
                <span className="text-rose-300 font-mono font-bold text-xl tracking-wider uppercase">
                  {feedback.timedOut ? "Time Expired" : "Miss"}
                </span>
                <div className="flex flex-col items-center font-mono text-center mt-1">
                  <span className="text-xs text-neutral-400">Accepted sounds:</span>
                  <span className="text-cyan-400 font-bold text-base mt-0.5">
                    {mapping?.primaryLetters}
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isFeedback}
            placeholder="Type consonant sound (e.g. t, d)..."
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            className="w-full bg-neutral-900/90 border-2 border-neutral-700 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.4)] text-center text-xl font-mono py-4 px-6 rounded-2xl outline-none transition-all placeholder:text-neutral-600 disabled:opacity-50"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 px-2">
          <span>Press [Enter] to submit</span>
          <span>{mapping?.hint}</span>
        </div>
      </form>
    </div>
  );
};

