const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');

// const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
// const userRouter = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
var cors = require('cors');
const photoRouter = require("./routes/photoGalleryRoute");

dotenv.config();

const PORT = process.env.PORT || 4200;
const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));
connectDB();

app.use(express.json()); //to accept json data;

app.get('/', (req, res) => {
    res.send("APP is running successfully!");
});

app.use('/api/photos', photoRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server start on PORT ${PORT}`.yellow.bold));