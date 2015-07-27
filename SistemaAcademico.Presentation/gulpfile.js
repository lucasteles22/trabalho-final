var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

var config = {
    sassPath: './Web/sass',
	jsPath: './Web/js',
    bowerDir: './Web/assets/vendors'
}

//gulp bower - instala dependencias do bower
gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});

//gulp icons - copia os icones do fontawesome para o diretorio apropriado
gulp.task('icons', function () {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest('./Web/assets/fonts'));
});

gulp.task('css', function () {
    return sass(config.sassPath, {
        style: 'compressed',
        loadPath: [
            config.bowerDir + '/bootstrap-sass-official/assets/stylesheets/',
            config.bowerDir + '/fontawesome/scss/'
        ]
    })
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }))
    .pipe(gulp.dest('./Web/assets/css/'));
});

gulp.task('js', function() {
  return gulp.src(config.jsPath+'/*.js')
	.pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./Web/assets/js/'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
	gulp.watch(config.jsPath+'/*.js', ['js']);
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

gulp.task('default', ['bower', 'icons', 'css', 'js']);
