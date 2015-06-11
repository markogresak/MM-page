'use strict';
var Imagemin = require('imagemin');

new Imagemin()
  .src('public/images/**/*.png')
  .dest('public/images')
  .use(Imagemin.optipng({optimizationLevel: 3}))
  .run(function (err, files) {
    // => {path: 'build/images/foo.jpg', contents: <Buffer 89 50 4e ...>}
  });
