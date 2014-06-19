
var moment = require('moment');
var con = require('../config.js'); //Carica la configurazione

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
        execute: {image : "2001.jpg"}
        
     	}

         	
]; //END OF DATA


function attach_image(image, context){
	var fs = require("fs");
	var filename = image;
	var data = fs.readFileSync(filename);
	dbres.insert(context, function(err, body, header){
		if (!err){	dbres.attachment.insert(body.id, image, data, 'image/jpg', { rev : body.rev },  function(err, body) {  
		        	console.log(body);
		           });
		      }
		else return;
		
	});
};


function execute_DB(argvect,i) {
	console.log(i,argvect.length);
	if (i > argvect.length-1) 	return;
	else
		record = argvect[i];
		record.CreationDate = moment().format("DD/MM/YYYY HH:mm:ss");
	    db.insert(record.data, function(err, body, header){
	    	console.log(body);
	    	if (!err && record.execute ){
	    		attach_image(record.execute.image, record.data);
	    		console.log("attach image: ", record.execute.image);
	    		}
			execute_DB(argvect,i+1);
			
	    });
	    
	    
		return;
};

execute_DB(argvect,0); //execute_DB(argvect,0);
