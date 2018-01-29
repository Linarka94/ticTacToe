let gulp = require('gulp');
let postcss = require('gulp-postcss');
let reporter = require('postcss-reporter');
let syntax_scss = require('postcss-scss');
let stylelint = require('stylelint');

gulp.task('style-lint', () => {
  let processors = [
    stylelint({configFile: 'stylelintrc.json', fix: true}),
    reporter({
      clearMessages: true,
      throwError: false
    })
  ];

  return gulp.src('src/styles/**/*.scss')
    .pipe(postcss(processors, {syntax: syntax_scss}))
});