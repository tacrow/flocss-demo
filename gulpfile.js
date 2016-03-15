/*
 * flocss-demo gulpfile,js
 */
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-ruby-sass');
var csslint = require('gulp-csslint');
var cssmin  = require('gulp-cssmin');
var rename  = require('gulp-rename');

var src = {
	scss:  'src/scss/**/*.scss',
	css:   'src/css/',
	appcss:'src/css/app.css'
}

// css task
gulp.task('sass', function() {
	return sass(src.scss, { style: 'expanded' })
	.pipe(plumber())
	.pipe(gulp.dest(src.css));
});
gulp.task('csslint', function() {
	return gulp.src(src.appcss)
	.pipe(plumber())
	.pipe(csslint())
	.pipe(csslint.reporter());
});
gulp.task('cssmin', function() {
	return gulp.src(src.appcss)
	.pipe(plumber())
	.pipe(cssmin())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest(src.css));
});

// watch
gulp.task('watch', function() {
	gulp.watch(src.scss, ['sass']);
	gulp.watch(src.appcss, ['csslint']);
	gulp.watch(src.appcss, ['cssmin']);
});

// default
gulp.task('default', ['watch']);
