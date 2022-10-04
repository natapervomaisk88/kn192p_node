import { Router } from "express";
import path from "path";
import news from "../models/news.js";
const __dirname = path.resolve();
const router = Router();

router
  .route("/news")
  .get((req, res) => {
    res.send(news);
  })
  .post((req, res) => {
    news.push(req.body);
    res.redirect("/news");
  });

router.route("/news/:id").get((req, res) => {
  res.send(news[req.params.id - 1]);
});

router
  .route("/")
  .get((req, res) => {
    res.render("index.ejs", { title: "EJS", news: news });
    // res.format({
    //   html: res.render("index.ejs", { title: "My page(ejs)" }),
    // });
    //res.sendFile(path.resolve(__dirname, "views", "index.html"));
  })
  .post((req, res) => {
    res.send("<h1>Hello, I am express server (POST REQUEST)</h1>");
  })
  .delete((req, res) => {
    res.send("<h1>DELETE REQUEST</h1>");
  })
  .put((req, res) => {
    res.send("<h1>PUT REQUEST</h1>");
  });

router.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname, "views", "about.html"));
});

router.get("/posts", (req, res) => {
  res.sendFile(path.resolve(__dirname, "views", "posts.html"));
});

/*
GET  /news - отримати всі новини
POST /news - додавати новину
GET  /news/id отримати новину за id
DELETE /news/id видалити новину за id
PUT /news/id оновити дані
*/
export default router;
