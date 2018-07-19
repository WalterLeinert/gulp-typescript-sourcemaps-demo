const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const rm = require('rimraf');

const project = ts.createProject('./src/tsconfig.json');

gulp.task('clean', () => {
	return rm('dist-*', (err) => {
		console.error(err);
	});
});

gulp.task('default', ['clean'], () => {
	return gulp.src('src/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(ts())
		.pipe(sourcemaps.write('.', { sourceRoot: '../src', includeContent: false }))
		.pipe(gulp.dest("dist-default"));
});

gulp.task('outdir', ['clean'], () => {
	return gulp.src('src/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(ts({ outDir: 'dist-outdir' }))
		.pipe(sourcemaps.write('.', { sourceRoot: './', includeContent: false }))
		.pipe(gulp.dest("dist-outdir"));
});

// Note: The tsconfig.json file has set the `outDir` field, so the setup is almost the same
// as the `outdir` example. If your tsconfig.json file has no `outDir`, your setup should be
// similar to the first example.
gulp.task('tsconfig', ['clean'], () => {
	return project.src()
		.pipe(sourcemaps.init())
		.pipe(project())
		.pipe(sourcemaps.write('.', { sourceRoot: './', includeContent: false }))
		.pipe(gulp.dest("dist-tsconfig"));
});
