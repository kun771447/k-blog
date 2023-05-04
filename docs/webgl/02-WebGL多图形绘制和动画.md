## 一、缓冲区对象-绘制多个点

- **缓冲区对象**是WebGL系统中的一块**内存区域**，可以一次性地向缓冲区对象中**填充大量的顶点数据**，然后将这些数据保存在其中，供顶点着色器使用。

### 1. 创建顶点数据

```js
const points = new Float32Array([
    -0.5, -0.5,
    0.5, -0.5,
    0.0, 0.5
])
```

### 2. 类型化数组-Float32Array

- 在 webgl 中，需要处理大量的相同类型数据，所以引入类型化数组，这样程序就可以预知到数组中的数据类型，提高性能。

- Int8Array: 8位整型

- UInt8Array: 8位无符号整型

- Int16Array: 16位整型

- UInt16Array:16位无符号整型

- Int32Array:32位整型

- UInt32Array:32位无符号整型

- Float32Array:单精度32位浮点型

- Float64Array:双精度64位浮点型

### 3. 创建缓冲区对象

```js
const buffer = gl.createBuffer();
```

### 4. gl.bindBuffer(target, buffer)

- target: 可以是如下两种
  
  - gl.ARRAY_BUFFER：表示缓冲区存储的是顶点的数据
  
  - gl.ELEMEN_ARRAY_BUFFER: 表示缓冲区存储的是顶点的索引值

- buffer: 已经创建好的缓冲区对象

### 5. gl.bufferData(target, data, type)

- target：类型同 **gl.bindBuffer 中的 target**
  
  - gl.ARRAY_BUFFER：表示缓冲区存储的是顶点的数
  
  - gl.ELEMEN_ARRAY_BUFFER: 表示缓冲区存储的是顶点的索引值

- data: 写入缓冲区的顶点数据，如程序中的 points

- type: 表示如何使用缓冲区对象中的数据，分为以下几类
  
  - gl.STATIC_DRAW: 写入一次，多次绘制
  
  - gl.STREAM_DRAW: 写入一次，绘制若干次
  
  - gl.DYNAMIC_DRAW: 写入多次，绘制多次

### 6. gl.vertexAttribPointer(location, size, type, normalized, stride, offset)

- location: attribute 变量的存储位置

- size:指定每个顶点所使用数据的个数

- type: 指定数据格式

  - gl.UNSIGNED_SHORT: 无符号短整型

  - gl.INT: 整型

  - gl.UNSIGNED_INT: 无符号整型

- normalized: 表示是否将数据归一化到[0,1][-1,1]这个区间

- stride: 两个相邻顶点之间相隔的字节数

- offset: 数据偏移量

### 7. gl.enableVertexAttribArray(location)

- location: attribute 变量的存储地址

- gl.disableVertexAttribArray(aPosition); 使用此方法禁用这个变量 

### 8. 示例

```js
// 创建顶点数据
const points = new Float32Array([
    -0.5, -0.5,
    0.5, -0.5,
    0.0, 0.5
]);

// 创建缓冲区对象
const buffer = gl.createBuffer();

// 绑定缓冲区对象
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// 将数据写入缓冲区对象
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

// 将缓冲区对象分配给一个 attribute 变量
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

// 开启 attirbute 变量
gl.enableVertexAttribArray(aPosition);

// 类型，那个点开始，绘制几个点
gl.drawArrays(gl.POINTS, 0, 3);
```

### 9. 缓冲区使用流程

- 创建顶点数据

- 创建缓冲区对象

- 绑定缓冲区对象

- 将数据写入缓冲区对象

- 将缓冲区对象分配给一个 attribute 变量

- 开启 attirbute 变量

- 绘制

## 二、多缓冲区和数据偏移

### 1. 多缓冲区

```js
const size = new Float32Array([
   5.0,
   10.0,
   15.0
]);

const sizeBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
gl.bufferData(gl.ARRAY_BUFFER, size, gl.STATIC_DRAW);

gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPointSize);
```

### 2. 数据偏移

```js
const points = new Float32Array([
    -0.5, -0.5, 10.0,
    0.5, -0.5, 20.0,
    0.0, 0.5, 30.0
]);

const buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

const BYTES = points.BYTES_PER_ELEMENT;

// BYTES * 3 两个相邻顶点之间相隔的字节数
// 0 在偏移 0 个字节
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, BYTES * 3, 0);
gl.enableVertexAttribArray(aPosition);

gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, BYTES * 3, BYTES * 2);
gl.enableVertexAttribArray(aPointSize);
```

## 三、多种图形绘制

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-12-15-57-26-image.png)

## 四、图形操作-着色器

