import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "@config";
import { logger } from "@utils";
import { healthRoute } from "@routes";
import { errorHandlerMiddleware } from "@middlewares";
import { PORT } from "@constants";

const app = express();

connectDB();
app.use(express.json());

app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);
app.use(helmet());
app.use(cors());

app.use("/health", healthRoute);

// error route
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
