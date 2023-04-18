## 一、canvas 画布

- canvas 是 HTML5 新增的一个 DOM 元素
- 用途：显示 **二维** 和 **三维** 的图像
- 绘制：
  - 二维图形**可以使用(Canvas 或 WebGL)**
  - 三维图形**使用 WebGL**

## 二、了解 Webgl

### 1. 什么是 webgl

- webgl 是一种 **3D 绘图协议**，衍生于 OpenGL ES2.0, 可以结合 Html5 和 JavaScript 在 **网页**上**绘制**和**渲染**二/三维图形

### 2. webgl 的优势

- **内嵌在浏览器中，不需要安装任何插件**即可运行

- 只需要一个**文本编辑器和浏览器**，就可以辨析三维图形

## 三、webgl 入门

```js
<canvas id="canvas"></canvas>
    <script>
        const ctx = document.getElementById('canvas');

        const gl = ctx.getContext('webgl');

        gl.clearColor(1.0, 0, 0, 1.0); // red 1.0 green 0.0 blue 0.0 alpha 1.0
        gl.clear(gl.COLOR_BUFFER_BIT);
    </script>
```

- gl.clearColor(r, g, b, a)

- gl.clear(buffer) 清空 canvas 参数分为三项
  
  - gl.COLOR_BUFFER_BIT 清空颜色缓存
  
  - gl.DEPTH_BUFFER_BIT 清空深度缓冲区
  
  - gl.STENCIL_BUFFER_BIT 清空模板缓冲区

- gl.clear(gl.COLOR_BUFFER_BIT) 和 gl.clearColor(1.0, 0.0, 0.0, 1.0)

- gl.clear(gl.DEPTH_BUFFER_BIT) 和 gl.clearDepth(1.0)

- gl.clear(gl.STENCIL_BUFFER_BIT) 和 gl.clearStencil(0)

## 四、绘制一个点

### 1. 什么是着色器

- **着色器**就是**让开发者自己去编写一段程序**，用来代替固定渲染管线，来处理图像的渲染

- js 读取相关着色器信息，传递给 webgl 并进行使用

**顶点着色器**

- 用来描述顶点特性，通过计算获取位置信息

- 顶点是指二维三维空间中的一个点，可以理解为一个个坐标

**片元着色器**

- 进行逐片元处理程序，通过计算获取颜色信息

- 片元可以理解为一个个像素

### 2.  绘制流程

- 获取 canvas

- 获取 webgl 上下文

- 初始化顶点着色器源程序

- 初始化片元着色器源程序

- 创建顶点着色器

- 创建片元着色器

- 关联着色器和着色器源码

- 编译着色器

- 创建 program

- 关联着色器 和 program

- 使用 program 

```js
function initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE) {
    // 创建着色器
    const vertexShader = gl.createShader(gl.VERTEX_SHADER_SOURCE);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER_SOURCE);

    // 指定顶点着色器diamagnetic
    gl.shaderSource(vertexShader, VERTEX_SHADER_SOURCE);

    // 指定片元着色器的源码
    gl.shaderSource(fragmentShader, FRAGMENT_SHADER_SOURCE);

    // 编译着色器
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // 创建一个程序对象
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
}
```

```js
const ctx = document.getElementById('canvas');

const gl = ctx.getContext('webgl');

// 着色器
// 创建着色器源码
// 顶点着色器
//  gl_Position vec4(0.0,0.0,0.0,1.0)  x, y, z, w齐次坐标 (x/w, y/w, z/w)
const VERTEX_SHADER_SOURCE = `
    // 必须要存在 main 函数
    void main() {
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        // 点的大小
        gl_PointSize = 10.0; // 浮点数
    }
`;

// gl_FragColor vec4(1.0,0.0,0.0,1.0) r, g, b, a
// 片元着色器
const FRAGMENT_SHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;
```

## 五、webgl 三维坐标系

- 绘图区域
  
  ![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-11-21-35-34-image.png)

