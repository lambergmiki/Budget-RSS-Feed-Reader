import logger from "morgan";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { router } from "./routes/router.js";
import helmet from "helmet";
import { dirname, join } from "node:path";

try {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(helmet());
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extend: false }));

    // Resolve path
    const directoryFullName = dirname(fileURLToPath(import.meta.url));
    console.log("Running from directory:", directoryFullName);

    app.use(
        "/frontend/public",
        express.static(join(directoryFullName, "..", "frontend/public"))
    );

    app.use("/", router);

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`App listening on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error(error);
    process.exitCode = 1;
}
