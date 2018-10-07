'use strict';

(function () {

// шаблон для меток
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    getMapPin: function (propertyKeks, cb) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.setAttribute('id', propertyKeks.id);
      pinElement.style = 'left: ' + propertyKeks.location.x + 'px; top: ' + propertyKeks.location.y + 'px;';
      pinElement.querySelector('img').src = propertyKeks.author.avatar;
      pinElement.querySelector('img').alt = propertyKeks.offer.title;
      pinElement.addEventListener('click', cb);
      return pinElement;
    }
  };
})();
