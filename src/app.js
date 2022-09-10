const express = require('express');
const bp=require('body-parser');
const app = express();
const mongoose = require('mongoose'); // adds MongoDB to the Project
const donenv = require("dotenv");
// const loginRouter = require("./routes/login");
const authRouter = require("./routes/auth");

donenv.config();

app.use(express.urlencoded())




mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB Connection Successfull!"))
.catch((err) =>{
    console.log(err);
});
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());
app.use(express.json());
// app.use("/api/users" , loginRouter);

app.use("/api/auth" , authRouter);

app.use(express.static('public'));
app.set("view engine", "ejs");


app.set('views', __dirname + '/views');

app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log(`Example app listening on port 3000!`));