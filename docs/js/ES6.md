## 作用域

- 全局作用域

- 函数作用域

- 块级作用域

## Object.is

```js
Object.is(NaN, NaN)
```

## Proxy



```js
cosnt person = {
    name: 'zce',
    age: 20
}

const personProxy = new Proxy(person, {
    get (target, property) {
        return 'get';
    }
    set (target, property, value) {
        target[property] = value;
    }
})
```

- Object.defineProperty() 只能监听对象的读写

- Proxy 能够见识到更多对象操作



![](D:\系统默认\桌面\code\Project\k-blog\docs\public\js\2023-03-18-11-28-03-image.png)



## Reflect

- 统一的对象操作 API

- 属于一个静态类

- 统一提供一套用于操作对象的API



```js
const obj = { name: 'test' };


Reflect.get(obj, 'name');

Reflect.has(obj, 'name');
Reflect.delteProperty(obj, 'age');
Reflect.ownKeys(obj);
```



## Set

不允许有重复值

## Map

键可以用对象



## for...of

伪数组也可以遍历



```js
const m= new Map();

m.set('foo', "123');
m.set('bar', "345');

for (const [ key, value] of m) {
    console.log(item)
}
```



## 可迭代结构

为了给各种各样的数据结构提供统一遍历方式，ES2015 提供了 Iterable 接口



实现了 Iterable 接口 才能被 for...of 遍历



```js
// 迭代器 (Iterator)
const set = new Set([ 'foo', 'bar', 'baz'])
const iterator = set[Symbol.iterator]()

console.log(iterator.next())
```



## 实现可迭代接口



```js
const obj = {
     [Symbol.iterator]: function () {
        return {
            next: function () {
            return {
                value: 'zce',
                done: true
            }
        }    
}
```



```js
const obj = {
    store: [ 'foo', 'bar', 'baz'],
    [Symbol.iterator]: function () {
        let index = 0;
        const self = this;
        
        return {
            next : function () {
                const result = {
                    value: self.store[index],
                    done: index >= self.store.length
                }
                index++
                return result
            }
        }
    }
}

for (const item of obj) {
    console.log('循环体', item)
}
```



## Generator 生成器


```js
function * foo() {
    console.log('start');

    try {
        const res = yield 'foo';
        console.log(res);
    } catch (e) {
        console.log(e)
    }
}

const generator = foo();

const result = generator.next();
console.log(result);

// generator.next('bar'); // 传递参数，作为 yield 的返回值


generator.throw(new Error('Generator error'));
```


```js
const todos = {
    life: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '外语'],
    work: ['喝茶'],
    [Symbol.iterator]: function * () {
        const all = [ ... this.life, ...this.learn, ...this.work]
       
        for(const item of all) {
            yield item
        }
    }
}

for (const item of todos) {
    console.log(item)
}    
```

## ES 2016



```js
const arr = [1, 2, 3];

arr.includes(NaN);
```



```js
console.log(2 ** 10);
```



## ES 2017

```js
const obj = {name: 'test', age: 10 }


Object.values(obj)
Object.entries(obj)
```


