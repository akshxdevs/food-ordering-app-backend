const express = require("express");
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 3000; 
const app = express();
const db = require("./Db/db");


app.use(express.json());
app.use(cors());


const LoginRoutes = require('./Routes/loginRoutes');
const SignupRoutes = require('./Routes/signupRoutes');
const resSignupRoutes = require('./Routes/resSignupRoutes');
const resLoginRoutes = require('./Routes/resLoginRoutes');
const foodRoutes = require('./Routes/foodRoutes');





app.use("/login", LoginRoutes);
app.use("/signup", SignupRoutes);
app.use("/reslogin",resLoginRoutes);
app.use("/ressignup",resSignupRoutes);
app.use("/foods",foodRoutes);



app.get('/', (req, res) => {
    res.send('Loading...');
});

app.use((err, req, res, next) => {
    res.status(500).send('Something went wrong!');
});


if (db) {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
} else {
    console.error("ERROR: Database connection failed.");
}

module.exports = app;