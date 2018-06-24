var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Compile Sass
gulp.task('styles', function() {
  return gulp.src('src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(reload({ stream: true }));
});

// Compile pug
gulp.task('markup', function() {
  return gulp.src('src/pug/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
});

// Optimize images
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('./dist/assets/img'))
    .pipe(reload({ stream: true }));
});

// Serve
gulp.task('serve', ['styles', 'markup', 'images'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(
    ['src/**/*.pug', 'src/sass/**/*.sass', 'src/images/**/*'],
    ['styles', 'markup', 'images']
  );
});

gulp.task('default', ['serve']);