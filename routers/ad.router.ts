import { Router } from "express";
import { AdRecord } from "../records/ad.record";

export const adRouter = Router();

adRouter
  .get("/search/:name?", async (req, res) => {
    const ads = await AdRecord.findAll(req.params.name ?? "");
    res.status(200).json({
      success: true,
      ads,
    });
  })
  .get("/:id", async (req, res) => {
    const ad = await AdRecord.getOne(req.params.id);
    res.status(200).json({
      success: true,
      ad,
    });
  })
  .post("/", async (req, res) => {
    const ad = new AdRecord(req.body);
    await ad.insert();
    res.status(200).json({
      success: true,
      ad,
    });
  });
