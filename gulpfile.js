const 
    gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    include = require('gulp-file-include'),
    mediaCss = require('gulp-group-css-media-queries'),
    cleanCss = require('gulp-clean-css'),
    uglifyJs = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    del = require('del');

const preproc = sass;

const path = {
    build: {
        html: './app/build/',
        css: './app/build/css/',
        fonts: './app/build/fonts/',
        images: './app/build/images/',
        js: './app/build/js/'
    } ,
    src: {
        html: './app/src/*.html',
        htmlInclude: './app/src/html/',
        preproc: './app/src/css-sass-less/*.+(css|sass|scss|less)',
        css: './app/src/css/',
        fonts: './app/src/fonts/**/*.*',
        images: './app/src/images/**/*.*',
        js: './app/src/js/**/*.*'
    },
    watch: {
        html: './app/src/**/*.html',
        preproc: './app/src/css-sass-less/**/*.+(css|sass|scss|less)',
        fonts: './app/src/fonts/**/*.*',
        images: './app/src/images/**/*.*',
        js: './app/src/js/**/*.*'
    },
    del: {
        build: './app/build/',
    }
}

const configServer = {
    server: {
        baseDir: './app/build/',
    },
    tunnel: false,
    nitify: false,
    host: 'localhost',
    port: 9000,
}

const htmlBuild = function(){
    return gulp
        .src(path.src.html)
        .pipe(include({
            prefix: '@@',
            basepath: path.src.htmlInclude,
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({
            stream: true
        }));
}
exports.htmlBuild = gulp.series(htmlBuild);
// ==========================
const styleBuild = function(){
    return gulp
        .src(path.src.preproc)
        .pipe(preproc())
        .pipe(mediaCss())
        .pipe(prefixer({ 
            cascade: true,
            flexbox: true,
        }))
        .pipe(gulp.dest(path.src.css))
        .pipe(cleanCss())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({
            stream: true,
        }))
}
exports.styleBuild = gulp.series(styleBuild);
// ==========================
const fontsBuild = function(){
    return gulp
        .src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({
            stream: true,
        }))
}
exports.fontsBuild = gulp.series(fontsBuild);
// ==========================
const imagesBuild = function(){
    return gulp
        .src(path.src.images)
        .pipe(gulp.dest(path.build.images))
        .pipe(reload({
            stream: true,
        }))
}
exports.imagesBuild = gulp.series(imagesBuild);
// ==========================
const jsBuild = function(){
    return gulp
        .src(path.src.js)
        // .pipe(uglifyJs())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({
            stream: true,
        }))
}
exports.jsBuild = gulp.series(jsBuild);
// ==========================
const delBuild = function(){
    return del(path.del.build);
}
exports.delBuild = gulp.series(delBuild);
// ==========================
const watcher = function(){
    gulp.watch(path.watch.html, htmlBuild);
    gulp.watch(path.watch.preproc, styleBuild);
    gulp.watch(path.watch.fonts, fontsBuild);
    gulp.watch(path.watch.images, imagesBuild);
    gulp.watch(path.watch.js, jsBuild);
}
exports.watcher = gulp.series(watcher);
// ==========================
const server = function(){
    return browserSync(configServer);
}
exports.server = gulp.series(server);
// ==========================
exports.build = gulp.series(
    delBuild,
    gulp.parallel(htmlBuild, styleBuild, fontsBuild, imagesBuild, jsBuild)
)

gulp.task('default', gulp.series(
    exports.build,
    gulp.parallel(server, watcher),
))
