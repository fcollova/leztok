curl -X DELETE https://hiveapp.iriscouch.com:6984/leztok_db
curl -X DELETE https://hiveapp.iriscouch.com:6984//leztok_db_resource

cd ./api_client
node config_db.js https://hiveapp.iriscouch.com:6984/
cd ..
couchapp push leztok_design https://hiveapp.iriscouch.com:6984/leztok_db
