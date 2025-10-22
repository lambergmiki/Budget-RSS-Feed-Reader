import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { router } from "./routes/router.js";

try {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Resolve __dirname to /home/mlamb/code/1dv610/L3/backend/src
    const __dirname = dirname(fileURLToPath(import.meta.url));
    console.log("__dirname: ", __dirname);

    /**
     * Serves frontend from /home/mlamb/code/1dv610/L3/frontend/dist
     * by adjusting path to dist folder
     */
    const distPath = join(__dirname, "../../frontend/dist");
    console.log(
        "Serving frontend from, __dirname joined by '../../frontend/dist':",
        distPath
    );

    // Serve static files built by Vite
    app.use(express.static(distPath));

    app.use("/", router);

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`App listening on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error("Server failed to start:", error);
    process.exitCode(1);
}
