var gulp = require('gulp');
var typescript = require('gulp-tsc');
var sass = require('gulp-sass');

var distFolder = './wwwroot/DistAppComponents/';
var compFolder = './AppComponents/**/*';
 
gulp.task('moveToLibs', function () {
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

gulp.task('compileTS', function() {
    typescript();
});

gulp.task('compileSass', function() {
    gulp.src(compFolder + 'scss', { base: "./" })
        .pipe(sass())
    .pipe(gulp.dest("."));

});

gulp.task('generateDist', function() {
    gulp.src([compFolder, '!AppComponents/**/*.ts', '!AppComponents/**/*.scss', '!AppComponents/**/*.map'])
        .pipe(gulp.dest(distFolder));
});

gulp.task('watch', function () {
    gulp.watch(compFolder, ['compileSass', 'compileTS', 'generateDist']);
});

gulp.task('default', ['watch','compileSass', 'compileTS', 'generateDist']);