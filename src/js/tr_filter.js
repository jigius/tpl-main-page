const isEqual = require('lodash.isequal');

$(function() {
    const modifyURLQuery = function(url, param) {
        let value = {};
        const query = String(url).split('?');
        if (query[1]) {
            const part = query[1].split('&');
            for (let i = 0; i < part.length; i++) {
                const data = part[i].split('=');
                if (data[0] && data[1]) {
                    value[data[0]] = data[1];
                }
            }
        }
        value = $.extend(value, param);
        // Generate query parameter string
        let query_param = '';
        for (let i in value) {
            if (value[i]) {
                if (i === 'route') { // Skip route value to encode
                    query_param += '&' + i + '=' + value[i];
                } else {
                    query_param += '&' + i + '=' + encodeURIComponent(value[i]);
                }
            }
        }
        // Return url with modified parameter
        if (query_param) {
            return query[0] + '?' + query_param.substring(1);
        } else {
            return query[0];
        }
    };
    $.fn.tf_filter = function (setting = {}) {
        const that = this;
        const defaultOpts = {
            delay: 2, // Second
            dispatcher: function () { return true; },
            status: {
                price: 1,
                manufacturer: 1,
                filter: 1,
                availability: 1,
                collapse: 1
            }
        };
        this.opts = $.extend(defaultOpts, setting);
        const params = function (prohibited) {
            prohibited ||= [];
            if (Object.prototype.toString.call(prohibited) !== '[object Array]') {
                throw new Error("argument `prohibited` is invalid");
            }
            const param = {};
            if (that.opts.status.price) {
                let price = '';
                const minPrice = $(that).find('[name="tf_fp[min]"]');
                const maxPrice = $(that).find('[name="tf_fp[max]"]');
                if (minPrice.attr('min') !== minPrice.val()) { // When minimum price change
                    price += minPrice.val();
                }
                if (maxPrice.attr('max') !== maxPrice.val()) { // When maximum price change
                    price += 'p' + maxPrice.val();
                }
                if (price) {
                    param.tf_fp = price;
                }
            }
            if (that.opts.status.availability) {
                const inStock = $(that).find('[name="tf_fs"]:checked').val();
                if (inStock !== undefined) {
                    param.tf_fs = inStock;
                }
            }
            // Manufacturer
            if (that.opts.status.manufacturer) {
                const manufacturerIds = $(that).find('[name="tf_fm"]:checked').map(function () {
                    return $(this).val();
                }).get().join('.');
                if (manufacturerIds) {
                    param.tf_fm = manufacturerIds;
                }
            }
            // Filter
            if (that.opts.status.filter) {
                const filterIds = $(that).find('[name="tf_ff"]:checked').map(function () {
                    return $(this).val();
                }).get().join('.');
                if (filterIds) {
                    param.tf_ff = filterIds;
                }
            }
            // collapse states
            if (that.opts.status.collapse && $.inArray('collapse', prohibited) === -1) {
                const collapseIds = (function () {
                    let ret;
                    try {
                        ret =
                            $(that)
                                .find(".panel-collapse.collapse")
                                .map(function () {
                                    let ret;
                                    const expanded = $(this).hasClass("in");
                                    if (expanded ^ !!$(this).data('o-expanded')) {
                                        ret =
                                            (function (el) {
                                                const found = $(el).attr('id').toString().match(/\d+$/);
                                                if (!found) {
                                                    throw new Error("environment is broken");
                                                }
                                                return (expanded? 1: -1) * (found[0] + 1);
                                            }) (this);
                                    }
                                    return ret;
                                })
                                .get();
                    } catch ($e) {
                        ret = [];
                    }
                    return ret;
                }) ();
                if (collapseIds) {
                    param.tf_cs = collapseIds.join('.');
                }
            }
            return $.extend({
                tf_fp: null,
                tf_fs: null,
                tf_fm: null,
                tf_ff: null,
                tf_cs: null,
            }, param);
        };
        // Start filter
        this.rqUpdate = function () {
            if (!isEqual(this.initParams, params(['collapse']))) {
                const update = function (opts) {
                    // Reload page with filter parameter
                    window.location.href =
                        modifyURLQuery(
                            window.location.href,
                            $.extend(params(), {page: null})
                        );
                }
                if (typeof this.opts.dispatcher === 'function') {
                    const promise = this.opts.dispatcher('updating');
                    if (typeof promise === 'object' && typeof promise.then === 'function') {
                        promise.then(function () {
                            update(that.opts);
                        });
                        return;
                    } else if (!promise) {
                        /* an request is canceled */
                        return;
                    }
                }
                update(that.opts);
            }
        };
        this.initParams = params(['collapse']);
        this.on('change', function () {
            if (!!that.timeoutId) {
                window.clearTimeout(that.timeoutId);
            }
            that.timeoutId = setTimeout(function () {
                that.rqUpdate();
            }, that.opts.delay * 1000);
        });
    };
});
