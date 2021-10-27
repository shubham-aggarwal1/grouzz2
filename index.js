const express = require("express");
const path = require("path");
const port = 8000;
const mysql = require("mysql");
// const Message = require("./model/message");

const app = express();
app.set('view engine','ejs');
app.set("views", path.join(__dirname, "./views"));
app.use(express.urlencoded());
app.use(express.static("assets"));
//create connection
const db = mysql.createConnection({
    host:"database-2.cfnn5oh2gixp.us-east-2.rds.amazonaws.com",
    // host:"localhost",
    port:"3306",
    // user:"root"
    user:"grouzz",
    password:"Grouzz123",
    database:"grouzz_db",
});
//make connection
db.connect((err) => {
if(err){
    console.log(err.message);
    return;
}
console.log("Database connected.");
});
//making table 

app.get("/", function (req, res) {
  return res.render("home");
});

app.post('/submit',function(req,res){
    //  Message.create(req.body,function(err,newMessage){
    //      if(err){console.log('error in creating');return;}
    //      console.log(`************New Login************\n${newMessage}\n********************************`);
    //      return res.redirect('/');
    //  });
    db.query('INSERT INTO client_info (fname,lname,email,phone,message) VALUES ',(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('entry created');
    })

    console.log(req.body.fName);
    // return res.redirect('/');
 })

 app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    console.log(`server has started at port:${port}`);
})
