

var config = {
				ip_addr : "127.0.0.1",
				port  :  process.env.PORT || 5000, // "8080",
				CouchServer : "http://127.0.0.1:5984/",
				DBname : "leztok_db",
				DBresource : "leztok_db_resource",
				Design_Query : "leztok_design",
				api_domain : "leztokapp-leztok.rhcloud.com"
		};

console.log("OS IP  : ", process.env.OPENSHIFT_NODEJS_IP);
console.log("OS PORT: ", process.env.OPENSHIFT_NODEJS_PORT);
console.log("------");


OS_ipaddress = process.env.OPENSHIFT_INTERNAL_IP || process.env.OPENSHIFT_NODEJS_IP;
OS_port      = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (typeof OS_ipaddress === "undefined") {
	    //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
        //  allows us to run/test the app locally.
	    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
	 }
else{
		config.ip_addr = OS_ipaddress;
        config.port    = OS_port;
        config.CouchServer = "https://hiveapp.iriscouch.com:6984/";
	};

if (process.argv[2]==="P"){
	
	config.CouchServer = "https://hiveapp.iriscouch.com:6984/";
};	

module.exports = config;
