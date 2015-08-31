var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')
var reactify = require('reactify')
var server = require('gulp-server-livereload')
var mocha = require('gulp-mocha')

function compile(watch) {
  var bundler = watchify(browserify({
    entries:'./src/js/main.js',
    debug: true,
    transform :[babelify, reactify]
  }))

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end') })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'))
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...')
      rebundle()
    })
  }

  rebundle()
}

function watch() {
  return compile(true)
}

function test(){
  return gulp.src('./test/test.js', {read: false})
  // gulp-mocha needs filepaths so you can't have any plugins before it 
  .pipe(mocha({reporter: 'nyan'}))
  .once('error', function () {
            process.exit(1)
        })
  .once('end', function () {
      process.exit()
  })
}

function serve(){
  gulp.src('.')
  .pipe(server({
    port: 11235,
    path:'/index.html',
    livereload: true,
    directoryListing: true,
    open: true,
    defaultFile: 'index.html'
  }))
}

gulp.task('build', compile)
gulp.task('watch', watch)
gulp.task('test', test)
gulp.task('serve', serve)

gulp.task('default', ['watch', 'serve'])