/**
 * Js-код, который относится к шаблону фильтра каталога товаров.
 * Используется для вспомогательной цели - продемонстрировать работу шаблона в "активном" режиме
 *
 * !!! НЕ БУДЕТ включен в окончательную сборку проекта
 */
App
  .dependency
  .resolved('Swiper', '$')
  .then(function (Swiper, $) {
    const swiper = new Swiper(".swiper", {
      spaceBetween: 1,
      centeredSlides: true,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        //clickable: false,
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });

