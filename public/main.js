'use strict';
$(function () {
  var loadImages = function () {
    var carouselTemplateHtml = $('#carousel-template').remove().clone().removeAttr('id')[0].outerHTML;
    $.getJSON('/images').then(function (imagesObj) {
      Object.keys(imagesObj).forEach(function (folder) {
        var templateHtml = carouselTemplateHtml.replace(/\$1/g, folder);
        var carouselEl = $(templateHtml);
        var indicatorHtml = carouselEl.find('#indicator-template').removeAttr('id').remove().clone()[0].outerHTML;
        var itemHtml = carouselEl.find('#item-template').removeAttr('id').remove().clone()[0].outerHTML;
        window.itemHtml = itemHtml;
        var indicatorsEl = $();
        var itemsEl = $();
        imagesObj[folder].forEach(function (img, i) {
          var addClass = i === 0 ? 'active' : '';
          indicatorsEl = indicatorsEl.add(indicatorHtml.replace('$2', i)).addClass(addClass);
          var newItem = $(itemHtml.replace('$3', img.name)).addClass(addClass);
          newItem.find('img').attr('src', img.path);
          itemsEl = itemsEl.add(newItem);
        });
        $(carouselEl).find('.carousel-indicators').append(indicatorsEl);
        $(carouselEl).find('.carousel-inner').append(itemsEl);
        $('body').append(carouselEl);
      });
    });
  };
  loadImages();

  var resizeFn = function () {
    var windowHeight = $(window).height();
    $('.container-fluid').height(windowHeight);
    $('.carousel-inner > .item > img').height(windowHeight * 0.8);
  };

  $(window).resize(resizeFn);
  resizeFn();
});
