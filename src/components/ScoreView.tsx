import { Trophy, RefreshCw, Zap, Clock, Target, Check, X } from "lucide-react";
import { SessionMetrics, CardTrial } from "../engine/sessionStateMachine";
import { MAJOR_SYSTEM_MAPPINGS } from "../domain/majorSystem";

interface ScoreViewProps {
  readonly metrics: SessionMetrics;
  readonly trials: readonly CardTrial[];
  readonly onRestart: () => void;
}

export const ScoreView = ({ metrics, trials, onRestart }: ScoreViewProps) => {
  const accuracyPct = Math.round(metrics.accuracyRate * 100);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-1 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <Trophy className="w-7 h-7" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-100 font-mono">
          Session Debrief
        </h2>
        <p className="text-neutral-400 text-xs font-mono uppercase tracking-widest">
          Trial Telemetry Analysis
        </p>
      </div>

      {/* Metrics High-Level Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 flex flex-col items-center">
          <span className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1">
            <Target className="w-3 h-3 text-cyan-400" /> Accuracy
          </span>
          <span className="text-2xl font-bold font-mono text-cyan-300 mt-1">
            {accuracyPct}%
          </span>
          <span className="text-[10px] text-neutral-500 mt-0.5">
            {metrics.correctCount} / {metrics.totalCount} correct
          </span>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 flex flex-col items-center">
          <span className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" /> Avg Speed
          </span>
          <span className="text-2xl font-bold font-mono text-amber-300 mt-1">
            {metrics.averageLatencyMs}ms
          </span>
          <span className="text-[10px] text-neutral-500 mt-0.5">per cue card</span>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 flex flex-col items-center">
          <span className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400" /> Best Pace
          </span>
          <span className="text-2xl font-bold font-mono text-emerald-300 mt-1">
            {metrics.fastestLatencyMs}ms
          </span>
          <span className="text-[10px] text-neutral-500 mt-0.5">fastest reflex</span>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 flex flex-col items-center">
          <span className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3 text-rose-400" /> Slowest
          </span>
          <span className="text-2xl font-bold font-mono text-rose-300 mt-1">
            {metrics.slowestLatencyMs}ms
          </span>
          <span className="text-[10px] text-neutral-500 mt-0.5">max latency</span>
        </div>
      </div>

      {/* Trial-by-Trial Card Breakdown */}
      <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Response Breakdown ({trials.length} trials)
        </h3>
        <div className="divide-y divide-neutral-800/80 max-h-72 overflow-y-auto pr-1">
          {trials.map((t, idx) => {
            const m = MAJOR_SYSTEM_MAPPINGS.find((item) => item.digit === t.digit);
            return (
              <div
                key={idx}
                className="py-2.5 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      t.isCorrect
                        ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/40"
                        : "bg-rose-950/80 text-rose-400 border border-rose-500/40"
                    }`}
                  >
                    {t.isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-neutral-200 font-bold text-sm">
                    {t.digit}
                  </span>
                  <span className="text-neutral-500">?</span>
                  <span className={t.isCorrect ? "text-emerald-400" : "text-rose-400"}>
                    {t.timedOut ? "(Timeout)" : `"${t.userRawInput || " "}"`}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-neutral-400">
                  <span className="text-[11px] text-neutral-500">
                    expected: {m?.primaryLetters}
                  </span>
                  <span className="text-[11px] text-neutral-300 font-mono">
                    {t.latencyMs}ms
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Restart Button */}
      <button
        type="button"
        onClick={onRestart}
        className="w-full py-4 rounded-xl font-mono font-bold tracking-wider uppercase text-neutral-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer active:scale-[0.99]"
      >
        <RefreshCw className="w-5 h-5 fill-neutral-950" /> Start New Session
      </button>
    </div>
  );
};

