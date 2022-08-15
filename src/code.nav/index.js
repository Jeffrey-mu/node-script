import fetch from "node-fetch";
import fs from 'fs'
function add(title, description, img, url) {
  const body = `{
  \"title\":\"${title}\",\"description\":\"${description}\",\"img\":\"${img}\",\"url\":\"${url}\"}`
  fetch("http://localhost:3100/api/resource", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "zh,zh-CN;q=0.9,en;q=0.8",
      "authorization": "fakeToken1",
      "content-type": "application/json;charset=UTF-8",
      "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": body,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  });
}

let data = JSON.parse(fs.readFileSync("./json.json").toString())
const result = data.data.list
console.log(result);

result.map(el => {
  add(el.name, el.desc, el.icon, el.link)
})
