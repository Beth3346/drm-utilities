import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import sass from 'gulp-sass';
import scsslint from 'gulp-scss-lint';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
// import csslint from 'gulp-csslint';
import jshint from 'gulp-jshint';
import babel from 'gulp-babel';
import pug from 'gulp-pug';
import webpack from 'webpack';
import path from 'path';
import webpackStream from'webpack-stream';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';

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
    app: './',
    scss: 'sass/',
    css: 'css/',
    scripts: 'js/',
    imagesRaw: 'images/raw/',
    images: 'images/compressed',
    views: 'views/',
    html: './'
};

const files = {
    scss: `${paths.scss}**/*.scss`,
    css: `${paths.css}*.css`,
    scripts: `${paths.scripts}**/*.js`,
    imagesRaw: [`${paths.imagesRaw}**/*.jpg`, `${paths.imagesRaw}**/*.png`, `${paths.imagesRaw}**/*.gif`, `${paths.imagesRaw}**/*.svg`],
    images: [`${paths.images}*.jpg`, `${paths.images}*.png`, `${paths.images}*.gif`, `${paths.images}*.svg`],
    views: `${paths.views}*.pug`,
    html: '*.html'
};

gulp.task('clean:styles', function() {
    return del([
        paths.css
    ]);
});

gulp.task('clean:scripts', function() {
    return del([
        'js/build/'
    ]);
});

gulp.task('clean:images', function() {
    return del(
        'images/compressed'
    );
});

gulp.task('clean:html', function() {
    return del([
        files.html
    ]);
});

gulp.task('clean', [
    'clean:html',
    'clean:styles',
    'clean:scripts',
    'clean:images'
]);

gulp.task('views', function buildHTML() {
    return gulp.src(files.views)
        .pipe(pug())
        .pipe(gulp.dest(paths.app))
        .pipe(browserSync.stream());
});

gulp.task('styles', ['scsslint'], function() {

    return gulp.src(files.scss)
        .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(paths.css))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.css))
        // .pipe(csslint({
        //     'unique-headings': false,
        //     'font-sizes': false,
        //     'box-sizing': false,
        //     'floats': false,
        //     'duplicate-background-images': false,
        //     'font-faces': false,
        //     'star-property-hack': false,
        //     'qualified-headings': false,
        //     'ids': false,
        //     'text-indent': false,
        //     'box-model': false,
        //     'adjoining-classes': false,
        //     'compatible-vendor-prefixes': false,
        //     'important': false,
        //     'unqualified-attributes': false,
        //     'fallback-colors': false,
        //     'order-alphabetical': false
        // }))
        // .pipe(csslint.formatter())
        .pipe(cleanCSS({debug: true}))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.stream());
});

gulp.task('scsslint', function() {
    return gulp.src(`${paths.scss}partials/**/*.scss`)
        .pipe(scsslint());
});

gulp.task('jshint', function() {
    return gulp.src(['js/assets/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('babel', function() {
    return gulp.src(['js/assets/*.js', 'js/app.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(`js/build`));
});

gulp.task('scripts', ['babel'], function() {
    return gulp.src(['js/build/*.js'])
        .pipe(gulp.dest(`js/build`));
});

gulp.task('images', ['clean:images'], function() {
    return gulp.src(files.imagesRaw)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images))
        .pipe(browserSync.stream());
});

gulp.task('webpack', ['scripts'], function() {
    gulp.src('./js/build/app.js')
        .pipe(webpackStream({
            watch: true,
            entry: {
                app: './js/build/app.js'
            },
            output: {
                path: path.join(__dirname, 'js/build'),
                publicPath: '/js/build',
                filename: 'bundle.js'
            },
        }, null, webpackChangeHandler))
        .pipe(gulp.dest('./js/build/'));
});

gulp.task('default', ['views', 'styles', 'images', 'webpack'], () => {
    gulp.watch(`${paths.views}**/*.pug`, ['views']);
    gulp.watch(files.scss, ['styles']);
    gulp.watch(['js/assets/**/*.js', 'js/app.js'], ['webpack']);
    gulp.watch(files.imagesRaw, ['images']);

    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
});

gulp.task('build', ['views', 'styles', 'images', 'webpack']);