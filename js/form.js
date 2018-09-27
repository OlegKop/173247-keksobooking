'use strict';

(function () {

  var fieldsetDisabledEnabled = window.map.fieldsetDisabledEnabled;
  var adForm = window.map.adForm;
  var userDialog = window.map.userDialog;
  var dialogHandler = window.map.dialogHandler;
  var mapPins = window.map.mapPins;
  var closePopup = window.map.closePopup;
  var capacityArr = window.data.capacityArr;
  var submit = document.querySelector('.ad-form__submit');
  var reset = adForm.querySelector('.ad-form__reset');
  var typeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  roomNumber.addEventListener('input', function (evt) {
    fieldsetDisabledEnabled(capacity, false);
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
    for (var i = 1; i < cardList.length; i++) {
      mapPins.removeChild(cardList[i]);
    }
    closePopup();
  });
})();
