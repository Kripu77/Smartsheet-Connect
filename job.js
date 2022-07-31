const cron = require('node-cron');
const{main} = require("./mailer")

cron.schedule("*/2 * * * *", main)