### 1. 图形平移

```js
const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    attribute float aPointSize;
    attribute float aTranslate;
    void main() {
        gl_Position = vec4(aPosition.x + aTranslate, aPosition.y, aPosition.z, 1.0);
        // 点的大小
        gl_PointSize = 10.0; // 浮点数
    }   
`;
```

```js
setInterval(() => {
    x += 0.01;

    if (x > 1) {
        x = -1;
    }

    gl.vertexAttrib1f(aTranslate, x);
    // 类型，那个点开始，绘制几个点
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}, 60);
```

### 2. 图形缩放

```js
const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    attribute float aPointSize;
    attribute float aScale;
    void main() {
        gl_Position = vec4(aPosition.x * aScale, aPosition.y, aPosition.z, 1.0);
        // 点的大小
        gl_PointSize = 10.0; // 浮点数
    }
`;
```

### 3. 图形旋转

```js
const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    attribute float aPointSize;
    attribute float deg;
    void main() {
        gl_Position.x = aPosition.x * cos(deg) - aPosition.y * sin(deg);
        gl_Position.y = aPosition.x * sin(deg) + aPosition.y * cos(deg);

        gl_Position.z = aPosition.z;
        gl_Position.w = aPosition.w;

        // 点的大小
        gl_PointSize = 10.0; // 浮点数
    }
`;
```

## 五、图形操作-矩阵

- 矩阵就是**纵横排列的数据表格(m行n列)**

- 作用是**把一个点转换到另一个点**



**行主序和列主序**



![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-09-54-52-image.png)



**在 WebGL 中矩阵就是采用列主序存储**



### 1. 平移矩阵

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-09-50-32-image.png)



![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-09-56-47-image.png)



![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-09-57-33-image.png)

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-09-57-58-image.png)





![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-09-59-46-image.png)

**在 WebGL 中矩阵就是采用列主序存储**



```js
const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    uniform mat4 mat;
    void main() {
        gl_Position = mat * aPosition;
        // 点的大小
        gl_PointSize = 10.0; // 浮点数
    }
`;
```



```js
const getScaleMatrix = (x = 0.0, y = 0.0, z = 0.0) => {
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        x, y, z, 1.0
    ])
}
```



```js
let x = 0.0;

const animate = () => {
    x += 0.01;

    if (x > 1.5) {
        x = 0.0;
    }

    const matrix = getScaleMatrix(x, x, x);
    gl.uniformMatrix4fv(mat, false, matrix);
    // 类型，那个点开始，绘制几个点
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(animate);
}

animate()
```



### gl.uniformMatrix4fv(location, transpose, array)



- location: 指定 uniform 变量的存储位置

- transpose: 在 webgl 中恒为 false

- array: 矩阵数组



### 2. 缩放矩阵

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-08-14-27-image.png)

#### 2.1 点 A 和 点 A' 之间的映射公式

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-08-15-57-image.png)

#### 2.3 得到缩放矩阵

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-08-21-40-image.png)

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-08-22-01-image.png)

### ![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-08-25-27-image.png)

```js
const getScaleMatrix = (x = 1, y = 1, z = 1) => {
    return new Float32Array([
        x, 0.0, 0.0, 0.0,
        0.0, y, 0.0, 0.0,
        0.0, 0.0, z, 0.0,
        0.0, 0.0, 0.0, 1
    ])
}
```



### 3. 旋转矩阵



![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-08-44-14-image.png)

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-09-23-12-image.png)

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-09-24-59-image.png)

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-09-26-49-image.png)

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-09-27-01-image.png)



![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-10-30-00-image.png)



```js
const getScaleMatrix = (deg) => {
    return new Float32Array([
        Math.cos(deg), Math.sin(deg), 0.0, 0.0,
        -Math.sin(deg), Math.cos(deg), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ])
}
```



## 六、矩阵复合-图形复合变换

```js
// 矩阵复合函数
const mixMatrix = (A, B) => {
  const result = new Float32Array(16);
  
  for (let i = 0; i < 4; i++) {
    result[i] = A[i] * B[0] +  A[i + 4] * B[1] + A[i + 8] * B[2] + A[i + 12] * B[3];
    result[i + 4] = A[i] * B[4] +  A[i + 4] * B[5] + A[i + 8] * B[6] + A[i + 12] * B[7];
    result[i + 8] = A[i] * B[8] +  A[i + 4] * B[9] + A[i + 8] * B[10] + A[i + 12] * B[11];
    result[i + 12] = A[i] * B[12] +  A[i + 4] * B[13] + A[i + 8] * B[14] + A[i + 12] * B[15];
  } 

  return result;
}
```