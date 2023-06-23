## 一、材质简介

### 1. 材质类型

#### 1.1 基础材质（不会对光源做出反应）

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\three.js\2023-05-07-17-22-37-image.png)

#### 1.2 高级材质（郎伯材质 和 phone材质 会对光源做出反应）

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\three.js\2023-05-07-17-23-24-image.png)

### 2. 属性分类

- 基础属性

- 高级属性

- 融合属性

#### 2.1 基础属性

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\three.js\2023-05-07-17-24-59-image.png)

#### 2.2 融合属性-决定物体如何与背景融合

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\three.js\2023-05-07-17-25-53-image.png)

#### 2.3 高级属性-控制底层 webgl 上下文如何渲染物体

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\three.js\2023-05-07-17-26-17-image.png)

## 二、基础材质

**不受光照影响**

### 1. 基础材质 MeshBasicMaterial

**属性介绍**

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\three.js\2023-05-07-17-37-03-image.png)

### 2. 深度材质 MeshDepthMaterial

不受光照影响, 不能设置颜色

物体到摄像机之间的距离，越远越暗

```js
//创建材质
const cubeMaterial = new THREE.MeshDepthMaterial();
```

### 3. 法向材质 MeshNormalMaterial

面的颜色只和面的法向量有关系

## 4. 面材质

```js
// 创建材质
const cubeMaterial = new THREE.MeshFaceMaterial([
    new THREE.MeshBasicMaterial({ color: 0x009e60 }),
    new THREE.MeshBasicMaterial({ color: 0x0051ba }),
    new THREE.MeshBasicMaterial({ color: 0xffd500 }),
    new THREE.NeshBasicMaterial({ color: 0xff5800 }),
    new THREE.MeshBasicMaterial({ color: 0xc41e3a }),
    new THREE.MeshBasicMaterial({ color: 0xffff00 }),
]);
```

## 三、高级材质

### 1. 朗伯材质

```js
// 创建材质
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
```

### 2. Phong 材质

```js
// 创建材质
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
```

### 3. 着色器材质

```js
//创建材质
const cubeMaterial = new THREE.ShaderMaterial({
    uniforms: {
        r: {
            type: 'f',
            value: 1.0,
        },
        a: {
            type: 'f',
            value: 1.0,
        },
    },

    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position，1.0);
        }
    `,

    fragment: `
        uniform float r;
        uniform float a;

        void main() {
            gl_FragColor = vec4(r,0.0,0.0,a);
        }
    `，
    transparent: true
});


```



### 4. 联合材质

```js
const lambert = new THREE.MeshLambertMaterial({ color:0xff0000 });
const basic = new THREE.MeshBasicMaterial({ wireframe: true });

const cube = THREE.Sceneutils.createMultiMaterial0bject(cubeGeometry,
[
    Flambert,
    basic
]);
```
