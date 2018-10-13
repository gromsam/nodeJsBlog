var gulpfile = require('gulp'),
    sass = require('gulp-sass'),
    cssnano  = require('gulp-cssnano'),
    rename  = require('gulp-rename'),
    nodemon = require('nodemon'),
    uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer');

gulpfile.task('def', function() {
    console.log('Hello Gulp!')
});

gulpfile.task('sass', function(){ // Создаем таск Sass
    return gulpfile.src('app/sass/**/*.sass') // Берем источник
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulpfile.dest('views/css')) // Выгружаем результата в папку app/css
        // .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulpfile.task('css-libs', ['sass'], function() {
    return gulpfile.src('views/css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulpfile.dest('views/css')); // Выгружаем в папку app/css
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

// gulpfile.task('css', function() {
//     return gulpfile.src([
//         'views/bower_components/bootstrap/dist/bootstrap.css'
//     ]).pipe(cssnano()).pipe(gulpfile.dest('views/css'));
// });

gulpfile.task('dev', ['css-libs','scripts'], function() {
    nodemon({
        script: 'app.js',
        ext: 'js'
    }).on('restart', () => {
        gulpfile.src('app.js').pipe(notify('Running the start tasks and stuff'));
    });
});