import { Request, Response } from "express";
import { db } from "../config/database";
import {
  IFragranceData,
  IFragranceComplete,
} from "../migrations/types/fragrance";

const { Fragrance } = db.models;

type FragranceParams = { id: string };
type CreateFragranceDTO = Omit<IFragranceData, "id" | "fragrance_id">;
type UpdateFragranceDTO = Partial<CreateFragranceDTO>;

export const fragranceController = {
  getFragrances: async (
    _req: Request,
    res: Response<IFragranceComplete[] | { error: string }>
  ) => {
    try {
      const fragrances = await Fragrance.findAll();
      res.json(fragrances.map((f) => f.toJSON() as IFragranceComplete));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ error: errorMessage });
    }
  },

  getFragrance: async (
    req: Request<FragranceParams>,
    res: Response<IFragranceComplete | { error: string }>
  ) => {
    try {
      const fragrance = await Fragrance.findByPk(req.params.id);
      if (!fragrance)
        return res.status(404).json({ error: "Fragrance not found" });
      res.json(fragrance.toJSON() as IFragranceComplete);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ error: errorMessage });
    }
  },

  createFragrance: async (
    req: Request<{}, {}, CreateFragranceDTO>,
    res: Response<IFragranceComplete | { error: string }>
  ) => {
    try {
      const maxIdResult = await Fragrance.findOne({
        order: [["id", "DESC"]],
        attributes: ["id"],
      });

      const lastId = maxIdResult ? parseInt(maxIdResult.id) : 0;
      const ids = Fragrance.generateIds(lastId);

      const fragranceData = {
        ...req.body,
        ...ids,
        image_url: req.body.image_url || "https://example.com/placeholder.jpg",
      };

      const fragrance = await Fragrance.create(fragranceData);
      res.status(201).json(fragrance.toJSON() as IFragranceComplete);
    } catch (error) {
      console.error("Create fragrance error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      res.status(400).json({ error: errorMessage });
    }
  },

  updateFragrance: async (
    req: Request<FragranceParams, {}, UpdateFragranceDTO>,
    res: Response<IFragranceComplete | { error: string }>
  ) => {
    try {
      console.log(req, "REQEST");
      const [updated] = await Fragrance.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated)
        return res.status(404).json({ error: "Fragrance not found" });

      const fragrance = await Fragrance.findByPk(req.params.id);
      if (!fragrance)
        return res.status(404).json({ error: "Fragrance not found" });
      res.json(fragrance.toJSON() as IFragranceComplete);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      res.status(400).json({ error: errorMessage });
    }
  },

  deleteFragrance: async (
    req: Request<FragranceParams>,
    res: Response<{ message: string } | { error: string }>
  ) => {
    try {
      const deleted = await Fragrance.destroy({
        where: { id: req.params.id },
      });
      if (!deleted)
        return res.status(404).json({ error: "Fragrance not found" });
      res.json({ message: "Fragrance deleted successfully" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ error: errorMessage });
    }
  },
};
