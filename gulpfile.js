var gulp = require('gulp');
var server = require('gulp-webserver');
var sequence = require('gulp-sequence');
var cleanCss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var minjs = require('gulp-uglify');
var minhtml = require('gulp-htmlmin');

gulp.task('babel', function() {
    return gulp.src('src/js/script.js')
        .pipe(babel({
            presets: 'es2015'
        }))
        .pipe(gulp.dest('src/js'))
})
gulp.task('mincss', function() {
    return gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
})
gulp.task('minjs', function() {
    return gulp.src('src/js/*.js')
        .pipe(minjs())
        .pipe(gulp.dest('dist/js'))
})

gulp.task('minthml', function() {
    return gulp.src('src/index.html')
        .pipe(minhtml({
            collapseWhitespace: true, //压缩HTML
            minifyJS: true, //压缩页面JS
            minifyCSS: true
        }))
        .pipe(gulp.dest('dist'))
})

gulp.task('webserver', function() {
    return gulp.src('dist')
        .pipe(server({
            host: 'localhost',
            port: 8081,
            livereload: true,
            middleware: function(req, res, next) {

                //console.log(req.url);
                next()
            }
        }))
})

gulp.task('default', function(ck) {
    sequence(['babel', 'mincss', 'minjs', 'minthml'], 'webserver', ck)
})