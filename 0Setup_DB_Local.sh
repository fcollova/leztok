curl -X DELETE http://127.0.0.1:5984/leztok_db
curl -X DELETE http://127.0.0.1:5984/leztok_db_resource

cd ./api_client
node config_db.js
cd ..
couchapp push leztok_design http://127.0.0.1:5984/leztok_db
