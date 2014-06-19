
/**
 * @module app.js
 * @author Francesco Collovà <francesco.collova@gmailcom>
 * @copyright C&C aka leztok  2014
 * @version 0.1
 */


var con = require('../config.js'); //Carica la configurazione
var nano = require('nano')(con.CouchServer);
var format = require('./format_msg_api');



// Da modificare la POST
function Post_ID_V1(req, res, next) {
	var database = nano.use(con.DBname);
	
	console.log('Try inserting on couch ID: ' + JSON.stringify(req.params.name) + '--' + JSON.stringify(req.body));
	database.insert(req.body, req.params.name, function(err, body) {
		res.charSet('UTF-8');
		res.contentType = 'application/json';
		if(!err){
			msg_body_to_send = format(body, err);
			res.send(200 , msg_body_to_send);
			return next();
        	}
		else{
			// Attenzione che in caso di errore body è undefined!!!
			msg_body_to_send = format(body, err);
			res.send(200 , msg_body_to_send);
			return next();
    	}});
}

module.exports = Post_ID_V1;

