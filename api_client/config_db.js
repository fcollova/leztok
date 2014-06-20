
var moment = require('moment');
var con = require('../config.js'); //Carica la configurazione
var async = require('async');


if (process.argv[2]){
	console.log(process.argv[2]);
	con.CouchServer = process.argv[2];
	};

var nanodb = require('nano')(con.CouchServer);
var nanores = require('nano')(con.CouchServer);


nanodb.db.create(con.DBname);
nanores.db.create(con.DBresource);

var db = nanodb.use(con.DBname);
var dbres = nanores.use(con.DBresource);


date_format = moment().format("DD/MM/YYYY HH:mm:ss");


//set content-type header and data as json in args parameter
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
//CATEGORIES
				
				
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
		
				
//DISCUSSIONS			
				
            
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
         	
         	
//COMMENTS			

         {data: {
         		_id : "Comment1",
         		type : "Comment",
             	IdComment:"Comment1",
             	Comment: "Oggi Vinceremo!!",
             	MediaType: "undefined",
             	Media: "undefined",
             	IdDiscussion: "Discussion1",
             	IdUser: "User1",
             	FirstName: "Francesco",
				LastName:"Collovà",
				Mail:"francesco.collova@gmail.com",
				Gender:"M",
				NumberOfDiscussion:1,
				NumberOfComments:2,
				NumberOfPlaces:1,
				NumberOfReply:0,
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
         	FirstName: "Francesco",
			LastName:"Collovà",
			Mail:"francesco.collova@gmail.com",
			Gender:"M",
			NumberOfDiscussion:1,
			NumberOfComments:2,
			NumberOfPlaces:1,
			NumberOfReply:0,
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
             	FirstName: "Francesco",
				LastName:"Collovà",
				Mail:"francesco.collova@gmail.com",
				Gender:"M",
				NumberOfDiscussion:1,
				NumberOfComments:2,
				NumberOfPlaces:1,
				NumberOfReply:0,
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
         	FirstName: "Antonio",
			LastName:"Candela",
			Mail:"candela.antoni@gmail.com",
			Gender:"M",
			NumberOfDiscussion:1,
			NumberOfComments:2,
			NumberOfPlaces:1,
			NumberOfReply:0,
         	UserPosition:"undefined",
			CreationDate : date_format
           	},
     	headers: {"Content-Type": "application/json"},
        execute: {imagefile : "2001.jpg"}
        
     	}	


         	
]; //END OF DATA


function insert_resource(record){
	
	if (record.execute)
	{
		console.log("resource inserting");
		async.waterfall([
		                 function(callback){
		                	 dbres.insert(record.data, function(err, body, header){
		                		 if (!err){
		                			 console.log("insert resource for: ", body);
		                			 callback(null, body);}
		                		 else return(err); 
		                	 });},

		                 function (res1,callback){
		                 var fs = require("fs");
						 var filename = record.execute.imagefile;
						 var data = fs.readFileSync(filename);
						 dbres.attachment.insert(res1.id, filename, data, 'image/jpg', { rev : res1.rev },  function(err, body) {  
						        	console.log(body);
						        	callback(body,res1,callback);
						 });}
		                ],
		                function(err, status) { console.log(status);
		                						return (status);}
				   );
	}
	else return(null);
	}

								
								
								
function insert_DB(record) {
		
	record.CreationDate = moment().format("DD/MM/YYYY HH:mm:ss");
	async.series([
	              function(callback){
	              //inserisce il record in leztok_db
	              db.insert(record.data, function(err, body, header){
	            	  if (!err){
	            		  		console.log("insert ", body);
	          	                callback(null, body);
		            	  		}
	            	  else callback(err);	});
	              },
	              function(callback){
	            	  insert_resource(record);
	            	  callback(null); }
	              
	              ], function(err, results){});
	
};
	

async.map(argvect, insert_DB , function(err, results){} );
