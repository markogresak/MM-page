'use strict';
var express = require('express');
var fs = require('fs');
var path = require('path');
var watch = require('watch');
var port = 9500;
// Path to images folder.
var publicPath = path.relative(__dirname, 'public/');
var imagesPublicPath = 'images';
var imagesPath = path.resolve(publicPath, imagesPublicPath);
// Object storing images file names.
var imagesObj = {
  '2d': [],
  '3d': []
};
// Watch imagesPath folder, update files on change.
//  Function is called when watchTree is first declared and on each change inside imagesPath folder.
watch.watchTree(imagesPath, function () {
  Object.keys(imagesObj).forEach(function (folder) {
    fs.readdir(path.resolve(imagesPath, folder), function (err, filesArray) {
      if (err) {
        return;
      }
      imagesObj[folder] = filesArray.map(function (imageFileName) {
        return path.relative(__dirname, path.resolve(imagesPublicPath, folder, imageFileName));
      });
    });
  });
});
// Init app and serve static files from public, jquery and bootstrap folers.
var app = express();
app.use(express.static('public'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
// Listen on `port` (later proxied with nginx).
app.listen(port);
console.log('listening on port', port);
