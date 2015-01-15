'use strict';

var gulp = require('gulp'),
	del = require('del'),
	path = require('path'),
	react = require('gulp-react'),
	webpackConfig = require('./webpack.config.js');

// Loads plugins
var $ = require('gulp-load-plugins')();

// Copy jsx files to destination and convert to js
gulp.task('jsx', function () {
	return gulp.src('app/scripts/**/*.jsx')
    	// Turn React JSX syntax into regular javascript
		.pipe(react({harmony: true}))
		.pipe(gulp.dest('build/scripts/'));
});

// Bundle jsx files
gulp.task('webpack', function() {
	return $.webpack(webpackConfig)
		// gulp-webpack needs to pipe to dest
		.pipe(gulp.dest('build/scripts/'));
});

// Copy js files to destination
gulp.task('javascript', function () {
	return gulp.src('app/scripts/**/*.js')
		.pipe(gulp.dest('build/scripts/'));
});

// Copy bower files to destination
gulp.task('bower', function() {
    gulp.src('app/bower_components/**/*.js', {base: 'app/bower_components'})
        .pipe(gulp.dest('build/bower_components/'));
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('build'));
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('build/images/'));
});

//// Styles
//gulp.task('styles', function () {
//    return gulp.src('app/styles/main.scss')
//        .pipe($.rubySass({
//            style: 'expanded',
//            precision: 10,
//            loadPath: process.cwd() + '/app/bower_components'
//        }))
//        .pipe($.autoprefixer('last 5 version'))
//        .pipe(gulp.dest('build/styles'));
//});

gulp.task('css', function () {
	return gulp.src('app/styles/main.css')
		.pipe(gulp.dest('build/styles'));
});

gulp.task('clean', function(cb) {
	return cb(del.sync(['build']));
});

// Bundle
gulp.task('bundle', ['images', 'html', 'css', 'bower', 'jsx', 'webpack', 'javascript'], function(){
	var assets = $.useref.assets();
    return gulp.src('app/*.html')
               .pipe(assets)
               .pipe(assets.restore())
               .pipe($.useref())
               .pipe(gulp.dest('build'));
});

// Default task
gulp.task('default', ['clean', 'bundle']);

// Watch
gulp.task('watch', ['bundle'], function () {
	
	// Watch .jsx or .js files
	gulp.watch(['app/scripts/**/*.js', 'app/scripts/**/*.jsx'], ['jsx', 'javascript', 'webpack']);

    // Watch .html files
    gulp.watch('app/**/*.html', ['html']);

    // Watch .scss files
//    gulp.watch('app/styles/**/*.scss', ['styles']);
	
    // Watch .css files
    gulp.watch('app/styles/**/*.css', ['css']);

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
