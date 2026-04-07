// src/controllers/districtController.js
import { getDistrictsByZip } from "../services/dataService.js";
import { calculateScore } from "../services/scoringService.js";
import { generateSummary } from "../services/aiService.js";

export const getDistricts = async (req, res) => {
  try {
    const { zip } = req.query;
    if (!zip) return res.status(400).json({ error: "ZIP code is required" });

    const districts = await getDistrictsByZip(zip);

    const enriched = await Promise.all(
      districts.map(async (d) => {
        const score = calculateScore(d);
        let summary = "No summary available";
        try {
          summary = await generateSummary(d);
        } catch (err) {
          console.error("AI generation failed:", err.message);
        }
        return { ...d, score, summary };
      })
    );

    res.json(enriched);
  } catch (err) {
    console.error("Controller error:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};