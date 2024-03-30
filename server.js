const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDatabase = require("./db.js");
// step 2 
const cloudinary = require('./config/cloudinary');
const fileUpload = require("express-fileupload")
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

connectDatabase();

// step 3
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))
cloudinary.cloudinaryConnect()

app.use("/api", require("./routes/index.js"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
