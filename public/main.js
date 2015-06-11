'use strict';
$(function () {
  var resizeFn = function () {
    var windowHeight = $(window).height();
    $('.container-fluid').height(windowHeight);
    $('.carousel-inner > .item > img').height(windowHeight * 0.8);
  };

  $(window).resize(resizeFn);
  resizeFn();
});
