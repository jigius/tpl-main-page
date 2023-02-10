/**
 * Js-код, который относится к шаблону фильтра каталога товаров.
 * Используется для вспомогательной цели - продемонстрировать работу шаблона в "активном" режиме
 *
 * !!! НЕ БУДЕТ включен в окончательную сборку проекта
 */
App
  .dependency
  .resolved('PhotoSwipeLightbox', 'PhotoSwipe', '$')
  .then(function (PhotoSwipeLightbox, PhotoSwipe, $) {
    const galleryId = "#img-gallery";
    $(function () {
      const lightbox = new PhotoSwipeLightbox({
        gallery: galleryId,
        children: 'a',
        pswpModule: PhotoSwipe,
        bgOpacity: 0.7,
        errorMsg: 'Картинка не загружена :(',
        closeTitle: 'Закрыть (Esc)',
        zoomTitle: 'Приблизить',
        arrowPrevTitle: 'Назад',
        arrowNextTitle: 'Вперед',
      });
      lightbox.on('uiRegister', function() {
        lightbox.pswp.ui.registerElement({
          name: 'download-button',
          order: 9,
          isButton: true,
          tagName: 'a',

          // SVG with outline
          html: {
            isCustomSVG: true,
            inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
            outlineID: 'pswp__icn-download'
          },

          // Or provide full svg:
          // html: '<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" class="pswp__icn"><path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" /></svg>',

          // Or provide any other markup:
          // html: '<i class="fa-solid fa-download"></i>'

          onInit: (el, pswp) => {
            el.setAttribute('download', '');
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener');
            el.setAttribute('title', 'Скачать');
            el.setAttribute('aria-label', 'Скачать');

            pswp.on('change', () => {
              el.href = pswp.currSlide.data.src;
            });
          }
        });
      });
      lightbox.init();
      (function () {
        $(galleryId + " .card-img-link").on("mouseenter", function (ev) {
          const container = $(".card-img-big");
          if (container.length === 0 || $(container).data("index") === $(this).data("index")) {
            return;
          }
          $(container).find("picture[data-index='" + $(container).data("index") + "']").hide();
          $(container).find("picture[data-index='" + $(this).data("index") + "']").show();
          $(container).data("index", $(this).data("index"));
        });
      }) ();
      (function () {
        $(".card-img-big").on("click", function (ev) {
          ev.preventDefault();
          $(galleryId).find(".card-img-link[data-index='" + $(this).data("index") + "'] picture").click();
        });
      }) ();
    });
  });

