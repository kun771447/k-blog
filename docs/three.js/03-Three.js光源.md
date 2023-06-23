## 一、光源类型

### 1. 基础光源

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\three.js\2023-05-07-15-59-17-image.png)

### 2. 特殊光源

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\three.js\2023-05-07-15-59-56-image.png)

### 3. 光源特殊效果

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\three.js\2023-05-07-16-01-15-image.png)



## 二、聚光灯光源

- 锥形效果，可以参考手电筒、路灯等光源（需要设置光源位置）

- 可以生成阴影

### 1. 使用方式

- new THREE.SpotLight(color , intensity , distance , angle ,exponent)

- 参数定义

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\three.js\2023-05-07-16-04-23-image.png)

## 三、环境光

- 不需要设置位置，对整个场景内的对象都生效

- 没有特定的来源，也不会影响阴影的形成

- 不能作为场景内的唯一光源，需要配合其他光源使用

- 用来减弱阴影，或者给物体添加一些颜色



```js
const ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);
```



## 四、点光源

- 单点发光，照射所有方向的光源。（需要设置光源位置)

- 不会生成阴影

### 1. 使用方式

```js
new THREE.PointLight(color, intensity, distance);
```

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\three.js\2023-05-07-16-48-00-image.png)



## 五、平行光

- 平行光也可以成为太阳光

- 会生成阴影



```js
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(-10, 10, 90);
scene.add(directionalLight);
```

```js
directionalLight.shadowCameraLeft = -50;
directionalLight.shadowCameraRight = 50;
directionalLight.shadowCameraTop = 50;
directionalLight.shadowCameraBottom = -50;
directionalLight.shadowCameraNear = 2;
directionalLight.shadowCameraFar = 200;
```

```js
directionalLight.shadowMapWidth = 4096;
directionalLight.shadowMapHeight = 4096;
```



## 六、半球光

- 模拟室外自然光照

- 不会生成阴影



```js
// 天空颜色，周围颜色，光照强度
const hemiLight = new THREE.HemisphereLight(Oxff00ff，0x00ff00，1);

hemilight.position.set(50，20，40);
scene.add(hemiLight);
```
