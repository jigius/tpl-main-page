/**
 * Realizes auto closing all global messages which has defined data-autoclose attr
 */
$(function() {
    $(".alert[data-autoclose]").each(function () {
        if ($(this).data("autoclose") > 0) {
            setTimeout(
                (function (that) {
                    return function () {
                        $(that).hide(150);
                    }
                }) (this),
                $(this).data("autoclose") * 1000
            )
        }
    });
});
