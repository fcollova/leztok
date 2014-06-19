function format_msg_api(body,err){
		var moment = require('moment');
		date_format = moment().format("DD/MM/YYYY HH:mm:ss");
		
		//data_format= cdata.getFullYear() + '/' + cdata.getMonth() + '/' + cdata.getDate()
		//+ ' ' + cdata.getHours()  +':' + cdata.getMinutes() + ':' + cdata.getSeconds();
		var head = {date : date_format, error : err };
		console.log(body);
		var msg = {head : head, data : body};
		console.log(msg);
		return(msg);
		
	};
	
	module.exports = format_msg_api;