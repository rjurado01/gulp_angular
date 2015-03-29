var gulp =            require('gulp'),
    jade =            require('gulp-jade'),
    connect =         require('gulp-connect'),
    uglify =          require('gulp-uglify'),
    sass =            require('gulp-sass')
    gulpif =          require('gulp-if'),
    bower_files =     require('main-bower-files'),
    inject =          require('gulp-inject'),
    clean =           require('gulp-clean'),
    concat =          require('gulp-concat');

var env = process.env.ENV || 'development';
var outputDir = 'builds/' + env;



/************* INDEX *************/

gulp.task('clean_index', function () {
  return gulp.src(outputDir + 'index.html', {read: false})
    .pipe(clean());
});

gulp.task('index', ['clean_index'], function() {
  var config = {};

  if(env != 'production') {
    config.pretty = true;
  }

  return gulp.src('src/index.jade')
    .pipe(jade(config))
    .pipe(gulp.dest(outputDir));
});



/************* CSS *************/

var inject_css = function() {
  var sources = gulp.src(outputDir + '/css/**/*.css');

  return gulp.src(outputDir + '/index.html')
    .pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest(outputDir));
};

gulp.task('clean_css', function () {
  return gulp.src(outputDir + '/css', {read: false})
    .pipe(clean());
});

gulp.task('sass', ['clean_css'], function() {
  var config = {};

  if(env === 'production') {
    config.outputStyle = 'compressed';
  }
  else {
    config.sourceComments = 'map';
  }

  return gulp.src('src/assets/sass/**/*.scss')
    .pipe(sass(config))
    .pipe(gulpif(env === 'production', concat('main.css')))
    .pipe(gulp.dest(outputDir + '/css'));
});

gulp.task('inject_css', ['index'], function() {
  return inject_css();
});

gulp.task('build_css', ['index', 'sass'], function() {
  return inject_css();
});

gulp.task('rebuild_css', ['build_css', 'inject_js'], function() {
  return inject_css()
    .pipe(connect.reload());
});



/************* TEMPLATES *************/

gulp.task('clean_templates', function () {
  return gulp.src(outputDir + '*.html', {read: false})
    .pipe(clean());
});

gulp.task('build_templates', ['clean_templates'], function() {
  var config = {};

  if(env != 'production') {
    config.pretty = true;
  }

  return gulp.src('src/templates/**/*.jade')
    .pipe(jade(config))
    .pipe(gulp.dest(outputDir + '/templates'))
    .pipe(connect.reload());
});



/************* JAVASCRIPT *************/

var js_files = [
  '/js/libs/angular.js',
  '/js/libs/angular-translate.js',
  '/js/libs/**/*.js',
  '/js/main.js',
  '/js/controllers/**/*.js'
];

var inject_js = function() {
  var sources;

  if(env === 'production')
    sources = gulp.src(outputDir + '/js/main.js');
  else
    sources = gulp.src(js_files.map(function(x) { return outputDir + x; }));

  return gulp.src(outputDir + '/index.html')
    .pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest(outputDir));
};

gulp.task('clean_js', function () {
  return gulp.src(outputDir + '/js', {read: false})
    .pipe(clean());
});

gulp.task('bower_files', ['clean_js'], function() {
  return gulp.src(bower_files())
    .pipe(gulp.dest('src/js/libs'))
});

gulp.task('clean_bower_files', ['js'], function () {
  var files = bower_files().map(function(file) {
    var steps = file.split('/');
    return 'src/js/libs/' + steps[steps.length - 1];
  });

  return gulp.src(files)
    .pipe(clean());
});

gulp.task('js', ['bower_files'], function() {
  if( env == 'production' ) {
    return gulp.src(js_files.map(function(x) { return 'src' + x; }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(outputDir + '/js'));
  }
  else {
    return gulp.src('src/js/**/*.js')
      .pipe(gulp.dest(outputDir + '/js'));
  }
});

gulp.task('inject_js', ['index'], function() {
  return inject_js();
});

gulp.task('build_js', ['index', 'js', 'clean_bower_files'], function() {
  return inject_js();
});

gulp.task('rebuild_js', ['build_js', 'inject_css'], function() {
  return inject_js()
    .pipe(connect.reload());

});



/************* OTHERS *************/

gulp.task('watch', ['build_css', 'build_templates', 'build_js'], function () {
  gulp.watch('src/assets/sass/**/*.scss', ['rebuild_css']);
  gulp.watch('src/templates/**/*.jade', ['build_templates']);
  gulp.watch('src/js/**/*.js', ['rebuild_js']);
});

gulp.task('connect', ['watch'], function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('build', ['build_css', 'build_templates', 'build_js'])

gulp.task('default', ['connect']);
