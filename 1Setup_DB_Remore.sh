curl -X DELETE https://leztok.couchappy.com/leztok_db
curl -X DELETE https://leztok.couchappy.com/leztok_db_resource

cd ./api_client
node config_db.js https://leztok.couchappy.com
cd ..
couchapp push leztok_design https://leztok.couchappy.com/leztok_db
