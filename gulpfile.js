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
var istanbul = require('gulp-istanbul')
var isparta = require('isparta')
require('babel/register')

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
        .on('error', function(err) { 
          console.error(err) 
          this.emit('end') })
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
  return gulp.src('./tests/*.js', {read: false})
  // gulp-mocha needs filepaths so you can't have any plugins before it 
  .pipe(mocha({reporter: 'nyan'}))
  // .once('error', function () {
  //           process.exit(1)
  //       })
  // .once('end', function () {
  //     process.exit()
  // })
}

function coverage() {
  var SOURCES = 'src/**/*.js'
  var TESTS = 'tests/*.js'
  gulp.src(SOURCES)
  .pipe(istanbul({
    instrumenter: isparta.Instrumenter // Use the isparta instrumenter (code coverage for ES6)
  }))
  .pipe(istanbul.hookRequire())
  .on('finish', function () {
    // run test
    gulp.src(TESTS, {read: false})
    .pipe(mocha({reporter: 'nyan'}))
    .on('end', function () {
      // generate coverage reporter
      gulp.src(SOURCES, {read: false})
    .pipe(istanbul.writeReports())
    // 生成完成后的测试报告在 coverage 目录下，打开 coverage/lcov-report/index.html 查看
    })
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
gulp.task('test-cov', coverage)
gulp.task('serve', serve)

gulp.task('default', ['watch', 'serve'])

