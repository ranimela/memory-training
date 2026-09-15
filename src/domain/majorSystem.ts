/**
 * Immutable Domain Model: Major Mnemonic System
 * Mappings based on standard phonetic consonant sounds with mnemonic hooks and standard peg words.
 */

export interface PhoneticMapping {
  readonly digit: string;
  readonly primaryLetters: string;
  readonly acceptedTokens: readonly string[];
  readonly phoneticSound: string;
  readonly memoryHook: string;
  readonly examplePeg: string;
  readonly hint: string;
}

export const MAJOR_SYSTEM_MAPPINGS: readonly PhoneticMapping[] = [
  {
    digit: "0",
    primaryLetters: "s, z",
    acceptedTokens: ["s", "z", "soft-c", "c"],
    phoneticSound: "/s/, /z/",
    memoryHook: "Zero begins with Z. S is the hiss of Zero.",
    examplePeg: "Zoo, Saw, Ice",
    hint: "Zero begins with Z. S is the sound of zero.",
  },
  {
    digit: "1",
    primaryLetters: "t, d",
    acceptedTokens: ["t", "d", "th"],
    phoneticSound: "/t/, /d/, /?/",
    memoryHook: "T and D have 1 vertical downstroke.",
    examplePeg: "Tea, Tie, Day",
    hint: "T and D have 1 vertical downstroke.",
  },
  {
    digit: "2",
    primaryLetters: "n",
    acceptedTokens: ["n"],
    phoneticSound: "/n/",
    memoryHook: "N has 2 vertical downstrokes.",
    examplePeg: "Noah, Hen, Knee",
    hint: "N has 2 vertical downstrokes.",
  },
  {
    digit: "3",
    primaryLetters: "m",
    acceptedTokens: ["m"],
    phoneticSound: "/m/",
    memoryHook: "M has 3 vertical downstrokes (or 3 rotated 90°).",
    examplePeg: "May, Ham, Mom",
    hint: "M has 3 vertical downstrokes (or 3 on its side).",
  },
  {
    digit: "4",
    primaryLetters: "r",
    acceptedTokens: ["r"],
    phoneticSound: "/r/",
    memoryHook: "R is the last letter of fouR; resembles 4 flipped.",
    examplePeg: "Ray, Rye, Oar",
    hint: "R is the last letter of fouR; resembles 4 flipped.",
  },
  {
    digit: "5",
    primaryLetters: "l",
    acceptedTokens: ["l"],
    phoneticSound: "/l/",
    memoryHook: "L is Roman numeral 50; 5 spread fingers form an L.",
    examplePeg: "Law, Oil, Lee",
    hint: "L is Roman numeral 50; five fingers form an L.",
  },
  {
    digit: "6",
    primaryLetters: "j, sh, ch, soft g",
    acceptedTokens: ["j", "sh", "ch", "g", "soft g", "soft-g", "dg", "zh"],
    phoneticSound: "/d?/, /?/, /t?/, /?/",
    memoryHook: "J looks like a mirrored 6; soft palate sh/ch sounds.",
    examplePeg: "Jaw, Shoe, Jay",
    hint: "J looks like a backwards 6; sh/ch/j sound cluster.",
  },
  {
    digit: "7",
    primaryLetters: "k, hard c, hard g",
    acceptedTokens: ["k", "c", "hard c", "g", "hard g", "q", "ck"],
    phoneticSound: "/k/, /g/",
    memoryHook: "Two 7s back-to-back form a K; guttural throat clicks.",
    examplePeg: "Key, Cow, Guy",
    hint: "K looks like two 7s put together; hard throat sounds.",
  },
  {
    digit: "8",
    primaryLetters: "f, v",
    acceptedTokens: ["f", "v", "ph"],
    phoneticSound: "/f/, /v/",
    memoryHook: "Cursive f has 2 loops like an 8; teeth-to-lip sounds.",
    examplePeg: "Foe, Ivy, UFO",
    hint: "Cursive f has two loops like an 8; v is voiced f.",
  },
  {
    digit: "9",
    primaryLetters: "p, b",
    acceptedTokens: ["p", "b"],
    phoneticSound: "/p/, /b/",
    memoryHook: "P and B are rotated/mirrored versions of 9.",
    examplePeg: "Pie, Boy, Bee",
    hint: "P and B are mirror reflections of 9.",
  },
];

/**
 * Normalizes user input by trimming, lowercasing, and stripping punctuation.
 */
export function normalizeAnswer(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ");
}

/**
 * Validates a user response against the phonetic mapping for a digit.
 */
export function validateMajorDigit(digit: string, userResponse: string): boolean {
  const mapping = MAJOR_SYSTEM_MAPPINGS.find((m) => m.digit === digit);
  if (!mapping) return false;

  const normalized = normalizeAnswer(userResponse);
  if (!normalized) return false;

  return mapping.acceptedTokens.includes(normalized);
}

