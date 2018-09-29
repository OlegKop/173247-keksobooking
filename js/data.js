
'use strict';

(function () {

  var avatar = ['img/avatars/user0'];
  var titleList = ['Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];
  var checkInOut = ['12:00', '13:00', '14:00'];
  var roomType = ['palace', 'flat', 'house', 'bungalo'];
  var featureType = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var capacityArr = {
    1: [0, 1, 3],
    2: [0, 3],
    3: [3],
    100: [1, 2, 0]};

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
  var title = mixArray(titleList);

  var getPropertyKeks = function (objAvatars, objTitle, priceMin, priceMax, type, roomsMax,
      guestsMax, check, features, photo, xMin, xMax, yMin, yMax) {
    var propertyKeks = [];
    for (var i = 0; i <= 8; i++) {
      propertyKeks.push(advert);
      for (var j = 0; j <= i; j++) {
        avatarList = objAvatars;
        titleList = objTitle;
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

  var propertyKeksArray = getPropertyKeks(avatarList, title, 1000, 1000000, roomType, 5,
      10, checkInOut, featureType, photos, 10, 1050, 130, 630);

  window.data = {propertyKeks: propertyKeksArray,
    featureType: featureType,
    capacityArr: capacityArr};

})();

