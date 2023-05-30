/**
 * Js-код, который относится к шаблону фильтра каталога товаров.
 * Используется для вспомогательной цели - продемонстрировать работу шаблона в "активном" режиме
 *
 * !!! НЕ БУДЕТ включен в окончательную сборку проекта
 */
App
  .dependency
  .resolved('photoswipe')
  .then(function (photoswipe) {
    photoswipe('.my-gallery');
    //photoswipe('.img-gallery');
  });
