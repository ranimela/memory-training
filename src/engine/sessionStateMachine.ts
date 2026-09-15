/**
 * Pure Session State Machine for Drill Execution
 * Decoupled from React UI and system timers.
 */

import { normalizeAnswer, validateMajorDigit } from "../domain/majorSystem";

export type ClockConfig =
  | { type: "none" }
  | { type: "stopwatch" }
  | { type: "perCard"; limitMs: number }
  | { type: "total"; limitMs: number };

export interface SessionConfig {
  readonly cardCount: number;
  readonly clock: ClockConfig;
}

export interface CardTrial {
  readonly sequenceIndex: number;
  readonly digit: string;
  readonly userRawInput: string;
  readonly normalizedInput: string;
  readonly isCorrect: boolean;
  readonly latencyMs: number;
  readonly timedOut: boolean;
  readonly timestamp: number;
}

export interface SessionMetrics {
  readonly totalCount: number;
  readonly correctCount: number;
  readonly accuracyRate: number;
  readonly totalDurationMs: number;
  readonly averageLatencyMs: number;
  readonly fastestLatencyMs: number;
  readonly slowestLatencyMs: number;
}

export type SessionPhase = "idle" | "in_progress" | "feedback" | "completed";

export interface SessionState {
  readonly phase: SessionPhase;
  readonly config: SessionConfig;
  readonly deck: readonly string[];
  readonly currentIndex: number;
  readonly currentTrialStartTime: number;
  readonly sessionStartTime: number;
  readonly lastTrialFeedback: CardTrial | null;
  readonly trials: readonly CardTrial[];
  readonly metrics: SessionMetrics | null;
}

/**
 * Creates a randomized card deck of the requested size.
 */
export function generateDeck(count: number): string[] {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const deck: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    deck.push(digits[randomIndex]);
  }
  return deck;
}

/**
 * Initializes a new session state.
 */
export function initSession(config: SessionConfig, deck?: string[]): SessionState {
  const cards = deck ?? generateDeck(config.cardCount);
  return {
    phase: "idle",
    config,
    deck: cards,
    currentIndex: 0,
    currentTrialStartTime: 0,
    sessionStartTime: 0,
    lastTrialFeedback: null,
    trials: [],
    metrics: null,
  };
}

/**
 * Starts the drill session.
 */
export function startSession(state: SessionState, now: number): SessionState {
  if (state.deck.length === 0) return state;
  return {
    ...state,
    phase: "in_progress",
    sessionStartTime: now,
    currentTrialStartTime: now,
    currentIndex: 0,
    trials: [],
    lastTrialFeedback: null,
    metrics: null,
  };
}

/**
 * Evaluates summary statistics once the session finishes.
 */
export function computeMetrics(trials: readonly CardTrial[], totalDurationMs: number): SessionMetrics {
  if (trials.length === 0) {
    return {
      totalCount: 0,
      correctCount: 0,
      accuracyRate: 0,
      totalDurationMs,
      averageLatencyMs: 0,
      fastestLatencyMs: 0,
      slowestLatencyMs: 0,
    };
  }

  const correctCount = trials.filter((t) => t.isCorrect).length;
  const latencies = trials.map((t) => t.latencyMs);
  const totalLatency = latencies.reduce((acc, val) => acc + val, 0);

  return {
    totalCount: trials.length,
    correctCount,
    accuracyRate: Math.round((correctCount / trials.length) * 100) / 100,
    totalDurationMs,
    averageLatencyMs: Math.round(totalLatency / trials.length),
    fastestLatencyMs: Math.min(...latencies),
    slowestLatencyMs: Math.max(...latencies),
  };
}

/**
 * Submits an answer for the active cue card.
 */
export function submitAnswer(
  state: SessionState,
  rawInput: string,
  now: number,
  timedOut: boolean = false
): SessionState {
  if (state.phase !== "in_progress") return state;

  const currentDigit = state.deck[state.currentIndex];
  const latencyMs = Math.max(0, Math.round(now - state.currentTrialStartTime));
  const isCorrect = !timedOut && validateMajorDigit(currentDigit, rawInput);

  const trial: CardTrial = {
    sequenceIndex: state.currentIndex,
    digit: currentDigit,
    userRawInput: rawInput,
    normalizedInput: normalizeAnswer(rawInput),
    isCorrect,
    latencyMs,
    timedOut,
    timestamp: now,
  };

  return {
    ...state,
    phase: "feedback",
    lastTrialFeedback: trial,
    trials: [...state.trials, trial],
  };
}

/**
 * Advances from feedback to the next card or completes the session.
 */
export function advanceCard(state: SessionState, now: number): SessionState {
  if (state.phase !== "feedback") return state;

  const nextIndex = state.currentIndex + 1;
  if (nextIndex >= state.deck.length) {
    const totalDurationMs = Math.max(0, Math.round(now - state.sessionStartTime));
    const metrics = computeMetrics(state.trials, totalDurationMs);
    return {
      ...state,
      phase: "completed",
      metrics,
    };
  }

  return {
    ...state,
    phase: "in_progress",
    currentIndex: nextIndex,
    currentTrialStartTime: now,
    lastTrialFeedback: null,
  };
}

