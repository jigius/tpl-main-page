// FONTs
import "./fonts.js";

// CSS
import "fontawesome-4.7/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
// import "../css/swiper.css";
// require("../css/inspire/stylesheet.css");
import "../style.scss";

// JS
const jQuery = require("jquery");

window.$ = window.jQuery = jQuery;
require("bootstrap/dist/js/bootstrap.js");
require("./global_messages.js");
require("./inputmask.js");
require("./form/");

// OC3 cart
const cart = require("./oc3/cart.js");
window.cart = cart.cart(jQuery);
//require("./common.js");
// require("./inspire/custom.js");
// require("./swiper.js");
