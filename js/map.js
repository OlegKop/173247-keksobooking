'use strict';
(function () {
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

  var propertyKeks = window.data.propertyKeks;

  // обработчки событий

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPin = mapPins.querySelector('.map__pin');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var timeinElement = document.querySelector('#timein');
  var timeoutElemet = document.querySelector('#timeout');
  var dialogHandler = mapPins.querySelector('.map__pin--main');
  var mapOverlay = map.querySelector('.map__overlay');
  var mapTop = 130;
  var mapBotton = 630;
  var fragment = document.createDocumentFragment();
  var getMapPin = window.pin.getMapPin;
  var getMapCard = window.card.getMapCard;
  var mapFilters = document.querySelector('.map__filters-container');
  var pinListCard = document.querySelector('.map');

  // функция для активации формы

  var onDeActivation = function () {
    if (userDialog.className === 'map map--faded') {
      fieldsetDisabledEnabled(document.querySelectorAll('fieldset'), false);
      fieldsetDisabledEnabled(document.querySelectorAll('.map__filter'), false);
      userDialog.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      for (var i = 0; i < propertyKeks.length; i++) {
        fragment.appendChild(getMapPin(propertyKeks[i], i));
      }
      mapPins.appendChild(fragment);
    }
  };

  mapPin.addEventListener('mousedown', function () {
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
      fragment.appendChild(getMapCard(propertyKeks[int]));
      pinListCard.insertBefore(fragment, mapFilters);
      if (document.querySelectorAll('.map__card').length > 1) {
        closePopup();
      }
    }
  };

  var onCardVisible = function () {
    var buttons = mapPins.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
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
      adFormAddress.value = [coordNewX, coordNewY];
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

  window.map = {adForm: adForm,
    fieldsetDisabledEnabled: fieldsetDisabledEnabled,
    userDialog: userDialog,
    dialogHandler: dialogHandler,
    mapPins: mapPins,
    closePopup: closePopup};
})();
