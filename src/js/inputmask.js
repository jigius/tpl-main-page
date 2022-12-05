/**
 * Attaches inputmask to all elements which has a data-input attribute
 */
const Inputmask = require('inputmask');
$(function() {
    $("[data-inputmask]").each(function () {
        Inputmask.default().mask(this);
    });
});
