const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
/const dbconnection = require("./db/dbconfig");
// async function connect() {
//   try {
//     await dbconnection.getConnection();
//     console.log("connected");
//   } catch (error) {
//     console.log(error);
//   }
// }
// connect();
app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/answers", require("./routes/answerRoutes"));

app.use("/api/all/images", express.static(path.join(__dirname, "/images")));

app.get("/", (req, res) => {
  res.send("API is running....");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
N