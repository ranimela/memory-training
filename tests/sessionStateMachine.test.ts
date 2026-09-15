import { describe, it, expect } from "vitest";
import {
  initSession,
  startSession,
  submitAnswer,
  advanceCard,
} from "../src/engine/sessionStateMachine";

describe("Session State Machine", () => {
  const testDeck = ["1", "6", "0"];
  const config = { cardCount: 3, clock: { type: "none" as const } };

  it("progresses smoothly through full card lifecycle and records metrics", () => {
    let state = initSession(config, testDeck);
    expect(state.phase).toBe("idle");
    expect(state.deck).toEqual(["1", "6", "0"]);

    state = startSession(state, 1000);
    expect(state.phase).toBe("in_progress");
    expect(state.currentIndex).toBe(0);

    // Card 0: "1" -> Answer "t" (Correct, 800ms)
    state = submitAnswer(state, "t", 1800);
    expect(state.phase).toBe("feedback");
    expect(state.lastTrialFeedback?.isCorrect).toBe(true);
    expect(state.lastTrialFeedback?.latencyMs).toBe(800);

    state = advanceCard(state, 2000);
    expect(state.phase).toBe("in_progress");
    expect(state.currentIndex).toBe(1);

    // Card 1: "6" -> Answer "k" (Wrong, 500ms)
    state = submitAnswer(state, "k", 2500);
    expect(state.phase).toBe("feedback");
    expect(state.lastTrialFeedback?.isCorrect).toBe(false);

    state = advanceCard(state, 2700);
    expect(state.currentIndex).toBe(2);

    // Card 2: "0" -> Timed out (0ms or timeout flag)
    state = submitAnswer(state, "", 3700, true);
    expect(state.lastTrialFeedback?.timedOut).toBe(true);
    expect(state.lastTrialFeedback?.isCorrect).toBe(false);

    state = advanceCard(state, 4000);
    expect(state.phase).toBe("completed");
    expect(state.metrics).not.toBeNull();
    expect(state.metrics?.totalCount).toBe(3);
    expect(state.metrics?.correctCount).toBe(1);
    expect(state.metrics?.accuracyRate).toBe(0.33);
  });
});

