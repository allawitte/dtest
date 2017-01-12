/**
 * @author  Jozef Butko
 * @url     www.jozefbutko.com/resume
 * @date    March 2015
 * @license MIT
 *
 * AngularJS Boilerplate: Build, watch and other useful tasks
 *
 * The build process consists of following steps:
 * 1. clean /_build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html
 * 6. minify and copy all JS files
 * 7. copy fonts
 * 8. show build folder size
 *
 */

var gulp = require('gulp'),
    scss = require('gulp-sass'),
    express = require('express'),
    cors = require('cors'),
    app = express(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    $ = require('gulp-load-plugins')(),
    uglify = require('gulp-uglify'),
    del = require('del'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    gulpNgConfig = require('gulp-ng-config'),
    minify = require('gulp-minify'),
    ngAnnotate = require('gulp-ng-annotate');

//initialisation of files arrays

var lib = [
    "bower_components/jquery/jquery.js",
    "bower_components/angular/angular.js",
    "bower_components/angular-animate/angular-animate.js",
    "bower_components/angular-bootstrap/ui-bootstrap.js",
    "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
    "bower_components/angular-ui-router/release/angular-ui-router.js",
    "bower_components/angular-ui-router/release/angular-route.js",
    "bower_components/angular-route/angular-route.js",
    "bower_components/angular-sanitize/angular-sanitize.js",
    "bower_components/angular-cookies/angular-cookies.js",
    "bower_components/angular-touch/angular-touch.js",
    "bower_components/intl-tel-input/build/js/intlTelInput.js",
    "bower_components/intl-tel-input/lib/libphonenumber/build/utils.js",
    "bower_components/ng-intl-tel-input/dist/ng-intl-tel-input.js",
    "bower_components/angular-ui-select/dist/select.js",
    "bower_components/ng-table/dist/ng-table.js",
    "bower_components/angularUtils-pagination/dirPagination.js",
    "vendor/js/translate.js",
    "vendor/js/angular-local-storage.js",
    "vendor/js/onlynumbers.js",
    "vendor/js/ng_only_number.js",
    "vendor/js/bday-picker.js",
    "vendor/js/console-sham.js",
    "vendor/js/imageupload.js",
    "vendor/js/moment.js",
    "vendor/js/ru.js",
    "vendor/js/sb-date-select.js",
    "bower_components/bootstrap-daterangepicker/daterangepicker.js",
    "bower_components/angular-daterangepicker/js/angular-daterangepicker.js"
];

var app = [
    'app/*.js',
    'app/config/*.js',
    'app/js/*.js',
    'app/app-services/*.js',
    'app/app-filters/*.js',
    'app/modules/*.js',
    'app/pages/**/*.js',
    'app/pages/**/**/*.js'
];

var metronic = [
    'app/sass/global/*.scss',
    'app/sass/global/**/*.scss',
    'app/sass/layouts/**/*.scss',
    'app/sass/layouts/**/**/*.scss',
    'app/sass/pages/**/*.scss',
    'app/sass/pages/**/**/*.scss'
];

var cssBower = [
    "bower_components/bootstrap/dist/css/bootstrap.css",
    "vendor/css/font-awesome/css/font-awesome.css",
    "vendor/css/simple-line-icons/simple-line-icons.min.css",
    "bower_components/intl-tel-input/build/css/intlTelInput.css",
    "bower_components/angular-ui-select/dist/select.css",
    "bower_components/angular-bootstrap/ui-bootstrap-csp.css",
    "bower_components/ng-table/dist/ng-table.css",
    "vendor/css/select2.css",
    "bower_components/bootstrap-daterangepicker/daterangepicker.css"
];
//glue js files in one without minification

gulp.task('js', function () {
    gulp.src(lib)
        //.pipe(ngAnnotate())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./'));

    gulp.src(app)
        //.pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./'));
});

//==============     product    ============================

gulp.task('clean:_prod', function (cb) {
    return del('./_prod');
});

gulp.task('l10n:prod', function() {
    gulp.src('app/l10n/*.json')
        .pipe(gulp.dest('./_prod/app/l10n/'));
});

gulp.task('index:prod', function() {
    gulp.src('./index.html')
        .pipe(gulp.dest('./_prod/'));
});

gulp.task('prod:templates', function() {
    return gulp.src([
        'app/pages/**/*.html',
        'app/pages/**/**/*.html'
    ])
        //.pipe(htmlmin())
        .pipe($.angularTemplatecache({
            module: 'app',
            root: 'app/pages/',
        }))
        .pipe(gulp.dest('./_prod/'));
});

gulp.task('img:prod', function() {
    return gulp.src('./img/*.*')
        //.pipe($.changed('./_prod/img'))
        /*.pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))*/
        .pipe(gulp.dest('./_prod/img'));
});

gulp.task('prod:js', function(){
    gulp.src(lib)
        .pipe(ngAnnotate())
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./_prod/'));

    gulp.src(app)
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./_prod/'));
});

gulp.task('prod:css', function(){
    gulp.src(cssBower)
        .pipe(concat('theme.css'))
        .pipe(minify())
        .pipe(gulp.dest('./_prod/'));

    gulp.src(metronic)
        .pipe(scss()).pipe(concat('metronic.css'))
        .pipe(minify())
        .pipe(gulp.dest('./_prod/'));

    gulp.src([
        'app/pages/**/*.scss'
    ])
        .pipe(scss())
        .pipe(concat('app.css'))
        .pipe(minify())
        .pipe(gulp.dest('./_prod/'));
});


gulp.task('prod:server', function (done) {
    return browserSync({
        server: {
            baseDir: './_prod/'
        }
    }, done);
});

gulp.task('prod:fonts', function(){
    gulp.src('./fonts/*.*')
        .pipe(gulp.dest('./_prod/fonts/'));
});

gulp.task('prod', function (callback) {
    runSequence(
        'config',
        'clean:_prod',
        'img:prod',
        'prod:templates',
        'prod:js',
        'prod:css',
        'index:prod',
        'l10n:prod',
        'prod:fonts',
        'prod:server',
        callback);
});
//==========  end of product  ===========
//glue css files into one libs.css and one app.css
gulp.task('css', function () {
    gulp.src(cssBower)
        .pipe(concat('theme.css'))
        .pipe(gulp.dest('./'));

    gulp.src(metronic)
        .pipe(scss()).pipe(concat('metronic.css')).pipe(gulp.dest('./'));

    gulp.src([
        'app/pages/**/*.scss'
    ])
        .pipe(scss())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./'));

});

gulp.task('scss', function () {
    gulp.src(['app/pages/**/*.scss'])
        .pipe(scss())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./'));
});

gulp.task('config', function () {
    gulp.src('app/config/config.json')
        .pipe(gulpNgConfig('api.config'))
        .pipe(gulp.dest('app/config/'));
});

gulp.task('app', function () {
    gulp.src(app)
        //.pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./'));

    gulp.src(metronic)
        .pipe(scss()).pipe(concat('metronic.css')).pipe(gulp.dest('./'));

    gulp.src([
        'app/pages/**/*.scss'
    ])
        //.pipe($.sourcemaps.init())
        .pipe(scss({style: 'expanded'}))
        .on('error', $.notify.onError({
            title: 'SASS Failed',
            message: 'Error(s) occurred during compile!'
        }))
        //.pipe($.sourcemaps.write())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./'))
        .pipe(reload({
            stream: true
        }))
        .pipe($.notify({
            message: 'Styles task complete'
        }));

});

//creating dev directory

gulp.task('templates', function() {
    return gulp.src([
        'app/pages/**/*.html',
        'app/pages/**/**/*.html'
    ])
        //.pipe(htmlmin())
        .pipe($.angularTemplatecache({
            module: 'app',
            root: 'app/pages/',
        }))
        .pipe(gulp.dest('_dev/'));
});

gulp.task('clean:_dev', function (cb) {
    return del('_dev');
});
gulp.task('img:dev', function() {
    return gulp.src('./img/*.*')
        //.pipe($.changed('./_dev/img'))
        .pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('./_dev/img'));
});
gulp.task('l10n:dev', function() {
    gulp.src('app/l10n/*.json')
        .pipe(gulp.dest('_dev/app/l10n/'));
});
gulp.task('index:dev', function() {
    gulp.src('./index.html')
        .pipe(gulp.dest('_dev/'));
});
gulp.task('fonts:dev', function() {
    gulp.src('./fonts/*.*')
        .pipe(gulp.dest('_dev/fonts/'));
});

gulp.task('dev:js', function(){
    gulp.src(lib)
        //.pipe(ngAnnotate())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('_dev/'));

    gulp.src(app)
        //.pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('_dev/'));
});

gulp.task('dev:css', function(){
    gulp.src(cssBower)
        .pipe(concat('theme.css'))
        .pipe(gulp.dest('_dev/'));

    gulp.src(metronic)
        .pipe(scss()).pipe(concat('metronic.css'))
        .pipe(gulp.dest('_dev/'));

    gulp.src([
        'app/pages/**/*.scss'
    ])
        .pipe(scss())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('_dev/'));
});

