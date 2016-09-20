// Gulp 3.9
var gulp = require('gulp');
var sass = require('gulp-sass'); //sass编译
var autoprefixer = require('gulp-autoprefixer'); //自动处理浏览器前缀
var postcss = require('gulp-postcss'); //postcss
var px2rem = require('postcss-px2rem'); //pxtorem
var notify = require("gulp-notify"); //消息通知
var fileinclude = require('gulp-file-include'); //include
var precompile = require('gulp-handlebars-precompile'); //提取handlebars模板
var del = require("del"); // del
var gulpSequence = require('gulp-sequence'); //同步异步执行代码
var gutil = require('gulp-util'); //util
var inlinesource = require('gulp-inline-source'); //内联
var replace = require('gulp-replace');
var useref = require('gulp-useref'); //文件合并和替换
var gulpif = require('gulp-if'); //if
var uglify = require('gulp-uglify'); //js压缩
var minifyCss = require('gulp-minify-css'); //css压缩
// var imagemin = require('gulp-imagemin'); //图片压缩
var rev = require('gulp-rev-append-all'); //MD5戳
var eslint = require('gulp-eslint'); //eslint
var spritesmith = require('gulp.spritesmith'); //sprite
var plumber = require('gulp-plumber');
var buffer = require('vinyl-buffer');
var merge = require('merge-stream');
var cheerio = require('gulp-cheerio');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var handleErrors = require('./gulp/util/handleError');
var config = require('./config.json');

var path = {
    dirs: {
        src: "src/",
        dev: "dev/",
        build: "build/"
    },
    src: {
        static: "src/static/",
        scss: "src/scss/",
        js: "src/js/",
        widget: "src/widget/",
        font: "src/font/",
        include: "src/include/",
        tpl: "src/tpl/",
        img: "src/img/"
    },
    dev: {
        static: "dev/static/",
        css: "dev/css/",
        js: "dev/js/",
        widget: "dev/widget/",
        font: "dev/font/",
        img: "dev/img/"
    },
    build: {
        static: "build/static/",
        css: "build/css/",
        js: "build/js/",
        widget: "build/widget/",
        font: "build/font/",
        img: "build/img/"
    }
};

/**
 * 开发
 * 1. sass编译
 * 2. 自动处理浏览器前缀
 * 3. px2rem
 */

gulp.task('dev_sass', function() {

    var processors = [px2rem({ remUnit: 75 })];

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

/**
 * 开发
 * 清除dev目录
 */

gulp.task('dev_clean', function() {

    return del([path.dirs.dev + '*']);

});

/**
 * 开发
 * include
 */
gulp.task('dev_html', function() {

    return gulp.src(path.dirs.src + "*.html")
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .on('error', handleErrors)
        .pipe(precompile({
            reg: /<!\-\-hbs\s+"([^"]+)"\-\->/g,
            baseSrc: "src/tpl/",
            dest: "dev/tpl/",
            scriptSrc: 'tpl/',
            inline: true
        }))
        .pipe(gulp.dest(path.dirs.dev))
        .pipe(notify({
            message: 'html文件编译成功'
        }));

});

/**
 * 开发
 * 初始化dev,移动文件
 */

gulp.task('dev_others:static', function() {

    return gulp.src(path.src.static + "**/*.*")
        .pipe(gulp.dest(path.dev.static))
        .pipe(notify({
            message: 'static文件移动成功'
        }));

});

gulp.task('dev_others:js', function() {

    return gulp.src(path.src.js + "**/*.*")
        .pipe(gulp.dest(path.dev.js))
        .pipe(notify({
            message: 'js文件移动成功'
        }));

});


gulp.task('dev_others:widget', function() {

    return gulp.src(path.src.widget + "**/*.*")
        .pipe(gulp.dest(path.dev.widget))
        .pipe(notify({
            message: 'widget文件移动成功'
        }));

});

gulp.task('dev_others:font', function() {

    return gulp.src(path.src.font + "*.*")
        .pipe(gulp.dest(path.dev.font))
        .pipe(notify({
            message: 'font文件移动成功'
        }));

});



/**
 * 开发
 * imgmin
 */

