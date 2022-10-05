import { Router } from "express";
import methodOverride from "method-override";
import path from "path";
import config from "../config/main.js";
import news from "../models/news.js";

const __dirname = path.resolve();
const router = Router();

router.use(methodOverride("X-HTTP-Method")); //          Microsoft
router.use(methodOverride("X-HTTP-Method-Override")); // Google/GData
router.use(methodOverride("X-Method-Override")); //      IBM

router.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

router
  .route("/news")
  .get((req, res) => {
    res.send(news);
  })
  .post((req, res) => {
    news.sort((n1, n2) => {
      if (n1.id < n2.id) return -1;
      else if (n1.id > n2.id) return 1;
      else return 0;
    });
    let el = req.body;
    el.id = news[news.length - 1].id + 1;
    console.log(el);
    news.push(el);
    console.log(news);
    res.redirect("/");
  });

router
  .route("/news/:id")
  .get((req, res) => {
    const result = news.find((item) => req.params.id == item.id);
    res.send(result);
  })
  .delete((req, res) => {
    console.log(req.method);
    const toDelete = news.find((n) => n.id == req.params.id);
    if (toDelete) {
      news.splice(news.indexOf(toDelete), 1);
    }
    res.redirect("/");
  })
  .put((req, res) => {
    if (req.body.id === undefined) {
      const toEdit = news.find((n) => n.id == req.params.id);
      if (toEdit) {
        const index = news.indexOf(toEdit);
        news[index].title = req.body.title;
        news[index].text = req.body.text;
      }
    }
    res.redirect("/");
  });

router
  .route("/")
  .get((req, res) => {
    res.render("index", { title: "EJS", news: news });
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
  res.sendFile(path.resolve(__dirname, config.views, "about.html"));
});

router.get("/posts", (req, res) => {
  res.sendFile(path.resolve(__dirname, config.views, "posts.html"));
});

/*
GET  /news - отримати всі новини
POST /news - додавати новину
GET  /news/id отримати новину за id
DELETE /news/id видалити новину за id
PUT /news/id оновити дані
*/
export default router;
