'use strict';

var gulp = require('gulp'),
	del = require('del'),
	path = require('path'),
	react = require('gulp-react'),
	webpackConfig = require('./webpack.config.js');

// Loads plugins
var $ = require('gulp-load-plugins')();

gulp.task('jsx', function () {
	return gulp.src('app/scripts/**/*.jsx')
    	// Turn React JSX syntax into regular javascript
		.pipe(react({harmony: true}))
		.pipe(gulp.dest('build/scripts/'));
});

gulp.task('webpack', function() {
	return $.webpack(webpackConfig)
			.pipe(gulp.dest('build/scripts/'));
});

gulp.task('javascript', function () {
	return gulp.src('app/scripts/**/*.js')
		.pipe(gulp.dest('build/scripts/'));
});

gulp.task('bower', function() {
	return $.bower()
			.pipe(gulp.dest('build/bower_components/'));
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('build'))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('build/images/'))
        .pipe($.size());
});

gulp.task('json', function() {
    gulp.src('app/scripts/json/**/*.json', {base: 'app/scripts'})
        .pipe(gulp.dest('build/scripts/'));
});

// Styles
gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
//            loadPath: ['app/bower_components']
            loadPath: process.cwd() + '/app/bower_components'
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('build/styles'))
        .pipe($.size());
});

gulp.task('clean', function(cb) {
//  return gulp.src([path.resolve(__dirname, 'build')], {read: false}).pipe($.clean({force: true}));
//	return gulp.src([path.resolve(__dirname, 'build')], {read: false}).pipe($.clean({force: true}));
//	return del([path.resolve(__dirname, 'build', '**')]);
//	del(['build'], cb);
	return cb(del.sync(['build']));
});

// Bundle
gulp.task('bundle', ['styles', 'bower', 'jsx', 'webpack', 'javascript'], function(){
	var assets = $.useref.assets();
    return gulp.src('./app/*.html')
               .pipe(assets)
               .pipe(assets.restore())
               .pipe($.useref())
               .pipe(gulp.dest('build'));
});

// Build
gulp.task('build', ['html', 'bundle', 'images']);

// Default task
gulp.task('default', ['clean', 'build']);

// Watch
gulp.task('watch', ['bundle'], function () {
	
	// Watch .jsx or .js files
	gulp.watch(['app/scripts/**/*.js', 'app/scripts/**/*.jsx'], ['jsx', 'javascript', 'webpack']);

    // Watch .json files
    gulp.watch('app/scripts/**/*.json', ['json']);

    // Watch .html files
    gulp.watch('app/**/*.html', ['html']);

    // Watch .scss files
    gulp.watch('app/styles/**/*.scss', ['styles']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);

    // Start up the server and have it reload when anything in the
    // ./build/ directory changes or the server.js file.
	$.nodemon({
		script: 'server.js',
		watch: ['build', 'server.js'],
	   	ext: 'js html',
		nodeArgs: ['--debug']
	});
});
