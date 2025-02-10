import fs from 'node:fs'

const data = fs.readFileSync('./README copy.md', 'utf-8')
let array = data.split('\n##')
array = array.map((item) => {
  const posts = item.split('\n')
  try {
    return {
      title: posts[0].replace('##', ''),
      contributed: {
        name: posts[1].replace('Contributed by: ', '').split('](')[0].slice(1),
        link: posts[1].replace('Contributed by: ', '').split('](')[1].slice(0, -1),
      },
      reference: {
        name: posts[2].replace('Reference: ', '').split('](')[0].slice(1),
        link: posts[2].replace('Contributed by: ', '').split('](')[1].slice(0, -1),
      },
      des: posts.slice(3).filter(Boolean).map(item => item.replace('> ', '').replace('<br/>', '')),
    }
  }
  catch (error) {
    return {}
  }
})

console.log(array[0])
