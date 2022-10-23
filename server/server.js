const express = require("express");
const path = require("path");
const cors = require("cors");

const shortid = require("shortid");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_08aVXLQMyXDDCN",
  key_secret: "w0EJ8Uwbo7czGbFyKqh9MPSS",
});

const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/netflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoutes);


// Serving company logo
app.get("/logo.jpeg", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.jpeg"));
});
 
app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 199;
  const currency = "INR";
 
  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
 
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
