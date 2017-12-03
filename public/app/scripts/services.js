'use strict';

angular.module('doeApp')
	.constant("baseURL","http://localhost:8080/")

	.factory('timelineFactory', ['$resource', 'baseURL', function($resource, baseURL) {
		var timelineFactory = {};

		timelineFactory.getTimelineProducts = function() {
			return $resource(baseURL + "products");
		};
		return timelineFactory;
	}])

	.service('loginService', ['$resource', 'baseURL', function($resource, baseURL) {
		this.login = function() {
			return $resource(baseURL + "api/login");
		};
	}])

	.service('signupService', ['$resource', 'baseURL', function($resource, baseURL) {
		this.signup = function() {
			return $resource(baseURL + "api/signup");
		};
	}])
  //NOT WORKING YET
/*  .factory('productRegisterFactory', ['$resource', 'baseURL', function($resource, baseURL) {
	return $resource(baseURL + "product");
  }])*/
;

