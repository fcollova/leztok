

var config = {
				ip_addr : "127.0.0.1",
				port  :  "8080",
				CouchServer : "http://127.0.0.1:5984/",
				DBname : "leztok_db",
				Design_Query : "leztok_design",
				api_domain : "leztokapp-leztok.rhcloud.com"
		};

console.log("OS IP  : ", process.env.OPENSHIFT_NODEJS_IP);
console.log("OS PORT: ", process.env.OPENSHIFT_NODEJS_PORT);
console.log("------");

if (process.env.OPENSHIFT_NODEJS_IP)
{
	config.CouchServer = "https://hiveapp.iriscouch.com/";
};


//Openshift connection
config.ip_addr = process.env.OPENSHIFT_NODEJS_IP   || config.ip_addr;
config.port    = process.env.OPENSHIFT_NODEJS_PORT || config.port;


module.exports = config;
