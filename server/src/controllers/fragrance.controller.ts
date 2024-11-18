import { Request, Response } from "express";
import db from "../config/database";
import { IFragrance } from "../types/fragrance.types";

const { Fragrance } = db;

type FragranceParams = { id: string };
type CreateFragranceDTO = Omit<
  IFragrance,
  "id" | "fragrance_id" | "created_at" | "updated_at"
>;
type UpdateFragranceDTO = Partial<CreateFragranceDTO>;

export const fragranceController = {
  getFragrances: async (_req: Request, res: Response<IFragrance[]>) => {
    try {
      const fragrances = await Fragrance.findAll();
      res.json(fragrances);
    } catch (error) {
      res.status(500).json({ error: error.message } as any);
    }
  },

  getFragrance: async (
    req: Request<FragranceParams>,
    res: Response<IFragrance | { error: string }>
  ) => {
    try {
      const fragrance = await Fragrance.findByPk(req.params.id);
      if (!fragrance)
        return res.status(404).json({ error: "Fragrance not found" });
      res.json(fragrance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createFragrance: async (
    req: Request<{}, {}, CreateFragranceDTO>,
    res: Response<IFragrance | { error: string }>
  ) => {
    try {
      const maxIdResult = await Fragrance.findOne({
        order: [["id", "DESC"]],
        attributes: ["id"],
      });

      const lastId = maxIdResult ? parseInt(maxIdResult.id) : 0;
      const nextId = lastId + 1;
      const paddedId = String(nextId).padStart(3, "0");

      const fragranceData = {
        ...req.body,
        id: String(nextId),
        fragrance_id: `FRAG-${paddedId}`,
        image_url: req.body.image_url || "https://example.com/placeholder.jpg",
      };

      const fragrance = await Fragrance.create(fragranceData);
      res.status(201).json(fragrance);
    } catch (error) {
      console.error("Create fragrance error:", error);
      res.status(400).json({ error: error.message });
    }
  },

  updateFragrance: async (
    req: Request<FragranceParams, {}, UpdateFragranceDTO>,
    res: Response<IFragrance | { error: string }>
  ) => {
    try {
      const [updated] = await Fragrance.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated)
        return res.status(404).json({ error: "Fragrance not found" });

      const fragrance = await Fragrance.findByPk(req.params.id);
      res.json(fragrance!);
    } catch (error) {
      res.status(400).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
    }
  },
};
