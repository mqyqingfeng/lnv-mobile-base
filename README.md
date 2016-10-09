# 针对移动端的前端工作流

目录结构：

[TOC]

## 针对移动端的前端工作流(1)—基础库概览

在移动端项目的开发中，我们会遇到诸如移动端技术选型、移动端适配、预处理器语言的使用规范和编译、各种繁琐的工作（压缩、合并、内联、雪碧图、CSS前缀……）等问题，在一遍又一遍的重复劳动中，我们需要一个能够结合最佳实践的项目初始文件，本套工作流就是以这个目的进行构建，旨在提高移动端项目开发效率。

这套工作流与其叫工作流这么高大上的名字，我更愿意叫它基础库。如它的名字一样，它就是用来作为项目的基础，在良好的基础上开发的项目，才像是站在巨人的肩膀上，才能保证项目的质量与效率。

此外因为是针对移动端（尤其是活动类项目）开发的基础库，技术选型还算简单，尤其适合初入移动端以及刚做移动端不久的前端人，即使做了一段时间的移动端，了解这套基础库的架构和功能实现，或许也有增益。

接下来让我们来了解这个基础库的各个方面。

### 基础库技术选型

在正式去了解这套基础库前，首先介绍它的技术选型，让你有个大概的了解。

* zepto.js + deferred.js + callbacks.js + touch.js（库）
* flexible.js（移动端rem适配方案）
* handlebars（模板引擎）
* gulp（自动化构建工具）
* sass（预处理器语言）

### 基础库实现的功能

看完技术选型后，看看它能实现哪些功能，是否满足你的需求。

1. Sass编译
2. Css Js 图片压缩
3. Css Js 合并
4. Css Js 内联
5. Html的include功能
6. Autoprefixer
7. 自动刷新
8. 去缓存
9. 提供Handlebars模板文件的预编译
10. 提供常用功能函数
11. 雪碧图
12. ESLint
13. rem移动端适配方案
14. 内置样式与WeUI样式相同的loading、dialog组件

### 基础库的环境安装

OK, 如果你决定尝试下这套基础库，首先要确保你有相应的环境，下面这些是步骤：

