let browserSync = require('browser-sync');
let gulp = require('gulp');

gulp.task('fonts', () => {
  gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('public/assets/fonts'))
    .pipe(browserSync.reload({stream: true}))
});
