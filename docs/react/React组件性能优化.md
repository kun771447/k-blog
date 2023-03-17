# React 组件性能优化最佳实践

## 1. 组件卸载前执行清理操作

在组件中为window注册的全局事件,以及定时器,在组件卸载前要清理掉,防止组件卸载后继续执行影响应用性能.需求︰开启定时器然后卸载组件，查看组件中的定时器是否还在运行。

## 2. PureComponent

1.什么是纯组件
 纯组件会对组件输入数据进行浅层比较，如果当前输入数据和上次输入数据相同，组件不会重新渲染。

2.什么是浅层比较
比较引用数据类型在内存中的引用地址是否相同，比较基本数据类型的值是否相同。

3.如何实现纯组件
类组件继承PureComponent类，函数组件使用memo方法

4.为什么不直接进行dif 操作,而是要先进行浅层比较，浅层比较难道没有性能消耗吗
和进行 diff 比较操作相比，浅层比较将消耗更少的性能。dif 操作会重新遍历整颗virtualDOM树,而浅层比较只操作当前组件的 state和props。

5.需求∶在状态对象中存储name值为张三，组件挂载完成后将name属性的值再次更改为张三，然后分别将name 传递给纯组件和非纯组件，
查看结果。



## 3. shouldComponentUpdate



纯组件只能进行浅层比较，要进行深层比较，使用shouldComponentUpdate，它用于编写自定义比较逻辑。

返回true重新渲染组件，返回false 阻止重新渲染。

函数的第一个参数为nextProps,第二个参数为nextState.

需求:在页面中展示员工信息,员工信息包括;姓名,年龄;职位.但是在页面中只想展示姓名和年龄.也就是说只有姓名和年龄发生变化时才有必要重新渲染组件,如果员工的其他信息发生了变化没必要重新渲染组件.

## 4.React.memo

1.memo基本使用

将函数组件变为纯组件，将当前 props和上一次的props进行浅层比较，如果相同就阻止组件重新渲染。
需求∶父组件维护两个状态，index和name，开启定时器让 index 不断发生变化，name 传递给子组件，查看父组件更新子组件是否也更新了。



2.memo 传递比较逻辑

使用memo方法自定义比较逻辑，用于执行深层比较。
比较函数的第一个参数为上一次的props,比较函数的第二个参数为下一次的 props,比较函数返回true,不进行渲染,比较函数返回false,组件重新渲染.

```js
const compare = (prevProps, nextProps) => {
    if (prevProps.name !== nextProps.name) {
        return false
    }
    return true;
}


memo(() => {
    return 'hello';
}, compare)
```

## 5. 使用组件懒加载

使用组件懒加载可以减少bundle文件大小,加快组件呈递速度.
1．路由组件懒加载

```js
import React,{ lazy, Suspense } from "react"
import { BrowserRouter,Link, Route, Switch } from "react-router-dom"

const Home = lazy(() =>import(/* WebpackChunkName: "Home" */ "./Home"))
const List = lazy(() => import(/* webpackChunkName: "List" */ "./List"))

function App(){
    return (
    <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/list">List</Link>
        <Switch>
            <Suspense fallback={<div>Loading</div>}>
                <Route path="/" component={Home} exact />
                <Route path="/list" component={(List} />
            </Suspense>
        </Switch>
    </BrowserRouter>)
}
```

2.根据条件进行组件懒加载

适用于组件不会随条件频繁切换

```js
import React,{ lazy, Suspense } from "react"

function App(){
    let lazyComponent = null;
    
    if(true) {
        lazyComponent = lazy(() =>import(/* WebpackChunkName: "Home" */ "./Home"))
    } else {
        lazyComponent = lazy(() => import(/* webpackChunkName: "List" */ "./List"))
    }

    return (
        <Suspense fallback={<div>Loading</div>}>
            <lazyComponent />
        </Suspense>
    )
}
```

## 6. 使用 Fragment 避免额外标记

React组件中返回的jsx如果有多个同级元素,多个同级元素必须要有一个共同的父级.



为了满足这个条件我们通常都会在最外层添加一个div,但是这样的话就会多出一个无意义的标记，如果每个组件都多出这样的一个无意义标记的话浏览器渲染引擎的负担就会加剧.


为了解决这个问题, React推出了fragment 占位符标记.使用占位符标记既满足了拥有共同父级的要求又不会多出额外的无意义标记.



## 7. 不要使用内联函数定义



在使用内联函数后, render方法每次运行时都会创建该函数的新实例，导致React在进行 Virtual DOM比对时,新旧函数比对不相等，导致React总是为元素绑定新的函数实例,而旧的函数实例又要交给垃圾回收器处理.



## 8. 在构造函数中进行函数 this 绑定



在类组件中如果使用fn()这种方式定义函数,函数this默认指向undefined.也就是说函数内部的this 指向需要被更正.可以在构造函数中对函数的 this进行更正,也可以在行内进行更正,两者看起来没有太大区别,但是对性能的影响是不同的.



