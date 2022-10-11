import express from "express";
import path from "path";
import router from "./routes/routes.js";
import bodyParser from "body-parser";
import ejsMate from "ejs-mate";
import cookieParser from "cookie-parser";
import config from "./config/main.js";
const app = express();
const __dirname = path.resolve();
app.set("port", 3000);
const PORT = process.env.PORT || app.get("port");
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(cookieParser(config.secret_key));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(express.static(path.resolve(__dirname, "public"))); //middleware

app.listen(PORT, () => {
  console.log(`Server has been started http//localhost:${PORT}`);
});
