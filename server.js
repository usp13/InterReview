const dns = require('node:dns');

dns.setServers([
    '8.8.8.8',
    '1.1.1.1'
]);

require("dotenv").config();

const app = require('./src/app');
const connecttoDB = require("./src/config/database");

connecttoDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});