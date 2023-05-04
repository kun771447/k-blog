## 一、OpenGLES 语言基础

### 1. 语言基础

- 大小写敏感
- 强制分号

### 2. 程序入口

- 着色器通过 main 函数作为程序入口，且没有任何返回值

```js
void main() {}
```

### 3. 注释

- 单行注释 //

- 多行注释 /**/

### 4. 强类型语言

- 变量的使用和赋值必须是相同类型，需要时刻注意变量的类型

- 基本类型
  
  - float: 单精度浮点数
  
  - int: 整型
  
  - boolean: 布尔型

```js
float f = 10.0;
int i = 10;
bool b = true;
```

### 5. 变量声名

```js
// <类型> <变量名称>
float f;
```

- 数字字母下划线

- 不能是关键字或保留字

- 不能以数字开头

- 不能以 gl_、webgl_、\_webgl\_ 做为开头

### 6. 类型和类型转换

- int() 此方法将数据转换为整型

- float() 转为浮点型

- bool() 转为布尔类型

### 7. 运算符

```js
+    -    *    /
+=    -=    *=    /=
++    --
>    <    >=    <=
!=
==
!    &&    ||
^^ 异或
? : 三元操作符
```



## 二、矢量和矩阵

### 1. 矢量

- vec2、vec3、vec4 具有 2，3，4 个浮点数元素的矢量

- ivec2、ivec3、ivec4 具有 2，3，4 个整型元素的矢量

- bvec2、bvec3、bvec4 具有 2，3，4 个布尔值元素的矢量

### 2. 赋值

- 需要通过 **构造函数** 来进行赋值

```js
vec4 position = vec4(0.0, 0.0, 0.0, 1.0); // vec4 就是矢量的构造函数
```

### 3. 访问矢量里的分量

- 访问分量
  
  - x, y, z, w 访问顶点坐标的分量
  
  - s, t, p, q 访问纹理坐标分量

```js
vec4 position = vec4(0.1, 0.2, 0.3, 1.0);

position.x; // 0.1
position.y; // 0.2
position.z; // 0.3
```

- 也可以通过混合的方式获取多个值，获取到的是一个新的矢量

```js
vec4 position = vec4(0.1, 0.2, 0.3, 1.0);

position.xy; // vec2(0.1, 0.2)
position.yx; // vec2(0.2, 0.1)
position.zyx; // vec3(0.3, 0.2, 0.1)
```

### 4. 矩阵

- mat2、mat3、mat4，2 * 2，3 * 3，4 * 4 的浮点数元素矩阵

- 矩阵入参，**注意：矩阵参数是列主序的**

```js
mat4 m = mat4(
  1.0，5.0，9.0,13.0,
  2.0,，6.0，10.0，14.0,
  3.0，7.0，12.0，15.0,
  4.0，8.0，13.0，16.0,
);
```



## 三、纹理取样器

### 1. 取样器介绍

- 取样器有两种：**sampler2D 和 samplerCube**

- 只能声名为 uniform 变量

### 2. 声名

```webgl
// 声明二维纹理
uniform sampler2D uSampler;

// 立方体纹理
uniform samplerCube uSamplerCube;
```

### 3. 二维纹理使用

```js
const texture = gl.createTexture();

gl.pixelstorei(gl.UNPACK_FLIP_Y_WEBGL，1);

gl.activeTexture(gl.TEXTUREO);

gl.bindTexture(gl.TEXTURE_2D，texture);

gl.texParameteri(gl.TEXTURE_20， gl.TEXTURE_MAG_FILTER，gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D，g1.TEXTURE_MIN_FILTER，gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D，gl.TEXTURE_WRAP_S， gl.CLANP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D，gl.TEXTURE_WRAP_T， gl.CLAMP_TO_EDGE);

gl.texImage2D(gl.TEXTURE_2D，0，gl.RGB，gl.RGB，gl.UNSIGNED_BYTE，img);

gl.uniform1i(usampler，0);
```



### 4. 立方体纹理使用

