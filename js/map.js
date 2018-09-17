'use strict';

// удаление класса map--faded у блока map
var userDialog = document.querySelector('.map');

var fieldsetDisabledEnabled = function (domElement, flag) {
  for (var i = 0; i < domElement.length; i++) {
    var element = domElement[i];
    element.disabled = flag;
  }
};

fieldsetDisabledEnabled(document.querySelectorAll('fieldset'), true);

fieldsetDisabledEnabled(document.querySelectorAll('.map__filter'), true);

var avatar = ['img/avatars/user0'];
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

// ф-ция по генерации массива для аватарок
var getAvatarList = function (element, quantity, format) {
  var avatars = [];
  for (var i = 0; i < quantity; i++) {
    var num = 1;
    num += i;
    var avatarElement = element + num + format;
    avatars.push(avatarElement);
  }
  return avatars;
};

var avatarList = getAvatarList(avatar, 8, '.png');

// определение случайного целого числа
var randomInt = function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// определение случайного элемента из массива
var nameArr = function (arr) {
  var arrName = arr[Math.floor(Math.random() * arr.length)];
  return arrName;
};

function compareRandom() {
  return Math.random() - 0.5;
}

// перемешивание массива с использованием сортировки случайным образом
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

var getPropertyKeks = function (avatars, title, priceMin, priceMax, type, roomsMax,
    guestsMax, check, features, photo, xMin, xMax, yMin, yMax) {
  var propertyKeks = [];
  for (var i = 0; i <= 8; i++) {
    propertyKeks.push(advert);

    for (var j = 0; j <= i; j++) {
      avatarList = avatars;
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

var getMapPin = function () {

  var pinElement = pinTemplate.cloneNode(true);
  pinElement.id = i;
  pinElement.style = 'left: ' + propertyKeks[i].location.x + 'px; top: ' + propertyKeks[i].location.y + 'px;';
  pinElement.querySelector('img').src = propertyKeks[i].author.avatar;
  pinElement.querySelector('img').alt = propertyKeks[i].offer.title;

  return pinElement;
};

fragment = document.createDocumentFragment();

for (var i = 0; i < propertyKeks.length; i++) {
  fragment.appendChild(getMapPin(propertyKeks[i]));
}

// pinListElement.appendChild(fragment);

// блок вставки объявлений
var pinListCard = document.querySelector('.map');

// шаблон для объявлений
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var mapFilters = document.querySelector('.map__filters-container');

// ф-ция для определения услуг объявления
var getFeatures = function (featureArray, element) {
  var childElement = element.querySelectorAll('li');
  for (i = featureArray.length; i < featureType.length; i++) {
    element.removeChild(childElement[i]);
  }
};

// ф-ция для формирования блока с фото
var renderPhotos = function (photodArray, element) {
  for (i = 0; i < photodArray.length; i++) {
    if (i === 0) {
      element.querySelector('img').setAttribute('src', propertyKeks[i].offer.photos[i]);
    } else {
      var newElement = element.querySelector('img').cloneNode(true);
      newElement.src = propertyKeks[i].offer.photos[i];
      element.appendChild(newElement);
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

var fragmentCard = document.createDocumentFragment();

// обработчки событий

var mapPins = document.querySelector('.map__pins');
var mapPin = mapPins.querySelector('.map__pin');
var adForm = document.querySelector('.ad-form');
var adFormAddress = adForm.querySelector('#address');
var IntCoord = Math.round(65 / 2);
// функция для активации формы

var onDeActivation = function () {
  fieldsetDisabledEnabled(document.querySelectorAll('fieldset'), false);

  fieldsetDisabledEnabled(document.querySelectorAll('.map__filter'), false);

  userDialog.classList.remove('map--faded');

  adForm.classList.remove('ad-form--disabled');

  pinListElement.appendChild(fragment);
};

mapPin.addEventListener('mouseup', function (evt) {
  onDeActivation();
  onCardVisible();
  adFormAddress.value = [evt.clientX - IntCoord, evt.clientY - IntCoord];
});

// обработчик по работе с об объявлении

var cardVisible = function (evt) {
  var int = evt.target.id;
  fragmentCard.appendChild(getMapCard(propertyKeks[int]));
  pinListCard.insertBefore(fragmentCard, mapFilters);
};

var onCardVisible = function () {
  var buttons = mapPins.querySelectorAll('button');
  for (i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    button.addEventListener('click', cardVisible);
  }
};

var closePopup = function () {
  var mapCard = document.querySelector('.map__card');
  mapCard.parentNode.removeChild(mapCard);
};

var map = document.querySelector('.map');
map.addEventListener('click', function (evt) {
  if (evt.target.classList.value === 'popup__close') {
    closePopup();
  }
});
