import fetch from "node-fetch";
const json = []
function add({ name, url, description }) {
  const params = `name=${name}&url=${url}&description=${description}`;
  return fetch("http://localhost:3100/api/project?" + params, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "zh,zh-CN;q=0.9,en;q=0.8",
      "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site"
    },
    "referrer": "http://localhost:3000/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "PUT",
    "mode": "cors",
    "credentials": "omit"
  });;
}
json.map(el => {
  add({
    name: el.name,
    url: el.url,
    description: el.description,
  }).then(res => {
    console.log(res);
  })
})
