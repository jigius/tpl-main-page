/**
 * If there is elements with class `has-error` - does a scrolling the viewport to it
 */
$(function() {
    const sel = $(".form-group.has-error");
    if (sel.length > 0) {
        sel[0].scrollIntoView(true);
    }
});
