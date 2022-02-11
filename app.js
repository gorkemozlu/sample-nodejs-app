const express = require('express')
const app = express()
const port = 3000
var os = require("os");
const fs = require('fs')

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
  console.log('request for "/" url: '+ process.env.var1+" "+process.env.MY_NODE_NAME+" "+process.env.MY_POD_NAME+" "+process.env.MY_POD_NAMESPACE+" "+process.env.MY_POD_SERVICE_ACCOUNT+" "+process.env.SECRET_USERNAME+" "+process.env.SECRET_PASSWORD+" "+uptime)
  res.send(`<p>Hello  ${process.env.var1} !</p><p>Node Name: ${process.env.MY_NODE_NAME}</p><p>Pod Name: ${process.env.MY_POD_NAME}</p><p>Namespace: ${process.env.MY_POD_NAMESPACE}</p><p>Service Account: ${process.env.MY_POD_SERVICE_ACCOUNT}</p><p>Username from Secret: ${process.env.SECRET_USERNAME}</p><p>Password from Secret: ${process.env.SECRET_PASSWORD}</p><p>Uptime: ${uptime}</p>`)
  
})

app.get('/cat', (req, res) => {
  var filePath='/appdir/file.txt'
  fs.readFile(`${filePath}`, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      fs.writeFile(`${filePath}`, '', function (err) {
        if (err) throw err;
        console.log('request for "/cat" url. Output is: '+"Empty file created. refresh page.")
      });
      res.send("Empty file created. refresh page.")
      return
    }
    var array = fs.readFileSync(`${filePath}`).toString().split("\n");
    console.log('request for "/cat" url. Output is: '+array)
    res.send(array)
  })

  
})

app.get('/add', (req, res) => {
  var filePath='/appdir/file.txt'
  let r = (Math.random() + 1).toString(36).substring(7);
  var strToAdd=req.query.id
  if(strToAdd){
    console.log(req.query.id)
    fs.appendFile(`${filePath}`, `${strToAdd}\n`, function (err) {
      if (err) {
        // append failed
      } else {
        // done
        console.log('request for "/add" url with ' +JSON.stringify(req.query)+' Output is: '+"ok")
        res.send("ok")
      }
    })
  }else{
    fs.appendFile(`${filePath}`, `${r}\n`, function (err) {
      if (err) {
        // append failed
      } else {
        // done
        console.log('request for "/add" url with ' +JSON.stringify(req.query)+' Output is: '+"ok")
        res.send("ok")
      }
    })
  }


  
})

app.get('/del', (req, res) => {
  var filePath='/appdir/file.txt'
  fs.unlinkSync(filePath);
  console.log('request for "/del" url. Output is: '+"ok")
  res.send("ok")
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