gulp.task('dev:server', function (done) {
    return browserSync({
        server: {
            baseDir: './_dev/'
        }
    }, done);
});

gulp.task('dev:app', function () {
    gulp.src(app)
        //.pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('/_dev/'));

    gulp.src(metronic)
        .pipe(scss()).pipe(concat('metronic.css')).pipe(gulp.dest('/_dev/'));

    gulp.src([
        'app/pages/**/*.scss'
    ])
        .pipe(scss({style: 'expanded'}))
        .on('error', $.notify.onError({
            title: 'SASS Failed',
            message: 'Error(s) occurred during compile!'
        }))
        //.pipe($.sourcemaps.write())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('/_dev/'))
        .pipe(reload({
            stream: true
        }))
        .pipe($.notify({
            message: 'Styles task complete'
        }));

});

gulp.task('dev:watch', function () {
    gulp.watch(['app/*.js',
        'app/**/*.js', 'app/pages/**/*.js',
        'app/pages/**/*.scss',
        'app/sass/global/*.scss',
        'app/sass/global/**/*.scss',
        'app/sass/layouts/**/*.scss',
        'app/sass/layouts/**/**/*.scss',
        'app/sass/pages/**/*.scss',
        'app/sass/pages/**/**/*.scss'
    ],['dev:app']);
    gulp.watch([
        'app/pages/**/*.html',
        'app/pages/**/**/*.html'
    ],['templates']);
    gulp.watch(['index.html'],['index:dev']);
    gulp.watch(['img/*.*'],['img:dev']);
    gulp.watch(['app/l10n/*.json'],['l10n:dev']);

});


//  end of creating dev directory

gulp.task('watch', function () {
    gulp.watch(['app/*.js',
            'app/**/*.js', 'app/pages/**/*.js',
            'app/pages/**/*.scss',
            'app/sass/global/*.scss',
            'app/sass/global/**/*.scss',
            'app/sass/layouts/**/*.scss',
            'app/sass/layouts/**/**/*.scss',
            'app/sass/pages/**/*.scss',
            'app/sass/pages/**/**/*.scss'
    ],['app']);
});

// start webserver
gulp.task('server', function (done) {
    return browserSync({
        server: {
            baseDir: './'
        }
    }, done);
});


/**
 * dev task:
 * 1. clean /_dev folder
 * 2. compile SASS files
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html
 * 6. concat and copy all JS files
 * 7. copy fonts
 */
gulp.task('dev', function (callback) {
    runSequence(
        'config',
        'clean:_dev',
        'index:dev',
        'img:dev',
        'l10n:dev',
        'templates',
        'dev:js',
        'dev:css',
        'fonts:dev',
        'dev:watch',
        'dev:server',
        callback);
});
