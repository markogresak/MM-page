'use strict';
var Imagemin = require('imagemin');
var exec = require('child_process').exec;
var bin = './node_modules/.bin/';
// Minify main.js.
exec(bin + 'uglifyjs --screw-ie8 -m -c --unsafe -o public/main.min.js public/main.js', function () {
  console.log('minified main.js');
});
// Add vendor prefixes to and minify main.css.
exec(bin + 'postcss --use autoprefixer public/main.css | ' + bin + 'cleancss -o public/main.min.css', function () {
  console.log('minified main.css');
});

new Imagemin()
  .src('public/images/**/*.png')
  .dest('public/images')
  .use(Imagemin.optipng({
    optimizationLevel: 7
  }))
  .run(function () {
    console.log('minified images');
  });
