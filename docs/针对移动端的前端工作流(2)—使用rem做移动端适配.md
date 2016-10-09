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