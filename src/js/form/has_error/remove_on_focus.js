/**
 * Removes class `has-error` on a focused .form-group.has-error element
 */
$(function() {
    $(document).on("change keyup", "input, select, textarea", function () {
        $(this).closest(".form-group.has-error").removeClass("has-error");
    });
});
