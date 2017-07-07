var config = require("./build.config")
var gulp = require("gulp")
var sass = require('gulp-sass');
var path = require("path")
var babel = require("gulp-babel");
var postcss = require("gulp-postcss")
var autoprefixer = require('autoprefixer')
var postasset = require("postcss-assets")
var cssnano = require('cssnano')
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('gulp-browserify');
var changed = require('gulp-changed');
var runSequence = require('run-sequence');
livereload = require('gulp-livereload');
var rev = require('gulp-rev')
var revCollector = require('gulp-rev-collector');
var log = console.log.bind(console);
require('shelljs/global')

gulp.task('d', function () {
    livereload.listen();
    gulp.watch('src/**/*.*', function (file) {
        log("File " + file.path + " changed!");
        if (file.path.endsWith(".scss")) {
            gulp.run("css")
        } else if (file.path.endsWith(".jsx")) {
            gulp.run("js")
        } else {
            livereload.changed(file.path);
        }
    })
    log("     ***** Watching " + "[crtl+c to stop.] ******     ");
});

gulp.task('r', function (callback) {
    rm('-rf', config.distRoot)
    runSequence(["js:r", "css:r"], "revCss", "revJs", callback)
});
css()
css(":r")
js()
js(":r")
gulp.task("default", ["r"]);

function js(type) {
    gulp.task("js" + (type || ""), function () {
        var stream = gulp.src(config.jsSrc)
            .pipe(changed(config.jsDist))
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(browserify({
                debug: false
            }))
        if (type == ":r") {
            stream = stream.pipe(uglify({compress: {warnings: true}}))
                .pipe(sourcemaps.write("./sources_maps"))
                .pipe(rev())
                .pipe(gulp.dest(config.jsDist))
                .pipe(rev.manifest())
                .pipe(gulp.dest('./rev/js'))
        } else {
            stream.pipe(gulp.dest("./src/static/js"))
        }
        return stream;
    });
}
function css(type) {
    var processors = [
        postasset,
        autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.1'],
            cascade: true,
            remove: true
        })
    ];
    var depend = [];
    if (type == ":r") {
        processors.push(cssnano());
        depend[0] = "img"
    }
    gulp.task('css' + (type || ""), depend, function () {
        var stream = gulp.src(config.cssSrc)
            .pipe(changed(config.cssDist))
            .pipe(sass())
            .pipe(postcss(processors))
        //.pipe(rename(function (path) {
        //    path.extname = ".css"
        //}))

        if (type == ":r") {
            stream.pipe(rev())
                .pipe(gulp.dest(config.cssDist))
                .pipe(rev.manifest())
                .pipe(gulp.dest('./rev/css'));
        } else {
            stream.pipe(gulp.dest("./src/static/css"))
        }
    });
}


gulp.task('img', function () {
    gulp.src(config.imgSrc)
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(config.imgDist));
});

gulp.task('revCss', function () {
    return gulp.src(['./rev/css/*.json', './src/*.html'])
        .pipe(revCollector())                         //替换html中对应的记录
        .pipe(gulp.dest(config.distRoot));
});
gulp.task('revJs', function () {
    return gulp.src(['./rev/js/*.json', config.distRoot+"*.html"])
        .pipe(revCollector())
        .pipe(gulp.dest(config.distRoot));
});

gulp.task('img:clear', function (done) {
    return cache.clearAll(done);
});