```js
const cubeMap = gl.createTexture();

gl.activeTexture(gl.TEXTURE1);
g1.bindTexture(g1.TEXTURE_CUBE_MAP,cubeMap);
gl.pixelstorei(g1.UNPACK_FLIP_Y_WEBGL,true);

gl.texParameteri(gl.TEXTURE_CUBE_MAP,g1.TEXTURE_MA6_FILTER,g1.LINEAR);
gl.texParameteri(gl.TEXTURE_CUBE_MAP,g1.TEXTURE_MIN_FILTER,gl.LINEAR);

gl.texParameteri(g1.TEXTURE_CUBE_MAP, g1.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);;
gl.texParameteri(g1.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T,gl.CLANP_TO_EDGE);

gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z ,0,gl.RGB,g1.RGB,g1.UNSIGNED_BYTE，images[0]);
gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z ,0,gl.RGB,g1.RGB,g1.UNSIGNED_BYTE，images[1]);
gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X ,0,gl.RGB,gl.RGB,g1.UNSIGNED_BYTE，images[2]);
gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X ,0,gl.RGB,gl.RGB,g1.UNSIGNED_BYTE，images[3]);
gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y ,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE，images[4]);
gl.texImage2D(g1.TEXTURE_CUBE_MAP_NEGATIVE_Y ,0,gl.RGB,gl.RGB,g1.UNSIGNED_BYTE，images[5]);

gl.uniform1i(uSamplercube,1);

```



## 四、分支和循环

### 1. 分支逻辑

- **if () {}** 和 **if () {} else if () {} else {}**

### 2.循环语句

```js
for() {}

while() {}

do {} while() 
```

### 3. 跳出循环

- continue

- break

- discard
  
  - 只能再片元着色器中使用，表示放弃当前片元直接处理下一个片元



## 五、函数

```js
const VERTEX_SHADER_SOURCE =`
    uniform vec4 uPosition;
    // 只传递顶点数据
    attribute vec4 aPosition;
    float getFLoat(float x, int y) {
        return 10.0;
    }
    getFloat();
    void maino {
        gL_Position = aPosition; // vec4(0.0, 0.8, 0.0, 1.0);
        gl_Pointsize = 10.0;
    }
';

```

## 六、内置函数

GLSL ES里提供了较多的内置函数，可以直接使用

### 1. 角度函数

- radians 角度转弧度

- degress 弧度转角度

### 2. 三角函数

- sin 正弦

- cos 余弦

- tan 正切

- asin 反正弦

- acos 反余弦

- atan 反正切

### 3. 指数函数

- pow 次方

- exp 自然质数

- log 对数

- sqrt 开平方

- inversesqrt 开平方的倒数

### 4. 通用函数

- abs 绝对值

- min 最小值

- max 最大值

- mod 取余数

- sign 取符号

- floor 向下取整

- ceil 向上取整

- clamp 限定范围

- fract 获取小数部分

### 5. 几何函数

- length(x) 计算向量 x 的长度

- distance(x, y) 计算向量 xy 之间的距离

- dot(x, y) 计算向量 xy 的点积

- cross(x, y)计算向量 xy 的差积

- normalize(x) 返回方向同 x，长度为1的向量



## 七、存储限定词

### 1. const

- 声明一个常量，定义之后不能被改变

### 2. attribute

- **只能出现在顶点着色器**中，只能声明为**全局变量**，表示逐顶点信息。单个顶点的信息。

### 3. uniform

- 可**同时出现在 顶点着色器和片元着色器**中

- 只读类型，强调一致性

- 用来存储的是**影响所有顶点数据**。如变换矩阵

### 4. varying

- 从顶点着色器向片元着色器传递数据

### 5. 精度限定

- 作用是提升效率，消减内存开支

- 可以单独针对某个变量声明精度
  
  - ```js
    mediump float f;
    ```
  
  - 劣势：会出现精度歧义，也不利于后期维护

- 第二种方法：通过 precisioin 关键字来修改着色器的默认精度
  
  - ```js
    precision mediump float;
    ```



- 精度枚举
  
  - 高精度：highp
  
  - 中精度：mediump
  
  - 低精度：lowp



### 6. 什么时候使用精度限定

- 片元着色器中的 **float** 类型没有默认精度，所以如果需要在片元着色器中使用 **浮点型数据** 的时候，需要修改默认精度

