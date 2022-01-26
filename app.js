const express = require('express')
const app = express()
const port = 3000
var os = require("os");

app.get('/', (req, res) => {
  //res.send('Hello World! ' + process.env.DB_HOST)
  function format(seconds){
    function pad(s){
      return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60*60));
    var minutes = Math.floor(seconds % (60*60) / 60);
    var seconds = Math.floor(seconds % 60);
  
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }
  var hostname = os.hostname();

  var uptime = process.uptime();
  //console.log(format(uptime));
  //console.log(hostname)
  res.send(`<p>Hello  ${process.env.var1} !</p><p>Node Name: ${process.env.MY_NODE_NAME}</p><p>Pod Name: ${process.env.MY_POD_NAME}</p><p>Namespace: ${process.env.MY_POD_NAMESPACE}</p><p>Service Account: ${process.env.MY_POD_SERVICE_ACCOUNT}</p><p>Username from Secret: ${process.env.SECRET_USERNAME}</p><p>Password from Secret: ${process.env.SECRET_PASSWORD}</p><p>Uptime: ${uptime}</p>`)
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
