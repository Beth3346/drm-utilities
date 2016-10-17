import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-sass';
import scsslint from 'gulp-scss-lint';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import csslint from 'gulp-csslint';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import sourcemaps from 'gulp-sourcemaps';
import jshint from 'gulp-jshint';
import browserSync from 'browser-sync';
import reload from ync.reloa;
import babel from 'gulp-babel';
import pug from 'gulp-pug';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import WebpackDevServer from 'webpack-dev-server';

const paths = {
    app: './',
    scss: 'sass/',
    css: 'css/',
    scripts: 'js/',
    imagesRaw: 'images/raw/',
    images: 'images/',
    views: 'views/',
    html: this.app
};

const files = {
    scss: `${paths.scss}**/*.scss`,
    css: `${paths.css}*.css`,
    scripts: `${paths.scripts}**/*.js`,
    imagesRaw: [`${paths.imagesRaw}**/*.jpg`, `${paths.imagesRaw}**/*.png`, `${paths.imagesRaw}**/*.gif`, `${paths.imagesRaw}**/*.svg`],
    images: [`${paths.images}*.jpg`, `${paths.images}*.png`, `${paths.images}*.gif`, `${paths.images}*.svg`],
    views: `${paths.views}**/*.pug`,
    html: '*.html'
};

gulp.task('clean:styles', function() {
    return del([
        paths.css
    ]);
});

gulp.task('clean:scripts', function() {
    return del([
        'js/build/**/*.js'
    ]);
});

gulp.task('clean:images', function() {
    return del(
        files.images
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
});

gulp.task('styles', ['scsslint', 'clean:styles'], function() {

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
        .pipe(gulp.dest(paths.css));
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

gulp.task('babel', ['clean:scripts'], function() {
    return gulp.src(['js/assets/elr-accordion.js', 'js/app.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(`${paths.scripts}/build`));
});

gulp.task('scripts', ['babel'], function() {
    return gulp.src(['js/vendor/**/*.js', 'js/build/*.js'])
    .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${paths.scripts}/build`));
});

gulp.task('images', ['clean:images'], function() {
    return gulp.src(files.imagesRaw)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images));
});

gulp.task('webpack', ['test'], function(callback) {
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ];

    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true,
            progress: true
        }));
        callback();
    });
});

gulp.task('watch', function() {
    gulp.watch(files.scss, ['styles']);
    gulp.watch(files.scripts, ['scripts']);
    gulp.watch(files.imagesRaw, ['images']);
});

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: ''
        }
    });

    gulp.watch([files.views, files.css, files.scripts], {cwd: ''}, reload);
});

gulp.task('default', [
    'views',
    'styles',
    'images',
    // 'scripts'
]);