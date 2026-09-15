import { X, BookOpen, Info, ShieldCheck, CheckCircle } from "lucide-react";
import { MAJOR_SYSTEM_MAPPINGS } from "../domain/majorSystem";

interface StandardsGuideModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export const StandardsGuideModal = ({ isOpen, onClose }: StandardsGuideModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B1F3A]/60 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] flex flex-col overflow-hidden z-10">
        {/* Header */}
        <div className="bg-[#0B1F3A] text-white px-6 py-5 flex items-center justify-between border-b border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#155EEF] flex items-center justify-center text-white shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">Major System Specification</h2>
                <span className="text-[10px] font-semibold tracking-wider bg-[#0E9F9A] text-white px-2 py-0.5 rounded-full uppercase">
                  Standard ISO Mnemonic
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Official consonant phonetic matrix & memory peg reference
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#94A3B8] hover:text-white p-2 rounded-lg hover:bg-[#1E293B] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6 text-sm">
          {/* Theory & Core Rule Box */}
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-4 flex gap-3 text-[#1E293B]">
            <Info className="w-5 h-5 text-[#155EEF] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[#155EEF] block text-sm">How the Major System Operates:</span>
              <p className="text-[#334155] leading-relaxed">
                The Major System converts abstract digits (0–9) into <strong>consonant sounds</strong>. Vowels (<code className="bg-white px-1 py-0.5 rounded border border-[#CBD5E1] text-[#0B1F3A] font-semibold">a, e, i, o, u</code>) and semivowels (<code className="bg-white px-1 py-0.5 rounded border border-[#CBD5E1] text-[#0B1F3A] font-semibold">w, h, y</code>) have <strong>zero numerical value</strong> and are used freely as filler to forge memorable mental peg words.
              </p>
            </div>
          </div>

          {/* Design A: Tabular Matrix */}
          <div className="border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-16 text-center">Digit</th>
                  <th className="py-3.5 px-4 w-32">Consonants</th>
                  <th className="py-3.5 px-4 w-28">Phonetic IPA</th>
                  <th className="py-3.5 px-4">Memory Hook / Mental Trick</th>
                  <th className="py-3.5 px-4 w-36">Example Pegs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] text-xs">
                {MAJOR_SYSTEM_MAPPINGS.map((m) => (
                  <tr key={m.digit} className="hover:bg-[#F8FAFC] transition-colors">
                    {/* Digit */}
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#0B1F3A] text-white font-mono font-bold text-base shadow-xs">
                        {m.digit}
                      </span>
                    </td>

                    {/* Consonants */}
                    <td className="py-3 px-4 font-bold text-[#155EEF] text-sm font-mono">
                      {m.primaryLetters}
                    </td>

                    {/* IPA Sound */}
                    <td className="py-3 px-4 font-mono text-[#0E9F9A] text-xs font-semibold">
                      {m.phoneticSound}
                    </td>

                    {/* Memory Hook */}
                    <td className="py-3 px-4 text-[#334155] leading-relaxed">
                      {m.memoryHook}
                    </td>

                    {/* Example Pegs */}
                    <td className="py-3 px-4">
                      <span className="inline-block bg-[#F1F5F9] text-[#0B1F3A] px-2 py-1 rounded font-medium text-xs">
                        {m.examplePeg}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Golden Rules Callout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col gap-1">
              <span className="text-xs font-bold text-[#0B1F3A] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#16A34A]" /> Sound Over Spelling
              </span>
              <p className="text-[11px] text-[#64748B] leading-normal">
                Double consonants that sound like one (e.g. <em>apple</em>) count as a single sound (/p/ = 9).
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col gap-1">
              <span className="text-xs font-bold text-[#0B1F3A] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#16A34A]" /> Silent Letters Ignored
              </span>
              <p className="text-[11px] text-[#64748B] leading-normal">
                Silent letters produce no sound (e.g. the <em>k</em> in <em>knee</em> is silent, so <em>knee</em> = 2).
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col gap-1">
              <span className="text-xs font-bold text-[#0B1F3A] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#16A34A]" /> Vowels Free
              </span>
              <p className="text-[11px] text-[#64748B] leading-normal">
                Vowels are glue: <em>cat</em> = c (7) + t (1) = <strong>71</strong>. Vowel <em>a</em> has no value.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F8FAFC] px-6 py-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#155EEF]" /> Verified Standard Reference
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-semibold text-white bg-[#155EEF] hover:bg-[#124bbf] transition-colors cursor-pointer"
          >
            Close Reference
          </button>
        </div>
      </div>
    </div>
  );
};

