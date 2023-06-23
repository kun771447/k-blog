## 一、光是如何使用的

### 1. 点光源

- **点光源光线**：一个点向周围发出的光，如灯泡、火焰等

- 定义一个点光源光需要光源的位置、光线方向以及颜色

- 定义一个点光源光需要光源的位置、光线方向以及颜色

### 2. 平行光

- **平行光**： 可以看成是无线远处的光源发出的光，如太阳光

- 因为离光源的位置特别远，所以到达被照物体时可以认为光线是平行的

- 只需要**光照方向和光照颜色**

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-04-20-15-22-image.png)

### 3. 环境光

- **环境光**：也就是间接光，是指光源发出后，经过其他物体各种发射然后照到物体表面上的光线

- 环境光的强度差距非常小，没有必要精确计算光线强度

- 环境光是均匀照射到物体表面的，只需要定义**光照颜色**

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-04-20-18-04-image.png)

### 4. 环境反射

- **环境反射**: 环境反射是针对环境光而言的，在环境反射中，环境光照射物体是各方面均匀、强度相等的，反射的方向就是入射光的反方向。

- 最终物体的颜色只跟**入射光颜色和基底色**有关。

- **<环境反射光颜色>=<入射光颜色>*<表面基底色>**

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-04-20-20-06-image.png)

### 5. 漫反射

- 在现实中大多数物体表面都是粗糙的

- 漫反射中反射光的颜色除了取决于**入射光的颜色、表面的基底色，还有入射光与物体表面的法向量形成的入射角。**

- 令入射角为α，漫反射光的颜色可以根据下式计算∶

- **<漫反射光颜色> = <入射光颜色> * <表面基底色> * cosa**

- 入射角α可以通过光线方向和法线方向的点积来计算∶

- **<光线方向> * <法线方向> = cosa**

- **<漫反射光颜色> = <入射光颜色> * <表面基底色> * (<光线方向> * <法线方向>)**

<img src="file:///D:/系统默认/桌面/code/Project/k-blog/docs/public/webgl/2023-05-04-20-21-40-image.png" title="" alt="" data-align="left">

### 6. 反射类型

- “**光线方向**”指的是**入射方向的反方向**，即从入射点指向光源方向

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\webgl\2023-05-04-20-28-07-image.png)

- 当漫反射和环境反射同时存在时，将两者加起来，就会得到物体最终被观察到的颜色∶

- **<表面的反射光颜色>=<漫反射光颜色>+<环境反射光颜色>**

## 二、给场景添加光源

```js
    // 创建着色器源码
    const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    attribute vec4 aNormal;
    varying vec4 vColor;

    uniform mat4 mat;
    void main() {
        // 定义点光源的颜色
        vec3 uPointLightColor = vec3(1.0,1.0,0.0);

        // 点光源的位置
        vec3 uPointLightPosition = vec3(-5.0,6.0,10.0);

        // 环境光
        vec3 uAmbientLightColor = vec3(0.2,0.2,0.2);

        // 物体表面的颜色
        vec4 aColor = vec4(1.0,0.0,0.0,1.0);

        // 顶点的世界坐标
        vec4 vertexPosition = mat * aPosition;

        // 点光源的方向
        vec3 lightDirection = normalize(uPointLightPosition - vec3(vertexPosition));

        // 环境反射
        vec3 ambient = uAmbientLightColor * vec3(aColor);

        // 计算入射角 光线方向和法线方向的点积
        float dotDeg = dot(lightDirection, vec3(aNormal));

        // 漫反射光的颜色
        vec3 diffuseColor = uPointLightColor * vec3(aColor) * dotDeg;

        gl_Position = vertexPosition;
        vColor = vec4(ambient + diffuseColor, aColor.a);
    }
  `; // 顶点着色器
```