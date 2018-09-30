'use strict';

(function () {

  var featureType = window.data.featureType;

  // шаблон для объявлений
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // ф-ция для определения услуг объявления
  var getFeatures = function (featureArray, element) {
    var childElement = element.querySelectorAll('li');
    for (var i = 0; i < featureType.length; i++) {
      element.removeChild(childElement[i]);
    }
    for (var j = 0; j < featureArray.length; j++) {
      var className = 'popup__feature';
      var newElement = document.createElement('li');
      newElement.classList.add(className);
      var feature = 'popup__feature--' + featureArray[j];
      newElement.classList.add(feature);
      element.appendChild(newElement);
    }
  };

  // ф-ция для формирования блока с фото
  var renderPhotos = function (photodArray, element) {
    if (photodArray.length === 0) {
      element.querySelector('.popup__photo').classList.add('hidden');
    } else {
      for (var i = 0; i < photodArray.length; i++) {
        if (i === 0) {
          element.querySelector('img').setAttribute('src', photodArray[i]);
        } else {
          var newElement = element.querySelector('img').cloneNode(true);
          newElement.src = photodArray[i];
          element.appendChild(newElement);
        }
      }
    }

  };

  // ф-ция для переименования типа помещения с латиницы на русский
  var getNameRusType = function (element) {
    switch (element) {
      case 'flat':
        var name = 'Квартира';
        break;
      case 'bungalo':
        name = 'Бунгало';
        break;
      case 'house':
        name = 'Дом';
        break;
      default:
        name = 'Дворец';
    }
    return name;
  };

  var getMapCard = function (objCardDomElement) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = objCardDomElement.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = objCardDomElement.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = objCardDomElement.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getNameRusType(objCardDomElement.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = objCardDomElement.offer.rooms + ' комнаты для ' + objCardDomElement.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + objCardDomElement.offer.checkin + ', выезд до ' + objCardDomElement.offer.checkout;
    getFeatures(objCardDomElement.offer.features, cardElement.querySelector('.popup__features'));
    cardElement.querySelector('.popup__description').textContent = objCardDomElement.offer.description;
    renderPhotos(objCardDomElement.offer.photos, cardElement.querySelector('.popup__photos'));
    cardElement.querySelector('.popup__avatar').src = objCardDomElement.author.avatar;

    return cardElement;
  };
  window.card = {getMapCard: getMapCard};
})();
