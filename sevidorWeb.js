const express = require("express");
const app = express();
const bp = require("body-parser");
const multer = require("multer");
const mult = multer();
const path = require("path");
const mysql = require("mysql2");
const {parse} = require("path");

let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "hr"
})

app.get("/api/employee/list", function (req, res){
    let sql = "select * from employees";
    conn.query(sql,function (err, result, fields){
        if(err) throw err;
        for (i=0; i<result.length;i++){
            salaryFloat = parseFloat(result[i].salary);
            result[i].salary = salaryFloat + 100;
        }
        console.log(result);
        res.json(result);
    })
});

app.get("/api/employee/buscar/:nombre", function (req, res){
    let nombre = req.params.nombre;
    let sql = "select * from employees where lower(first_name) like ?";
    let parametros = ["%" + nombre + "%"];

    conn.query(sql, parametros, function (err, results){
        if(err) throw err;
        res.json(results);
    })
});

app.get("/api/jobs",(req, res)=>{
    conn.query("select * from jobs",(err, result, fields)=>{
        if (err) throw err;
        res.json(result);
    })
});

app.post("/api/jobs", bp.urlencoded({extended: true}), (req, res)=>{
    let jobId = req.body.jobId;
    let jobTitle = req.body.jobTitle;
    let minSalary = req.body.minSalary;
    let maxSalary = req.body.maxSalary;

    let sql = "insert into jobs (job_id, job_title, min_salary, max_salary) VALUES (?,?,?,?)";
    let params = [jobId, jobTitle, minSalary, maxSalary];

    conn.query(sql,params,(err, result, fields)=>{
        if(err) throw err;
        conn.query("select * from jobs", function (err, result, fields){
            res.json(result);
        })
    })
})

app.get("/hola", function (req, res){
    res.send("Hola escrito");
});

app.get("/holaHtml", function(req, res){
    res.sendFile(path.join(__dirname,"vistas/hola.html"));
});

app.get("/clase131/:nombre/:apellido", (req, res) => {
    let nombre = req.params.nombre;
    let apellido = req.params.apellido;

    res.send("nombre recibido: "+ nombre);
});

app.post("/formulario", bp.urlencoded({extended: true}), function (req, res){
    lecturaBody(req, res);
});

app.post("/formulario2", bp.json(), function (req, res){
    lecturaBody(req, res);
});

app.post("/formulario3", mult.none(), function (req, res){
    lecturaBody(req, res);
});

app.listen(3000,function(){
    console.log("Servidor corriendo en el puerto 3000");
});

function lecturaBody(req, res){
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;

    res.json({
        nombreRecibido: nombre,
        apellidoRecibido: apellido
    });
};