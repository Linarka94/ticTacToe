let argv = require('yargs').argv;
let babel = require('gulp-babel');
let browserSync = require('browser-sync');
let concat = require('gulp-concat');
let gulp = require('gulp');
let gulpif = require('gulp-if');
let uglify = require('gulp-uglifyjs');

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
  .pipe(babel( { presets: ['es2015'] } ))
  .pipe(concat('scripts.js'))
  .pipe(gulpif(argv.p, uglify() )).on('error', function(error) {
    console.error(error.message);
    console.log('------------------------------------------- \n \n');
    this.emit('end');
  })
  .pipe(gulp.dest('public'))
  .pipe(browserSync.reload({stream: true}));
});