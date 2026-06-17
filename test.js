const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

dns.resolveSrv(
  '_mongodb._tcp.interview-gen-ai-cluste.ord707t.mongodb.net',
  (err, records) => {
    console.log(err);
    console.log(records);
  }
);