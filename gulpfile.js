/*
 * flocss-demo gulpfile,js
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sass = require('gulp-ruby-sass');

var src = {
	scss:  'src/scss/**/*.scss',
	css:   'src/css/',
	allcss:'src/css/all.css',
	js:    'src/js/*.js',
	alljs: 'src/js/all_js/all.js',
	destjs:'src/js/all_js/',
}

// css task
gulp.task('sass', function() {
	return sass(src.scss, { style: 'expanded' })
	.pipe($.plumber())
	.pipe(gulp.dest(src.css));
});
gulp.task('csslint', function() {
	return gulp.src(src.allcss)
	.pipe($.plumber())
	.pipe($.csslint())
	.pipe($.csslint.reporter());
});
gulp.task('cssmin', function() {
	return gulp.src(src.allcss)
	.pipe($.plumber())
	.pipe($.cssmin())
	.pipe($.rename({ suffix: '.min' }))
	.pipe(gulp.dest(src.css));
});

// js task
gulp.task('jshint', function() {
	return gulp.src(src.js)
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish'));
});
gulp.task('concat', function() {
	return gulp.src(src.js)
	.pipe($.plumber())
	.pipe($.concat('all.js'))
	.pipe(gulp.dest(src.destjs));
});
gulp.task('uglify', function() {
	return gulp.src(src.alljs)
	.pipe($.plumber())
	.pipe($.uglify({ preserveComments: 'some' }))
	.pipe($.rename('all.min.js'))
	.pipe(gulp.dest(src.destjs));
});

// watch
gulp.task('watch', function() {
	gulp.watch(src.scss, ['sass']);
	gulp.watch(src.allcss, ['csslint']);
	gulp.watch(src.allcss, ['cssmin']);
	gulp.watch(src.js, ['jshint']);
	gulp.watch(src.js, ['concat']);
	gulp.watch(src.alljs, ['uglify']);
});

// build
gulp.task('build', function(callback) {
	runSequence('sass', ['csslint', 'cssmin'], 'jshint', ['concat', 'uglify'], callback);
});

// default
gulp.task('default', ['watch']);
