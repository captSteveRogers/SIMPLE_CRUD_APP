/*jshint esversion: 6 */

var http = require('http');
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

// start the mysql connection
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'ashuchicky',
    database : 'EmployeeDB',
    multipleStatements : true
});

connection.connect(function(err){
    if(err)
        throw err;
    else    
        console.log("Connection with database established");    
});

// configure the bodyParser
app.use(bodyParser.json());     // supports json encoded bodies
app.use(bodyParser.urlencoded({     // supports url encoded bodies
    extended : true
}));

// RESTFUL ROUTES

// get all employees
app.get('/employees', function(req, res){
    connection.query("SELECT * FROM employee", function(err, rows, fields){
        if(err) throw err;
        else
            res.send(rows);
    });
});

// get an employee by id
app.get('/employees/:id', function(req, res){
    connection.query('SELECT * FROM employee WHERE EmpID = ?', [req.params.id], function(err, res, fields){
        if(err)
            throw err;
        else 
            res.send(rows);    
    });
});

// api to create a new record in mysql table
app.post('/employees', function(req, res){
    var postData = req.body;
    connection.query('INSERT INTO employee SET ?', postData, function(err, rows, fields){
        if(err)
            throw err;
        else 
            res.send(rows);    
    });
});

// to update an employee data
app.put('/employees', function(req, res){
    connection.query('UPDATE employee SET Name = ?, EmpAge = ?, Salary = ? WHERE EmpID = ?', [req.body.Name, req.body.EmpAge, req.body.Salary, req.body.EmpID], function(err, rows,  fields){
        if(err)
            throw err;
        else    
            res.send(rows);        
    });
});

// to delete an employee by ID
app.delete('/employees/:id', function(req, res){
    connection.query('DELETE FROM employee WHERE EmpID = ?', [req.params.id], function(err, res, fields){
        if(err)
            throw err;
        else 
            console.log("Deleted Successfully");    
    });
});


// create the app server
app.listen(process.env.PORT || 8080, process.env.IP, function(){
    console.log("The CRUD server has started");
});