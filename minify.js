'use strict';
var glob = require('glob');
var Imagemin = require('imagemin');
var exec = require('child_process').exec;
var bin = './node_modules/.bin/';
// Minify main.js.
exec(bin + 'uglifyjs --screw-ie8 -m -c --unsafe -o public/main.min.js public/main.js public/load-css.js', function () {
  console.log('minified main.js');
});
// Add vendor prefixes to and minify main.css.
exec(bin + 'postcss --use autoprefixer public/main.css | ' + bin + 'cleancss -o public/main.min.css', function () {
  console.log('minified main.css');
});

glob('public/images/**/*.png', {}, function (err, files) {
  if (err) {
    throw err;
  }
  var imageminPromises = files.map(function (file) {
    return new Promise(function (resolve) {
      new Imagemin()
        .src(file)
        .dest(file)
        .use(Imagemin.optipng({
          optimizationLevel: 7,
          progressive: true
        }))
        .run(function () {
          resolve();
        });
    });
  });
  Promise.all(imageminPromises).then(function () {
    console.log('minified images');
  });
});
