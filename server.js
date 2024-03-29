/**
 * @module app.js
 * @author Francesco Collovà <francesco.collova@gmailcom>
 * @copyright C&C aka leztok  2014
 * @version 0.1
 */


var con = require('./config.js'); //Carica la configurazione

console.log("Configuration: " , con, "\n")

var restify = require('restify');
var custom_formatter = require('./lib/custom_formatter'); // ./lib Custom rensponse Formatter
var nano = require('nano')(con.CouchServer);
var util    = require('util');




//Couch Driver for URL router
var Get_query_V1 = require('./lib/Get_query_V1');
var Post_ID_V1 = require('./lib/Post_ID_V1');
var Post_Comment_V1 = require('./lib/Post_Comment_V1');
var Post_New_Discussion_V1 = require('./lib/Post_New_Discussion_V1');





/*var nano = require('nano')(
  { "url"             : "http://localhost:5984"
  , "request_defaults" : { "proxy" : "http://someproxy" }
  , "log"             : function (id, args) {
      console.log(id, args);
    }
  });*/




var server = restify.createServer({
	  formatters: {
		    'application/json': custom_formatter //Override default formatter for application/json 
		  }
		});


/* FC
The restify.queryParser() plugin is used to parse the HTTP query string (i.e., /jobs?skills=java,mysql).
The parsed content will always be available in req.query.
The restify.bodyParser() takes care of turning your request data into a JavaScript object on the server automatically.
The restify.CORS() configures CORS (Cross Origin Resource Sharing) support in the application.
*/

server.use(restify.fullResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());




// Rimpiazzato con la query "all_doc"
//function Get_ID_V1(req, res, next) {
//		var database = nano.use(con.DBname);
//		console.log('Try reading on couch: ID');
//		database.get(req.params.name, { revs_info: false }, function(err, body) {
//		res.charSet('UTF-8');
//		res.contentType = 'application/json';
//		if(!err){
//			msg_body_to_send = format_msg_api(body,err);
//			res.send(200 , msg_body_to_send);
//			return next();
//			}
//		else{//server.get({path: PATH, version: '1.0.0'}, Get_list_ID_V1);
//server.get({path: PATH + ':name', version: '1.0.0'}, Get_ID_V1);
//
//			msg_body_to_send = format_msg_api(body,err);
//			res.send(200 , msg_body_to_send);
//			//return next(err);
//			return next();
//			}
//		}
//);};
//
//function Get_list_ID_V1(req, res, next) {
//		var database = nano.use(con.DBname);
//		console.log('Try reading on couch: List ID');
//		database.list( {include_docs: true, descending: true},function(err, body) {
//		res.charSet('UTF-8');
//		res.contentType = 'application/json';
//		if(!err){
//			msg_body_to_send = format_msg_api(body,err);
//			res.send(200 , msg_body_to_send);
//			return next();
//			}
//		else{
//			msg_body_to_send = format_msg_api(body,err);
//			res.send(200 , msg_body_to_send);
//			//return next(err);
//			return next();
//			}
//		}
//);};
//
//
//



var PATH = '/api/insert/';
//server.get({path: PATH, version: '1.0.0'}, Get_list_ID_V1);
//server.get({path: PATH + ':name', version: '1.0.0'}, Get_ID_V1);
//
server.post({path: PATH + ':name', version: '1.0.0'}, Post_ID_V1);//server.get({path: PATH, version: '1.0.0'}, Get_list_ID_V1);
//server.get({path: PATH + ':name', version: '1.0.0'}, Get_ID_V1);
//

var PATH = '/api/i_comment';
server.post({path: PATH, version: '1.0.0'}, Post_Comment_V1);
var PATH = '/api/i_discussion';
server.post({path: PATH, version: '1.0.0'}, Post_New_Discussion_V1);

var VPATH = '/api/query/';
server.get({path: VPATH + ':name', version: '1.0.0'}, Get_query_V1);




server.get( /.*\..*/, restify.serveStatic({ directory: __dirname + '/static_folder'}));
//server.get('/.+/', restify.serveStatic({ directory: __dirname + '/static_folder'}));
//server.get(/\/.+/, restify.serveStatic({ directory: __dirname + '/static_folder'}));


server.listen(con.port , function(){     //con.ip_addr,

	console.log('Current process directory is: ' + __dirname);
    console.log('%s listening at %s \n', server.name , server.url);
    console.log('Static Usage: ---> ' + server.url + '/lt_connect.html');
    //console.log('API Usage: ------> '+ server.url + '/api/Id');
    console.log('API Query Usage:-> ' + server.url + '/api/query/comments?key=Comment1');
    console.log('API Query Usage:-> ' + server.url + '/api/insert/<_id>   <dati nel body: json>');

    
});
