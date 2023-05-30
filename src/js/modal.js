/**
 * jigius@gmail.com, 2023
 */

/**
 * Scaffolding for the showing of modal popup windows which used of BS modal js
 */

const $ = require("jquery");
const template = require("./micro-templating.escaped");
const random = require("lodash.random");
const modalId = "modal-" + random(0, 1, true).toString(36).substring(2, 6);
const instances = function(id) {
  return $("#" + id);
};
const Modal = function (templateId) {
  this.templateId = templateId || "modal-vnla";
  this.render = function (content, result) {
    if (!!result) {
      if (typeof result.resolve !== "function" || typeof result.reject !== "function") {
        throw new Error("`result` argument is not seemed a deferred object");
      }
    } else {
      result = $.Deferred();
      result
        .then(function (d) {
          /*$(d).on("hidden.bs.modal", function () {
            window.location.reload();
          });*/
          $(d).modal('show');
        });
    }
    const wiped = $.Deferred();
    wiped
      .then(function () {
        if (typeof template?.template !== "function") {
          throw new Error("Could not find template object :( Environment is broken!");
        }
        templateId ||= "modal-vnla";
        content ||= "";
        instances(modalId).remove();
        $("body")
          .append(
            template.template(templateId, {id: modalId, content: content})
          );
        const found = instances(modalId);
        if (found.length !== 1) {
          throw new Error("Something goes wrong :(");
        }
        result.resolve(found[0]);
      })
      .fail(function (err) {
        result.reject(err);
      });
    const found = instances(modalId);
    if (found.length > 1) {
      throw new Error("Something goes wrong :(");
    }
    if (found.length === 1 && !!$("body.modal-open").length) {
      $(found[0]).on('hidden.bs.modal', function (event) {
        wiped.resolve();
      });
      $(found[0]).modal('hide');
    } else {
      wiped.resolve();
    }
    return result.promise();
  }
};

module.exports = Modal;
