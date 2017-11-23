var gulp = require('gulp'),
    connect = require('gulp-connect'),
    bowerFiles = require('main-bower-files'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    sass = require('gulp-sass'),
    path = require('path'),
    args = require('yargs').argv,
    fs = require('fs'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    angularFilesort = require('gulp-angular-filesort'),
    config = {},
    replace = require('gulp-replace-task');

var paths = {
    sass: ['assets/scss/*.scss']
};

gulp.task('default', ['watch']);
gulp.task('build', ['sass-app', 'inject', 'replace', 'connect']);

gulp.task('watch', ['build', 'connect'], function () {
    gulp.watch(paths.sass, ['sass-app']);
});

gulp.task('connect', function () {
    connect.server({
        root: '.',
        port: config.server.port,
        livereload: false
    });
});

gulp.task('inject', function () {
    var target = gulp.src('./index.template.html'),
        srcBower = gulp.src(bowerFiles(), { read: false }),
        srcCss = gulp.src(['./app/**/*.css'], { read: false }),
        srcAngular = gulp.src(['./app/components/**/*.js', './app/shared/**/*.js']).pipe(angularFilesort());

    return target.pipe(inject(srcBower, { name: 'bower', relative: true }))
        .pipe(inject(srcCss, { relative: true }))
        .pipe(inject(srcAngular, { relative: true }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('.'))
});

gulp.task('sass-app', function (done) {
    gulp.src('./assets/scss/app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./assets/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./assets/css/'))
        .on('end', done);
});

gulp.task('replace', function () {
    // Get the environment from the command line
    var env = args.env || 'local';

    // Read the config from the right file
    var filename = env + '.json';

    config = JSON.parse(fs.readFileSync('./config/' + filename, 'utf8'));

    // Replace each placeholder with the correct value for the variable.  
    gulp.src(['./app/app.module.js', './app/app.routes.js', './app/app.run.js', './app/app.constant.js'])
        .pipe(replace({
            patterns: [
                {
                    match: 'apiUrl',
                    replacement: config.apiUrl
                },
                {
                    match: 'serverUrl',
                    replacement: config.serverUrl
                }
            ]
        }))
        .pipe(concat("app.js"))
        .pipe(gulp.dest('./'));
});