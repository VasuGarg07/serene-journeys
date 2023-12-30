import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { connectDb } from "./services/db.service";
import { verifyLoginCreds, verifyToken } from "./middlewares/auth.middleware";
import { authRouter, loginRouter } from "./routes/auth.routes";
import { SERVER_PORT } from "./configuration/config";
import { error404 } from "./middlewares/error.middleware";
import { blogRouter } from "./routes/blog.routes";
import { generateAesKey } from "./utils/utilities";
import { profileRouter } from "./routes/profile.routes";


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// sign-up router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/auth", verifyLoginCreds, loginRouter);
// blogs router
app.use("/api/v1/blog", verifyToken, blogRouter);
// profile router
app.use("/api/v1/profile", verifyToken, profileRouter);

app.get("/", (req, res) => {
	res.send(`Server is live at http://localhost:${SERVER_PORT}/`);
});

app.use("", error404)

connectDb().then(() => {
	console.log("DB Connected Successfully");
	// console.log(generateAesKey())
	app.listen(SERVER_PORT, () => {
		console.log(`App is listening on port: ${SERVER_PORT}`);
	});
})
	.catch(err => {
		console.log("Error occured while connecting to DB: ", err);
	});
