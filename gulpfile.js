var gulp = require( 'gulp' );
var babel = require( 'gulp-babel' );
var plumber = require( 'gulp-plumber' );
var browserify = require( 'browserify' );
var babelify = require( 'babelify' );
var streamify = require( 'streamify' );
var uglify = require( 'gulp-uglify' );
var webserver = require( 'gulp-webserver' );
var source = require( 'vinyl-source-stream' );
var buffer = require( 'vinyl-buffer' );
var cleanCSS = require( 'gulp-clean-css' );
var htmlmin = require('gulp-html-minifier');

gulp.task( 'default', [ 'es6', 'es6-min', 'clean-css', 'html-update', 'webserver' ], function(){} );

gulp.task( 'es6', function(){

  	var b = browserify();
  	
  	b.transform( 'babelify', {

  		presets: [ 'es2015' ]

  	} )
  	
  	b.add("./src/js/app.js");
  	
  	return b.bundle()
    	.on('error', function(err){
    	  
    	  console.log(err.message);
    	  
    	  this.emit('end');
    	})
    	.pipe(source('app.js'))
    	.pipe(gulp.dest('./dist/js'));

} );

gulp.task( 'data_parser', function(){

    var b = browserify();
    
    b.transform( 'babelify', {

      presets: [ 'es2015' ]

    } )
    
    b.add("./src/js/data_parser.js");
    
    return b.bundle()
      .on('error', function(err){
        
        console.log(err.message);
        
        this.emit('end');
      })
      .pipe(source('data_parser.js'))
      .pipe(gulp.dest('./dist/js'));

} );

gulp.task( 'es6-min', function(){

  	var b = browserify();
  	
  	b.transform( 'babelify', {

		presets: [ 'es2015' ]

	} )
  	
  	b.add("./src/js/app.js");
  	
  	return b.bundle()
    	.on('error', function(err){
    	  
    	  console.log(err.message);
    	  
    	  this.emit('end');
    	})
    	.pipe(source('app.min.js'))
    	.pipe( buffer() )
    	.pipe( uglify() )
    	.pipe(gulp.dest('/Users/pietroalberti/Documents/Projets/Mandats/food\&mood/prototypes/web_prototype/js'));

} );

gulp.task( 'clean-css', function(){

	return gulp.src('./src/css/main-style.css')
		.pipe( cleanCSS() )
		.pipe( gulp.dest('./dist/css') )

} );

gulp.task( 'html-update', function(){

	return gulp.src('./index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
		.pipe( gulp.dest('./dist') )

} );

gulp.task( 'shaders-update', function(){

  return gulp.src('./src/shaders/**/*.glsl')
    .pipe( gulp.dest('./dist/shaders') )

} );

gulp.task( 'watch', function(){

	gulp.watch( './src/js/**/*.js', [ 'es6', 'data_parser' ] );
  gulp.watch( '/Users/pietroalberti/Documents/Code/Tools/webgl/**/*.js', [ 'es6' ] );
	gulp.watch( './src/css/**/*.css', [ 'clean-css' ] );
  gulp.watch( './src/shaders/**/*.glsl', [ 'shaders-update' ] );
	gulp.watch( './**/*.html', [ 'html-update' ] );

} );

gulp.task('webserver',[ 'watch' ], function() {

  	gulp.src('.')
  	  	.pipe(webserver({
  	    	livereload: false,
  	    	directoryListing: true,
  	    	open: true
  	  	}));

});