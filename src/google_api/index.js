import axios from 'axios';
import fs from 'fs';
const response = await axios('http://127.0.0.1:9081/api?action=dataexport&pubid=all&time=2023-03-01&timestamp=1677728745&userid=A0247&sign=7cfe94a677ae842b56c549049c800f3c289769daea2525e323877f2f04b48cdb78ba08602a68292c1245ed0d3c5730e184c359735cb76417c808fa2004ae4463689903f301dadf91c6e3b145f732f57b8d6c7d3f86a1d84033299fa57d44f7cf7b6a55542bcf9ad4d1ac6c7491e19012de1b2063dce765f0d15384776e5e971b');
// const data = response.data;
console.log(response.data);
// let c = 0
// let b = 0
// a.result.forEach(el => {
//   c += +el['匹配的广告请求数']
//   b += +el['广告请求']
// })
// console.log(c, b)
