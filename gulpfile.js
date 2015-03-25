var gulp =            require('gulp'),
    jade =            require('gulp-jade'),
    connect =         require('gulp-connect'),
    uglify =          require('gulp-uglify'),
    sass =            require('gulp-sass')
    gulpif =          require('gulp-if'),
    bower_files =     require('main-bower-files'),
    angularFilesort = require('gulp-angular-filesort'),
    inject =          require('gulp-inject'),
    clean =           require('gulp-clean'),
    concat =          require('gulp-concat');

var env = process.env.ENV || 'development';
var outputDir = 'builds/' + env;


/* CSS */

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

gulp.task('inject_css', ['sass'], function() {
  var sources = gulp.src(outputDir + '/css/**/*.css');

  return gulp.src(outputDir + '/index.html')
    .pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest(outputDir));
});

gulp.task('build_css', ['inject_css'])


/* TEMPLATES */

gulp.task('clean_templates', function () {
  return gulp.src(outputDir + '*.html', {read: false})
    .pipe(clean());
});

gulp.task('jade', ['clean_templates'], function() {
  var config = {};

  if(env != 'production') {
    config.pretty = true;
  }


  return gulp.src('src/templates/**/*.jade')
    .pipe(jade(config))
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());
});

gulp.task('build_templates', ['jade'])


/* JAVASCRIPT */

gulp.task('clean_js', function () {
  return gulp.src(outputDir + '/js', {read: false})
    .pipe(clean());
});

gulp.task('bower_files', ['clean_js'], function() {
  return gulp.src(bower_files())
    .pipe(gulp.dest('src/js/libs'))
});

gulp.task('js', ['bower_files'], function() {
  if( env == 'production' ) {
    return gulp.src('src/js/**/*.js')
    .pipe(angularFilesort())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(outputDir + '/js'));
  }
  else {
    return gulp.src('src/js/**/*.js')
      .pipe(gulpif(env === 'production', uglify()))
      .pipe(gulp.dest(outputDir + '/js'));
  }
});

gulp.task('inject_js', ['js'], function() {
  var sources = gulp.src(outputDir + '/js/**/*.js')
    .pipe(angularFilesort());

  return gulp.src(outputDir + '/index.html')
    .pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest(outputDir));
});

gulp.task('build_js', ['inject_js'])

/* OTHERS */

gulp.task('watch', ['build_css', 'build_templates', 'build_js'], function () {
  gulp.watch('src/assets/sass/**/*.scss', ['build_css']);
  gulp.watch('src/templates/**/*.jade', ['buld_templates']);
  gulp.watch('src/js/**/*.js', ['build_js']);
});

gulp.task('connect', ['watch'], function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('build', ['build_css', 'build_templates', 'build_js'])

gulp.task('default', ['connect']);
