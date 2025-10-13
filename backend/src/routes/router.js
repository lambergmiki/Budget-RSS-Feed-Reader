import express from "express";

export const router = express.Router();

router.get("/", (req, res) => {
    console.log("test from server side");
    res.send("GET request to the homepage");
});

router.post("/", (req, res) => {
    res.send("POST request to the homepage");
});
