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

var capacityArr = {
  1: [0, 1, 3],
  2: [0, 3],
  3: [3],
  100: [1, 2, 0]
};

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

// ф-ция получения минимальной цены для типа жилья

var getTypeMinPrice = function (element) {
  switch (element) {
    case 'flat':
      var price = 1000;
      break;
    case 'bungalo':
      price = '0';
      break;
    case 'house':
      price = 5000;
      break;
    default:
      price = 10000;
  }
  return price;
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

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPin = mapPins.querySelector('.map__pin');
var adForm = document.querySelector('.ad-form');
var adFormAddress = adForm.querySelector('#address');
var submit = document.querySelector('.ad-form__submit');
var reset = adForm.querySelector('.ad-form__reset');
var typeElement = document.querySelector('#type');
var priceElement = document.querySelector('#price');
var timeinElement = document.querySelector('#timein');
var timeoutElemet = document.querySelector('#timeout');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var dialogHandler = mapPins.querySelector('.map__pin--main');
var mapOverlay = map.querySelector('.map__overlay');
var mapTop = 130;
var mapBotton = 630;

// функция для активации формы

var onDeActivation = function () {
  if (userDialog.className === 'map map--faded') {
    fieldsetDisabledEnabled(document.querySelectorAll('fieldset'), false);
    fieldsetDisabledEnabled(document.querySelectorAll('.map__filter'), false);
    userDialog.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    fragment = document.createDocumentFragment();
    getMapPin = function () {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.id = i;
      pinElement.style = 'left: ' + propertyKeks[i].location.x + 'px; top: ' + propertyKeks[i].location.y + 'px;';
      pinElement.querySelector('img').src = propertyKeks[i].author.avatar;
      pinElement.querySelector('img').alt = propertyKeks[i].offer.title;
      return pinElement;
    };
    for (i = 0; i < propertyKeks.length; i++) {
      fragment.appendChild(getMapPin(propertyKeks[i]));
    }
    pinListElement.appendChild(fragment);
  }
};

mapPin.addEventListener('mouseup', function () {
  onDeActivation();
  onCardVisible();
  if (dialogHandler !== document.activeElement) {
    adFormAddress.value = [dialogHandler.style.left.replace('px', ''), dialogHandler.style.top.replace('px', '')];
  }
});

// обработчик по работе с об объявлении

var cardVisible = function (evt) {
  var int = evt.currentTarget.id;
  if (int !== '') {
    fragmentCard.appendChild(getMapCard(propertyKeks[int]));
    pinListCard.insertBefore(fragmentCard, mapFilters);
    if (document.querySelectorAll('.map__card').length > 1) {
      closePopup();
    }
  }
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

map.addEventListener('click', function (evt) {
  if (evt.target.classList.value === 'popup__close') {
    closePopup();
  }
});

timeinElement .addEventListener('input', function (evt) {
  var target = evt.currentTarget.value;
  timeoutElemet.value = target;
});

timeoutElemet.addEventListener('input', function (evt) {
  var target = evt.currentTarget.value;
  timeinElement.value = target;
});

var updateCoordinte = function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var limits = {
      top: mapTop,
      right: mapOverlay.offsetWidth - dialogHandler.offsetWidth,
      bottom: mapBotton,
      left: mapOverlay.offsetLeft
    };

    var coordNewX = dialogHandler.offsetLeft - shift.x;
    var coordNewY = dialogHandler.offsetTop - shift.y;

    if (coordNewX > limits.right) {
      coordNewX = limits.right;
    } else if (coordNewX < limits.left) {
      coordNewX = limits.left;
    }
    if (coordNewY > limits.bottom) {
      coordNewY = limits.bottom;
    } else if (coordNewY < limits.top) {
      coordNewY = limits.top;
    }
    dialogHandler.style.left = coordNewX + 'px';
    dialogHandler.style.top = coordNewY + 'px';
    adFormAddress.value = [coordNewX, coordNewX];
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    if (dragged) {
      var onClickPreventDefault = function (clickevt) {
        clickevt.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }

  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

dialogHandler.addEventListener('mousedown', updateCoordinte);

roomNumber.addEventListener('input', function (evt) {
  fieldsetDisabledEnabled(capacity, false);
  var roomNum = evt.currentTarget.value;
  var arrCapacity = capacityArr[roomNum];
  for (i = 0; i < arrCapacity.length; i++) {
    var value = arrCapacity[i];
    capacity[value].disabled = true;
  }
});

// ф-ция проверяет соотвествие кол-ва комнат кол-ву гостей
var validQuantityGuests = function () {
  var roomQuantity = roomNumber.value;
  var guestsQuantity = capacity.value;
  if (roomQuantity === '100' && guestsQuantity !== '0') {
    capacity.setCustomValidity('Количество комнат не для гостей');
  } else if (roomQuantity !== '100' && guestsQuantity === '0') {
    capacity.setCustomValidity('Количество комнат не для гостей');
  } else if (roomQuantity < guestsQuantity) {
    capacity.setCustomValidity('Для выбранного количества комнат не может быть больше' + ' ' + roomQuantity + ' ' + 'гостя(-ей)');
  } else {
    capacity.setCustomValidity('');
  }
};

submit.addEventListener('click', function () {
  var type = typeElement.value;
  var price = priceElement.value;
  var minPrice = getTypeMinPrice(type);
  if (minPrice > price) {
    priceElement.setCustomValidity('Для этого типа жилья минимальная сумма:' + ' ' + minPrice);
  } else {
    priceElement.setCustomValidity('');
  }
  validQuantityGuests();
});

reset.addEventListener('click', function () {
  adForm.classList.add('ad-form--disabled');
  userDialog.classList.add('map--faded');
  dialogHandler.style = 'left: 570px; top: 375px;';
  var cardList = mapPins.querySelectorAll('.map__pin');
  for (i = 1; i < cardList.length; i++) {
    mapPins.removeChild(cardList[i]);
  }
  closePopup();
});
