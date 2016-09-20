# 基础库培训

## 基础库介绍

针对微信移动端开发的基础库。

基础库分为三类:

* 移动端基础库
* PC端基础库
* 后台基础库

## 基础库目的

提高开发效率

## 基础库技术选型

* zepto + touch
* handlebars
* gulp
* sass
* flexible.js


## 基础库实现的功能

1. Sass编译
2. Css Js 图片压缩
3. Css Js 合并
4. Css Js 内联
5. Html文件 include功能
6. autoprefixer
7. 自动刷新
8. rem移动端适配方案
9. 去缓存
10. 内置loading、dialog组件
11. 提供handlebars预编译
12. 提供常用功能函数
13. 雪碧图
14. eslint

## 基础库的环境安装

1. 下载[nodejs](https://nodejs.org/en/), 安装
2. 安装[cnpm](http://npm.taobao.org/)
3. 安装[gulp](http://www.gulpjs.com.cn/docs/getting-started/)

## 基础库代码获得

1. gitlab

```bash

	git clone git@10.120.24.200:FE/lnv-mobile.git

```

2. 共享文件
3. yo脚手架

```bash

	cnpm install -g yo

	cnpm install -g generator-lnv-mobile

	yo lnv-mobile

```

## 基础库运行

开发时使用：

```bash

	gulp

```

最终构建：

```bash

	gulp build

```

## 基础库目录

`src`下:

```

├── src                        	# 源文件
    └── font          	    	# 字体文件
    └── img           		    # 图片
    └── include           	 	# include文件
    └── js           		 	# js
    └── scss           	 		# scss
    └── static           		# 静态资源
    └── tpl           		 	# handlebars模板
    └── widget           		# 组件
    └── index.html        	 	# index.html

```

执行`gulp`命令后, 会生成dev目录

```

├── dev/                        # dev目录
    └── font           	    	# 字体文件目录
    └── img           		    # 图片目录
    └── js           		 	# js
    └── css           	 		# css目录
    └── static           		# 静态资源目录
    └── tpl           		 	# handlebars模板目录
    └── widget           		# 组件目录
    └── index.html        	 	# index.html

```

执行`gulp build`命令后, 会生成dev目录

```

├── build                       # 构建目录
    └── combined           	    # 合并后的文件目录
    └── img           		    # 图片目录
    └── js           		 	# js
    └── css           	 		# css目录
    └── static           		# 静态资源目录
    └── widget           		# 组件目录
    └── index.html        	 	# index.html

```

## 移动端匹配规则

[使用Flexible实现手淘H5页面的终端适配](http://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html?utm_source=tuicool&utm_medium=referral)

## Sass文件

* sass to css
* autoprefixer
* px to rem

## Html文件

* include功能
* handlebars预编译的使用

## Js文件

* eslint
* loading组件和dialog组件
* util

## Img文件

* 雪碧图

## 字体图标

* 参见字体图标使用教程


## css js压缩

## css js合并

## css js内联

## 去缓存

## 会遇到的问题

* $rooturl路径问题

## 压缩的最终结果