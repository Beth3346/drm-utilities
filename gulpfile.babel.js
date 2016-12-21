import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import sass from 'gulp-sass';
import scsslint from 'gulp-scss-lint';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import csslint from 'gulp-csslint';
import jshint from 'gulp-jshint';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import pug from 'gulp-pug';
import webpack from 'webpack';
import path from 'path';
import webpackStream from'webpack-stream';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import plumber from'gulp-plumber';

let firstBuildReady = false;

let webpackChangeHandler = function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);

    gutil.log(stats.toString({
        colors: true,
        progress: true
    }));

    browserSync.reload();

    firstBuildReady = true;
};

const paths = {
    app: 'dist/',
    scss: 'sass/',
    css: 'dist/css/',
    scripts: 'js/',
    imagesRaw: 'images/',
    images: 'dist/images',
    views: 'views/',
    html: 'dist/'
};

const files = {
    scss: `${paths.scss}**/*.scss`,
    css: `${paths.css}*.css`,
    scripts: `${paths.scripts}**/*.js`,
    imagesRaw: [`${paths.imagesRaw}**/*.jpg`, `${paths.imagesRaw}**/*.png`, `${paths.imagesRaw}**/*.gif`, `${paths.imagesRaw}**/*.svg`],
    images: [`${paths.images}*.jpg`, `${paths.images}*.png`, `${paths.images}*.gif`, `${paths.images}*.svg`],
    views: `${paths.views}*.pug`,
    html: 'dist/*.html'
};

gulp.task('clean:styles', () => {
    return del([
        paths.css
    ]);
});

gulp.task('clean:scripts', () => {
    return del([
        'js/build/'
    ]);
});

gulp.task('clean:images', () => {
    return del(
        paths.images
    );
});

gulp.task('clean:html', () => {
    return del([
        files.html
    ]);
});

gulp.task('clean', () => {
    return del([
        'dist',
        'js/build/'
    ]);
});

gulp.task('views', function buildHTML() {
    return gulp.src(files.views)
        .pipe(pug())
        .pipe(gulp.dest(paths.app))
        .pipe(browserSync.stream());
});

gulp.task('styles', ['scsslint'], () => {

    return gulp.src(files.scss)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(paths.css))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.css))
        .pipe(cleanCSS({debug: true}))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.stream());
});

gulp.task('scsslint', () => {
    return gulp.src(`${paths.scss}partials/**/*.scss`)
        .pipe(scsslint());
});

gulp.task('lint', () => {
    return gulp.src(['js/assets/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('babel', ['lint'], () => {
    return gulp.src(['js/assets/*.js', 'js/app.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(`js/build`));
});

gulp.task('scripts', ['babel'], () => {
    return gulp.src(['js/build/*.js'])
        .pipe(gulp.dest(`js/build`));
});

gulp.task('images', ['clean:images'], () => {
    return gulp.src(files.imagesRaw)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images))
        .pipe(browserSync.stream());
});

gulp.task('webpack', ['scripts'], () => {
    gulp.src('./js/build/app.js')
        .pipe(plumber())
        .pipe(webpackStream({
            watch: true,
            entry: {
                app: './js/build/app.js'
            },
            output: {
                path: path.join(__dirname, 'dist'),
                publicPath: '/dist',
                filename: 'bundle.js'
            },
        }, null, webpackChangeHandler))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('webpack:build', ['scripts'], () => {
    gulp.src('./js/build/app.js')
        .pipe(plumber())
        .pipe(webpackStream({
            watch: false,
            entry: {
                app: './js/build/app.js'
            },
            output: {
                path: path.join(__dirname, 'dist'),
                publicPath: '/dist',
                filename: 'bundle.js'
            },
        }, null, webpackChangeHandler))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['views', 'styles', 'images', 'webpack'], () => {
    gulp.watch(`${paths.views}**/*.pug`, ['views']);
    gulp.watch(files.scss, ['styles']);
    gulp.watch(['js/assets/**/*.js', 'js/app.js'], ['webpack']);
    gulp.watch(files.imagesRaw, ['images']);

    browserSync.init({
        server: {
            baseDir: paths.app
        }
    })
});

gulp.task('build', ['views', 'styles', 'images', 'webpack:build']);