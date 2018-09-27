'use strict';

(function () {

// шаблон для меток
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getMapPin = function (propertyKeks, i) {

    var pinElement = pinTemplate.cloneNode(true);
    pinElement.id = i;
    pinElement.style = 'left: ' + propertyKeks.location.x + 'px; top: ' + propertyKeks.location.y + 'px;';
    pinElement.querySelector('img').src = propertyKeks.author.avatar;
    pinElement.querySelector('img').alt = propertyKeks.offer.title;

    return pinElement;
  };

  window.pin = {getMapPin: getMapPin};

})();
