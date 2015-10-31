var express = require('express');
var router = express.Router();
var ironIO = require("../models/iron-io.js");
var config = require("../config.js");

var iron = new ironIO(config.iron.project_id,config.iron.token);

router.get("/queues",function(req,res){
    iron.queues(function(error,response){
        error ? res.json(error) : res.json(response);
    })
});

router.get("/queue/:name/messages",function(req,res){
	var name = req.params.name;
    iron.queueMessages(name,function(error,response){
        error ? res.json(error) : res.json(response);
    })
});

router.get("/workers",function(req,res){
    iron.workers(function(error,response){
        error ? res.json(error) : res.json(response);
    })
});

router.get("/tasks",function(req,res){
    iron.tasks(function(error,response){
        error ? res.json(error) : res.json(response);
    })
});

router.get("/task/:id/info",function(req,res){
	var id = req.params.id;
    iron.taskInfo(id,function(error,response){
        error ? res.json(error) : res.json(response);
    })
});

router.get("/task/:id/log",function(req,res){
	var id = req.params.id;
    iron.taskLog(id,function(error,response){
        error ? res.json(error) : res.json(response);
    })
});

module.exports = router;