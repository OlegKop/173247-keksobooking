'use strict';

// удаление класса map--faded у блока map
var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

var avatarList = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png',
  'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var titleList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var checkInOut = ['12:00', '13:00', '14:00'];
var roomType = ['palace', 'flat', 'house', 'bungalo'];
var featureType = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',

  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// определение случайного целого числа
var randomInt = function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// определение случайного элемента из массива
var nameArr = function (arr) {
  var arrName = arr[Math.floor(Math.random() * arr.length)];
  return arrName;
};

// перемешивание массива с использованием сортировки случайным образом
function compareRandom(_a, _b) {
  return Math.random() - 0.5;
}

function mixArray(arr) {
  return arr.sort(compareRandom);
}

// выборка случайного кол-ва данных из массива
var featureRand = function (arrT) {
  var lenArr = randomInt(1, arrT.length);
  var arrNames = [];
  for (var i = 0; i < lenArr; i++) {
    arrNames.push(arrName);
    for (var j = 0; j <= arrT.length; j++) {
      var arrName = arrT[i];
    }
  }
  arrNames.splice(0, 1);
  return arrNames;
};

// перемешиваем аватарки и описание
avatarList = mixArray(avatarList);
titleList = mixArray(titleList);

var getPropertyKeks = function (avatar, title, priceMin, priceMax, type, roomsMax,
    guestsMax, check, features, photo, xMin, xMax, yMin, yMax) {
  var propertyKeks = [];
  for (var i = 0; i <= 8; i++) {
    propertyKeks.push(advert);

    for (var j = 0; j <= i; j++) {
      avatarList = avatar;
      titleList = title;
      var checkInOutR = nameArr(check);
      var roomTypeR = nameArr(type);
      var featureR = featureRand(features);
      var photoR = mixArray(photo);
      var locationX = randomInt(xMin, xMax) - 25;
      var locationY = randomInt(yMin, yMax) - 70;
      var addr = [locationX, locationY];
      var priceR = randomInt(priceMin, priceMax);
      var roomsR = randomInt(1, roomsMax);
      var guestR = randomInt(1, guestsMax);
      var advert = {
        'author': {
          'avatar': avatarList[i]
        },

        'offer': {
          'title': titleList[i],
          'address': addr,
          'price': priceR,
          'type': roomTypeR,
          'rooms': roomsR,
          'guests': guestR,
          'checkin': checkInOutR,
          'checkout': checkInOutR,
          'features': featureR,
          'description': '',
          'photos': photoR
        },

        'location': {
          'x': locationX,
          'y': locationY
        }
      };

    }

  }
  propertyKeks.splice(0, 1);
  return propertyKeks;
};

var propertyKeks = getPropertyKeks(avatarList, titleList, 1000, 1000000, roomType, 5,
    10, checkInOut, featureType, photos, 10, 1050, 130, 630);

// блок вставки меток
var pinListElement = document.querySelector('.map__pins');

// шаблон для меток
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var fragment = document.createDocumentFragment();

var getMapPin = function (_pinListElement) {

  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + propertyKeks[i].location.x + 'px; top: ' + propertyKeks[i].location.y + 'px;';
  pinElement.querySelector('img').setAttribute('src', propertyKeks[i].author.avatar);
  pinElement.querySelector('img').setAttribute('alt', propertyKeks[i].offer.title);

  return pinElement;
};

fragment = document.createDocumentFragment();

for (var i = 0; i < propertyKeks.length; i++) {
  fragment.appendChild(getMapPin(propertyKeks[i]));
}

pinListElement.appendChild(fragment);

// блок вставки объявлений
var pinListCard = document.querySelector('.map');

// шаблон для объявлений
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var mapFilters = document.querySelector('.map__filters-container');

// ф-ция для определения услуг объявления
var getFeaturs = function (featurArray, element) {
  var childElement = element.querySelectorAll('li');
  for (i = featurArray.length; i < featureType.length; i++) {
    element.removeChild(childElement[i]);
  }
};

// ф-ция для формирования блока с фото
var renderPhotos = function (photodArray, element) {
  for (i = 0; i < photodArray.length; i++) {
    if (i === 0) {
      element.querySelector('img').setAttribute('src', propertyKeks[0].offer.photos[i]);
    } else {
      var newElement = element.querySelector('img').cloneNode(true);
      newElement.src = propertyKeks[0].offer.photos[i];
      element.appendChild(newElement);
    }
  }
};

// ф-ция для переименования типа помещения с латиницы на русский
var getNameRusType = function (element) {
  if (element === 'flat') {
    var name = 'Квартира';
  } else if (element === 'bungalo') {
    name = 'Бунгало';
  } else if (element === 'house') {
    name = 'Дом';
  } else if (element === 'palace') {
    name = 'Дворец';
  }
  return name;
};

var getMapCard = function (_pinListCard) {

  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = propertyKeks[0].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = propertyKeks[0].offer.address;
  cardElement.querySelector('.popup__text--price').textContent = propertyKeks[0].offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getNameRusType(propertyKeks[0].offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = propertyKeks[0].offer.rooms + ' комнаты для ' + propertyKeks[0].offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + propertyKeks[0].offer.checkin + ', выезд до ' + propertyKeks[0].offer.checkout;
  getFeaturs(propertyKeks[0].offer.features, cardElement.querySelector('.popup__features'));
  cardElement.querySelector('.popup__description').textContent = propertyKeks[0].offer.description;
  renderPhotos(propertyKeks[0].offer.photos, cardElement.querySelector('.popup__photos'));
  cardElement.querySelector('.popup__avatar').src = propertyKeks[0].author.avatar;

  return cardElement;
};

var fragmentCard = document.createDocumentFragment();

fragmentCard.appendChild(getMapCard(propertyKeks[1]));

pinListCard.insertBefore(fragmentCard, mapFilters);

