
## 像素图与矢量图

- 像素图由一个个像素块组成

- 矢量图由多个数学公式绘制曲线组成

```js
<svg width="1000" height="600">
    <!-- 绘制矩形  -->
    <rect x="40" y="40" width="300" height="200"
        style="fill:orangered; stroke: pink; stroke-width: 4;"
    ></rect>
</svg>
```

```js
<!-- 绘制圆角矩形 -->
<rect x="40" y="40" rx="20" ry="20" height="200"
    style="fill:orangered; stroke: pink; stroke-width: 4;"
></rect>
```

```js
<!-- 绘制圆形 -->
<circle cx="200" cy="200" r="100" style="fill: darkblue"></circle>
```

```js
<!-- 椭圆 -->
<ellipse cx="200" cy="200" rx="80" ry="40" style="fill: seagreen"></ellipse>
```

```js
<!-- 绘制线条 -->
<line x1="100" y1="40" x2="500" y2="60" style="stroke: #333; stroke-width: 4;"></line> 
```

```js
<!-- 绘制多边形 -->
<polygon points="200, 40, 400, 50, 100, 20" 
            style="fill: lightblue; stroke-width: 2; stroke: red; "
            transform="translate(100, 100)" 
            ></polygon>
```