gulp.task('dev_img', function() {

    return gulp.src(path.src.img + "**/*.*")
        // .pipe(imagemin())
        .pipe(gulp.dest(path.dev.img))
        .pipe(notify({
            message: '图片压缩成功'
        }));

});

/**
 * 开发
 * eslint
 */

gulp.task('dev_lint', function() {

    return gulp.src(path.src.js + "**/*.js")
        .pipe(eslint())
        .pipe(plumber())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on("error", notify.onError({
            message: "具体错误请查看终端",
            title: "代码不规范"
        }));

});

/**
 * 开发
 * sprite
 */

gulp.task('dev_sprite', function() {

    // Generate our spritesheet
    var spriteData = gulp.src(path.src.img + "sprite/**/*.*").pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        padding: 20, // 图标之间的距离
        algorithm: 'binary-tree', // 图标的排序方式
        cssTemplate: './gulp/sprite/handlebarsInheritance.scss.handlebars' // 模板
    }));

    // Pipe image stream through image optimizer and onto disk
    var imgStream = spriteData.img
        // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(buffer())
        // .pipe(imagemin())
        .pipe(gulp.dest(path.src.img));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
        .pipe(gulp.dest(path.src.scss + "sprite"));

    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);

});


gulp.task('watch:html', function() {

    gulp.watch(path.dirs.src + "*.html", ['dev_html']);

});

gulp.task('watch:include', function() {

    gulp.watch(path.src.include + "**/*.*", ['dev_html']);

});

gulp.task('watch:tpl', function() {

    gulp.watch(path.src.tpl + "**/*.*", ['dev_html']);

});

gulp.task('watch:scss', function() {

    gulp.watch(path.src.scss + "**/*.scss", ['dev_sass']);

});

gulp.task('watch:js', function() {

    gulp.watch(path.src.js + "**/*.js", ['dev_lint']);

});

gulp.task('watch:sprite', function() {

    gulp.watch(path.src.img + "sprite/**/*.*", ['dev_sprite']);

});

gulp.task('watch:others', function() {

    gulp.watch([
        path.src.js + "**/*.*",
        path.src.static + "**/*.*",
        path.src.widget + "**/*.*",
        path.src.font + "*.*",
        path.src.img + "**/*.*"
    ], function(event) {

        switch (event.type) {

            case 'deleted':

                //之所以删除再移动，是为了防止重命名文件只导致的文件删除的问题
                gutil.log(event.path + " deleted")

                var tmp = event.path.replace(/src/, 'dev');
                del([tmp]);

                //获取所在的文件夹名称
                var target = event.path.match(/src[\/|\\](.*?)[\/|\\]/)[1];

                gulp.src(path.dirs.src + target + "/**/*.*")
                    .pipe(gulp.dest(path.dirs.dev + target))

                break;

            case 'added':

                gutil.log(event.path + " added")

                var target = event.path.match(/src[\/|\\](.*?)[\/|\\]/)[1];

                gulp.src(path.dirs.src + target + "/**/*.*")
                    .pipe(gulp.dest(path.dirs.dev + target))

                break;

            case 'changed':

                gutil.log(event.path + " changed")

                var target = event.path.match(/src[\/|\\](.*?)[\/|\\]/)[1];

                gulp.src(path.dirs.src + target + "/**/*.*")
                    .pipe(gulp.dest(path.dirs.dev + target))

                break;

        }

    });

});

gulp.task('watch:dev', function() {

    gulp.watch(path.dirs.dev + "**/*.*").on('change', reload);

});

/**
 * 开发
 * 静态服务器
 */

gulp.task('browser-sync', function() {

    return browserSync.init({
        server: {
            baseDir: "./dev/"
        }
    });

});

gulp.task('default', gulpSequence(
    ['dev_clean'], ['dev_html', 'dev_sass', 'dev_others:static', 'dev_others:js', 'dev_others:widget', 'dev_others:font', 'dev_img', 'dev_sprite'], ['watch:html', 'watch:include', 'watch:scss', 'watch:others', 'watch:dev', 'watch:js', 'watch:sprite', 'watch:tpl'], ['browser-sync']
));

var condition = false;