1.下载[nodejs](https://nodejs.org/en/)，安装

2.安装[cnpm](http://npm.taobao.org/)，实际上你只用在终端执行下面这句命令就可以了。

```bash

	npm install -g cnpm --registry=https://registry.npm.taobao.org

```

3.安装[gulp](http://www.gulpjs.com.cn/docs/getting-started/)，同样你需要执行下面这句命令。

```bash

	cnpm install --global gulp

```

### 基础库代码获取

安装完环境，我们需要获取代码，获取代码有两种方式：

1.[github](https://github.com/mqyqingfeng/lnv-mobile-base)

```bash

	git clone git@github.com:mqyqingfeng/lnv-mobile-base.git

```

2.[yeoman](https://github.com/mqyqingfeng/generator-lnv-mobile)

```bash

	cnpm install -g yo

	cnpm install -g generator-lnv-mobile

	yo lnv-mobile

```

效果如图：

![yeoman安装预览图](docs/img/yeoman.png)

输入项目名称，会以输入的项目名称建立文件夹，基础库的代码会自动创建。

### 基础库运行

获取文件后，进入文件根目录，请记住，在全部的使用中，就俩命令：

1.开发时使用：

```bash

	gulp

```

当你开启`gulp`命令后，不要关闭终端，gulp会监控`src`目录下的变化，根据文件的不同进行对应的操作。

2.最终构建：

```bash

	gulp build

```

当你执行`gulp build`命令后，会自动压缩、合并、内联、去缓存，这是最终的上线版本。

### 基础库目录结构

在介绍基础库的各个功能之前，首先了解一下目录结构。

`src`下:

```

├── src/                        # 源文件
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

执行`gulp`命令后， 会生成`dev`目录

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

执行`gulp build`命令后, 会生成`build`目录

```

├── build/                      # 构建目录
    └── combined           	    # 合并后的文件目录
    └── img           		    # 图片目录
    └── js           		 	# js
    └── css           	 		# css目录
    └── static           		# 静态资源目录
    └── widget           		# 组件目录
    └── index.html        	 	# index.html

```

注意`dev`目录是通过`src`目录生成的，任何时候都不要直接更改`dev`目录里的内容！！！

而`build`目录是最终构架出的目录，是最终要在线上使用的版本。

注意`node_modules`文件夹是不提交的！！！

## 针对移动端的前端工作流(2)—使用rem做移动端适配

这套基础库的移动端适配方案，使用的是手机淘宝团队的flexible.js，具体可以查看大漠老师的文章：[使用Flexible实现手淘H5页面的终端适配](http://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html?utm_source=tuicool&utm_medium=referral)，在这里我简单的介绍它的工作原理。

首先要了解的是[rem](http://www.w3cplus.com/css3/define-font-size-with-css3-rem)，rem指相对于根元素的字体大小的单位。简单的说它就是一个相对单位，当然这可能让你想到`em`,但是`em`相对于父元素，而`rem`是相对于根元素。

举个例子，让我们了解`em`与`rem`的区别。

``` css

	/* html元素 */
	html {
		font-size: 100px;
	}

	/* html的子元素 */
	body {
		font-size: 0.8em; 	// 100px * 0.8 = 80px
		font-size: 0.8rem;	// 100px * 0.8 = 80px
	}

	/* body的子元素 */
	div {
		font-size: 0.8em; // 100px * 0.8 * 0.8 = 64px
		font-size: 0.8rem; // 100px * 0.8 = 80px
	}

```

接着让我们看看flexible.js的原理。

flexible.js的原理就是根据屏幕的宽度设置html元素的font-size，具体做法是计算出屏幕的宽度然后除以10，赋给html标签的font-size属性。

举个例子：

如果屏幕的宽度是750px，flexible.js就会设置html的font-size为75px。

然后我们在写所有元素的属性时（margin, padding, width, height等）都以rem为单位，

同样举个例子：

如果屏幕的宽度是750px，flexible.js设置html的font-size为75px，一个按钮在750px的设计稿下width为150px，我们就会把这个按钮的样式写成：

``` css

.btn {
	width: 2rem; // 150px / 75px = 2rem;
}

```

假设现在屏幕宽度切换到了640px， flexible.js设置html的font-size为64px，这个按钮的width在640px下的大小其实相当于 2rem * 64px = 128px

让我们来看一下：

``` css

150px / 750px = 128px / 640px = 1 / 5

```

我们会发现在不同的屏幕大小下，这个按钮的宽度相对于屏幕的比例是不变的，这样就可以实现UI元素跟随屏幕大小而变化，从而实现适配。

最后要说明一下，以上只是举例，实际情况稍有不同：

以上这种算法只在屏幕宽度小于540px的情况下发生，这是为了避免在宽屏时，UI元素过大的情况，在大于540px的时候，html的font-size一直保持54px不变。

但是如果你只用flexible.js的话，你就会发现一个特别麻烦的事情：

一个按钮的width可不是总是这么巧就等于150px, 然后你轻松的口算出来等于2rem，万一等于125px呢？而且有那么多元素需要计算，我总不能抱个计算器量一个算一个吧。

所以接下来让我们看看如何使用gulp来方便的做这件事情（px to rem），这一步会伴随着sass文件的编译，来让我们看下一章。

## 针对移动端的前端工作流(3)—Sass的使用姿势

### sass文件的编译与px to rem的转换

基础库使用的预处理器是sass，为什么会选择sass呢？这是因为当时在选择sass和less的时候，简单的了解了下它们：sass是功能强大但是入门门槛高，less是功能稍微薄弱，但是入门简单，而我认为功能强大是工具的事情，但是入门门槛高则是个人的问题，不能以个人的问题来决定使用何种工具，所以最终选择了sass，（现在想想，当时还是很天真啦，其实两者的区别并不是像我想象的如此肤浅），于是便一直使用sass。

sass文件的编译用的是gulp的`gulp-sass`，当执行`gulp`后，会监控`src/scss`下scss文件的变化(并不是`src/scss`所有的文件，只有在`src/scss`一级目录下的scss文件)，如果发生变化，就会实时编译成css到`dev/css`目录下。

接着我们会用`gulp-autoprefixer`插件自动补全Css前缀。

最后我们会进行px to rem的转换，转换的规则就是所有的 `px值` 除以 `75` 计算出`rem`值。

通过下面这个示例代码，一目了然。

处理前：

![scss文件转换前](docs/img/px.png)

处理后：

![scss文件转换后](docs/img/rem.png)

至于为什么转化规则是除以 `75` 呢？

这是因为我们这里的移动端设计稿都是 750px 的，我们用PS测量一个按钮为150px的时候，我们就直接写这个按钮的width为150px，这感觉就像写固定布局一样！gulp会为我们自动处理px to rem。

但是如果你的设计稿是640px呢？这个该怎么处理？这时候就需要你修改下gulpfile.js中的配置文件：

``` js

gulp.task('dev_sass', function() {

    var processors = [px2rem({ remUnit: 75 })]; //根据你的设计稿宽度除以10修改这里的remUnit值

    return gulp.src(path.src.scss + "*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(postcss(processors))
        .pipe(gulp.dest(path.dev.css))
        .pipe(notify({
            message: 'scss文件编译成功'
        }))

});

```

对了，你还可能遇到一个坑，那就是如果你设置按钮的border为1px时

这是scss文件：

``` css

  .btn {
    border: 1px solid #ccc;
  }

```

这是处理后的css文件：

``` css

  .btn {
    border: 0.013333rem solid #ccc;
  }

```

在浏览器中预览时你会看见它的边框，但是当你到了手机上的时候，这条线是没有的！！！

想当初百思不得其解，突然灵光一现，发现了其中蹊跷，那就是手机中算 `0.013333rem`值的时候可能都算不到`1px`大小，所以直接就不显示了……

所以我们不想让gulp对border的1px进行处理的时候该怎么办呢？

这时候，我们就需要加上特殊的标示告诉gulp此处请不要转换，看下面的示例代码：

这是scss文件：

``` css

  .btn {
    border: 1px solid #ccc; /*no*/
  }

```

这是处理后的css文件：

``` css

  .btn {
    border: 1px solid #ccc;
  }

```

### scss目录结构

#### 目录结构

在`src/scss`目录下，包含了很多细分功能的scss文件。这是scss的目录结构

```

├── src/                        	# 源文件目录
    └── scss/           	 		# scss目录
    	└── helper/
    		└── _color.scss     	# 色板
    		└── _normalize.scss 	# 重置
    		└── _rules.scss     	# 规则
    		└── _util.scss      	# util
    	└── sprite/
    		└── _sprite.scss        # 根据雪碧图生成的scss文件
    	└── ui/
    		└── _animation.scss     # 动画
    		└── _button.scss        # 按钮组件
    		└── _global.scss        # 全局
    		└── _icon.scss         	# 字体图标
    		└── _loading.scss       # 页面加载loading样式
    	└── index.scss


```

#### helper

先介绍`helper`目录，这里包括了一些帮助项目开发的类

1._color.scss

这里存放着一些扁平的颜色变量，当你没有合适的颜色的时候，可以考虑选择尝试其中的颜色。[查看这些颜色](http://flatuicolors.com/)

2._normalize.scss

样式重置，基于normalize.css，在此基础上加了针对移动端的一些东西，其中要注意的是这样一句：

``` css

	* {
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	}

```

这句话直接改变了所有元素的盒模型，当你设置一个元素为 `box-sizing: border-box;`时，此元素的内边距和边框不再会增加它的宽度，绝对是开发福利！

3._rules.scss

在这里设置常用的scss变量，占位符，mixin，请大家在项目开发中不断的完善！

4._util.scss

提供常用的工具类， 让我们在这里做个预览：

``` css

/**
 * 隐藏元素
 */

.hidden,
[hidden] {
    display: none !important;
}


/**
 * 弹性图片
 */

.lnv-img {
    max-width: 100%;
    height: auto;
    display: block;
}


/**
 * 清除浮动
 */

.clear {
    clear: both;
}


/**
 * 解決高度塌陷問題
 */

.clearfix:after {
    content: ' ';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.clearfix {
    zoom: 1;
}


/**
 * 单行文本超过宽度显示为三个点
 */

.dot {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}


/**
 * 三角符号
 */

.lnv-triangle {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid \9;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
}

/**
 * 不被选中
 */
.noselect {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}

```

#### ui

`ui`文件夹下存放与ui相关的scss文件。

1. _animation.scss

这里存放着与动画有关的样式。

2. _button.scss

这里存放着组件类的样式,如按钮、表单、表格等，这里只写了button类，其他的需要大家在项目开发中完善。之所以设置组件类，是为了方便项目后期的迭代。

3. _global.scss

这里存放自定义的全局变量。

4. _icon.scss

这里存放着字体图标有关的样式。

5. _loading.scss

这里存放着页面加载loading的样式

#### sprite

sprite文件下存放着由雪碧图生成的scss文件，具体的内容会在雪碧图部分讲解。

#### base.scss

在base.scss文件中引入`ui`和`helper`下的文件，要求每个html文件中引入base.css。

这是base.scss文件：

``` css

@charset "utf-8";

/* 样式重置 */

@import "helper/_normalize";

/* 色板 */

@import "helper/_color";

/* 规则 */

@import "helper/_rules";

/* 工具类 */

@import "helper/_util";

/* 动画效果 */

@import "ui/_animation";

/* 组件库 */

@import "ui/_buttons";

/* loading */

@import "ui/_loading";

/* icon */

@import "ui/_icon";

/* public style */

@import "ui/_global";


```

## 针对移动端的前端工作流(4)—html文件实现类似后端的include功能

### 有这个需求

在开发的时候我们可能会遇到这样的情景，以活动规则为例，在多个html文件中都复制了一遍，突然运营妹子兴高采烈的找你，然后：

> “巴拉巴拉”

> “很麻烦哎”

> “巴拉巴拉”

> “……”

> “巴拉巴拉”

> “好吧”


你要一个一个去改html文件，此时我就想：

> "为毛我不能像后端一样include这个片段！""

Ok, 我实现了！

### 基本用法

基础库的include功能使用的是`gulp-file-include`插件，在这里简单的看下它的使用语法：

注意所有要include的代码片段写在`src/include`目录下，举个例子：

index.html

``` html

<!DOCTYPE html>
<html>
  <body>
    @@include('include/item.html')
  </body>
</html>

```

include目录下有个item.html

``` html

<h1>view</h1>

```

在开启`gulp`命令的情况下会实时监控html文件的变化，最终编译的结果为：

``` html

<!DOCTYPE html>
<html>
  <body>
  	<h1>view</h1>
  </body>
</html>


```

### 进阶用法

除了基本的复用片段之外，还有进阶的功能，就是可以通过传参改变片段里的内容，让我们看下面这个示例代码：

index.html

``` html

<!DOCTYPE html>
<html>
  <body>
    @@include('include/item.html', {
        "name": "lnv-mobile"
    })
  </body>
</html>

```

include目录下有个item.html

``` html

<h1>@@name</h1>

```

在开启gulp命令的情况下会实时监控html文件的变化，最终编译的结果为：

``` html

<!DOCTYPE html>
<html>
  <body>
  	<h1>lnv-mobile</h1>
  </body>
</html>


```
### 更多

更多的如if判断、循环遍历功能，[请点击查看](https://www.npmjs.com/package/gulp-file-include)

### 后话

最后终于方便了，运营妹子又兴高采烈的找你，然后：

> “巴拉巴拉”

> “很麻烦哎”

> “巴拉巴拉”

> “……”

> “巴拉巴拉”

> “好吧”

> “么么哒”

> “么么哒😘”

## 针对移动端的前端工作流(5)—Handlebars的预编译

在前后端分离的架构下，为了方便渲染，我们通常会选择模板引擎处理复杂的渲染逻辑。

我们曾纠结于mustache与handlebars，最终还是选择了功能更加强大的handlebars。

虽然handlebars功能强大，但是体积也大，在压缩后也有70K！！！

所以为了在功能强大与代码大小之间做个平衡，我们使用handlebars的预编译文件，为了方便开发，我们写了一个gulp插件
[`gulp-handlebars-precompile`](https://github.com/mqyqingfeng/gulp-handlebars-precompile)，可以提取html文件中的handlebars模板文件，预编译到指定目录,并且可以在html文件中建立script链接，在这里我们简单看下使用方法：

handlebars模板文件写在`src/tpl`目录下，建立一个文件如`product.hbs`

product.hbs文件：

``` html

{{#each data}}
<li href="{{itemLink}}">
    {{test}}
</li>
{{/each}}

```

html文件：

注意这里直接写文件名就可以了，会自动指向`src/tpl`目录。

```html
	<!--hbs "product.hbs"-->
```

在开启`gulp`命令的情况下会实时监控html文件的变化，保存时会自动提取模板文件，在`dev/tpl`建立以html文件名建立的文件夹，里面有预编译的js文件，即

源文件目录：

```
	├── gulpfile.js                # gulpfile文件
	├── src/                       # 源文件目录
	    └── index.html             # index.html
	    └── tpl/                   # 模板目录
	        └── product.hbs        # 模板文件
	└── dev/					   # 编译目录
```

dev目录：

```
	└── dev/                       # 编译目录
	    └── tpl/
	        └── index/
	            └── product.js
	    └── index.html             # index.html
```


看看编译后的`product.js`:

``` js

this["templates"] = this["templates"] || {};
this["templates"]["product"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li href=\""
    + alias4(((helper = (helper = helpers.itemLink || (depth0 != null ? depth0.itemLink : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemLink","hash":{},"data":data}) : helper)))
    + "\">\n    "
    + alias4(((helper = (helper = helpers.test || (depth0 != null ? depth0.test : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"test","hash":{},"data":data}) : helper)))
    + "\n</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

```

而且`src/index.html`中的

```html
	<!--hbs "product.hbs"-->
```
在`dev/index.html`中会被替换为

```html
	<script src="tpl/index/product.js" inline></script>
```
这里让我们看看它的具体配置文件

``` js

    .pipe(precompile({
        reg: /<!\-\-hbs\s+"([^"]+)"\-\->/g, // 设置提取文件的规则
        baseSrc: "src/tpl/",				// 设置文件根目录
        dest: "dev/tpl/",					// 设置编译到文件目录
        scriptSrc: 'tpl/',					// 设置替换后的script的前缀目录
        inline: true						// 是否要添加inline属性
    }))

```

当我们获得了预编译的文件后，我们该怎么使用呢？

举个例子：

`src/index.html`中引入`handlebars.runtime-v4.0.5.js`（压缩后13K）和要编译的模板文件，如图所示：

![precompile-before](docs/img/precompile-before.png)

在`dev/index.html`就会编译成：

![precompile-after](docs/img/precompile-after.png)

如果你想使用这个模板文件：

``` js

var html = templates.product(data);

$("body").append(html);

```

让我们来解释一下：

1. 假设 data 变量是你通过ajax请求获得的json数据
2. templates是命名空间，默认值，如果你想自定义命名空间，[点击查看](https://www.npmjs.com/package/gulp-handlebars-precompile#%E8%AE%BE%E7%BD%AE%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4)
3. product是方法名，使用的是你的模板文件的名称，传入的参数的 获得的数据，返回的是html片段


至于

``` html

 <script src="tpl/index/product.js" inline></script>

```

`script`标签会有`inline`属性呢？请接着往下看。

## 针对移动端的前端工作流(6)—Ajax请求的正确姿势

在`src/js/index.js`中index.js中示例了处理一个ajax请求的正确姿势，其中有5点需要注意的地方，请看下面的demo

``` js

/**
 * 点击按钮发送ajax请求
 * 1. 考虑ajax请求失败的情况
 * 2. 考虑ajax请求成功，但是状态不是200的情况
 * 3. 考虑ajax请求成功，状态是200，但是没有数据的情况
 * 4. 考虑ajax重复请求的情况
 * 5. 考虑ajax请求接口时间长的交互效果
 */

var submit = function () {

    var me = $(this);

	// 判断是否是重复点击
    if (me.hasClass('disabled')) {

        return;

    }
    me.addClass('disabled');

	// 发送的数据
    var sendData = {
        time: 3
    };

    $.ajax({
            url: 'http://wiki.xyzphp.com/t.php',
            type: 'POST',
            data: sendData,
            beforeSend: function () {
            	// 发送ajax请求前的loading
                lnv.pageloading();
            }
        })
        // 服务器请求成功
        .done(function (res) {

			// 处理返回的数据，因为有的时候返回的数据可能是字符串，而非json格式
            res = typeof(res) === 'string' ? JSON.parse(res) : res;

			// 如果返回的数据状态是200
            if (res.status == 200) {

				// 如果返回的数据data为空
                if (res.data.length === 0) {

                    lnv.alert({
                        title: '提示',
                        content: '没有数据',
                        alertBtnText: '确定',
                        alertHandler: function () {
                            alert('点击了确定');
                        }
                    });

                }
                else {

                    // 如果返回的数据data不为空

                }

            }
            // 如果返回的数据状态不是200
            else {

                alert('error');

            }
        })
        // 服务器请求失败
        .fail(function (jqXHR, textStatus, errorThrown) {

            alert('error');

        })
        .always(function () {

			// 无论成功还是失败，删掉loading效果
            lnv.destroyloading();
			// 删除重复点击的标示
            me.removeClass('disabled');

        });
};


```
## 针对移动端的前端工作流(7)—WeUI样式的loading和dialog组件

### 有这个需求

因为移动端项目多用于微信端，所以我们用微信官方团队提供的[WeUI](https://weui.io/#/)样式简单封装了两个常用的插件,一个是`loading`组件，另一个是`dialog`组件

### [dialog组件](https://github.com/mqyqingfeng/dialog)

首先介绍的[`dialog`](https://github.com/mqyqingfeng/dialog)组件，包含`alert`和`confirm`两种样式，下面是它的使用方法：

在html文件中引入对应的css和js

``` html

<link rel="stylesheet" href="widget/dialog/dialog.css">

<script src="widget/dialog/dialog.js"></script>

```
js文件中调用

```js

lnv.alert({
    title: '提示',
    content: 'content',
    alertBtnText: '确定',
    alertHandler: function(){

		// 点击确定按钮的回调

    }
})

```

效果如下：

![alert](docs/img/alert.png)

js文件中调用

```js

lnv.confirm({
    title: '提示',
    content: 'content',
    confirmBtnText: '确定选择',
    confirmHandler: function(){

		// 点击确定按钮的回调

    },
    cancelBtnText: '取消',
    cancelHandler: function(){

		// 点击取消按钮的回调

    }
})

```

效果如下：

![confirm](docs/img/confirm.png)

### loading组件

接下来介绍`loading`组件，具有`pageloading`和`iconloading`两种样式。

在html文件中引入对应的css和js

``` html

<link rel="stylesheet" href="widget/loading/loading.css">

<script src="widget/loading/loading.js"></script>

```

js文件中调用：

```js

$.ajax({
        url: url,
        type: 'POST',
        data: sendData,
        beforeSend: function () {

        	//页面loading, 不能再进行其他操作，适合比如提交按钮
            lnv.pageloading();

        }
    })
    .done(function (res) {

    })
    .fail(function (jqXHR, textStatus, errorThrown) {

    })
    .always(function () {

		//在这里删除页面loading
        lnv.destroyloading();

    });

```

效果如下：

![loading](docs/img/loading.png)

js文件中调用：

```js

$.ajax({
        url: url,
        type: 'POST',
        data: sendData,
        beforeSend: function () {

        	//按钮内调用，需要传入按钮的jquery对象
            lnv.iconloading("#submit_btn");

        }
    })
    .done(function (res) {

    })
    .fail(function (jqXHR, textStatus, errorThrown) {

    })
    .always(function () {

		//在这里删除按钮loading
        lnv.destroyloading("#submit_btn");

    });


```

效果如下：

![loading2](docs/img/loading2.png)

### util.js

除了两个组件之外，我们也提供了一个帮助项目开发的util.js。

关于util.js，我们提供了两个常用的功能函数：

1.检测手机号码是否符合格式（匹配规则是第一位为1，其余有10位）

``` js

var phone = '189888888889';

console.log(lnv.checkPhone(phone)) // false

```

2.取出网址参数

``` js

// 假设当前的URL为 http://localhost:3000/index.html?phone=189888888889

console.log(lnv.getQueryString(phone)) // 189888888889

```

## 针对移动端的前端工作流(8)—ESLint

### 有这个需求

团队有规范，可是如何践行规范呢？

### ESLint

在开启`gulp`命令的情况下，每当js文件进行保存时，我们会对js文件进行代码检查，如果有不符合规范的地方，会有消息提醒，在mac下长这个样子：

![error](docs/img/error.png)

具体的不规范内容请查看终端：

![error-detail](docs/img/error-detail.png)

我们团队的JavaScript的编码规范是基于[百度的JavaScript编码规范](https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md)，ESLint配置并没有覆盖所有的规范，具体的配置文件在`.eslintrc`中

``` json

{
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    //使用了控制符分类不匹配任何字符串的正则表达式：var foo = /^abc[]/;
    "no-empty-character-class": "error",
    //函数参数不能够使用相同的参数名
    "no-dupe-args": "error",
    //在使用对象字面量申明对象的时候，不能够使用相同的键名
    "no-dupe-keys": "error",
    //在switch语句中，禁止使用相同的case值。
    "no-duplicate-case": "error",
    //为了消除代码中的空代码块，空代码块并不会导致技术性错误，但是在代码review时可能会代码疑惑。带空代码块中包含注释语句时，将不再视为错误。
    "no-empty": "error",
    //当错误发生并通过一个catch代码块去捕获错误时，有可能意外的重写了捕获的错误
    "no-ex-assign": "error",
    //尽管多余的分号不会导致代码错误，但是会使得代码难以理解
    "no-extra-semi": "error",
    //在通过函数声明书写函数时，函数被重写或者被重新赋值就会抛出错误。
    "no-func-assign": 2,
    //不要像函数一样调用Math和JSOM
    "no-obj-calls": "error",
    //在正则表达式中如果需要使用多个空格的时候，尽量使用量词，如{2}。而不是使用多个空格
    "no-regex-spaces": 2,
    //为了保证两行不相关的代码不会意外的被当做一行代码来解析了
    "no-unexpected-multiline": 2,
    //为了检测代码块、switch语句中不被使用到的代码
    "no-unreachable": 2,
    //不要和NaN做比较，而应该使用isNaN()
    "use-isnan": 2,
    //为了保证typeof 操作符返回的结果必须和 "undefined",  "object",  "boolean", "number", "string", 和  "function"作比较
    "valid-typeof": 2,
    "no-eval": "error",
    "no-delete-var": "error",
    //声明变量时不要覆盖JavaScript中的一些保留关键字
    "no-shadow-restricted-names": "error",
    //对象或者数组最后一个后面不加逗号
    "comma-dangle": [2, "never"],
    //定义数组字面量定义数组时，前后不加空格,var arr = ['foo', 'bar', 'baz'];
    "array-bracket-spacing": [2, "never"],
    //在单行代码块中，代码块前后需要留空白,if (foo) { bar = 0; }
    // "block-spacing": 2,
    //在这种写法中，if、else、try、catch都应该单独启一行
    "brace-style": [2, "stroustrup", { "allowSingleLine": true }],
    //代码块的开始和结尾是否应该留一个空行
    // padded-blocks: ["error", "always"],
    // 双峰驼命名格式
    "camelcase": 2,
    // 控制逗号前后的空格
    "comma-spacing": [2, { "before": false, "after": true }],
    //逗号应该放在行末
    "comma-style": [2, "last"],
    //在对象的动态属性（computed properties： ES6引入）中不添加空白
    "computed-property-spacing": [2, "never"],
    //冒号前面不留空白，后面有空格
    "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
    //单行注释前空行，后不空行，块注释前后都有空行
    // "lines-around-comment": ["error", { "beforeBlockComment": true, "afterBlockComment": true, "beforeLineComment": true, "afterLineComment": false }]
    //函数名和括号之间不能有空格
    "no-spaced-func": "error",
    //字符串使用单引号
    "quotes": ["error", "single"],
    //规定分号前后不加空格，后加空格
    "semi-spacing": ["error", {"before": false, "after": true}],
    // if, else, for, while, do, switch, try, catch, finally, and with后加空格
    "keyword-spacing": ["error", { "after": true }],
    //代码块前是否需要加空格
    "space-before-blocks": "error",
    //function 关键字后面的小括号前加空格。
    "space-before-function-paren": 2,
    //规定圆括号内部的空格, foo('bar');
    "space-in-parens": ["error", "never"],
    //在操作符左右添加空格
    "space-infix-ops": "error",
    //在代码注释符号后面加一个空格
    "spaced-comment": ["error", "always"],
    //单行最大长度120
    "max-len": ["error", 120],
    //不得省略语句结束的分号
    "semi": 2
  }
}

```

如果你也想根据团队的规范修改配置，可以查看[eslint中文文档](https://github.com/Jocs/ESLint_docs)

## 针对移动端的前端工作流(9)—字体图标的使用

### 字体图标很好用

图标类的图片一律采用字体图标的形式实现。

使用字体图标会有很多好处如：

1. 体积小： 一个图标字体比一系列的图像（特别是在Retina屏中使用双倍图像）要小。可以减少HTTP请求，还可以配合HTML5离线存储做性能优化。

2. 灵活性：图标字体可以用过font-size属性设置其任何大小，还可以加各种文字效果，包括颜色、Hover状态、透明度、阴影和翻转等效果。可以在任何背景下显示。而且不会像位图一样随着大小而变虚

3. 兼容性：网页字体支持所有现代浏览器

### 如何使用字体图标

1.到[http://www.iconfont.cn/](http://www.iconfont.cn/)，选择项目中用到的字体图，保存为一个项目，如下图：

![字体图标](docs/img/iconfont.png)

2.然后点击“下载至本地”，会下载一个iconfont压缩包，里面有示例代码和字体文件，将字体文件替换掉示例的字体文件，需要替换的字体文件共有四个：

![字体](docs/img/font.png)

3.在html文件中使用

``` html

<i class="icon">&#xe600;</i>

```

4.i标签里面的标示量可以在上上一个图中或者压缩包中的示例代码中获得

5.此外在开发的过程中为了避免重复的劳动，可以使用“获取在线链接”功能

## 针对移动端的前端工作流(10)—雪碧图

### 有这个需求

雪碧图是为了减少请求数，嗯，就这样。

### 雪碧图的实现

在`src/img`目录下有一个文件夹是sprite，放在这里的图片会生成一张雪碧图

开启`gulp`命令后，会实时监控sprite文件夹的变化，如果有变化，就会生成

1. `sprite.png`，放在`src/img`目录下。

2. 对应的`sprite.scss`，放在`src/scss/sprite`/下。

那么该如何使用呢？

### 举个例子

现在在sprite目录下有六张图片， 嗯，就是这奇怪的六张图，知道它在描述什么吗？哦，不重要……

![sprite前](docs/img/sprite-before.png)

执行`gulp`的命令的时候，就会根据六张图片，生成一个`sprite.png`到`src/img`目录下

![sprite后](docs/img/sprite-after.png)

同时生成对应的`sprite.scss`，放在`src/scss/sprite`/下,这是`sprite.scss`

``` css

/*
SCSS variables are information about icon's compiled state, stored under its original file name

.icon-home {
  width: $icon-home-width;
}

The large array-like variables contain all information about a single icon
$icon-home: x y offset_x offset_y width height total_width total_height image_path;

At the bottom of this section, we provide information about the spritesheet itself
$spritesheet: width height image $spritesheet-sprites;
*/
@mixin sprite-pic1 {
    background-position: -119px 0px;
}

@mixin sprite-pic2 {
    background-position: 0px 0px;
}

@mixin sprite-pic3 {
    background-position: -101px -102px;
}

@mixin sprite-pic4 {
    background-position: -220px 0px;
}

@mixin sprite-pic5 {
    background-position: 0px -102px;
}

@mixin sprite-pic6 {
    background-position: -220px -90px;
}

.sprite {
    background-image: url('../img/sprite.png');
    background-repeat: no-repeat;
    background-size: 303px 183px;
}

```

如何使用`sprite.scss`呢？

html文件：

``` html

<ul class="sprite-list">
    <li class="sprite sprite-item1"></li>
    <li class="sprite sprite-item2"></li>
    <li class="sprite sprite-item3"></li>
    <li class="sprite sprite-item4"></li>
    <li class="sprite sprite-item5"></li>
    <li class="sprite sprite-item6"></li>
</ul>

```

在`index.scss`文件中引入`sprite.scss`

``` css

@import "sprite/_sprite";

.sprite {
  width: 100px;
  height: 80px;
  float: left;
  margin-top: 20px;
  margin-bottom: 20px;
}

.sprite-item1 {
  @include sprite-pic1;
}

.sprite-item2 {
  @include sprite-pic2;
}

.sprite-item3 {
  @include sprite-pic3;
}

.sprite-item4 {
  @include sprite-pic4;
}

.sprite-item5 {
  @include sprite-pic5;
}

.sprite-item6 {
  @include sprite-pic6;
}

```

OK，在页面你就可以看见预览效果了。

![sprite预览](docs/img/sprite-example.png)

开启`gulp`命令后，命名窗口不需要关闭，gulp会实时监控sprite文件夹的变化，如果有变化，就会执行上述操作。

## 针对移动端的前端工作流(11)—文件的压缩、合并、内联、去缓存

### 项目要上线啦

以上讲的都是在开发时候会用到的功能，现在项目要上线啦，我们进行最终的构建。

执行`gulp build`命令，会在根目录下建立`build`目录，`build`目录里就是我们最终要上线的内容。

### Css、Js的压缩

Css文件的压缩使用的是[gulp-uglify](https://www.npmjs.com/package/gulp-uglify)

Js文件的压缩使用的是[gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)

在`build`目录中你可以找到压缩后的文件，有意思的是，即使一些文件你采用了合并的形式，照理说应该不会再单独压缩这些文件了，但是还是给你生成了一个单独压缩后的文件，这是因为还不能智能的判断出哪些文件合并或是内联了，所以就将所有的css、js文件又单独压缩了一遍。

### Css、Js的合并

文件的合并使用的是[gulp-useref](https://www.npmjs.com/package/gulp-useref)，让我们简单的看下语法：

在index.html文件中

Css文件的合并如下：

``` html

<!-- build:css combined/combined.css -->
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="widget/dialog/dialog.css">
<link rel="stylesheet" href="widget/loading/loading.css">
<!-- endbuild -->

```
在注释内的css文件会合并成一个`combined.css`在`build/combined`文件夹

Js文件的合并如下：

``` html

<!-- build:js combined/combined.js -->
<script src="static/js/zepto.js"></script>
<script src="static/js/deferred.js"></script>
<script src="static/js/callbacks.js"></script>
<script src="static/js/touch.js"></script>
<script src="static/js/util.js"></script>
<script src="widget/dialog/dialog.js"></script>
<script src="widget/loading/loading.js"></script>
<!-- endbuild -->

```
在注释内的js文件会合并成一个`combined.js`在`build/combined`文件夹

### Css、Js的内联

文件的内联使用的是[gulp-inline-source](https://www.npmjs.com/package/gulp-inline-source)，让我们简单的看下语法：

`src/index.html`：

``` html

<link rel="stylesheet" href="css/index.css" inline>

<script src="js/index.js" inline></script>

```
执行`gulp build`命令后

`build/index.html`：

``` html

    <style>@charset "UTF-8";.icon_lists,.sprite-list{margin-left:auto;margin-right:auto}.sprite{background-image:url("../img/sprite.png");background-repeat:no-repeat;background-size:4.04rem 2.44rem}.main{padding:.266667rem}.icon_lists{width:9.333333rem}.icon_lists li{float:left;width:1.333333rem;height:1.333333rem;text-align:center}.icon_lists .icon{font-size:.56rem;line-height:1.333333rem;margin:.133333rem 0;color:#333;transition:font-size .25s ease-out 0s}.icon_lists .icon:hover{font-size:1.333333rem}.base_list{text-align:center;font-size:.346667rem}.btn_wrap{margin-top:.266667rem}.sprite-list{width:8rem}.sprite{width:1.333333rem;height:1.066667rem;float:left;margin-top:.266667rem;margin-bottom:.266667rem}.sprite-item1{background-position:-1.586667rem 0}.sprite-item2{background-position:0 0}.sprite-item3{background-position:-1.346667rem -1.36rem}.sprite-item4{background-position:-2.933333rem 0}.sprite-item5{background-position:0 -1.36rem}.sprite-item6{background-position:-2.933333rem -1.2rem}</style>

    <script>var Project=function(){var t=function(){var t=$(this);if(!t.hasClass("disabled")){t.addClass("disabled");var n={time:3};$.ajax({url:"http://wiki.xyzphp.com/t.php",type:"POST",data:n,beforeSend:function(){lnv.iconloading("#submit_btn")}}).done(function(t){t="string"==typeof t?JSON.parse(t):t,200==t.status?0===t.data.length&&lnv.alert({title:"提示",content:"没有数据",alertBtnText:"确定",alertHandler:function(){alert("点击了确定")}}):alert("error")}).fail(function(t,n,a){alert("error")}).always(function(){lnv.destroyloading("#submit_btn"),t.removeClass("disabled")})}},n=function(){$("#submit_btn").on("tap",t)},a=function(){n()};return{init:a}}();</script>

```

### 去缓存

文件的去缓存使用的是[gulp-rev-append-all](https://www.npmjs.com/package/gulp-rev-append-all)，让我们简单的看下语法：

在执行`gulp build`的时候，所有的引用资源都会加上MD5戳。

`build/index.html`：

``` html

<script src="static/js/flexible.js?v=4474e0337b3aaeec9b5c6565e130f2e5"></script>

```

## 针对移动端的前端工作流(12)—可能遇到的问题

### 为啥没有图片压缩

在这套基础库里是没有图片压缩的，这是因为经过实践发现无论是`gulp-imagemin`还是`gulp-imageisux`压缩效果都不好，所以最终取消掉了图片压缩。

如果要使用图片压缩，可以到智图的[官网](http://zhitu.isux.us/)下载客户端，压缩图片。

### 为文件路径配置环境变量导致合并文件失败

在前后端未完全分离的情况下，需要给html页面配上如`$rooturl`的模板变量，这时候使用合并或者内联功能，因为不能获得准确的路径，所以会导致报错。

为了解决这个问题，我们提供了`config.json`文件，

举个例子：

如果配置了如`$rooturl`的模板变量，在`config.json`文件配置如下：

``` json

{
	"rooturl": "{$rooturl}/"
}

```

在执行`gulp build`命令的时候就会根据`config.json`中的配置，在html文件中先去除掉`{$rooturl}/`，再在最后的时候给所有的路径加上`{$rooturl}/`

## 针对移动端的前端工作流(13)—写在最后

### 压缩的最终结果

最终上线的文件，以示例代码为例，不计算图片的情况下单页引用资源大小在`73K`，单页请求数为`4个`，考虑到实际项目的开发，单页引用资源可以控制在`100K`内，请求数量可以控制在`8个`之内。

### 项目衡量标准

1. 开发规范

	1. Eslint没有报错

	2. 所有的图标使用字体图标

2. 性能要求

	1. 不计算图片大小的情况下单页引用资源总大小小于100K

	2. 不计算图片请求的情况下单页请求数小于8个

	3. 所有图片要经过智图压缩

3. 时间要求

	1. 活动类新人三天内完成开发，熟悉后两天内开发完成，特殊需求另讲。

### 写在最后

如果你能看到这里，让我诚挚的感谢您的关注！如果有不妥的地方，还请不吝指教。祝好！