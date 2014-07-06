
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
var getnow = require('./getnow.js');


// Da modificare la POST
function Post_Discussion_V1(req, res, next) {
	var db = nano.use(con.DBname);

	db.update = function update(obj, callback) {
		var db = this;
 		db.get(obj._id, { include_docs: true, revs_info: true }, function (error, body) {
 			console.log("Get nell'update", body);
			if(!error){
				obj._rev = body._rev;
				db.insert(obj, obj._id, callback);
			}
		});
	};
	
	
	User = req.body.data.User;
	Discussion = req.body.data.Discussion;
	//console.log("try ------>",  Discussion);

	
	//Update values
	//Discussion.NumberOfComments = Discussion.NumberOfComments + 1;
	//User.NumberOfComments = User.NumberOfComments + 1;
	
	console.log("resource inserting");
	async.series([
	              function(callback){
	              db.insert(Discussion, function(err, body, header){
	            	  if (!err){
	            		  		console.log("Insert New Discussion", body);
	          	                callback(null, body);
		            	  		}
	            	  else callback(err);	});
	              },         
	              
	              
	              function(callback){
	              db.insert(Comment, function(err, body, header){
	            	  if (!err){
	            		  		console.log("Insert New Comment", body);
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
}

function prepare_comment(comment){
	
	if (comment._id){
		delete comment._id;
	}
	comment.CreationDate = getnow();
	return comment;
}



module.exports = Post_New_Discussion_V1;

