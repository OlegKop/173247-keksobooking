'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileAvatar = window.map.fileChooser;
  var preview = window.map.preview;
  var previewImg = preview.querySelector('img');

  fileAvatar.addEventListener('change', function () {
    var file = fileAvatar.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewImg.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
})();
