import ollama from 'ollama'

const startTime = +new Date()
const response = await ollama.chat({
  model: 'deepseek-r1:latest',
  messages: [{ role: 'user', content: 'Why is the sky blue?' }],
})
console.log(response)
console.log(response.message.content)
console.log(response.message.content.length)
console.log((+new Date() - startTime) / 1000 / 60)
