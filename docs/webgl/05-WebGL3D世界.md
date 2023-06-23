## 一、3D 基础

### 1. 视点、目标点、上方向

- 视点：可以简易的理解为眼睛，也叫观察点
- 目标点：可以理解为我们要看的物体
- 上方向：正方向

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-04-19-01-24-image.png)

### 2. 观察平面

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-04-19-03-37-image.png)

### 3. 辅助函数

- 归一化函数，**归一化到0-1的区间内**

- 叉积，**求两个平面的法向量**

- 点积，**求某点在x ,y，z轴上的投影长度**

- 向量差，**获取视点到目标点之间的向量**

## 二、正射投影

### 1. 简介

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-05-17-52-15-image.png)

不管物体距离我们视点有多远，投影之后物体的大小和尺寸都是不变的

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-11-44-image.png)

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-12-18-image.png)

### 2. 推导过程

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-14-42-image.png)

### 1. 左右区间

注意: 使用 l 代替 left，使用 r 代替 right

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-23-15-image.png)

### 2. 上下区间

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-16-44-image.png)

### 3. 远近区间

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-17-26-image.png)

### 4. 得到正射投影矩阵

**由以上可得到正射投影的投影矩阵(也可以通过先转换原点坐标，然后平移得到矩阵)**

  ![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-25-06-image.png)

```js
        // 获取正射投影矩阵
        function getOrtho(l, r, t, b, n, f) {
            return new Float32Array([
                2 / (r - l), 0, 0, 0,
                0, 2 / (t - b), 0, 0,
                0, 0, -2 / (f - n), 0,
                -(r + l) / (r - l), -(t + b) / (t - b), -(f + n) / (f - n), 1
            ]);
        }
```

## 三、透视投影

### 1. 简介

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-38-40-image.png)

透视投影属于中心投影，近大远小，很好的反应物体的空间形象，立体有深度的物体

### 2. 推导过程

- 步骤一：把透视投影的棱台映射为长方体

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-45-38-image.png)

- 步骤二：坐标转换

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-49-24-image.png)

- 步骤三：求 x, y 坐标

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-50-58-image.png)

- 步骤四：求 x, y 坐标

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-52-03-image.png)

- 步骤五：代入正射投影矩阵

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-52-58-image.png)

- 步骤六：求上下左右边界

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-54-59-image.png)

- 步骤七：得到透视投影矩阵

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-06-19-56-04-image.png)



```js
    // 获取透视投影矩阵
    // fov 视角
    // aspect 宽高比

function getPerspective(fov, aspect, far, near) {
    fov = fov * Math.PI / 180;
      
    return new Float32Array([
        1 / (aspect * Math.tan(fov / 2)), 0, 0, 0,
        0, 1 / (Math.tan(fov / 2)), 0, 0,
        0, 0, -(far + near) / (far - near), -(2 * far * near) / (far - near),
        0, 0, -1, 0,
    ])
  }
```