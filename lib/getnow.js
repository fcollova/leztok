function getnow(){
		
		var moment = require('moment');
		now = moment().format("DD/MM/YYYY HH:mm:ss");
		return now;
		
	};
	
	module.exports = getnow;