BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

import express from "express";
import expressLayouts from "express-ejs-layouts";
import routes from "./routes/routes.js";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});