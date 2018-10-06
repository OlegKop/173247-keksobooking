'use strict';

(function () {

  var setDisabledEnabled = window.map.setDisabledEnabled;
  var adForm = window.map.adForm;
  var map = window.map.map;
  var mapPinMain = window.map.mapPinMain;
  var mapPins = window.map.mapPins;
  var mapFilters = window.map.mapFilters;
  var capacityArr = window.constant.capacityArr;
  var submit = document.querySelector('.ad-form__submit');
  var reset = adForm.querySelector('.ad-form__reset');
  var typeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var deleteElementsMap = window.map.deleteElementsMap;
  var propertyKeksClear = window.map.propertyKeksClear;
  var preview = window.map.preview;
  var previewImg = preview.querySelector('img');

  roomNumber.addEventListener('input', function (evt) {
    setDisabledEnabled(capacity, false);
    var roomNum = evt.currentTarget.value;
    var arrCapacity = capacityArr[roomNum];
    for (var i = 0; i < arrCapacity.length; i++) {
      var value = arrCapacity[i];
      capacity[value].disabled = true;
    }
  });

  // ф-ция получения минимальной цены для типа жилья

  var getTypeMinPrice = function (element) {
    switch (element) {
      case 'flat':
        return 1000;
      case 'bungalo':
        return 0;
      case 'house':
        return 5000;
      default:
        return 10000;
    }
  };

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

  var resetForm = function () {
    mapFilters.reset();
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    mapPinMain.style = 'left: 570px; top: 375px;';
    var cardList = mapPins.querySelectorAll('.map__pin');

    for (var i = 1; i < cardList.length; i++) {
      mapPins.removeChild(cardList[i]);
    }
    deleteElementsMap(mapPins, '.map__pin');
    deleteElementsMap(map, '.map__card');
    propertyKeksClear();
    setDisabledEnabled(document.querySelectorAll('fieldset'), true);
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.sendData(new FormData(adForm), window.message.messageSuccess, window.message.messageError);
    adForm.reset();
    evt.preventDefault();
    reset.removeEventListener('click', resetForm);
    resetForm();
    previewImg.src = 'img/muffin-grey.svg';
    resetForm();
  });

  reset.addEventListener('click', resetForm);
})();
