# 移动端开发脚手架

基于 gulp 的使用 zepto、handlebars、sass 并且带移动端适配方案（flexible.js）的前端工作流，旨在帮助移动端项目的开发。

## 背景

在移动端项目的开发中，我们会遇到诸如移动端技术选型、移动端适配、预处理器语言的使用规范和编译、各种繁琐的工作（压缩、合并、内联、雪碧图、CSS前缀……）等问题，在一遍又一遍的重复劳动中，我们需要一个能够结合最佳实践的项目初始文件，本套工作流就是以这个目的进行构建，旨在提高移动端项目开发效率。

## 技术选型

* zepto.js + deferred.js + callbacks.js + touch.js（库）
* flexible.js（移动端rem适配方案）
* handlebars（模板引擎）
* gulp（自动化构建工具）
* sass（预处理器语言）

## 功能

1. Sass 编译
2. CSS JS 图片压缩
3. CSS JS 合并
4. CSS JS 内联
5. HTML 的 include 功能
6. Autoprefixer
7. 自动刷新
8. 去缓存
9. 提供Handlebars模板文件的预编译
10. 提供常用功能函数
11. 雪碧图
12. ESLint
13. rem 移动端适配方案
14. 内置样式与 WeUI 样式相同的 loading、dialog 组件

## 教程

[针对移动端的前端工作流](https://github.com/mqyqingfeng/introduction-for-lnv-mobile-base)

共 13 篇，讲解了本套脚手架的各个方面。

## 使用

```js
git clone git@github.com:mqyqingfeng/lnv-mobile-base.git

cd lnv-mobile-base
```

## 开发和编译

1.开发时使用：

```js
gulp
```

当你开启 gulp 命令后，不要关闭终端，gulp 会监控 src 目录下的变化，根据文件的不同进行对应的操作。

2.最终构建：
```js
gulp build
```

当你执行 gulp build 命令后，会自动压缩、合并、内联、去缓存，这是最终的上线版本。

## 说明

如果有疑问或者发现错误，可以在 issues 进行提问或勘误。

如果对你有所帮助，欢迎 star，对作者也是一种鼓励。

## License

MIT