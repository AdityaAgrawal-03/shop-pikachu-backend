const express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { initializeDBConnection } = require("./db/db.connect");
const products = require("./routes/product.router");
const cart = require("./routes/cart.router");
const signup = require("./routes/signup.router");
const login = require("./routes/login.router");
const wishlist = require("./routes/wishlist.router");
const payments = require("./routes/payment.router")
const { authVerify } = require("./middlewares/verifyAuth");
const { errorHandler } = require("./middlewares/error-handler-middleware");
const { routeNotFound } = require("./middlewares/route-not-found-middleware");

app.use(bodyParser.json());

app.use(cors());

// initialize DB connection
initializeDBConnection();

// seedAllProducts()

app.get("/", (req, res) => {
  res.send("Hello Pikachu!");
});

app.use("/products", products);
app.use("/signup", signup);
app.use("/login", login);

app.use(authVerify);
app.use("/cart", cart);
app.use("/wishlist", wishlist);
app.use("/payments", payments);


app.use(errorHandler);
app.use(routeNotFound);

app.listen(8000, () => {
  console.log("server started");
});
