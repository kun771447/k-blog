## 一、使用 varying 变量-绘制彩色三角形

```js
const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    varying vec4 vColor;

    void main() {
        vColor = aPosition;
        gl_Position = aPosition;
    }
`;

// gl_FragColor vec4(1.0,0.0,0.0,1.0) r, g, b, a
// 片元着色器
const FRAGMENT_SHADER_SOURCE = `
    precision lowp float;

    varying vec4 vColor;

    void main() {
        gl_FragColor = vColor;
    }
`;
```

varying 从顶点着色器向片元着色器传递数据

## 二、从顶点到图形-WebGL 渲染流程介绍

### 1. 整体流程

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-18-43-14-image.png)

### 2. 图元装配过程

- 将独立的**顶点坐标**装配成几何图形，**图形的类别由gl.drawArrays()第一个参数确定**

### 3. 光栅化

- 这一步是将装配好的**图形转换为片元**

### 4. 剔除

- 对于**不透明物体，背面**对于观察者来说是不可见的。那么在渲染过程中，就会将**不可见的部分剔除**，不参与绘制。**节省渲染开销**。

### 5. 裁剪

- 在**可视范围之外的事物**是看不到的。图形生成后，有的部分可能位于**可视范围之外**，这一部分会被剪裁掉，不参与绘制

### 渲染流程

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-19-01-06-image.png)

## 三、给图形添加背景图

### 1. 纹理坐标

- 纹理坐标也称为 **st坐标**。如下所示

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-19-07-57-image.png)

- 在 WebGL 里需要通过纹理坐标和图形顶点坐标的映射关系来确定贴图

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-19-13-16-image.png)

### 2. 创建纹理对象

- 纹理对象主要用于存储纹理图像数据

```js
const texture = gl.createTexture();
```

- 可以通过 gl.deleteTexture(texture) 来删除纹理对象

### 3.  进行 Y 轴旋转

```js
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
```

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-20-16-02-image.png)

### 4. 开启（激活）纹理单元

```js
gl.activeTexture(gl.TEXTURE0);
```

- Webgl 是通过纹理单元来管理纹理对象，每个纹理单元管理⼀张纹理图像。

### 5. 绑定纹理单元

```js
gl.bindTexture(type, texture)
```

- type 参数以下两种：
  
  - gl.TEXTURE_2D: 二维纹理
  
  - gl.TEXT_CUBE_MAP: 立方体纹理

- texture: 纹理对象

### 7. 处理放大缩小的逻辑

```js
gl.texParamteri(type, pname, param)
```

- type 参数以下两种：
  
  - gl.TEXTURE_2D: 二维纹理
  
  - gl.TEXT_CUBE_MAP: 立方体纹理

- pname 纹理参数有四个选项:
  
  - gl.TEXTURE_MAG_FILTER 放⼤
  
  - gl.TEXTURE_MIN_FILTER 缩⼩
  
  - gl.TEXTURE_WRAP_S 横向（⽔平填充） 
  
  - gl.TEXTURE_WRAP_T 纵向（垂直填充） 

- param
  
  - 赋值给 gl.TEXTURE_MAG_FILTER 和 gl.TEXTURE_MIN_FILTER 
    
    - gl.NEAREST 使用像素颜色值
    
    - gl.LINEAR 使用四周的加权平均值
  
  - 赋值给 gl.TEXTURE_WRAP_S 和 gl.TEXTURE_WRAP_T
    
    - gl.REPEAT 平铺重复
    
    - gl.MIRRORED_REPEAT 镜像对称
    
    - gl.CLAMP_TO_EDGE 边缘延伸

```js
// 处理放大缩小的逻辑
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

