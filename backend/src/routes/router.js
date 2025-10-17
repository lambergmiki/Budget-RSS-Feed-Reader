import express from "express";
import { FetchController } from "../controller/fetchController.js";

export const router = express.Router();

const fetchController = new FetchController();

/**
 * Processes the URL from user input in frontend, then sends back converted data
 * for rendering on the frontend.
 */
router.post("/processUrl", async (req, res) =>
    fetchController.callUrlConverter(req, res)
);
