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