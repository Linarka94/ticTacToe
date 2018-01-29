let gulp = require('gulp');
let browserSync = require('browser-sync');

gulp.task('watch', () => {
 gulp.watch('src/views/**/**/*.pug', ['views'])
 gulp.watch('public/*.html', browserSync.reload)
 gulp.watch('src/styles/**/**/*.scss', ['styles'])
 gulp.watch('src/scripts/**/*.js', ['scripts'])
 gulp.watch('src/images/**/*.png', ['images'])
 gulp.watch('src/images/svg/**/*.svg', ['images']);
});