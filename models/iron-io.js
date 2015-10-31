//Require Files
var request = require('request');

function ironIO(project_id,token,ironOpts) {
	
	var project_id = project_id
	var token = token
	var mq_version = 1
	var worker_version = 2

	//Get options
	if(ironOpts){
		var host = ironOpts.host
	}

	//Set default for options if not specified
	!host ? host = "aws-eu-west-1" : host = host;

	this.base_url_mq = "https://mq-"+host+".iron.io/"+mq_version+"/projects/"+project_id;
	this.base_url_worker = "https://worker-aws-us-east-1.iron.io/"+worker_version+"/projects/"+project_id;

	//Base Request Options
	this.options = {
	    method: 'GET',
	    json: true,
	    headers: {Accept : 'application/json','Accept-Encoding' : 'gzip/deflate','Content-Type' : 'application/json',Authorization : 'OAuth '+token}
	}

}

ironIO.prototype.queues = function(callback) {
	var url = this.base_url_mq+"/queues";
	this.options.url = url;
	this.post(callback);
}
ironIO.prototype.queueMessages = function(name,callback) {
	var url = this.base_url_mq+"/queues/"+name+"/messages";
	this.options.url = url;
	this.post(callback);
}

ironIO.prototype.workers = function(callback) {
	var url = this.base_url_worker+"/codes";
	this.options.url = url;
	this.post(callback);
}

ironIO.prototype.tasks = function(callback) {
	var url = this.base_url_worker+"/tasks";
	this.options.url = url;
	this.post(callback);
}

ironIO.prototype.taskInfo = function(id,callback) {
	var url = this.base_url_worker+"/tasks/"+id+"";
	this.options.url = url;
	this.post(callback);
}

ironIO.prototype.taskLog = function(id,callback) {
	var url = this.base_url_worker+"/tasks/"+id+"/log";
	this.options.url = url;
	this.post(callback);
}

ironIO.prototype.post = function(callback) {
	request(this.options,function (error, response, body) {
  		if (error || response.statusCode != 200) {	 
	  		if(error){
	  			var err = {};
	  			response ? err.status = response.statusCode : err.status = ''
	  			error ? err.error = error : err.error = ''
	  		}
	  	} 		
  		callback(err,body);
	});
}

module.exports = ironIO;