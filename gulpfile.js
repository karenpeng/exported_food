var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var rename = require('gulp-rename')
var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')
var reactify = require('reactify')
var brfs = require('brfs')
var server = require('gulp-server-livereload')
var mocha = require('gulp-mocha')

function compile(watch) {
  var files = ['./src/js/main.js', './src/js/mapmain.js']

  var task = files.map(function(entry){
    
    var bundler = watchify(browserify({
      entries:[entry],
      debug: true,
      transform :[babelify, brfs, reactify]
    }))

    if (watch) {
      bundler.on('update', function() {
        console.log('-> bundling...')
        rebundle()
      })
    }

    rebundle()

    function rebundle() {
      var name = entry.split('/').pop()
      bundler.bundle()
        .on('error', function(err) { console.error(err); this.emit('end') })
        .pipe(source(name))
        .pipe(rename({
          extname: '.build.js'
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build'))
    }

  })
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