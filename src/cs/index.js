import fs from 'fs';
import https from 'https';
import { db } from '../db/index.js'
let data = JSON.parse(fs.readFileSync('./feed.json').toString())
let filter = []
let index = 2000
let allTypes

db('select * from game_type', [], async function (result, fields) {
  allTypes = result.map(item => ({ id: item.id, name: item.name }))
  await job()
})
console.log(data.length);

function job() {
  return new Promise((res, rej) => {
    db(`select * from data_pool where data_type_id = "2" AND main_title = "${data[index].title}"`, [], function (result, fields) {
      if (!data.length) {
        data[index].game_type_id = allTypes.find(item => item.name === data[index].category)?.id || 0
        filter.push(data[index])
        console.log(index);
        fs.writeFileSync('./filter.json', JSON.stringify(filter))
        saveImg(data[index].thumb, data[index].title)
        db(`INSERT INTO data_pool (game_type_id,dimensions,time,main_title,description,keywords,content,picture,src,data_type_id) VALUES (
          "${data[index].game_type_id}","${data[index].dimensions}","2023-05-11 00:00:00",
          "${stringDecodingFun(data[index].title)}","${stringDecodingFun(data[index].description)}","${stringDecodingFun(data[index].tags)}","","/uploadsImg/${data[index].title}.jpg",
          "${data[index].url}","2")`, [], function (result, fields) {
          res(true)
        })

      } else {
        res(false)
      }
      if (index >= data.length) {
        return
      } else {
        index++
        job()
      }
    })
  })
}

function saveImg(imageUrl, filename) {
  https.get(imageUrl, (response) => {
    if (createFolderIfNotExists('./images/')) return
    const fileStream = fs.createWriteStream('./images/' + filename + '.jpg');
    response.pipe(fileStream);
    fileStream.on("finish", () => {
      console.log(`File saved as ${filename}`);
    });
  }).on("error", (error) => {
    console.error(error.message);
  });
}



function createFolderIfNotExists(folderPath) {
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  } catch (err) {
    return true
  }
  return false
}
function stringDecodingFun(str) {
  if (!str) {
    return str
  }
  // str = str.replaceAll("&", "&amp;");
  // str = str.replaceAll("<", "&lt;");
  // str = str.replaceAll(">", "&gt;");
  // str = str.replaceAll(" ", "&nbsp;");
  str = str.replace(/\(/g, "&#40;");
  str = str.replace(/\)/g, "&#41;");
  str = str.replace(/\"/g, "&#34;");
  str = str.replace(/\'/g, "&#39;"); //IE暂不支持单引号的实体名称,而支持单引号的实体编号,故单引号转义成实体编号,其它字符转义成实体名称
  // str = str.replaceAll("\"", "&quot;"); //双引号也需要转义，所以加一个斜线对其进行转义
  // str = str.replaceAll("\n", "<br/>"); //不能把\n的过滤放在前面，因为还要对<和>过滤，这样就会导致<br/>失效了
  return str;
}
