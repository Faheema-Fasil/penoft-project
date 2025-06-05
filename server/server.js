const dotenv = require("dotenv");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

const userRoutes = require("./Routes/userRouter");
const profileRoutes = require("./Routes/profileRouter");
const locationRoutes = require("./Routes/locationRouter");
const authMiddleware = require("./middleware/authMiddleware");
const dashboardRoutes=require("./Routes/DashboardRouter");
const { default: mongoose } = require("mongoose");
const PORT = process.env.PORT || 5000;

require("./DB/database");
mongoose.set('bufferCommands', false);

app.use(bodyParser.json());
app.use(cors());

app.use(authMiddleware.authenticate);
app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/dashboard", dashboardRoutes)

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
