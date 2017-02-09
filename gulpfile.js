var gulp = require('gulp');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var ngConfig = require('gulp-ng-config');
var configVars = require('./config.json');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');


gulp.task('styles', function() {
    gulp.src(configVars.sassSource)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('buildCSSBundle', function () {
    return gulp.src(configVars.cssVendors)
        .pipe(concat('css-bundle.css'))
        .pipe(gulp.dest(configVars.baseOutputCSS));
});

// Build Vendor Bundle
gulp.task('buildVendorBundle', function () {
    console.log('Build Vendor Bundle');

    return gulp.src(configVars.vendors)
        .pipe(concat('vendor-bundle.js'))
        .pipe(gulp.dest(configVars.baseOutputDir));
});

// Build configuration file
function buildConfigFile (env,app) {
    gulp.src('./config.json')
        .pipe(ngConfig(app, {
            environment:env
        }))
        .pipe(gulp.dest(configVars.baseOutputDir));
}

// Start browserSync
gulp.task('browserSync', ['buildWebpack'], function () {
    browserSync.init({
        server:{
            baseDir:'./public'
        },
        port: configVars.browserSyncPort
    });

    gulp.watch(configVars.tsSource,['buildWebpack']).on('change', browserSync.reload);
    gulp.watch(configVars.templateSource,['moveTemplates']).on('change', browserSync.reload);
});

// Create ConfigFile
gulp.task('createConfig',function () {
    return buildConfigFile('local',configVars.appName);
});

// Move template files
gulp.task('moveTemplates', function () {
    return gulp.src(configVars.templateSource)
        .pipe(gulp.dest(configVars.baseOutputDir));
});

// Build TS
gulp.task('buildTS', function () {
    return gulp.src(configVars.tsSource)
        .pipe(ts({
            module:'commonjs',
            outDir: configVars.baseOutputDir
        }))
        .pipe(gulp.dest(configVars.baseOutputDir));
});

// Build weboack file
gulp.task('buildWebpack',['buildTS','createConfig'], function () {
    return gulp.src([configVars.baseOutputDir + 'config.js', configVars.baseOutputDir + 'app.js'])
        .pipe(webpack({
            output:{
                filename: 'app-bundle.js'
            }
        }))
        .pipe(gulp.dest(configVars.baseOutputDir));
});

gulp.task('default',['styles', 'buildVendorBundle','moveTemplates', 'buildCSSBundle']);

gulp.task('dev', ['styles', 'buildVendorBundle','moveTemplates', 'buildCSSBundle','browserSync']);