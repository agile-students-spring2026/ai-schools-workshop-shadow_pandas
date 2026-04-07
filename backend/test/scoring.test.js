// tests/scoring.test.js
import { calculateScore } from "../src/services/scoringService.js";

test("returns 100 for perfect district", () => {
  const d = {
    academic: 100,
    teacherQuality: 100,
    safety: 100,
    funding: 100,
    diversity: 100,
    classSize: 0
  };

  expect(calculateScore(d)).toBe(100);
});