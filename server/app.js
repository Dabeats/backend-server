import express, { json } from "express";
import router from "./router/routes.js";
import sessions from "express-session";
const timeExp = 1000 * 60 * 60 * 24;
const app = express();
const port = 3001;

app.use(
  sessions({
    secret: "qaqswdefrgthyukilo",
    saveUninitialized: true,
    cookie: { maxAge: timeExp },
    resave: false,
  })
);
app.use(json());
app.use(router);

app.listen(port, () => {
  console.log(`Server running uvub ${port}`);
});
