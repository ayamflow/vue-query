'use strict';

var slice = [].slice;

function find(el, selector) {
  return el.querySelector(selector);
}

function findAll(el, selector) {
  el = el || document;
  return slice.call(el.querySelectorAll(selector));
}

function hasClass(el, className) {
    return new RegExp(' ' + className + ' ').test(' ' + el.className + ' ');
}

exports.install = function(Vue) {
  var utils = Vue.require('utils');
  utils.extend(Vue.prototype, {
    $findOne: function(selector) {
        return find(this.$el, selector);
    },
    $find: function(selector) {
        return findAll(this.$el, selector);
    },
    hasClass: function(className, selector) {
        var el = selector ? this.$el.$findOne(selector) : this.$el;
        return hasClass(el, className);
    },
    addClass: function(className, selector) {
        if(this.hasClass(className, selector)) return;
        var el = selector ? this.$el.$findOne(selector) : this.$el;
        return utils.addClass(el, className);
    },
    removeClass: function(className, selector) {
        var el = selector ? this.$el.$findOne(selector) : this.$el;
        return utils.removeClass(el, className);
    }
  });
};