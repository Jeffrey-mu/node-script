import { db } from '../db/index.js'

db(`INSERT INTO data_pool (game_type_id,dimensions,time,main_title,description,keywords,content,picture,src,data_type_id) VALUES ("1","1","2023-05-11 00:00:00","1","1","1","1","1","1","1")`, [], function (result, fields) {
  console.log(result);
})
