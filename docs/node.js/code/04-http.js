const http = require("http");
const fs = require("fs");
const url = require('url');
const sever = http.createServer();

sever.on("request", (request, response) => {
    const url_data = url.parse(request.url);
    console.log('-----', url_data);
  switch (request.url) {
    case "/":
    case "/index.hmtl":
      response.setHeader("Content-Type", "text/html;charset=utf-8");
      fs.readFile("./public/index.html", (err, data) => {
        if (err) throw err;

        console.log(data);
        response.end(data);
      });
      break;
    default:
      response.end("qita");
  }
});

sever.listen("8888", () => {
  console.log("服务启动成功");
});
