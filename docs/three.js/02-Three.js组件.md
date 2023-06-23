## 一、Scene

### 1. 创建

```js
const scene = new THREE.Scene();
```

### 2. 方法

- add
  - 像场景中添加对象
- getObjectByName
  - 创建对象时可以赋值一个唯一 name, 通过此方法可以获取该对象
- remove
  - 从场景移除一个对象
- children
  - 返回场景中所有对象的列表
- fog
  - 设置场景中的雾化效果
- overrideMaterial
  - 强制场景中所有对象使用相同材质

```js
scene.add(sphere);

sphere.name = 'sphere';

console.log(scene.getObjectByName('sphere').scale.set(2, 2, 2));

// 从场景移除一个对象
scene.remove(sphere);

// 返回场景中所有对象的列表
console.log(scene.children);

// 强制场景中所有对象使用相同材质
scene.overrideMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
```

## 二、几何体

### 1. 创建

```js
//创建几何体对象
const sphereGeometry = new THREE.SphereGeometry(1，20，20);

//创建几何体材质
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 })

// 生成几何体
const sphere = new THREE.Mesh(sphereGeometry，sphereMaterial);

//添加到场景中
scene.add( sphere) ;
```

### 2. 方法

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\three.js\2023-05-07-11-49-09-image.png)



### 3. 赋值

- 直接赋值

```js
sphere.position = new THREE.Vector3(0,0,0);
sphere.rotation = new THREE.Vector3(0.5 * Math.PI,0,0);
sphere.scale = new THREE.Vector3(2,0,0);
```

- 单个赋值

```js
sphere.position.x = 0;
sphere.rotation.x = 0.5 *Math.PI;
sphere.scale.x = 2;
```

- 通过方法赋值

```js
sphere.position.set(0,0,0);
sphere.rotation.set(0.5 *Math.PI,0,0);
sphere.scale.set(2,0,0);
```



## 三、正射投影相机



- new THREE.OrthographicCamera(left,  right, top, bottom, near, far);
  
  - left 左边界
  
  - right 右边界
  
  - top 上边界
  
  - bottom 下边界
  
  - near 近面
  
  - far 远面



```js
const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 1000);
```

### 四、透视投影相机

- new THREE.PerspectiveCamera(fov, aspect, near, far)
  
  - fov 视场(视角)
  
  - aspect 宽高比
  
  - near 近面
  
  - far 远面

```js
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
```