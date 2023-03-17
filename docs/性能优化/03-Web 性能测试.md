# Web 性能测试

- 不要通过单一指标就能衡量网站的性能体验

- 不要一次检测就能得到网站性能表现的客观结果

- 不要仅在开发环境中模拟进行性能检测

## 常见的检测工具

- Lighthouse

- WebPageTest

- 浏览器DevTools
  
  - 浏览器任务管理器
  
  - Network 面板
  
  - Coverage 面板
  
  - Memory 面板
  
  - Performance 面板
  
  - Performance monitor 面板

- 性能监控API

- 持续的性能监控方案

## LightHouse

Lighthouse是一个由Google开发并开源的 Web 性能测试工具，用于改进网络应用的质量。您可以将其作为一个 Chrome扩展程序运行，或从命令行运行。您为Lighthouse提供一个您要审查的网址，它将针对此页面运行一连串的测试，然后生成一个有关页面性能的报告。


- 优化网站案例
  
  - https://developer.chrome.com/docs/devtools/speed/get-started/

## WebPapeTest

## Chrome DevTools

### 浏览器任务管理器

通过Chrome 任务管理器我们可以查看当前Chrome浏览器中，所有进程关于GPU、网络和内存空间的使用情况，这些进程包括当前打开的各个页签，安装的各种扩展插件，以及GPU、网络、渲染等浏览器的默认进程，通过监控这些数据，我们可以在有异于其他进程的大幅开销出现时，去定位到可能存在内存泄漏或网络资源加载异常的问题进程。

### Network 网络分析

Network面板是Chrome开发者工具中一个经常会被用到的工具面板，通过它可
网站所有资源的请求情况，包括加载时间、尺寸大小、优先级设置及 HTTP缓存信息，从而帮助我们发现可能由于未进行有效压缩而导致资源尺寸过大的问题，配置缓存策略导致二次请求加载时间过长的问题等。

#### 网络请求阻止

- 打开方式：Ctrl + Shift + P -> Show Network Request Blocking

- 启用网络请求阻止

- 添加阻止规则

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\性能优化\2023-03-06-15-05-16-image.png)

### Coverage 面板 (代码执行情况)

- 打开方式：Ctrl + Shift + P -> coverage(覆盖)



我们可以通过 Coverage 面板监控并统计出网站应用运行过程中代码执行的覆盖该面板统计的对象是 JavaScript 脚本文件与 CSS 样式表文件，统计结果王要包护件的字节大小、执行过程中已覆盖的代码字节数，以及可视化的覆盖率条形图。



根据执行结果我们能够发现，在启动录制的过程中到底有哪些尺寸较大的代码文1
率较低，这就意味着有些代码文件中可能存在较多的无用代码，更准确地说是暂[
代码。这些信息对性能优化来说是非常有用的，开发者可以据此将执行覆盖率较1
件进行拆分，将首屏渲染阶段暂时不会执行到的代码部分单独打包，仅在需要的E
载。



### Memory 面板 (内存使用情况)

前端主要使用JavaScript代码来处理业务逻辑，所以保证代码在执行过程中内存销对用户的性能体验来说尤为重要，如果出现内存泄漏，那么就可能会带来网站崩溃的后果。


为了更细致和准确地监控网站应用当前的内存使用情况，Chrome浏览器开发者.Memory面板，通过它可以快速生成当前的堆内存快照，或者查看内存随时间的情况。据此我们可以查看并发现可能出现内存泄漏的环节，下图是使用Memory 面内存使用快照的情况。



```html
<body>

<h1>内存泄漏分析示例</h1><div id="app">
<button id="run">运行</button><button id="stop">停止</ button></div>

<script>
    const arr =[];

    for (let i = 0; i < 200000; i++){
        arr.push(i);
    }

    let newArr = [];

    function run(){
        newArr = newArr.concat(arr);
    }
    
    let clearRun;
    
    document.querySelector('#run').onclick = function () {
        clearRun = setInterval(() => {
            run();
        }，1000)
    }
    document.querySelector('#stop').onclick = function () {
        clearInterval(clearRun)
    }
</script>
    
</body>

```

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\性能优化\2023-03-06-15-22-33-image.png)

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\性能优化\2023-03-06-15-21-56-image.png)

### Performance 面板

使用Performance面板主要对网站应用的运行时性能表现进行检测与分析，其可检测的内容不仅包括页面的每秒帧数（FPS)、CPU的消耗情况和各种请求的时间花费，还能查看页面在前 1ms 与后 1ms 之间网络任务的执行情况等内容。



测试示例：

https://googlechrome.github.io/devtools-samples/jank/



### FPS 监视器和性能监视器

**FPS 监视器**

1、选择Control+Shift+P (Windows、Linux)或Command +Shift+P(macOS)3单。
公
2、在命令菜单中开始键入Rendering，然后选择显示渲染.
3、在呈现工具中，打开FPS 指示器。新的叠加层将显示在视线的右上角。



**Performance monitor**

![](D:\系统默认\桌面\code\Project\k-blog\docs\public\性能优化\2023-03-06-15-44-33-image.png)
