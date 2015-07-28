//gulp plugins
var path             = require('path');
var gulp             = require('gulp');
var svn              = require('yargs');
var exit             = require('gulp-exit');
var copy2            = require('gulp-copy2');
var gutil            = require('gulp-util');
var del              = require('del');
var uglify           = require('gulp-uglify');
var buffer           = require('vinyl-buffer');
var sourcemaps       = require('gulp-sourcemaps');
var rename           = require('gulp-rename');
var changed          = require('gulp-changed');
var nodemon          = require('nodemon');
var concat           = require('gulp-concat');
var webpack          = require('webpack');
var webpackBuild     = require('gulp-webpack-build');
var webpackDevServer = require('webpack-dev-server');
var ts               = require('gulp-typescript');
var livereload       = require('gulp-livereload');
//gulp paths
var sourceRoot       = './';
var jsRoot           = 'static/js/app/';
var cssRoot          = 'static/css/';
var buildRoot        = 'static/build/';
var releaseRoot      = 'static/release/';
//patterns
var jsPattern        = jsRoot + '**/*.js';
var tsPattern        = jsRoot + '**/*.ts';
var cssPattern       = cssRoot + '**/*.css';
var ractPattern      = jsRoot + '**/*.ract';
//watch config
var watchPaths        = [
                          tsPattern,
                          jsPattern,
                          cssPattern,
                          ractPattern
                        ];

/* Webpack Build Settings */
var webpackDest       = path.resolve(sourceRoot);
var webpackOptions    = {
            debug: true,
            devtool: '#source-map',
            watchDelay: 200
        },
    webpackConfig = {
      useMemoryFs: false,
      progress: true
    };

var CONFIG_FILENAME = webpackBuild.config.CONFIG_FILENAME;

gulp.task('webpack', ['copyScripts'], function() {
    return gulp.src(path.join(sourceRoot, '**', CONFIG_FILENAME),
                          { base: path.resolve(sourceRoot) })
        .pipe(webpackBuild.init(webpackConfig))
        .pipe(webpackBuild.props(webpackOptions))
        .pipe(webpackBuild.run())
        .pipe(webpackBuild.format({
            version: false,
            timings: true
        }))
        .pipe(webpackBuild.failAfter({
            errors: true,
            warnings: true
        }))
        .pipe(gulp.dest(webpackDest));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(watchPaths, ['copyScripts']).on('change', function(event) {
        if (event.type === 'changed') {
            gulp.src(event.path, { base: path.resolve(sourceRoot) })
                .pipe(webpackBuild.closest(CONFIG_FILENAME))
                .pipe(webpackBuild.init(webpackConfig))
                .pipe(webpackBuild.props(webpackOptions))
                .pipe(webpackBuild.watch(function(err, stats) {
                    gulp.src(this.path, { base: this.base })

                        .pipe(webpackBuild.proxy(err, stats))
                        .pipe(webpackBuild.format({
                            verbose: true,
                            version: false
                        }))
                        .pipe(gulp.dest(webpackDest))
                        .pipe(livereload());
                }));
        }
    });
});

gulp.task('clean', function (cb) {
    del([releaseRoot + '**/*'], function (err, deletedFiles) {
    if(err){
      console.log('Error during deletion: ' + err);
    }
  });
  cb();
});

gulp.task('copyScripts', function(){
  return gulp.src(jsRoot + '**/*')
          .pipe(changed(buildRoot))
          .pipe(gulp.dest(buildRoot));
});

gulp.task('run', ['watch'], function() {
  nodemon({
    execMap: {
      js: 'node --harmony'
    },
    script: 'index.js',
    ext: 'noop'
  }).on('restart', function() {
    console.log('restarted!');
  });
});

gulp.task('all', ['clean','webpack']);
gulp.task('default', ['all']);