if (!!config.rooturl) {

    var regstr = config.rooturl.replace(/(\$|\/)/g, function(str) {
        return "\\" + str;
    })

    var reg = new RegExp(regstr, "g");

    condition = true;

}

/**
 * 生产
 * 内联Css和Js
 * 合并js和css
 */

gulp.task('dist_html', function() {

    return gulp.src(path.dirs.dev + "*.html")
        // .pipe(replace(reg, ''))
        .pipe(gulpif(condition, replace(reg, '')))
        .pipe(inlinesource())
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest(path.dirs.build));

});

gulp.task('dist_html:rooturl', function() {

    return gulp.src(path.dirs.build + "*.html")
        .pipe(gulpif(condition, cheerio({

            run: function($, file) {

                $("link").each(function() {
                    var link = $(this).attr("href");
                    var newlink = config.rooturl + link;
                    $(this).attr("href", newlink);
                })

                $("script").each(function() {
                    var link = $(this).attr("src");
                    if (link) {
                        var newlink = config.rooturl + link;
                        $(this).attr("src", newlink);
                    }

                })

                $("img").each(function() {
                    var link = $(this).attr("src");
                    if (link) {
                        var newlink = config.rooturl + link;
                        $(this).attr("src", newlink);
                    }

                })
            },
            parserOptions: {
                decodeEntities: false
            }
        })))
        .pipe(gulp.dest(path.dirs.build));


});

/**
 * 生产
 * 压缩CSS
 */

gulp.task('dist_css', function() {
    return gulp.src(path.dev.css + "**/*.css")
        .pipe(minifyCss())
        .pipe(gulp.dest(path.build.css))
        .pipe(notify({
            message: 'css移动压缩成功'
        }));
});

/**
 * 生产
 * 压缩js
 */

gulp.task('dist_js', function() {
    return gulp.src(path.dev.js + "**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(notify({
            message: 'js压缩成功'
        }));
});

/**
 * 生产
 * 移动static
 */

gulp.task('dist_static', function() {
    return gulp.src(path.dev.static + "**/*.*")
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest(path.build.static))
        .pipe(notify({
            message: 'static移动成功'
        }));
});

/**
 * 生产
 * 移动widget
 */

gulp.task('dist_widget', function() {
    return gulp.src(path.dev.widget + "**/*.*")
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest(path.build.widget))
        .pipe(notify({
            message: '组件移动成功'
        }));
});

/**
 * 生产
 * 移动font
 */

gulp.task('dist_font', function() {
    return gulp.src(path.dev.font + "**/*.*")
        .pipe(gulp.dest(path.build.font))
        .pipe(notify({
            message: '字体文件移动成功'
        }));
});

/**
 * 生产
 * 移动img
 */

gulp.task('dist_img', function() {
    return gulp.src(path.dev.img + "**/*.*")
        .pipe(gulp.dest(path.build.img))
        .pipe(notify({
            message: '图片移动成功'
        }));
});

/**
 * 生产
 * 清除build目录
 */

gulp.task('dist_clean', function() {
    return del([path.dirs.build + "*"]);
});

/**
 * 生产
 * 添加版本号
 */

gulp.task('dist_rev', function() {
    return gulp.src(path.dirs.build + "*.html")
        .pipe(rev())
        .pipe(gulp.dest(path.dirs.build));
});

// gulp.task('build', gulpSequence(
//     ['dist_clean'], ['dist_html', 'dist_css', 'dist_js', 'dist_static', 'dist_widget', 'dist_font', 'dist_img'], ['dist_rev'], ['dist_html:rooturl']
// ));


gulp.task('build', gulpSequence(
    ['dev_clean'],
    ['dev_html', 'dev_sass', 'dev_others:static', 'dev_others:js', 'dev_others:widget', 'dev_others:font', 'dev_img', 'dev_sprite'],
    ['dist_clean'],
    ['dist_html', 'dist_css', 'dist_js', 'dist_static', 'dist_widget', 'dist_font', 'dist_img'],
    ['dist_rev'],
    ['dist_html:rooturl']

));



//build
gulp.task('browser-sync-build', function() {

    browserSync.init({
        server: {
            baseDir: "./build/",
        },
        port: "4000"
    });

});
