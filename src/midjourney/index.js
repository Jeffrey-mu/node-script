import fs from 'fs'
import https from 'https';

let data = fs.readFileSync('./index.txt').toString()
const regex = /(?:src)\s*=\s*['"]?([^'"\s>]+)['"]?/g;
let img_array = data.match(regex).map(item => item.split('"')[1].split('?')[0])
let timestamp = `${+new Date()}/`
console.log(img_array)
img_array.forEach((item) => {
  saveImg(item)
})

function saveImg(imageUrl) {
  const filename = getFileName(imageUrl)
  https.get(imageUrl, (response) => {
    if (createFolderIfNotExists('./images/' + timestamp)) return
    const fileStream = fs.createWriteStream('./images/' + timestamp + filename);
    response.pipe(fileStream);
    fileStream.on("finish", () => {
      console.log(`File saved as ${filename}`);
    });
  }).on("error", (error) => {
    console.error(error.message);
  });
}

function getFileName(imageUrl) {
  return Math.random().toString() + imageUrl.split('/').at(-1)
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
