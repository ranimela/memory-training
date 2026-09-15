import { ShieldCheck, RotateCcw, Zap, Clock, Target, Check, X, FileText } from "lucide-react";
import { SessionMetrics, CardTrial } from "../engine/sessionStateMachine";
import { MAJOR_SYSTEM_MAPPINGS } from "../domain/majorSystem";

interface ScoreViewProps {
  readonly metrics: SessionMetrics;
  readonly trials: readonly CardTrial[];
  readonly onRestart: () => void;
}

export const ScoreView = ({ metrics, trials, onRestart }: ScoreViewProps) => {
  const accuracyPct = Math.round(metrics.accuracyRate * 100);
  const isPassing = accuracyPct >= 80;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
            isPassing ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#FEF2F2] text-[#DC2626]"
          }`}>
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-[#1E293B]">
                Session Evaluation Report
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                isPassing
                  ? "bg-[#DCFCE7] text-[#16A34A]"
                  : "bg-[#FEF2F2] text-[#DC2626]"
              }`}>
                {isPassing ? "Certified / Verified" : "Needs Review"}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Phonetic recall audit log and reflex latency breakdown
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col shadow-xs">
          <span className="text-xs font-semibold text-[#64748B] flex items-center gap-1.5 uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-[#155EEF]" /> Accuracy
          </span>
          <span className="text-3xl font-bold text-[#1E293B] mt-2 font-mono">
            {accuracyPct}%
          </span>
          <span className="text-xs text-[#64748B] mt-1">
            {metrics.correctCount} of {metrics.totalCount} matches
          </span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col shadow-xs">
          <span className="text-xs font-semibold text-[#64748B] flex items-center gap-1.5 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-[#0E9F9A]" /> Average Speed
          </span>
          <span className="text-3xl font-bold text-[#1E293B] mt-2 font-mono">
            {metrics.averageLatencyMs}ms
          </span>
          <span className="text-xs text-[#64748B] mt-1">mean recall delay</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col shadow-xs">
          <span className="text-xs font-semibold text-[#64748B] flex items-center gap-1.5 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#16A34A]" /> Peak Reflex
          </span>
          <span className="text-3xl font-bold text-[#16A34A] mt-2 font-mono">
            {metrics.fastestLatencyMs}ms
          </span>
          <span className="text-xs text-[#64748B] mt-1">fastest response</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col shadow-xs">
          <span className="text-xs font-semibold text-[#64748B] flex items-center gap-1.5 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#DC2626]" /> Max Latency
          </span>
          <span className="text-3xl font-bold text-[#1E293B] mt-2 font-mono">
            {metrics.slowestLatencyMs}ms
          </span>
          <span className="text-xs text-[#64748B] mt-1">slowest response</span>
        </div>
      </div>

      {/* Trial Breakdown Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
          <h3 className="text-sm font-bold text-[#0B1F3A] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#155EEF]" /> Detailed Audit Log ({trials.length} trials)
          </h3>
          <span className="text-xs text-[#64748B]">All responses recorded</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#F1F5F9] text-[#64748B] font-semibold">
                <th className="pb-3 pl-2">STATUS</th>
                <th className="pb-3">CUE DIGIT</th>
                <th className="pb-3">SUBMITTED</th>
                <th className="pb-3">APPROVED SOUNDS</th>
                <th className="pb-3 text-right pr-2">LATENCY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {trials.map((t, idx) => {
                const m = MAJOR_SYSTEM_MAPPINGS.find((item) => item.digit === t.digit);
                return (
                  <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3 pl-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                        t.isCorrect
                          ? "bg-[#DCFCE7] text-[#16A34A]"
                          : "bg-[#FEF2F2] text-[#DC2626]"
                      }`}>
                        {t.isCorrect ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        {t.isCorrect ? "Verified" : t.timedOut ? "Timeout" : "Non-Compliant"}
                      </span>
                    </td>
                    <td className="py-3 font-mono font-bold text-sm text-[#0B1F3A]">
                      {t.digit}
                    </td>
                    <td className="py-3 font-mono text-[#1E293B]">
                      {t.userRawInput ? `"${t.userRawInput}"` : "—"}
                    </td>
                    <td className="py-3 text-[#64748B] font-medium">
                      {m?.primaryLetters}
                    </td>
                    <td className="py-3 text-right pr-2 font-mono text-[#1E293B]">
                      {t.latencyMs}ms
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={onRestart}
        className="w-full py-4 rounded-xl font-semibold text-base text-white bg-[#155EEF] hover:bg-[#124bbf] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.99]"
      >
        <RotateCcw className="w-4 h-4" /> Initiate Another Inspection Run
      </button>
    </div>
  );
};

