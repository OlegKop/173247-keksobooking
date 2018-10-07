'use strict';

(function () {

  var CapacityArr = {
    1: [0, 1, 3],
    2: [0, 3],
    3: [3],
    100: [1, 2, 0]};
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.constant = {capacityArr: CapacityArr,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE
  };
})();
