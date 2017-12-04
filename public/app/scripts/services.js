'use strict';

angular.module('doeApp')
	.constant("baseURL","http://localhost:8080/")
	.factory('UserService', function() {
	  return {
		  token : '',
		  email : ''
	  };
	})
	.factory('timelineFactory', ['$resource', 'baseURL', function($resource, baseURL) {
		var timelineFactory = {};

		timelineFactory.getTimelineProducts = function() {
			return $resource(baseURL + "products");
		};
		return timelineFactory;
	}])

	.service('loginService', ['$resource', 'baseURL', function($resource, baseURL) {
		this.login = function() {
			return $resource(baseURL + "api/authenticate");
		};
	}])

	.service('signupService', ['$resource', 'baseURL', function($resource, baseURL) {
		this.signup = function() {
			return $resource(baseURL + "api/signup");
		};
	}])
	
	.service('resourceInterceptor', ['$rootScope', 'UserService', function($rootScope, UserService) {
		this.request = function(config) {
			if(UserService.name != '') {
				config.headers['x-access-token'] = UserService.token;
			}
			return config;
		};
	}])



  //NOT WORKING YET
/*  .factory('productRegisterFactory', ['$resource', 'baseURL', function($resource, baseURL) {
	return $resource(baseURL + "product");
  }])*/
;

