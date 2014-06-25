
/**
 * @module app.js
 * @author Francesco Collovà <francesco.collova@gmailcom>
 * @copyright C&C aka leztok  2014
 * @version 0.1
 */

var async = require('async');
var con = require('../config.js'); //Carica la configurazione
var nano = require('nano')(con.CouchServer);
var format = require('./format_msg_api');



// Da modificare la POST
function Post_Comment_V1(req, res, next) {
	var db = nano.use(con.DBname);

	db.update = function update(obj, callback) {
		var db = this;
 		db.get(obj._id, { include_docs: true, revs_info: true }, function (error, body) {
 			//console.log(body)
			if(!error) obj._rev = body._rev;
			db.insert(obj, callback);
		});
	};
	
	
	User = req.body.User;
	Comment = req.body.Comment;
	Discussion = req.body.Discussion;
	
	//Update values
	Discussion.NumberOfComments += 1;
	User.NumberOfComments += 1;
	
	console.log("resource inserting");
	async.series([
	              function(callback){
	              db.insert(Comment, function(err, body, header){
	            	  if (!err){
	            		  		console.log("insert ", body);
	          	                callback(null, body);
		            	  		}
	            	  else callback(err);	});
	              },         
	              function(callback){
	              //inserisce il record in leztok_db
	              console.log("Insert User: ", User);
	              db.update(User, function(err, body, header){
	            	  if (!err){
	            		  		console.log("insert ", body);
	          	                callback(null, body);
		            	  		}
	            	  else callback(err);	});
	              },
	              function(callback){
	              db.update(Discussion, function(err, body, header){
	            	  if (!err){
	            		  		console.log("insert ", body);
	          	                callback(null, body);
		            	  		}
	            	  else callback(err);	});
	              }
             
	              ], function(err, results){
											res.charSet('UTF-8');
											res.contentType = 'application/json';
											if(!err){
												msg_body_to_send = format(results, err);
												res.send(200 , msg_body_to_send);
												return next();
											}
											else{
												msg_body_to_send = format(results, err);
												res.send(200 , msg_body_to_send);
												return next();
											}}
				);
	
	
//	console.log('Try inserting on couch ID: ' + JSON.stringify(req.params.name) + '--' + JSON.stringify(req.body));
//	database.insert(req.body, req.params.name, function(err, body) {
//		res.charSet('UTF-8');
//		res.contentType = 'application/json';
//		if(!err){
//			msg_body_to_send = format(body, err);
//			res.send(200 , msg_body_to_send);
//			return next();
//        	}
//		else{
//			// Attenzione che in caso di errore body è undefined!!!
//			msg_body_to_send = format(body, err);
//			res.send(200 , msg_body_to_send);
//			return next();
//    	}});
}

module.exports = Post_Comment_V1;

