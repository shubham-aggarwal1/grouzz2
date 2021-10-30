const express = require("express");
const port = 8000;
const path=require('path');
const mysql = require("mysql");

var hvisiter=0,svisiter=0;
const app = express();
app.set('view engine','ejs');
app.set("views", path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded()) ;
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

app.get("/", function (req, res) {
  return res.render("home");
  hvisiter++;
});

app.post('/submit',function(req,res){
    //  Message.create(req.body,function(err,newMessage){
    //      if(err){console.log('error in creating');return;}
    //      console.log(`************New Login************\n${newMessage}\n********************************`);
    //      return res.redirect('/');
    //  });
    svisiter++;
    db.query(`INSERT INTO client_info (fname,lname,email,phone,message) VALUES (${db.escape(req.body.fname)},${db.escape(req.body.lname)},${db.escape(req.body.email)},${db.escape(req.body.phone)},${db.escape(req.body.message)})`,(err,result)=>{
        if(err) 
            console.log(err);
        console.log('entry created');
    })

    return res.redirect('/');
 })

 app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    console.log(`server has started at port:${port}`);
})
