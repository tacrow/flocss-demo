/*
 * flocss-demo gulpfile,js
 */
var gulp    = require('gulp');
var plumber = require("gulp-plumber");
var sass    = require('gulp-ruby-sass');
var csslint = require('gulp-csslint');
var runSequence = require('run-sequence');
var csslint = require('gulp-jshint');
var concat  = require("gulp-concat");
var uglify  = require("gulp-uglify");

var src = {
	scss:  'src/scss/**/*.scss',
	css:   'src/css',
	js:    'src/js/**/*.js',
	alljs: 'src/js/all.js'
}

// css task
gulp.task('sass', function() {
	return sass(src.scss, { style: 'expanded' })
	.pipe(plumber())
	.on('error', sass.logError)
	.pipe(gulp.dest(src.css));
});

gulp.task('csslint', function() {
	gulp.src(src.css)
	.pipe(plumber())
	.pipe(csslint())
	.pipe(csslint.reporter());
});

// js task
gulp.task('jshint', function() {
	return gulp.src(src.js)
	.pipe(plumber())
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('concat', function() {
	return gulp.src(src.js)
	.pipe(plumber())
	.pipe(concat('all.js'))
	.pipe(gulp.dest(src.js));
});

gulp.task('uglify', function() {
	return gulp.src(src.alljs)
	.pipe(plumber())
	.pipe(uglify({ preserveComments: 'some' }))
	.pipe(rename({ extname: '.min.js' }))
	.pipe(gulp.dest(src.js));
});

gulp.task('js', function(cb) {
	runSequence('jshint', 'concat', 'uglify');
});

// default
gulp.task('default', function() {
	gulp.watch(src.scss, ['sass']);
	gulp.watch(src.scss, ['csslint']);
	gulp.watch(src.js, ['js']);
});