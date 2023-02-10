// FONTs
import "./fonts.js";

// CSS
import "fontawesome-4.7/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
// import "../css/swiper.css";
// require("../css/inspire/stylesheet.css");
import "nouislider/dist/nouislider.css";


import "./styles.js";

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
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import 'photoswipe/style.css';
app.dependency.register('PhotoSwipeLightbox', PhotoSwipeLightbox);
app.dependency.register('PhotoSwipe', PhotoSwipe);
app.dependency.register('EventQueue', require("./event_queue"));
app.dependency.register('template', require("./micro-templating.escaped"));
require("./global_messages");
app.dependency.register('Inputmask', require("inputmask"));
//require("./form/");
window.modifyURLQuery = require('./modifyURLQuery');
app.dependency.register('Modal', require('./modal'));

/* Used into catalog.page */
app.dependency.register('wNumb', require("wnumb"));
window.wNumb = require("wnumb");
window.noUiSlider = require("nouislider/dist/nouislider");
require("./tr_filter");

/* Used with button "Buy" - add a product into the cart */
window.cart = require("./oc3/cart");

window.App = app;

//import "../style.scss";



//require("./common.js");
// require("./inspire/custom.js");
// require("./swiper.js");
