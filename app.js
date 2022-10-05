import express from "express";
import path from "path";
import router from "./routes/routes.js";
import bodyParser from "body-parser";

import ejs from "ejs";
const app = express();
const __dirname = path.resolve();
app.set("port", 3000);
const PORT = process.env.PORT || app.get("port");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(express.static(path.resolve(__dirname, "public"))); //middleware

app.listen(PORT, () => {
  console.log(`Server has been started http//localhost:${PORT}`);
});
