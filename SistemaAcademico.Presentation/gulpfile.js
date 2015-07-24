var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower');

var config = {
    sassPath: 'Web/src/sass',
    bowerDir: './bower_components'
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
    return sass('./Web/src/sass/', {
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


// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

gulp.task('default', ['bower', 'icons', 'css']);
