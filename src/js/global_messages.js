/**
 * jigius@gmail.com, 2023
 */

/**
 * Realizes auto closing all global messages which has defined data-autoclose attr
 */
(function($, hidePeriod) {
    $(function () {
        $(".alert[data-autoclose]").each(function () {
            if ($(this).data("autoclose") > 0) {
                setTimeout(
                    (function (that) {
                        return function () {
                            $(that).hide(hidePeriod);
                        }
                    })(this),
                    $(this).data("autoclose") * 1000
                )
            }
        });
    });
}) (require("jquery"), 150);
