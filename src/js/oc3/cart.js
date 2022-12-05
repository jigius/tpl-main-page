exports.cart = function cart($) {
    return {
        'add': function(product_id, quantity) {
            $("body").addClass("ajax-in-progress");
            $.ajax(
                {
                    url: '/index.php?route=checkout/cart/add',
                    type: 'post',
                    data: 'product_id=' + product_id + '&quantity=' + (typeof (quantity) != 'undefined' ? quantity : 1),
                    dataType: 'json'
                }
            )
                .then(function (data) {
                    if (!data || Object.prototype.toString.call(data) !== '[object Object]') {
                        throw new Error("response is invalid");
                    }
                    if (!(data['success'] && data['redirect'] || data['error'])) {
                        throw new Error("response is corrupted");
                    }
                    return data;
                })
                .then(function (data) {
                    if (data['error']) {
                        alert(data['error']);
                    } else {
                        window.location = data['redirect'];
                    }
                })
                .fail(function (err) {
                    alert("something goes wrong :(");
                })
                .always(function () {
                    $("body").removeClass("ajax-in-progress");
                });
        },
        'update': function(key, quantity) {
            throw new Error("environment is broken");
        },
        'remove': function(key) {
            throw new Error("environment is broken");
        }
    };
};
