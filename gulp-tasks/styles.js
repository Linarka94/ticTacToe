let argv = require('yargs').argv;
let autoprefixer = require('gulp-autoprefixer');
let browserSync = require('browser-sync');
let concat = require('gulp-concat');
let gulp = require('gulp');
let gulpif = require('gulp-if');
let sass = require('gulp-sass');

gulp.task('styles', function() {	
  return gulp.src([
    'src/styles/**/**/*.scss', 
    '!src/styles/libs.scss'
    ])
    .pipe(concat('styles.scss'))
    .pipe(gulpif( argv.p, sass({outputStyle: 'compressed'}).on('error', sass.logError)) )
    .pipe(gulpif( !argv.p, sass().on('error', sass.logError)) )
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({stream: true}))
});