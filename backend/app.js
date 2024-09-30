const express = require("express");
const app = express();
const cors = require("cors");
const bookRoute = require("./routes/booksRoutes");
const userRoute = require("./routes/userRoute");
const cookiParser = require("cookie-parser");
require("./connection/conn");
app.use(cors());
app.use(express.json());
app.use(cookiParser());
app.use("/api/v1", bookRoute);
app.use("/api/users", userRoute);

app.listen(1000, () => {
    console.log("SERVER STARTED SUCCESSFULLY on port 1000");
});
