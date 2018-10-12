var gulpfile = require('gulp'),
    nodemon = require('nodemon'),
    uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    concat = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)

gulpfile.task('def', function() {
    console.log('Hello Gulp!')
});

gulpfile.task('scripts', function() {
    return gulpfile.src([
        'views/bower_components/jquery/dist/jquery.js',
        'views/bower_components/magnific-popup/dist/jquery.magnific-popup.js',
        'views/bower_components/jquery.cookie/jquery.cookie.js',
        'views/js/move-top.js',
        '/js/easing.js'
    ]).pipe(concat('libs.min.js')).pipe(uglify()).pipe(gulpfile.dest('views/js'));
});


gulpfile.task('server', ['scripts'], function() {
    nodemon({
        script: 'app.js',
        ext: 'js'
    }).on('restart', () => {
        gulp.src('app.js').pipe(notify('Running the start tasks and stuff'));
    });
});