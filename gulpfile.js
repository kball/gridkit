var gulp    = require('gulp');
var plugins = require('gulp-load-plugins');
var browser = require('browser-sync');

var $ = plugins();

var ENTRIES = ['demo/demo.scss'];

var COMPATIBILITY = [ "last 2 version", "ie >= 9", "ios >= 7" ];

// Build the SCSS into CSS
gulp.task('build', gulp.parallel(copy, sass));

// Build the SCSS, watch for changes.
gulp.task('default',
gulp.series('build', server, watch));

// Copy demo index file
function copy() {
  return gulp.src(['demo/index.html'])
    .pipe(gulp.dest('dist'));
}

function sass() {
  return gulp.src(ENTRIES)
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: ['scss']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY,
      grid: false
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browser.reload({ stream: true }));
  }

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: 'dist', port: 8000
  });
  done();
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
}
// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(['scss/**/*.scss', 'demo/*.scss']).on('all', sass);
  gulp.watch('demo/*.html').on('all', gulp.series(copy, browser.reload));
}
