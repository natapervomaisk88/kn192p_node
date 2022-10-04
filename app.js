import express from "express";
import path from "path";
import router from "./routes/routes.js";
import bodyParser from "body-parser";
import ejs from "ejs";
//import timeFix from "./middleware.js";
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000;

//app.use(timeFix);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(express.static(path.resolve(__dirname, "public"))); //middleware

app.listen(PORT, () => {
  console.log(`Server has been started http//localhost:${PORT}`);
});
