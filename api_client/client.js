/**
 * @module client.js
 * @author Francesco Collovà <francesco.collova@gmailcom>
 * @copyright C&C aka leztok  2014
 * @version 0.1
 */


//Example POST method invocation
var Client = require('node-rest-client').Client;
var client = new Client();
var moment = require('moment');
var sleep = require('sleep');
var con = require('../config.json'); //Carica la configurazione
 

date_format = moment().format("DD/MM/YYYY HH:mm:ss");



// set content-type header and data as json in args parameter
var argvect = [

               
//USERS
			{data: {
					_id:"User1",
					type : "User",
					IdUser: "User1",
					IdUserSN: 1,
					FirstName: "Francesco",
					LastName:"Collovà",
					Mail:"francesco.collova@gmail.com",
					Gender:"M",
					NumberOfDiscussion:1,
					NumberOfComments:2,
					NumberOfPlaces:1,
					NumberOfReply:0,
					CreationDate : date_format
					},
				headers: {"Content-Type": "application/json"}},

				{data: {
					_id:"User2",
					type : "User",
					IdUser: "User2",
					IdUserSN: 1,
					FirstName: "Antonio",
					LastName:"Candela",
					Mail:"candela.antoni@gmail.com",
					Gender:"M",
					NumberOfDiscussion:1,
					NumberOfComments:2,
					NumberOfPlaces:1,
					NumberOfReply:0,
					CreationDate : date_format
					},
				headers: {"Content-Type": "application/json"}},	
// CATEGORIES
				
				
			{data: {
				_id : "Category1",
				type : "Category",
				IdCategory: "Category1",
				Description: "Startup",
				NumberDiscussion: 1,
				NumberMale: 1,
				NumberFemale:0,
				CreationDate : date_format
				},
			headers: {"Content-Type": "application/json"}},
		
				
// DISCUSSIONS			
				
               
            {data: {				
            		_id : "Discussion1",
            		type : "Discussion",
            		IdDiscussion : "Discussion1", 
            		Title : "La volta buona",
            		IdCategory: "Category1",
            		IdUser : 1,
            		NumberComments:2,
            		NumberMale:1,
            		NumberFemale:0,
					CreationDate : date_format
            		},
            	headers: {"Content-Type": "application/json"}},
            	
            {data: {				
        			_id : "Discussion2",
        			type : "Discussion",
        			IdDiscussion : "Discussion2", 
        			Title : "Startup Leztok",
        			IdCategory: "Category1",
        			IdUser : 1,
        			NumberComments:2,
        			NumberMale:2,
        			NumberFemale:0,
        			CreationDate : date_format
        		},
        	headers: {"Content-Type": "application/json"}},
            	
            	
// COMMENTS			

            {data: {
            		_id : "Comment1",
            		type : "Comment",
                	IdComment:"Comment1",
                	Comment: "Oggi Vinceremo!!",
                	MediaType: "undefined",
                	Media: "undefined",
                	IdDiscussion: "Discussion1",
                	IdUser: "User1",
                	UserPosition:"undefined",
   					CreationDate : date_format
                  	},
            	headers: {"Content-Type": "application/json"}},
            	
        	{data: {
        		_id : "Comment2",
        		type : "Comment",
            	IdComment:"comment2",
            	Comment: "Domani Vinceremo!!",
            	MediaType: "undefined",
            	Media: "undefined",
            	IdDiscussion: "Discussion1",
            	IdUser:"User1",
            	UserPosition:"undefined",
				CreationDate : date_format
              	},
        	headers: {"Content-Type": "application/json"}},
            	
                {data: {
            		_id : "Comment3",
            		type : "Comment",
                	IdComment:"Comment3",
                	Comment: "Oggi Vinceremo!!",
                	MediaType: "undefined",
                	Media: "undefined",
                	IdDiscussion: "Discussion2",
                	IdUser: "User1",
                	UserPosition:"undefined",
   					CreationDate : date_format
                  	},
            	headers: {"Content-Type": "application/json"}},
            	
        	{data: {
        		_id : "Comment4",
        		type : "Comment",
            	IdComment:"comment4",
            	Comment: "Domani Vinceremo!!",
            	MediaType: "undefined",
            	Media: "undefined",
            	IdDiscussion: "Discussion2",
            	IdUser:"User2",
            	UserPosition:"undefined",
				CreationDate : date_format
              	},
        	headers: {"Content-Type": "application/json"}}

            	
]; //END OF DATA


//Create Database

client.on('error',function(err){
    console.error('Something went wrong on the client', err);
    
});



client.put( con.CouchServer + "/" + con.DBname , function(data,response) {
    console.log(data);

	// parsed response body as js object
    // raw response
    //console.log(response);
    execute_DB(argvect,0);
}).on('error',function(err){
    console.log('something went wrong on the request', err.request.options);
});




//for (var i = 0; i < argvect.length; i++) {
//	
////	Idtext = "Id" + argvect[i].data.type;
////	console.log(Idtext);
////	console.log(ValIdtext= argvect[i].data[Idtext]);
//		sleep.sleep(2);//sleep for 1 seconds
//	    argvect[i].data.CreationDate = moment().format("DD/MM/YYYY HH:mm:ss");
//		client.post("http://localhost:5984/leztok_db/", argvect[i], function(data,response) {
//	    // parsed response body as js object
//	    console.log(data);
//	    
//	    // raw response
//	    //console.log(response);
//	});  
//}

function execute_DB(argvect,i) {
	console.log(i,argvect.length);
	if (i > argvect.length-1) 	return;
	else
		argvect[i].data.CreationDate = moment().format("DD/MM/YYYY HH:mm:ss");
		client.post(con.CouchServer + "/" + con.DBname , argvect[i], function(data,response) {
		console.log(data);
		// raw response
		//console.log(response);
		//sleep.sleep(2);//sleep for 1 seconds
		execute_DB(argvect,i+1);
		});  
		return;
};
//execute_DB(argvect,0);

// registering remote methods
//client.registerMethod("postMethod", "http://localhost:5984", "POST");
//
//client.methods.postMethod(args, function(data,response){
//    // parsed response body as js object
//    console.log(data);
//    // raw response
//    console.log(response);
//});