var paths = {
 'SOURCE': './sass/',
 'DESTINATION': './css/',
 'BOWER': './bower_components/'
}

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    del = require('del');

gulp.task('styles', function() {
  return gulp.src(paths.SOURCE + 'sassyflex.scss')
	.pipe(sourcemaps.init())
    .pipe(sass({
		style: 'expanded',
			includePaths : [
                   paths.BOWER + 'normalize-scss',
			       paths.BOWER + 'bourbon/app/assets/stylesheets',
			       paths.BOWER + 'neat/app/assets/stylesheets',
			   ]
	}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.DESTINATION))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('clean', function(cb) {
    del(paths.DESTINATION, cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles');
});
