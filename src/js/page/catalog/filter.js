$(function() {
    $(".btn").click(function () {
        var $btn = $(this);
        var text = $btn.text();
        var label = $btn.data("label");

        $btn.text(label).data("label", text);
    });

    $(document).ready(function () {
        $(".panel-title").click(function (event) {
            $(this).toggleClass("active").next().slideToggle(300);
        });
    });
});
