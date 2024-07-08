const b1 = Buffer.from('a');

console.log(b1);


const buf = Buffer.from('Hello World', 'utf-8');
console.log(buf.toString('hex'));
console.log(buf.toString('UTF-8', 0, 2));