---
title: HTML 语义化
isTop: true
date: 2023/02/10
tags:
 - html
---

# HTML 语义化

<img src="/html/01.jpg"/>

## 一、为什么要语义化，有什么优点

我们先对比上下两段代码

```html
    <div>标题</div>
    <div>
        <div>一段文字</div>
        <div>
            <div>列表1</div>
            <div>列表2</div>
        </div>
    </div>
```


```html
    <h1>标题</h1>
    <div>
        <p>一段文字</p>
        <ul>
            <li>列表1</li>
            <li>列表2</li>
        </ul>
    </div>
```
对比之后，就可以很明显的感觉到下面这段代码比上面这段代码更容易读懂，结构也看着更加清晰，这就是语义化的好处。

SEO 就是**搜索引擎优化**的意思，语义化的代码，更利于搜索引擎爬虫理解，能让爬虫爬取更多关键有效的信息

**总结**

- 让人更容易读懂（增加代码可读性）

- 让搜索引擎更容易懂，利于 SEO

- 结构明确在没有 css 加载前也有较为明确的结构(如img 的 在图片无法加载的情况下有 alt 标签告知用户图片的具体内容)

- 方便其他阅读设备阅读(如屏幕阅读器阅读 &lt;strong&gt; 的时候会重读而 阅读到 &lt;b&gt; 不会重读)



## 二、 如何语义化

网站一般分为头部、底部、导航、侧边栏、文章等几个模块，每个模块下内容又可以分为标题、段落、超链接、代码、地址、时间、英文缩写、拼音等，我们就可以**根据不同的模块，模块下的内容不同的作用或者意义，进行拆分，使用不同语义的标签进行书写，从而达到语义化的目的**。

**Html 5 新增的语义元素**：header、footer、nav、article、aslide、main、mark、nav、section、[time](https://www.runoob.com/tags/tag-time.html)、[figure](https://www.w3school.com.cn/tags/tag_figure.asp)、figcaption、[details](https://www.runoob.com/tags/tag-details.html)、summary

**表示不同模块的标签**：header、footer、nav、aside、article、section

**表示具体元素的作用或意义的标签**：abbr(缩写)、address(地址)、code(代码)、var(变量)、del(删除线)、mark(标记)、blockquote(块引用)、q(短引用)、cite(文献引用)、figure(独立的内容)、figuation(figure 元素的标题)、dfn(包裹被定义的名词)、[ruby](https://www.w3school.com.cn/tags/tag_ruby.asp)(拼音)、[time](https://www.runoob.com/tags/tag-time.html)、a、ol、ul、p等。

- 尽量少使用 div 和 span(但也不要乱用语义)

- 不要使用纯样式标签，尽量用 css 去设置

- 不要为了达到某种视觉效果而使用具有确切语义的标签

