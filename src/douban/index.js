import xlsx from 'node-xlsx'
import csv from 'csv-parser'
import fs from 'fs'

function readMovies() {
  // excel文件类径
  const excelFilePath = './py/信息.xlsx'

  //解析excel, 获取到所有sheets
  const sheets = xlsx.parse(excelFilePath);

  // 查看页面数

  fs.writeFileSync('./json/movies.json', JSON.stringify(sheet.data.slice(1).map(item => ({ name: item[0], score: item[2], des: item[3], director: item[1] }))))

}
function readBooks() {

  const results = [];

  fs.createReadStream('./py/doupanbooktest02.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log();
      fs.writeFileSync('./json/books.json', JSON.stringify(results))
    });
}
// readBooks()
// readMovies()
