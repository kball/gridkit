var gulp    = require('gulp');
var plugins = require('gulp-load-plugins');

var $ = plugins();

var ENTRIES = ['scss/app.scss'];

var COMPATIBILITY = [ "last 2 version", "ie >= 9", "ios >= 7" ];

// Build the SCSS into CSS
gulp.task('build', sass);

// Build the SCSS, watch for changes.
gulp.task('default',
  gulp.series('build', watch));

function sass() {
  return gulp.src(ENTRIES)
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
}
// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch('scss/**/*.scss').on('all', sass);
}