- 右手坐标系
  
  ![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-04-11-21-33-24-image.png)

## 六、使用 attribute 变量，水平移动的点

### 1. 变量声名

```js
存储限定符  类型     变量名 (分号!)
attribute  vec4    aPosition;
```

- attribute 变量只能在顶点着色器中使用，不能再片元着色器中使用

### 2. 获取 attribute 变量

```js
const aPosition = gl.getAttribLocation(program, 'aPosition');
```



**gl.getAttribLocation(program, 'aPosition')**

- program: 包含顶点和片元着色器的程序对象

- name: 指定想要获取存储地址的 attribute 变量的名称

- 返回变量的存储地址

### 3. 修改 attribute 变量

**gl.vertexAttrib4f(location, v1, v2, v3, v4)**

- location: 指定 attribute 变量的地址

- v1: 第一个分量的值

- v2: 第二个分量的值

- v3: 第三个分量的值

- v4: 第四个分量的值



**同族函数**

- gl.vertexAttrib1f(location, v1)

- gl.vertexAttrib2f(location, v1, v2)

- gl.vertexAttrib3f(aPosition, v1, v2, v3)

- gl.vertexAttrib4f(aPosition, v1, v2, v3, v4)

## 七、通过鼠标控制绘制

```js
        ctx.onclick = (ev) => {
            const x = ev.clientX;
            const y = ev.clientY;

            const domPosition = ev.target.getBoundingClientRect();

            const domX = x - domPosition.left;
            const domY = y - domPosition.top;

            /**
             *  0   200   400
             * -1    0     1
             * -200  0    200
             * 需要先 -200 （当前画布的宽度）再除以 200
             */
            const halfWidth = ctx.offsetWidth / 2;
            const halfHeight = ctx.offsetHeight / 2;

            const clickX = (domX - halfWidth) / halfWidth;
            const clickY = (halfHeight - domY) / halfHeight;

            gl.vertexAttrib2f(aPosition, clickX, clickY);

            gl.drawArrays(gl.POINTS, 0, 1);
        }
```

## 八、使用 uniform，绘制不同颜色的点

### 1. 声名 uniform 变量

- 片元着色器需要指定精度，顶点着色器默认指定了精度
  
  - 高精度：highp
  
  - 中精度：mediump
  
  - 低精度：lowp

```js
// 指定精度
precision mediump float;
uniform vec4 uColor;
```

### 2. 获取 uniform 变量

```js
const uColor = gl.getUniformLocation(program, 'uColor');
```

- program: 包含顶点和片元着色器的程序对象

- name: 指定想要获取存储地址的 attribute 变量的名称

- 返回变量的存储地址

### 3. 修改 uniform 变量

**gl.uniform4f(location, v1, v2, v3, v4)**

- location: 指定 attribute 变量的地址

- v1: 第一个分量的值

- v2: 第二个分量的值

- v3: 第三个分量的值

- v4: 第四个分量的值



**同族函数**

- gl.uniform1f(location, v1)

- gl.uniform2f(location, v1, v2)

- gl.uniform3f(aPosition, v1, v2, v3)

- gl.uniform4f(aPosition, v1, v2, v3, v4)




### 4. 示例

```js
const FRAGMENT_SHADER_SOURCE = `
    precision mediump float;
    uniform vec3 uColor;
    void main() {
        gl_FragColor = vec4(uColor.r, uColor.g, uColor.b, 1.0);
    }
`;

const uColor = gl.getUniformLocation(program, 'uColor');
gl.uniform3f(uColor, 1.0, 0.0, 0.0);
```

```js
const FRAGMENT_SHADER_SOURCE = `
    precision mediump float;
    uniform float uColor;
    void main() {
        gl_FragColor = vec4(uColor, 0.0, 0.0, 1.0);
    }
`;

const uColor = gl.getUniformLocation(program, 'uColor');
gl.uniform1f(uColor, 1.0);
```
