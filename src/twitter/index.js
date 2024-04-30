import fs from 'node:fs'
import axios from 'axios'

axios.get('https://twitter.com/vikingmute/status/1560447512561033217')
  .then((res) => {
    fs.writeFile('data.txt', JSON.stringify(res.data), 'utf8', (err) => {
      if (err)
        throw err
      else
        console.log('Data has been written to data.txt')
    })
  })
  .catch((error) => {
    console.error('Error fetching the Twitter status:', error)
  })
