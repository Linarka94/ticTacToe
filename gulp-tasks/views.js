let gulp = require('gulp');
let pug = require('gulp-pug');
let browserSync = require('browser-sync');

gulp.task('views', () => {	
	return gulp.src('src/views/*.pug')
			.pipe(pug()).on('error', function(error) {
        console.error(error.message);
        console.log('------------------------------------------- \n \n');
        this.emit('end');
    }) 
			.pipe(gulp.dest('public'))
			.pipe(browserSync.reload({stream: true}))
});
