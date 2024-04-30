import Cloudflare from 'cloudflare';
import config from './config';
const cloudflare = new Cloudflare(config[0]);


async function main() {
  const zone = await cloudflare.zones.create();
}

cloudflare.dns.
  main()
