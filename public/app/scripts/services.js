'use strict';

angular.module('doeApp')
  .constant("baseURL","http://localhost:8080/")
  .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

    this.getDishes = function() {
        return $resource(baseURL + "dishes/:id", null,
            {'update': {method: 'PUT'}});
    };

    this.getPromotion = function(index) {
      return $resource(baseURL + "promotions/" + index);
    };
  }])
   .factory('timelineFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    var timelineFactory = {};

    timelineFactory.getTimelineProducts = function() {
      return $resource(baseURL + "products");
    };

    return timelineFactory;
  }]).service('productRegisterFactory', ['$resource', 'baseURL', function($resource, baseURL) {

    this.saveProduct = function() {
        return $resource(baseURL + "products"
            {'save': {method: 'POST'}});
    };
  }])
;