```js

export default class App extends React.Component {
    constructor() {
        super()
        // 方式一
        // 构造函数只执行一次,所以函数this指向更正的代码也只执行一次.
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick() {
        console.log(this)
    }
    
    render() {
        //方式二
        //问题: render方法每次执行时都会调用bind方法生成新的函数实例.
        return <button onClick={this.handleClick.bind(this)}>按钮</button>
    }
}
```



## 9. 类组件中的箭头函数

在类组件中使用箭头函数不会存在 this指向问题,因为箭头函数本身并不绑定 this.

```js
export default class App extends React.Component {
    handleClick = () => {
        console.log(this)
    }
    render(){
        return <button onClick={this.handleClick}>按钮</button>
    }
}
```

箭头函数在this 指向问题上占据优势,但是同时也有不利的一面.


当使用箭头函数时,，该函数被添加为类的实例对象属性,而不是原型对象属性.如果组件被多次重用,每个组件实例对象中都将会有一个相同的函数实例,降低了函数实例的可重用性造成了资源浪费.


综上所述,更正函数内部this 指向的最佳做法仍是在构造函数中使用bind方法进行绑定



## 10. 避免使用内联样式属性

当使用内联style为元素添加样式时,内联style 会被编译为JavaScript代码,通过JavaScript代码将样式规则映射到元素的身上，浏览器就会花费更多的时间执行脚本和渲染UI，从而增加了组件的渲染时间.



```js
function App() {
    return <div style=ff backgroundColor: "skyblue"}>App works</div>
}
```

在上面的组件中，为元素附加了内联样式，添加的内联样式为JavaScript对象, backgroundColor需要被转换为等效的CSS样式规则，然后将其应用到元素,这样涉及到脚本的执行.


更好的办法是将CSS 文件导入样式组件.能通过CSS直接做的事情就不要通过JavaScript去做，因为JavaScript操作 DOM非常慢.



## 11. 优化条件渲染

频繁的挂载和卸载组件是一项耗性能的操作，为了确保应用程序的性能,应该减少组件挂载和卸载的次数.在 React中我们经常会根据条件渲染不同的组件.条件渲染是一项必做的优化操作.



```js
function App() {
    if (true) {
        return (
            <>
                <AdminHeader />
                <Header />
                <Content />
            </>
        )
    }
    else {
        return (
            <>
                <Header />
                <Content />
            </>
        )
    }
}
```

在上面的代码中，当渲染条件发生变化时, React 内部在做 Virtual DOM 比对时发现,刚刚第一个组件是 AdminHeader,现在第一个组件是 Header,刚刚第二个组件是Header,现在第二个组件是Content,组件发生了变化,React就会卸载 AdminHeader、Header、Content,重新挂载Header 和 Content.这种挂载和卸载就是没有必要的.

```js
function App() {
    return (
        <>
            {true && <AdminHeader />}
            <Header />
            <Content />
        </>
    )
}
```



## 12.避免重复无限渲染

当应用程序状态发生更改时,React 会调用render方法,如果在render方法中继续更改应用程序状态,就会发生render方法递归调用导致应用报错.



与其他生命周期函数不同, render方法应该被作为纯函数.这意味着，在render方法中不要做以下事情,比如不要调用setState方法，不要使用其他手段查询更改原生DOM元素;以及其他更改应用程序的任何操作. render方法的执行要根据状态的改变，这样可以保持组件的行为和渲染方式一致.



## 13.为组件创建错误边界

默认情况下，组件渲染错误会导致整个应用程序中断,创建错误边界可确保在特定组件发生错误时应用程序不会中断.


错误边界是一个React组件,可以捕获子级组件在渲染时发生的错误，当错误发生时,可以将错误记录下来,可以显示备用UI界面.错误边界涉及到两个生命周期函数,分别为getDerivedStateFromError 和 componentDidCatch.


etDerivedStateFromError 为静态方法,方法中需要返回一个对象,该对象会和state对象进行合并,用于更改应用程序状态.componentDidCatch方法用于记录应用程序错误信息.该方法的参数就是错误对象.



```js
import React from "react"
import App from "./App"

export default class ErrorBoundaries extends React.Component {
    constructor() {
        super()
        this.state ={
            hasError: false
        }
    }
    
    componentDidCatch(error) {
        console.log("componentDidCatch")
    }
    
    static getDerivedStateFromError() {
        console.log("getDerivedStateFromError")
        return {
            hasError: true
        }
    }

    render() {
        if (this.state.hasError){
            return <div>发生了错误</div>
        }

        return <App />
    }
}

```



```js
// App.js
import React from "react"
export default class App extends React.Component {
    render(){
        // throw new Error(""lalala")
        return <div>App works</div>
    }
}
```



```js
// index.js
import React from "react"
import ReactDOM from "react-dom"
import ErrorBoundaries from "./ErrorBoundaries"

ReactDOM.render(<ErrorBoundaries />, document.getElementById("root"));

```

注意:错误边界不能捕获异步错误,比如点击按钮时发生的错误.



## 14. 避免数据结构突变



## 15. 依赖优化


