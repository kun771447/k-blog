const fs = require("fs");

// //内存占用 100%
// for(let i = 2; i < 20; i++) {
//     fs.readFile('./test.mp4', (err, data) => {
//         if(err) throw err;

//         fs.writeFile(`./test${i}.mp4`, data, () => {});
//     });
// }

// // 内存占用 30%
// for(let i = 2; i < 20; i++) {
//     const readStream = fs.createReadStream('./test.mp4');
//     const writeStream = fs.createWriteStream(`./test${i}.mp4`);

//     readStream.pipe(writeStream);
// }

// const readStream = fs.createReadStream("./test.txt");

// // 手动开启可读流
// readStream.resume();

// // 开启后没有及时接收，数据流失
// setTimeout(() => {
//   readStream.on("data", (chunk) => {
//     console.log("chunk", chunk); // 没有数据，不执行
//   });
// }, 1000);

// console.log(readStream._readableState.flowing, readStream._readableState.paused); // true false

const readStream = fs.createReadStream('./test.txt');

// once, 读取一部数据就停止
readStream.once('data', (chunk) => {
    readStream.pause();
});