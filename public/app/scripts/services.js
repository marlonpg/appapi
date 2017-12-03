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
  }])
  
    .service('loginService', ['$resource', 'baseURL', function($resource, baseURL) {
    this.login = function() {
        return $resource(baseURL + "login");
    };
  }])
  
      .service('signupService', ['$resource', 'baseURL', function($resource, baseURL) {
    this.login = function() {
        return $resource(baseURL + "signup");
    };
  }])
  //NOT WORKING YET
/*  .factory('productRegisterFactory', ['$resource', 'baseURL', function($resource, baseURL) {
	return $resource(baseURL + "product");
  }])*/
;

