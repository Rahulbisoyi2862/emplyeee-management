require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const UserCreate = require('./routes/UserCreate')
const Alluser = require("./routes/Alluser")
const target = require('./routes/target')
const updateArchive = require("./routes/updateArchive")
const passwordChange = require("./routes/passwordChange")
const leaveTarget = require("./routes/leaveTarget");
const profilePhoto = require("./routes/profilePhoto");
const editUser = require("./routes/editUser");
const targetUpdateRow = require("./routes/targetUpdateRow")
const CounterData = require('./routes/CounterData')
const googleSheet = require('./routes/googleSheet')
const dotenv = require("dotenv")

const cors = require("cors");
dotenv.config()

connectDB();
const app = express();

app.use(cors({
  origin: `${process.env.forntend}`,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

app.use("/uploads", express.static("uploads"));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authRoutes);
app.use("/api/user", UserCreate)
app.use("/api/user", Alluser)
app.use("/api/target", target)
app.use("/api/target", updateArchive)
app.use("/api/password/", passwordChange)
app.use("/api/leave", leaveTarget)
app.use("/api/upload", profilePhoto)
app.use("/api/user", editUser)
app.use("/api/editRow", targetUpdateRow)
app.use('/api', CounterData)
app.use("/api/google", googleSheet)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
