/**
 * @module app.js
 * @author Francesco Collovà <francesco.collova@gmailcom>
 * @copyright C&C aka leztok  2014
 * @version 0.1
 */


var con = require('../config.js'); //Carica la configurazione
var nano = require('nano')(con.CouchServer);
var format = require('./format_msg_api');


function Get_query_V1(req, res, next) {
	var database = nano.use(con.DBname);
	
	console.log('Try reading on couch: query ' + req.params.name, req.query);
	
	keys_query = req.query;
	keys_query.revs_info = false;  // add {revs_info: false };
	//console.log('eccomi');
	//console.log(keys_query);
	
	database.view( con.Design_Query, req.params.name, keys_query, function(err, body) {
	res.charSet('UTF-8');
	res.contentType = 'application/json';
	if(!err){
		msg_body_to_send = format(body, err);
		res.send(200 , msg_body_to_send);
		return next();
		}
	else{
		console.log("Couch error: ", err);
		msg_body_to_send = format(body, err);
		res.send(200 , msg_body_to_send);
		return next();
		}
		}
	);};
	
	
	module.exports = Get_query_V1;