// =====================================
// Required
// =====================================

var gulp          = require('gulp'),
    browserSync   = require('browser-sync'),
    reload        = browserSync.reload,
    uglify        = require('gulp-uglify'),
    sass          = require('gulp-sass'),
    plumber       = require('gulp-plumber'),
    autoprefixer  = require('gulp-autoprefixer'),
    concat        = require('gulp-concat'),
    rename        = require('gulp-rename'),
    imagemin      = require('gulp-imagemin'),
    pngquant      = require('imagemin-pngquant');

// =====================================
// Browser-Sync Task
// =====================================

gulp.task('browser-sync', function() {
  var files = [
      '*.php',
      'lib/*.php',
      'views/*.twig'
        ];
  browserSync.init(files, {

    proxy: 'localhost', // Change this to your local site url
    injectChanges: true

  });
});


// =====================================
// Imagemin Task
// =====================================

gulp.task('images', function () {
  return gulp.src('assets/img/source/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('assets/img/'))
    .pipe(reload({stream:true}));
});


// =====================================
// Sass Tasks
// =====================================

gulp.task('sass', function() {
  gulp.src('assets/scss/main.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('assets/css'))
    .pipe(reload({stream:true}));
});


// =====================================
// Scripts
// =====================================

gulp.task('scripts', function() {
  gulp.src('assets/js/source/**/*.js')
    .pipe(concat('main.js'))
		.pipe(gulp.dest('assets/js/'))
    .pipe(rename({
			basename: "main",
			suffix:'.min'
		}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'))
    .pipe(reload({stream:true}));
});


// =====================================
// PHP Tasks
// =====================================

gulp.task('php', function () {
  watch({
    glob:['*.php','lib/*.php', 'views/*.twig' ]
  }).pipe(plugins.livereload(server))
  .pipe(plugins.notify({ message: 'PHP/Twig task complete' }));
});


// =====================================
// Watch Tasks
// =====================================

gulp.task('watch', function() {
  gulp.watch('assets/js/custom/**/*.js', ['scripts']);
  gulp.watch('assets/sass/**/*.scss', ['sass']);
  gulp.watch('assets/img/source/**/*', ['images']);
});

// =====================================
// Default Task
// =====================================

gulp.task('default', ['sass', 'scripts', 'images', 'browser-sync', 'watch']);
