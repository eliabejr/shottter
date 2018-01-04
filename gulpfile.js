const gulp = require("gulp");
const sass = require("gulp-sass");
const notify = require("gulp-notify");
const cssmin = require("gulp-clean-css");
const browserSync = require('browser-sync').create();

//////////////////////

var files = [
    'src/index.html',
    'src/scss/**/*.scss',
    'src/js/*.js'
];

var options = {
    server: "build/"
};

///////////////////////

// Copy HTML to the build
gulp.task("copy-html", function () {
    gulp.src(["src/index.html"])
        .on("error", notify.onError({ title: "Error at Copy HTML", message: "<%= error.message %>" }))
        .pipe(gulp.dest("build/"));
});


// Compile SASS Files
gulp.task("compile-sass", function () {
    return gulp.src("src/scss/app.scss")
        .pipe(sass())
        .on("error", notify.onError({ title: "Error at compile CSS", message: "<%= error.message %>" }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});


// Minify CSS Files
gulp.task("minify-css", function () {
    return gulp.src("src/css/app.css")
        .pipe(cssmin({ compatibility: "ie8" }))
        .on("error", notify.onError({ title: "Error at minify CSS", message: "<%= error.message %>" }))
        .pipe(gulp.dest("build/css"));
});

// Copy Js to the build
gulp.task("copy-js", function () {
    gulp.src("src/js/*")
        .on("error", notify.onError({ title: "Error at Compile Javascript", message: "<%= error.message %>" }))
        .pipe(gulp.dest("build/js"));
});

// Gulp Watch
gulp.task("watch", function () {
    gulp.watch("src/index.html",    ["copy-html"]);
    gulp.watch("src/scss/**/*",     ["compile-sass"]);
    gulp.watch("src/css/app.css", ["minify-css"]);
});

// Build Project
gulp.task("prod", function () {
    gulp.src(["build/**/*"])
        .on("error", notify.onError({ title: "Error at Copy Build Files", message: "<%= error.message %>" }))
        .pipe(gulp.dest("public/"));
});

// Browser reloading
gulp.task('server', ['compile-sass'], function () {

    browserSync.init(files, options)
    gulp.watch(files).on('change', browserSync.reload);
});

gulp.task("default", ["copy-html", "compile-sass", "minify-css", "copy-js", "watch", "server"]);