import axios from 'axios'

const options = {
  method: 'POST',
  url: 'https://api.cloudflare.com/client/v4/zones/b2d8fd4003a51c87743d14414058e696/dns_records',
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer eZfsmRCSx3wWyRDWwOiit0ipmRx1LblUIdBK_hHd' },
  data: {
    content: 'finance-jiafengfmc.oss-us-west-1.aliyuncs.com',
    name: 'finance1',
    proxied: false,
    type: 'CNAME',
    comment: 'Domain verification record',
    tags: ['owner:dns-team'],
    ttl: 3600,
  },
}

axios.request(options).then((response) => {
  console.log(response.data)
}).catch((error) => {
  console.error(error)
})
