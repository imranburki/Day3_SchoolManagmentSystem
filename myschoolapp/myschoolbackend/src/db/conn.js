var {createPool}=require('mysql');
const express=require('express');
var app=express();

const pool=createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"myschooldb",

});
module.exports=pool;
// const bodyparser=require('body-parser');

// app.use(bodyparser.json());

// var connection=mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password:"",
//     database: "myschooldb"
    
// });
// connection.connect(function(error){
//         if (error){
//             throw error;
//         }
//         else
//         var sqlquery="INSERT INTO tbl_student(id,firstName,lastName,department,username,password,email,contact)values(1,'imran','burki','cs','imran','123','imran@gmail.com','12345')";

//         connection.query(sqlquery,function(error,result){
//             // if(error){
//             //     throw error;
//             // } 
//             console.log("record inserted successufly");
//         });
//         console.log("db connected");
// });
// connection.end();
