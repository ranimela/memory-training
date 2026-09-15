import { useState, useEffect, useRef } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { SessionState } from "../engine/sessionStateMachine";
import { MAJOR_SYSTEM_MAPPINGS, normalizeAnswer, validateMajorDigit } from "../domain/majorSystem";

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
  const debounceTimerRef = useRef<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [perCardRemainingMs, setPerCardRemainingMs] = useState<number | null>(null);

  const currentDigit = state.deck[state.currentIndex];
  const mapping = MAJOR_SYSTEM_MAPPINGS.find((m) => m.digit === currentDigit);
  const feedback = state.lastTrialFeedback;

  // Auto-focus input and reset state on card advance
  useEffect(() => {
    if (state.phase === "in_progress") {
      setInputValue("");
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      inputRef.current?.focus();
    }
  }, [state.currentIndex, state.phase]);

  // Unified Monotonic Timer Loop
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

  // Auto-advance feedback after 700ms
  useEffect(() => {
    if (state.phase === "feedback") {
      const timer = setTimeout(() => {
        onAdvance();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [state.phase, onAdvance]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setInputValue(rawVal);

    if (state.phase !== "in_progress" || !rawVal.trim()) return;

    // Clear any existing short debounce
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    const norm = normalizeAnswer(rawVal);
    const isValid = validateMajorDigit(currentDigit, rawVal);

    // Check if the current typed letters could be the start of a multi-letter token (e.g. "s" -> "sh", "c" -> "ch")
    const couldBePrefixOfMultiLetter = mapping?.acceptedTokens.some(
      (token) => token.length > norm.length && token.startsWith(norm)
    );

    // 1. If valid and not a prefix of a longer accepted sound (or is already 2+ chars), submit immediately!
    if (isValid && !couldBePrefixOfMultiLetter) {
      onSubmit(rawVal);
      return;
    }

    // 2. If it is valid but could be an incomplete multi-letter cluster (like typing "s" for "sh" on digit 6),
    // wait 300ms. If no second letter is typed, submit.
    if (isValid && couldBePrefixOfMultiLetter) {
      debounceTimerRef.current = window.setTimeout(() => {
        onSubmit(rawVal);
      }, 300);
      return;
    }

    // 3. If invalid and user typed an explicit single or multi-letter entry that cannot form any valid token,
    // evaluate after a brief 450ms hesitation pause (or user can still press Enter immediately)
    debounceTimerRef.current = window.setTimeout(() => {
      onSubmit(rawVal);
    }, 450);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.phase !== "in_progress" || !inputValue.trim()) return;
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    onSubmit(inputValue);
  };

  const isFeedback = state.phase === "feedback" && feedback !== null;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      {/* Top Status & Telemetry Bar */}
      <div className="flex items-center justify-between bg-white border border-[#E2E8F0] px-5 py-3 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Card</span>
          <span className="text-sm font-bold text-[#0B1F3A] font-mono">
            {state.currentIndex + 1}
          </span>
          <span className="text-xs text-[#94A3B8]">of</span>
          <span className="text-xs font-semibold text-[#64748B] font-mono">
            {state.deck.length}
          </span>
        </div>

        <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1.5 rounded-lg">
          <Clock className="w-4 h-4 text-[#155EEF]" />
          {state.config.clock.type === "perCard" && perCardRemainingMs !== null && (
            <span className={`text-xs font-mono font-bold ${perCardRemainingMs < 1000 ? "text-[#DC2626]" : "text-[#1E293B]"}`}>
              {(perCardRemainingMs / 1000).toFixed(1)}s
            </span>
          )}
          {state.config.clock.type === "total" && (
            <span className="text-xs font-mono font-bold text-[#1E293B]">
              {Math.max(0, (state.config.clock.limitMs - (performance.now() - state.sessionStartTime)) / 1000).toFixed(0)}s remaining
            </span>
          )}
          {state.config.clock.type === "stopwatch" && (
            <span className="text-xs font-mono font-bold text-[#1E293B]">
              {(elapsedMs / 1000).toFixed(1)}s
            </span>
          )}
          {state.config.clock.type === "none" && (
            <span className="text-xs font-semibold text-[#64748B]">Untimed</span>
          )}
        </div>

        <button
          type="button"
          onClick={onAbort}
          className="text-xs font-medium text-[#64748B] hover:text-[#DC2626] transition-colors cursor-pointer"
        >
          Cancel Drill
        </button>
      </div>

      {/* Cue Card Frame */}
      <div
        className={`relative w-full aspect-[4/3] rounded-2xl border flex flex-col items-center justify-center p-8 transition-all duration-200 shadow-xs bg-white ${
          isFeedback
            ? feedback.isCorrect
              ? "border-[#16A34A] bg-[#F0FDF4]"
              : "border-[#DC2626] bg-[#FEF2F2]"
            : "border-[#E2E8F0]"
        }`}
      >
        {/* Center Digit Prompt */}
        <div className="flex flex-col items-center">
          <span className="text-9xl font-extrabold font-mono text-[#0B1F3A] tracking-tighter">
            {currentDigit}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mt-2">
            Numerical Cue
          </span>
        </div>

        {/* Feedback Overlay */}
        {isFeedback && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center gap-2.5 rounded-2xl z-20">
            {feedback.isCorrect ? (
              <>
                <CheckCircle className="w-14 h-14 text-[#16A34A]" />
                <span className="text-[#16A34A] font-bold text-xl tracking-tight">
                  Verified Match
                </span>
                <span className="text-xs text-[#64748B] font-mono">
                  {feedback.latencyMs}ms response latency
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-14 h-14 text-[#DC2626]" />
                <span className="text-[#DC2626] font-bold text-xl tracking-tight">
                  {feedback.timedOut ? "Time Expired" : "Non-Compliant Response"}
                </span>
                <div className="flex flex-col items-center text-center mt-1">
                  <span className="text-xs text-[#64748B]">Approved sounds for digit {currentDigit}:</span>
                  <span className="text-[#155EEF] font-bold text-base mt-0.5 font-mono">
                    {mapping?.primaryLetters}
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            disabled={isFeedback}
            placeholder="Type consonant sound (instant check)..."
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            className="w-full bg-white border-2 border-[#CBD5E1] focus:border-[#155EEF] focus:ring-4 focus:ring-[#155EEF]/10 text-center text-2xl font-mono font-bold py-4 px-6 rounded-xl outline-none transition-all placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-base disabled:bg-[#F8FAFC]"
          />
        </div>
        <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block animate-pulse" />
            Instant verification active &middot; No Enter required
          </span>
          <span>{mapping?.hint}</span>
        </div>
      </form>
    </div>
  );
};

