var gulp = require('gulp');

var devPath = './wwwroot/dev/';
var appProd = './wwwroot/dest/';
var stylesPath = './wwwroot/styles/';

/* Mixed */
var ext_replace = require('gulp-ext-replace');

/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');

/* JS & TS */
var jsuglify = require('gulp-uglify');
var typescript = require('gulp-typescript');

/* Images */
var imagemin = require('gulp-imagemin');

var tsProject = typescript.createProject('tsconfig.json');

gulp.task('build-css', function () {
    return gulp.src(stylesPath + '*.scss')
        .pipe(sourcemaps.init())
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest(stylesPath));
});

gulp.task('build-ts', function () {
    return gulp.src(devPath + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        //.pipe(jsuglify())
        .pipe(gulp.dest(appProd));
});

gulp.task('build-img', function () {
    return gulp.src(stylesPath + 'img/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(stylesPath + 'img/'));
});

gulp.task('watch', function () {
    gulp.watch(devPath + '**/*.ts', ['build-ts']);
    gulp.watch(stylesPath + 'scss/**/*.scss', ['build-css']);
    gulp.watch(stylesPath + 'img/*', ['build-img']);
});

gulp.task('moveToLibs', function (done) {
    gulp.src([
      'node_modules/angular2/bundles/js',
      'node_modules/angular2/bundles/angular2.*.js*',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/angular2/bundles/http.*.js*',
      'node_modules/angular2/bundles/router.*.js*',
      'node_modules/es6-shim/es6-shim.min.js*',
      'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
      'node_modules/systemjs/dist/*.*',
      'node_modules/jquery/dist/jquery.*js',
      'node_modules/bootstrap/dist/js/bootstrap*.js',
      'node_modules/rxjs/bundles/Rx.js'
    ]).pipe(gulp.dest('./wwwroot/libs/'));

    gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.css'
    ]).pipe(gulp.dest('./wwwroot/libs/css'));
});

gulp.task('default', ['watch', 'build-ts', 'build-css']);