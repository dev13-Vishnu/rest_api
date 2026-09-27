const express = require("express");
const fs = require("fs");
// const users = require("./MOCK_DATA.json");
const { default: mongoose, Mongoose } = require("mongoose");
const User = require("./models/user");

const userRouter = require("./routes/user");
const { connectMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares");

const app = express();

const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/rest-api-1")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo Error: ", err));

app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("/log.txt"));

//Routes

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>    
            ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>        
    `;
  res.send(html);
});

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));
