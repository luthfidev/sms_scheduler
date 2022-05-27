const Bree = require('bree')
const bree = new Bree({
  jobs : [
    {
      name : 'get',
      cron : '*/1 * * * *'
      // timeout : '30s' //run the script after 30 seconds from the start
    }
  ]
})
bree.start()