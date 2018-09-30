
'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var main = document.querySelector('main');

  function onMessageSuccessClose(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      var elemSucc = main.querySelector('.success');
      main.removeChild(elemSucc);
      main.removeEventListener('keydown', onMessageSuccessClose);
    }
  }

  function onMessageErrorClose(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      var elemError = main.querySelector('.error');
      main.removeChild(elemError);
      main.removeEventListener('keydown', onMessageSuccessClose);
    }
  }

  window.message = {
    messageSuccess: function () {
      var formSuccess = document.querySelector('#success').content.querySelector('.success');
      var cloneForm = formSuccess.cloneNode(true);
      main.appendChild(cloneForm);
      var elementSuccess = main.querySelector('.success');
      elementSuccess.addEventListener('click', function () {
        main.removeChild(elementSuccess);
      });
      main.addEventListener('keydown', onMessageSuccessClose);
    },
    messageError: function (errMess) {
      var formError = document.querySelector('#error').content.querySelector('.error');
      var cloneForm = formError.cloneNode(true);
      main.appendChild(cloneForm);
      var elemError = document.querySelector('.error');
      elemError.querySelector('.error__message').textContent = errMess;
      elemError.addEventListener('click', function () {
        main.removeChild(elemError);
      });
      main.addEventListener('keydown', onMessageErrorClose);
    }
  };
})();
