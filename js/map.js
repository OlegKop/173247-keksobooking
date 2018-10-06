'use strict';
(function () {

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPin = mapPins.querySelector('.map__pin');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var timeinElement = document.querySelector('#timein');
  var timeoutElemet = document.querySelector('#timeout');
  var dialogHandler = mapPins.querySelector('.map__pin--main');
  var mapOverlay = map.querySelector('.map__overlay');
  var fragment = document.createDocumentFragment();
  var getMapPin = window.pin.getMapPin;
  var getMapCard = window.card.getMapCard;
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var pinListCard = document.querySelector('.map');
  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview');
  var formUpload = document.querySelector('.ad-form__upload input[type=file]');
  var formPhoto = document.querySelector('.ad-form__photo');

  var ESC_KEYCODE = window.data.ESC_KEYCODE;
  var ENTER_KEYCODE = window.data.ENTER_KEYCODE;
  var MAP_TOP = 130;
  var MAP_BOTTON = 630;
  var PIN_WIDTH = Math.round(65 / 2);
  var LENGTH_ARRAY = 5;

  var fieldsetDisabledEnabled = function (domElement, flag) {
    for (var i = 0; i < domElement.length; i++) {
      var element = domElement[i];
      element.disabled = flag;
    }
  };

  fieldsetDisabledEnabled(document.querySelectorAll('fieldset'), true);

  fieldsetDisabledEnabled(document.querySelectorAll('.map__filter'), true);

  // ф-ция загрузки меток объявлений
  var pins = function (countPins, mask) {
    deleteElementsMap(mapPins, '.map__pin');
    deleteElementsMap(map, '.map__card');
    for (var i = 0; i < countPins; i++) {
      if (propertyKeks[i].rank === mask || propertyKeks[i].rank === null) {
        fragment.appendChild(getMapPin(propertyKeks[i], cardVisible));
      }
    }
    mapPins.appendChild(fragment);
  };

  // ф-ция загрузки карточек объявлений
  var cards = function (countCard, maskS) {
    var fragmentCard = document.createDocumentFragment();
    for (var i = 0; i < countCard; i++) {
      if (propertyKeks[i].rank === maskS || propertyKeks[i].rank === null) {
        var card = getMapCard(propertyKeks[i], cardVisible);
        fragmentCard.appendChild(card);
      }
    }
    pinListCard.insertBefore(fragmentCard, mapFiltersContainer);
  };

  var errorHandler = function (errorMessage) {
    window.message.messageError(errorMessage);
  };

  var propertyKeks = [];
  var successHandler = function (data) {
    for (var i = 0; i < data.length; i++) {
      propertyKeks.push(data[i]);
      propertyKeks[i].id = i;
      propertyKeks[i].rank = null;
    }
    pins(LENGTH_ARRAY);
    cards(LENGTH_ARRAY);
    return propertyKeks;
  };

  var onDeActivation = function () {
    if (map.className === 'map map--faded') {
      window.backend.getData(successHandler, errorHandler);
      fieldsetDisabledEnabled(document.querySelectorAll('fieldset'), false);
      fieldsetDisabledEnabled(document.querySelectorAll('.map__filter'), false);
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
    }
    if (dialogHandler !== document.activeElement) {
      var coordX = parseInt(dialogHandler.style.left.replace('px', ''), 10);
      var coordY = parseInt(dialogHandler.style.top.replace('px', ''), 10);
      adFormAddress.value = [coordX + PIN_WIDTH, coordY];
    }
    dialogHandler.removeEventListener('mouseup', onDeActivation);
  };

  var removeActivePin = function () {
    var buttons = mapPins.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      var element = buttons[i];
      element.classList.remove('map__pin--active');
    }
    var card = document.querySelector('.map__card');
    if (card) {
      var mapCard = document.querySelectorAll('.map__card');
      for (i = 0; i < mapCard.length; i++) {
        element = mapCard[i];
        element.classList.add('hidden');
      }
    }
  };

  mapPin.addEventListener('mosedown', function (evt) {
    removeActivePin();
    var int = evt.currentTarget.id;
    if (int !== '') {
      mapPin.getElementById(int).classList.add('map__pin--active');
      var mapCard = document.querySelectorAll('.map__card');
      for (var i = 0; i < mapCard.length; i++) {
        var elemArticle = mapCard[i];
        if (elemArticle.getAttribute('id') === int) {
          elemArticle.classList.remove('hidden');
        }
      }
    }
  });

  var onCardVisible = function (int) {
    removeActivePin();
    if (int !== null) {
      document.getElementById(int).classList.add('map__pin--active');
      var mapCard = document.querySelectorAll('.map__card');

      for (var i = 0; i < mapCard.length; i++) {
        var elemArticle = mapCard[i];
        if (elemArticle.getAttribute('id') === int) {
          elemArticle.classList.remove('hidden');
        }
      }
    }
  };

  var cardVisible = function (evt) {
    var int = evt.currentTarget.id;
    if (int !== null) {
      var buttons = mapPins.querySelectorAll('button');
      for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.addEventListener('click', onCardVisible(int));
      }
    }
  };

  var closePopup = function () {
    var mapCard = document.querySelectorAll('.map__card');
    for (var i = 0; i < mapCard.length; i++) {
      var element = mapCard[i];
      element.classList.add('hidden');
      var buttons = mapPins.querySelectorAll('button');
      element = buttons[i];
    }
    removeActivePin();
  };

  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  });

  map.addEventListener('mousedown', function (evt) {
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

  // событие на перемещие главной метки

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dialogCoord = {
      x: dialogHandler.offsetLeft,
      y: dialogHandler.offsetTop
    };
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var moveMouseMap = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var limits = {
        top: MAP_TOP,
        right: mapOverlay.offsetWidth - dialogHandler.offsetWidth,
        bottom: MAP_BOTTON,
        left: mapOverlay.offsetLeft
      };

      var coordNewX = moveMouseMap.x - startCoords.x + dialogCoord.x + PIN_WIDTH;
      var coordNewY = moveMouseMap.y - startCoords.y + dialogCoord.y;

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
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      var coordNewX = dialogHandler.offsetLeft;
      var coordNewY = dialogHandler.offsetTop;
      adFormAddress.value = [coordNewX, coordNewY];
      onDeActivation();
    };
    if (dragged) {
      var onClickPreventDefault = function (evtDr) {
        evtDr.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  // ф-ция удаления объектов
  var deleteElementsMap = function (elemParent, classElem) {
    var childElement = elemParent.querySelectorAll(classElem);
    for (var indElem = 0; indElem < childElement.length; indElem++) {
      if (childElement[indElem].hasAttribute('id')) {
        elemParent.removeChild(childElement[indElem]);
      }
    }
  };

  // ф-ция подсчета ранга у текущего объекта-объявления
  var getRank = function (objCard) {
    var rank = 0;
    if ((objCard.offer.type === filterPropertyKeks['housing-type'][0]) && (filterPropertyKeks['housing-type'][0])) {
      rank += filterPropertyKeks['housing-type'][1];
    }

    switch (filterPropertyKeks['housing-price'][0]) {
      case 'middle':
        if (objCard.offer.price >= 10000 && objCard.offer.price <= 50000) {
          rank += filterPropertyKeks['housing-price'][1];
        }
        break;
      case 'low':
        if (objCard.offer.price < 10000) {
          rank += filterPropertyKeks['housing-price'][1];
        }
        break;
      case 'high':
        if (objCard.offer.price > 50000) {
          rank += filterPropertyKeks['housing-price'][1];
        }
        break;
    }
    if ((objCard.offer.rooms === parseInt(filterPropertyKeks['housing-rooms'][0], 10)) && (filterPropertyKeks['housing-rooms'][0])) {
      rank += filterPropertyKeks['housing-rooms'][1];
    }

    if ((objCard.offer.guests === parseInt(filterPropertyKeks['housing-guests'][0], 10)) && (filterPropertyKeks['housing-guests'][0])) {
      rank += filterPropertyKeks['housing-guests'][1];
    }

    if (~objCard.offer.features.indexOf(filterPropertyKeks['filter-wifi'][0]) && (filterPropertyKeks['filter-wifi'][0])) {
      rank += filterPropertyKeks['filter-wifi'][1];
    }

    if (~objCard.offer.features.indexOf(filterPropertyKeks['filter-dishwasher'][0]) && (filterPropertyKeks['filter-dishwasher'][0])) {
      rank += filterPropertyKeks['filter-dishwasher'][1];
    }

    if (~objCard.offer.features.indexOf(filterPropertyKeks['filter-parking'][0]) && (filterPropertyKeks['filter-parking'][0])) {
      rank += filterPropertyKeks['filter-parking'][1];
    }

    if (~objCard.offer.features.indexOf(filterPropertyKeks['filter-washer'][0]) && (filterPropertyKeks['filter-washer'][0])) {
      rank += filterPropertyKeks['filter-washer'][1];
    }

    if (~objCard.offer.features.indexOf(filterPropertyKeks['filter-elevator'][0]) && (filterPropertyKeks['filter-elevator'][0])) {
      rank += filterPropertyKeks['filter-elevator'][1];
    }

    if (~objCard.offer.features.indexOf(filterPropertyKeks['filter-conditioner'][0]) && (filterPropertyKeks['filter-conditioner'][0])) {
      rank += filterPropertyKeks['filter-conditioner'][1];
    }

    objCard.rank = rank;
    return rank;
  };

  var filterPropertyKeks = {
    'housing-type': ['', 512],
    'housing-price': ['', 256],
    'housing-rooms': ['', 128],
    'housing-guests': ['', 64],
    'filter-wifi': ['', 32],
    'filter-dishwasher': ['', 16],
    'filter-parking': ['', 8],
    'filter-washer': ['', 4],
    'filter-elevator': ['', 2],
    'filter-conditioner': ['', 1]
  };

  var sumMask = function (filterProp) {
    var mask = 0;
    for (var key in filterProp) {
      if (filterProp[key][0]) {
        mask += filterProp[key][1];
      }
    }
    return mask;
  };

  // ф-ция определяющая порядок сортировки по 2-му критерию (свойство title у объекта-объявления)
  var compareNamesForSort = function (leftName, rightName) {
    if (leftName > rightName) {
      return 1;
    } else if (leftName < rightName) {
      return -1;
    } else {
      return 0;
    }
  };

  // ф-ция определяющая порядок сортировки по 1-му критерию (свойство rank у объекта-объявления)
  var comparePropertyForSort = function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    return rankDiff === 0 ? compareNamesForSort(left.offer.title, right.offer.title) : rankDiff;
  };

  // обработчик изменения значения в поле input в форме фильтрации меток объявлений
  var onHousingFilterChange = function (evt) {
    var valFilter = evt.currentTarget.value;
    filterPropertyKeks[evt.currentTarget.name][0] = '';
    if (valFilter !== 'any') {
      filterPropertyKeks[evt.currentTarget.name][0] = valFilter;
    }
    window.debounce(updateFilter);
  };

  // ф-ция фильтрации для checkbox
  var setFilterInCheckBox = function (evtFilter) {
    var valFilter = evtFilter.currentTarget.checked;
    var tempStr = evtFilter.currentTarget.id;
    var valFilterForRelation = tempStr.substr(tempStr.indexOf('-') + 1, tempStr.length);
    filterPropertyKeks[evtFilter.currentTarget.id][0] = '';
    if (valFilter) {
      filterPropertyKeks[evtFilter.currentTarget.id][0] = valFilterForRelation;
    }
    window.debounce(updateFilter);
  };

  var onHousingFilterCheckBoxChange = function (evt) {
    setFilterInCheckBox(evt);
  };

  var onHousingFilterCheckBoxKeyDown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      if (evt.currentTarget.checked) {
        evt.currentTarget.checked = false;
      } else {
        evt.currentTarget.checked = true;
      }
      setFilterInCheckBox(evt);
    }
  };

  var updateFilter = function () {
    filterPin(propertyKeks.sort(comparePropertyForSort));
  };

  var housingTypeElement = document.querySelector('#housing-type');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var filterWifiElement = document.querySelector('#filter-wifi');
  var filterDishwasherElement = document.querySelector('#filter-dishwasher');
  var filterParkingElement = document.querySelector('#filter-parking');
  var filterWasherElement = document.querySelector('#filter-washer');
  var filterElevatorElement = document.querySelector('#filter-elevator');
  var filterConditionerElement = document.querySelector('#filter-conditioner');

  housingTypeElement.addEventListener('change', onHousingFilterChange);
  housingPriceElement.addEventListener('change', onHousingFilterChange);
  housingRoomsElement.addEventListener('change', onHousingFilterChange);
  housingGuestsElement.addEventListener('change', onHousingFilterChange);
  filterWifiElement.addEventListener('change', onHousingFilterCheckBoxChange);
  filterDishwasherElement.addEventListener('change', onHousingFilterCheckBoxChange);
  filterParkingElement.addEventListener('change', onHousingFilterCheckBoxChange);
  filterWasherElement.addEventListener('change', onHousingFilterCheckBoxChange);
  filterElevatorElement.addEventListener('change', onHousingFilterCheckBoxChange);
  filterConditionerElement.addEventListener('change', onHousingFilterCheckBoxChange);
  filterWifiElement.addEventListener('keydown', onHousingFilterCheckBoxKeyDown);
  filterDishwasherElement.addEventListener('keydown', onHousingFilterCheckBoxKeyDown);
  filterParkingElement.addEventListener('keydown', onHousingFilterCheckBoxKeyDown);
  filterWasherElement.addEventListener('keydown', onHousingFilterCheckBoxKeyDown);
  filterElevatorElement.addEventListener('keydown', onHousingFilterCheckBoxKeyDown);
  filterConditionerElement.addEventListener('keydown', onHousingFilterCheckBoxKeyDown);


  // ф-ция загрузки меток и карточек объявлений при фильтрации
  var filterPin = function () {
    deleteElementsMap(mapPins, '.map__pin');
    deleteElementsMap(map, '.map__card');
    onCardVisible(null);
    var takeNumber = propertyKeks.length > LENGTH_ARRAY ? LENGTH_ARRAY : propertyKeks.length;
    var sMask = sumMask(filterPropertyKeks);
    pins(takeNumber, sMask);
    cards(takeNumber, sMask);
    propertyKeks.forEach(function (objArr) {
      objArr.rank = 0;
    });
  };

  // ф-ция очищает массив
  var propertyKeksClear = function () {
    propertyKeks = [];
  };

  window.map = {adForm: adForm,
    fieldsetDisabledEnabled: fieldsetDisabledEnabled,
    map: map,
    dialogHandler: dialogHandler,
    mapPins: mapPins,
    closePopup: closePopup,
    deleteElementsMap: deleteElementsMap,
    mapFilters: mapFilters,
    propertyKeksClear: propertyKeksClear,
    fileChooser: fileChooser,
    preview: preview,
    formUpload: formUpload,
    formPhoto: formPhoto
  };
})();
