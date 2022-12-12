// FONTs
import "./fonts.js";

// CSS
import "fontawesome-4.7/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
// import "../css/swiper.css";
// require("../css/inspire/stylesheet.css");



// JS
const jQuery = require("jquery");

window.$ = window.jQuery = jQuery;
require("bootstrap/dist/js/bootstrap.js");

/* globals */
require("./global_messages.js");
require("./inputmask.js");
require("./form/");
window.modifyURLQuery = require('./modifyURLQuery.js');

/* Used into catalog.page */
window.wNumb = require("wnumb");
import "nouislider/dist/nouislider.css";
window.noUiSlider = require("nouislider/dist/nouislider.js");
require("./tr_filter.js");
require("./catalog_type_view.js");

/* Used with button "Buy" - add a product into the cart */
window.cart = require("./oc3/cart.js");


import "../style.scss";



//require("./common.js");
// require("./inspire/custom.js");
// require("./swiper.js");
