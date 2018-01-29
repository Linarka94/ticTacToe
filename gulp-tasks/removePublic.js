let del = require('del');
let gulp = require('gulp');

gulp.task('removePublic', () => {
	return del.sync('public');
});
