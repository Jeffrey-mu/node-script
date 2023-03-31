import axios from 'axios';
import { OPEN_API_KEY } from '../config/index'

/**
 * 根域名
 */
// export const baseUrl = 'https://chatgpt-api.shn.hk/v1/';
export const baseUrl = 'https://near-bat-81.deno.dev';
let path = '/v1/chat/completions'
let start = +new Date
let data = await axios({
  url: `${baseUrl}${path}`,
  method: 'POST',
  responseType: 'text',
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${OPEN_API_KEY}`,
  },
  data: {
    model: 'gpt-3.5-turbo',
    // max_tokens: 350,
    // temperature: 0.5,
    messages: [
      {
        "role": 'user',
        "content": "李白诗歌"
      },
    ]
  }
})
// let result = JSON.parse(data.data).choices[0].message.content
console.log((+ new Date - start) / 1000 + 's')
console.log(data)
// console.log(result.split('\n'))