// 横向 纵向 平铺的方式
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
```

### 8. 配置纹理图像

```js
gl.texImage2D(type, level, internalformat, format,dataType, image);
```

- type 同上

- level 为 0 即可

- internalformat 图像的内部格式
  
  - gl.RGB
  
  - gl.RGBA
  
  - gl.ALPHA
  
  - gl.LUMINANCE 使用物体表面的红绿蓝 分量的加权平均值来计算
  
  - gl.LUMINANCE_ALPHA

- format 纹理的内部格式，必须和 internalformat 相同

- dataType 纹理数据的数据类型
  
  - gl.UNSIGNED_BYTE 
    
    - 无符号整型，每个颜色分量占据一个字节
  
  - gl.UNSIGNED_SHORT_5_6_5
    
    - r g b 分量，分别占据 5 字节，6 字节，5 字节
  
  - gl.UNSIGNED_SHORT_4_4_4_4 
    
    - r g b a 分量
  
  - gl.UNSIGNED_SHORT_5_5_5_1 

- image 图片对象

### vec4 texture2D(sampler2D sampler, vec2 coord）

- sampler 纹理单元编号 

- coord 纹理坐标

```js
const FRAGMENT_SHADER_SOURCE = `
    precision lowp float;
    uniform sampler2D uSampler;
    varying vec2 vTex;

    void main() {
        gl_FragColor = texture2D(uSampler, vTex);
    }
`;
```

### 流程

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-13-20-40-23-image.png)

### 代码示例

```js
const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;

    attribute vec4 aTex;

    varying vec2 vTex;

    void main() {
        gl_Position = aPosition;

        vTex = vec2(aTex.x, aTex.y);
    }
`;

// gl_FragColor vec4(1.0,0.0,0.0,1.0) r, g, b, a
// 片元着色器
const FRAGMENT_SHADER_SOURCE = `
    precision lowp float;
    uniform sampler2D uSampler;
    varying vec2 vTex;

    void main() {
        gl_FragColor = texture2D(uSampler, vTex);
    }
`;

const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);

const aPosition = gl.getAttribLocation(program, 'aPosition');
const aTex = gl.getAttribLocation(program, 'aTex');

const uSampler = gl.getUniformLocation(program, 'uSampler');

const points = new Float32Array([
    -0.5, 0.5, 0.0, 1.0,
    -0.5, -0.5, 0.0, 0.0,
    0.5, 0.5, 1.0, 1.0,
    0.5, -0.5, 1.0, 0.0,
]);

const buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

const BYTES = points.BYTES_PER_ELEMENT;

// 数据偏移
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, BYTES * 4, 0);
gl.enableVertexAttribArray(aPosition);

gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, BYTES * 4, BYTES * 2);
gl.enableVertexAttribArray(aTex);


gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);


const img = new Image();
img.src = '../assets/content.png';
img.onload = () => {
    // 创建纹理对象
    const texture = gl.createTexture();

    // 翻转图片 y 轴反转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    // 开启一个纹理单元
    gl.activeTexture(gl.TEXTURE0);

    // 绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // 处理放大缩小的逻辑
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    // 横向 纵向 平铺的方式
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // 配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);

    // 1i 是整形，1f 是浮点型
    gl.uniform1i(uSampler, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
```

**这里使用图片尽量使用 2 的整数次幂的图片，光栅化这个过程需要对采样进行快速取值，如果是 2 的整数次幂就可以实现快速取值**

## 四、使用多重纹理

```js
// 片元着色器
const FRAGMENT_SHADER_SOURCE = `
    precision lowp float;
    uniform sampler2D uSampler;
    uniform sampler2D uSampler2;
    varying vec2 vTex;

    void main() {
        vec4 c1 = texture2D(uSampler, vTex);
        vec4 c2 = texture2D(uSampler2, vTex);

        gl_FragColor = c1 * c2;
    }
`;
```

```js
 // 开启一个纹理单元
gl.activeTexture(gl[`TEXTURE${index}`]);

// 1i 是整形，1f 是浮点型
gl.uniform1i(sampler, index)
```

```js
const getImage = (src, sampler, index) => {
    return new Promise((res) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            // 创建纹理对象
            const texture = gl.createTexture();

            // 翻转图片 y 轴反转
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

            // 开启一个纹理单元
            gl.activeTexture(gl[`TEXTURE${index}`]);

            // 绑定纹理对象
            gl.bindTexture(gl.TEXTURE_2D, texture);

            // 处理放大缩小的逻辑
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            // 横向 纵向 平铺的方式
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            // 配置纹理图像
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);

            // 1i 是整形，1f 是浮点型
            gl.uniform1i(sampler, index);

            res();
        }
    });
}

Promise.all([getImage('../assets/border.png', uSampler, 0), getImage('../assets/content.png', uSampler2, 1)]).then(() => {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
});
```
