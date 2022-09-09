//create express app and listen on post 3001
const express = require('express');
const bp=require('body-parser');
const app = express();

app.use(bp.urlencoded({extended:true}));
app.use(bp.json());

app.use(express.static('public'));
app.set("view engine", "ejs");


// test how are you ?
// mongoose.connect("mmongodb+srv://yuval1994:test1994S@cluster1.ijoboz4.mongodb.net/shop" --apiVersion 1 --username <username>")

app.set('views', __dirname + '/views');

app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log(`Example app listening on port 3000!`));