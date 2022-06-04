import { Router } from "express";

export const adRouter = Router();

adRouter.get("/", async (req, res) => {
  res.status(200).json({
    success: true,
  });
});
