// FONTs
import "./fonts.js";``

// CSS
//import "fontawesome-4.7/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
//import "../css/swiper.css";
// require("../css/inspire/stylesheet.css");
import "nouislider/dist/nouislider.css";
import 'swiper/swiper-bundle.css';

const Dependency = require("./dependency");

const app = {
  dependency: new Dependency()
};

window.jQuery = window.$ = require("jquery");
$(function() {
  app.dependency.register('$', $)
});

require("bootstrap/dist/js/bootstrap");

/* globals */

import Swiper from 'swiper/bundle';

/**
 * Lightweight ES6 Promise polyfill for the browser and node. Adheres closely to the spec.
 * It is a perfect polyfill IE or any other browser that does not support native promises.
 */
//import 'promise-polyfill/src/polyfill';

app.dependency.register('Swiper', Swiper);
app.dependency.register('EventQueue', require("./event_queue"));
app.dependency.register('template', require("./micro-templating.escaped"));
require("./global_messages");
app.dependency.register('Inputmask', require("inputmask"));
//require("./form/");
window.modifyURLQuery = require('./modifyURLQuery');
app.dependency.register('Modal', require('./modal'));

/* Used into catalog.page */
app.dependency.register('wNumb', require("wnumb"));
app.dependency.register('noUiSlider', require("nouislider/dist/nouislider"));

app.dependency.register('photoswipe',  require("./photoswipe").default);

$.fn.tf_filter = require("./tf_filter");

/* Used with button "Buy" - add a product into the cart */
window.cart = require("./oc3/cart");

import "./styles.js";

window.App = app;
