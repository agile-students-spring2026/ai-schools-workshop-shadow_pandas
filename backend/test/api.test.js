// tests/api.test.js
import request from "supertest";
import app from "../src/app.js";

jest.mock("../src/services/aiService.js", () => ({
  generateSummary: async () => "Mock summary"
}));

test("GET /districts works", async () => {
  const res = await request(app).get("/districts?zip=07030");

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0]).toHaveProperty("score");
  expect(res.body[0]).toHaveProperty("summary");
});