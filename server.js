const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
// const UserRoutes = require("./routes/users")
const AuthRoute = require("./routes");
// const PostRoute = require("./routes/posts");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const PORT = process.env.PORT || 8000;
dotenv.config();
const app = express();

mongoose.connect(
    process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true },
    (error, result) => {
        if (error) {
            console.log("Error in DB connection");
        } else {
            console.log("DB connected");
        }
    }
);


//middle ware
app.use(cors()); //always use cors() like this...
app.use(bodyParser.json());
// app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));




// app.use("/api/users", UserRoute);
app.use("/api", AuthRoute);
// app.use("/api/posts", PostRoute);
app.listen(PORT, () => {
        console.log(PORT)
    console.log("BackEnd is running");
});

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
