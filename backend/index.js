const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const weeklyStatusRoute = require("./Routes/WeeklyStatusRoute");
const changeChallengeRoute = require("./Routes/ChangeChallengeRoute");
const { MONGO_URL, PORT } = process.env;

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB is  connected successfully"))
    .catch((err) => console.error(err));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.use(
    cors({
        origin: [
            "https://sustainabee.onrender.com",
            "https://sustainabee.work",
            "https://www.sustainabee.work",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

app.use("/", weeklyStatusRoute);

app.use("/", changeChallengeRoute);
