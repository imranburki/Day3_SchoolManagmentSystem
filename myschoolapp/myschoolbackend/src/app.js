const express =require("express");

const mysql=require('mysql');
const bodyParser=require('body-parser');
const app=express();
const jsonparser=bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const cors=require('cors');
app.use(cors());
app.use(urlencodedParser);
app.use(express.json());

var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"myschooldb",
});
conn.connect((error)=>{
    if(error)throw error;
    else{
        console.log("db connected");
    }

});



app.get("/api",(req,res)=>{
   // res.send("API is working now");
    res.json({
        success:2,
        message:"api is working"
    });
});
//to insert data
app.post('/api/create',jsonparser,function(req,res){
   // console.log("this is body"+req.body);
    var id=req.body.id;
    let sql=    'INSERT INTO tbl_student(id,firstName,lastName)VALUES("${req.body.id}","${req.body.firstName}","qwdddde") ';
    conn.query('insert into tbl_student(id,firstName,lastName,department,username,password,email,contact) values(?,?,?,?,?,?,?,?)',[req.body.id,req.body.firstName,req.body.lastName,req.body.department,req.body.username,
    req.body.password,req.body.email,req.body.contact],
    function(err,result){
        if(err) throw err;
        res.send('data inserted ');
    });
});
//to retrieve data
app.get('/api/getdata',jsonparser,function(req,res){
    conn.query('select * from tbl_student',function(error,rows){
        res.end(JSON.stringify(rows));

    });
});
//to retrieve data of particular user id

app.get('/api/finduser/:id',function(req,res){
    conn.query('select * from tbl_student where id=?',[req.body.id],function(error,rows){
        res.end(JSON.stringify(rows));
    });
});
//to delete a user
app.delete('/api/delete/:id',function(req,res){
    conn.query('delete from tbl_student where id=?',[req.body.id],function(error,rows){
        res.end(JSON.stringify(rows));
    });
});
// to updata a user record

app.put('/api/updata/:id',function(req,res){
    conn.query('updata tbl_student set id=?, firstName=?,lastName=?,department=?,username=?,password=?,email=?,contact=?',
    [req.body.id,req.body.firstName,req.body.lastName,req.body.department,req.body.username,req.body.password,req.body.email,req.body.contact],
    function(error,rows){
        res.end(JSON.stringify(rows));
    });
})

const path=require("path");
const { error } = require("console");

require("./db/conn");

const static_path=path.join(__dirname,"../public");
//console.log("path is "+path.join(__dirname,"../public"));
app.use(express.static(static_path));

app.set("view engine","hbs");
app.get("/",(req,res)=>{
    res.render("index");

});
app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/signup",(req,res)=>{
    res.render("signup");
});
app.listen(8080,(req,res)=>{
    console.log("Api is running here");
})