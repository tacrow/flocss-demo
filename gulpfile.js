/*
 * flocss-demo gulpfile.js
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var sass = require('gulp-ruby-sass');
var runSequence = require('run-sequence');

var stylelint = [
	require('stylelint'),
	require('postcss-reporter')({ clearMessages: true })
];

var cssnano = [
	require('cssnano')({ mergeRules: false })
];

var src = {
	scss:    'src/scss/**/*.scss',
	css:     'src/css/',
	css_all: 'src/css/all.css',
	css_ab:  'src/css/ab/*.css',
	js:      'src/js/*.js',
	alljs:   'src/js/all_js/all.js',
	destjs:  'src/js/all_js/',
}

// clean
gulp.task('clean', function(callback) {
	return del([src.css, src.destjs], callback);
});

// scss task
gulp.task('sass', function() {
	return sass(src.scss, { noCache: true, style: 'expanded' })
	.pipe($.plumber())
	.pipe(gulp.dest(src.css));
});

// css task
gulp.task('postcss-stylelint', function() {
	return gulp.src(src.css)
	.pipe($.plumber())
	.pipe($.postcss(stylelint))
});
gulp.task('postcss-cssnano', function() {
	return gulp.src(src.css_all)
	.pipe($.plumber())
	.pipe($.postcss(cssnano))
	.pipe($.rename({ suffix: '.min' }))
	.pipe(gulp.dest(src.css));
});

// js task
gulp.task('jshint', function() {
	return gulp.src(src.js)
	.pipe($.plumber())
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
	.pipe($.rename({ suffix: '.min' }))
	.pipe(gulp.dest(src.destjs));
});

// watch
gulp.task('watch', function() {
	gulp.watch(src.scss, ['sass']);
	gulp.watch(src.css_all, ['postcss-stylelint']);
	gulp.watch(src.css_all, ['postcss-cssnano']);
	gulp.watch(src.js, ['jshint']);
	gulp.watch(src.js, ['concat']);
	gulp.watch(src.alljs, ['uglify']);
});

// build
gulp.task('build', function(callback) {
	runSequence(
		'clean', 'sass', 'postcss-stylelint', 'postcss-cssnano',
		'jshint', 'concat', 'uglify', callback
	);
});

// default
gulp.task('default', ['watch']);
