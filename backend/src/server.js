import express from "express";
import cors from "cors";
import ConnectDB from "./config/db.js";
import { PORT } from "./utils/config.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import authRouter from "./features/auth/auth.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRouter);

app.use((req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
});

app.use(errorMiddleware);

ConnectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`server listening on port http://localhost:${PORT}`);
	});
});
