var gulp = require('gulp')
  , gutil = require('gulp-util')
  , del = require('del')
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , minifycss = require('gulp-minify-css')
  , minifyhtml = require('gulp-minify-html')
  , processhtml = require('gulp-processhtml')
  , jshint = require('gulp-jshint')
  , uglify = require('gulp-uglify')
  , connect = require('gulp-connect')
  , paths;

paths = {
  assets: 'src/assets/**/*',
  css:    ['src/css/*.css', 'src/bower_components/modal/stylesheets/jquery.modal.css'],
  libs:   [
    'src/bower_components/phaser-official/build/phaser.min.js',
    'src/bower_components/jquery/dist/jquery.min.js',
    'src/bower_components/modal/javascripts/jquery.modal.js',
    'src/bower_components/phaser-state-transition-plugin/dist/phaser-state-transition-plugin.js'
  ],
  js:     ['src/js/**/*.js'],
  dist:   './dist/',
  favicon:'src/favicon.ico'
};

gulp.task('clean', function (cb) {
  del([paths.dist], cb);
});

gulp.task('copy-assets', ['clean'], function () {
  gulp.src(paths.favicon)
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);

  gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dist + 'assets'))
    .on('error', gutil.log);
});

gulp.task('copy-vendor', ['clean'], function () {
  gulp.src(paths.libs)
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('uglify', ['clean','lint'], function () {
  gulp.src(paths.js)
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify({outSourceMaps: false}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minifycss', ['clean'], function () {
 gulp.src(paths.css)
    .pipe(minifycss({
      keepSpecialComments: false,
      removeEmpty: true
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('processhtml', ['clean'], function() {
  gulp.src('src/index.html')
    .pipe(processhtml({}))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('minifyhtml', ['clean'], function() {
  gulp.src('dist/index.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('lint', function() {
  gulp.src(paths.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .on('error', gutil.log);
});

gulp.task('html', function(){
  gulp.src('src/*.html')
    .pipe(connect.reload())
    .on('error', gutil.log);
});

gulp.task('connect', function () {
  var port = require('yargs').argv.port;
  if(port === undefined)
    port = 80;
  connect.server({
    root: [__dirname + '/dist'],
    port: port,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['lint']);
  gulp.watch(['./src/index.html', paths.css, paths.js], ['html']);
});

gulp.task('build', ['copy-assets', 'copy-vendor', 'uglify', 'minifycss', 'processhtml', 'minifyhtml']);
gulp.task('dev', ['build', 'connect', 'watch']);
gulp.task('default', ['build', 'connect']);
