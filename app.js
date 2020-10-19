var mysql = require('mysql');
var express = require('express');
var crypto = require('crypto');
var app = express();

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'workindia'
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.post("/app/user",function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    
    // Hash password using MD5 for security
    var hash = crypto.createHash('md5').update(password).digest('hex');

    var cmd="INSER INTO credentials (username,hash) VALUES (\""+username+"\",\""+hash+"\")";
    
    connection.query(cmd,function(err,resp){
        if(err)
            res.send({status:'registration failed'});
        else
            res.send({status:'account created'});
    });
});

app.post("/app/user/auth",function(req,res){
    var username=req.body.username;
    var password=req.body.password;

    var user_hash = crypto.createHash('md5').update(password).digest('hex');
    });
});