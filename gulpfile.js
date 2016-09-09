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
    del = require('del'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    gulpNgConfig = require('gulp-ng-config'),
    ngAnnotate = require('gulp-ng-annotate');

//glue js files in one without minification



gulp.task('metr', function () {
    gulp.src([
        'app/sass/global/*.scss',
        'app/sass/global/**/*.scss',
        'app/sass/layouts/**/*.scss',
        'app/sass/layouts/**/**/*.scss'])
        .pipe(scss()).pipe(concat('metronic.css')).pipe(gulp.dest('css/'));
});
gulp.task('js', function () {
    gulp.src([
        "bower_components/jquery/jquery.js",
        "bower_components/angular/angular.js",
        "bower_components/angular-animate/angular-animate.js",
        "bower_components/angular-bootstrap/ui-bootstrap.js",
        "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
        "bower_components/angular-ui-router/release/angular-ui-router.js",
        "bower_components/angular-ui-router/release/angular-route.js",
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
        "vendor/js/onlynumbers.js",
        "vendor/js/bday-picker.js",
        "vendor/js/console-sham.js",
        "vendor/js/imageupload.js"
    ])
        //.pipe(ngAnnotate())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('js/'));

    gulp.src([
        'app/*.js',
        'app/config/*.js',
        'app/js/*.js',
        'app/app-services/*.js',
        'app/pages/**/*.js',
        'app/pages/**/**/*.js'
    ])
        //.pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('js/'));
});


//glue css files into one libs.css and one app.css
gulp.task('css', function () {
    gulp.src([
        "bower_components/bootstrap/dist/css/bootstrap.css",
        "vendor/css/font-awesome/css/font-awesome.css",
        "vendor/css/simple-line-icons/simple-line-icons.min.css",
        "bower_components/intl-tel-input/build/css/intlTelInput.css",
        "bower_components/angular-ui-select/dist/select.css",
        "bower_components/angular-bootstrap/ui-bootstrap-csp.css",
        "bower_components/ng-table/dist/ng-table.css",
        "vendor/css/select2.css"
    ])
        .pipe(concat('theme.css'))
        .pipe(gulp.dest('css/'));

    gulp.src([
        'app/sass/global/*.scss',
        'app/sass/global/**/*.scss',
        'app/sass/layouts/**/*.scss',
        'app/sass/layouts/**/**/*.scss'
    ])
        .pipe(scss()).pipe(concat('metronic.css')).pipe(gulp.dest('css/'));

    gulp.src([
        'app/pages/**/*.scss'
    ])
        .pipe(scss())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('css/'));

});

gulp.task('scss', function () {
    gulp.src(['app/pages/**/*.scss'])
        .pipe(scss())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('css/'));
});

gulp.task('config', function () {
    gulp.src('app/config/config.json')
        .pipe(gulpNgConfig('api.config'))
        .pipe(gulp.dest('app/config/'));
});

gulp.task('app', function () {
    gulp.src([
        'app/*.js',
        'app/**/*.js',
        'app/pages/**/*.js',
        'app/pages/**/**/*.js'
    ])
        //.pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('js/'));

    gulp.src([
        'app/sass/global/*.scss',
        'app/sass/global/**/*.scss',
        'app/sass/layouts/**/*.scss',
        'app/sass/layouts/**/**/*.scss'
    ])
        .pipe(scss()).pipe(concat('metronic.css')).pipe(gulp.dest('css/'));

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
        .pipe(gulp.dest('css/'))
        .pipe(reload({
            stream: true
        }))
        .pipe($.notify({
            message: 'Styles task complete'
        }));

});

gulp.task('watch', function () {
    gulp.watch(['app/*.js',
            'app/**/*.js', 'app/pages/**/*.js',
            'app/pages/**/*.scss',
            'app/sass/global/*.scss',
            'app/sass/global/**/*.scss',
            'app/sass/layouts/**/*.scss',
            'app/sass/layouts/**/**/*.scss'],
        ['app']);
});

// optimize images
gulp.task('images', function () {
    return gulp.src('./imag/**/*')
        .pipe($.changed('./build/dev/imag'))
        .pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('./build/dev/imag'));
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
 * build task:
 * 1. clean /_build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html
 * 6. minify and copy all JS files
 * 7. copy fonts
 * 8. show build folder size
 *

 gulp.task('build', function(callback) {
    runSequence(
        'clean:build',
        'sass:build',
        'images',
        'templates',
        'usemin',
        'fonts',
        'build:size',
        callback);
});
 */
gulp.task('dev', function (callback) {
    runSequence(
        'config',
        'js',
        'css',
        callback);
});
