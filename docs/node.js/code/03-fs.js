const fs = require("fs");

// 同步写入
fs.writeFileSync("./test.txt", "writeFileSync");

// 同步读取
const readSyncRes = fs.readFileSync("./test.txt", "utf-8");

console.log("readSyncRes", readSyncRes);

// 异步写入
fs.writeFile("./test.txt", "writeFile", (err) => {
  if (err) throw err;
  // 异步读取

  fs.readFile("./test.txt", "utf-8", (err, readRes) => {
    console.log("readRes", readRes);
  });
});

// 创建目录
fs.mkdirSync("./new");

// 读取目录
const dir = fs.readdirSync("./new");
console.log("readdir", dir);

// 判断文件是不是文件夹
fs.stat("./new", (err, stat) => {
  console.log("isDir", stat.isDirectory());
  console.log("isFile", stat.isFile());
});
