import express from "express";
import http from "node:http";

export const router = express.Router();

router.use("/");

// Catch all other routes, kept as last route
router.use("*", (req, res, next) => {
    console.log(`404 for ${req.originalUrl}`);
    const statusCode = 404;
    const error = new Error(http.STATUS_CODES[statusCode]);
    error.status = statusCode;
    next(error);
});
