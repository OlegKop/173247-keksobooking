'use strict';

(function () {
  var STATE_SUCCESS = 200;
  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking/'
  };

  window.backend = {
    getData: function (onLoad, onError) {
      var xhr = checkRequest(onLoad, onError);
      xhr.open('GET', Url.GET);
      xhr.send();
    },
    sendData: function (data, onLoad, onError) {
      var xhr = checkRequest(onLoad, onError);
      xhr.open('POST', Url.POST);
      xhr.send(data);
    }
  };

  var checkRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATE_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    return xhr;
  };
})();
