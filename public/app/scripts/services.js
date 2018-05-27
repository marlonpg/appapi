'use strict';

angular.module('doeApp')
	.constant("baseURL","http://localhost:8080/")
	.factory('UserService', function() {
	  return {
		  token : '',
		  name : '',
		  isAdmin : '',
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

	.service('productService', ['$rootScope', 'baseURL', '$resource', function($rootScope, baseURL, $resource) {
		this.getProduct = function(productId) {
			return $resource(baseURL + "api/product/"+productId);
		};
		this.getUserFromProduct = function(productId) {
			console.log("getUserFromProduct");
			return $resource(baseURL + "api/user-from-product/"+productId);
		};
		this.deleteProduct = function(productId) {
			return $resource(baseURL + "api/product/"+productId);
		};
		this.searchProducts = function(name) {
			return $resource(baseURL + "api/products?name="+name);
		};
	}])
	
;

