'use strict';

angular.module('doeApp', ['ui.router', 'ngResource'])
	.config([ '$httpProvider',   function($httpProvider) {
		$httpProvider.interceptors.push('resourceInterceptor');
	}])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
                    'content': {
                        templateUrl : 'views/timeline.html',
                        controller  : 'TimelineController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }

            })
            .state('app.aboutus', {
                url: 'aboutus',
                views: {
                    'content@': {
                        templateUrl : 'views/aboutus.html'
                    }
                }
            })
            .state('app.contactus', {
                url: 'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'
                    }
                }
            })
            .state('app.login', {
                url: 'login',
                views: {
                    'content@': {
                        templateUrl : 'views/login.html',
                        controller  : 'LoginController'
                    }
                }
            })
			.state('app.signup', {
                url: 'signup',
                views: {
                    'content@': {
                        templateUrl : 'views/signup.html',
                        controller  : 'SignupController'
                    }
                }
            })
			.state('app.timeline', {
                url: 'timeline',
                views: {
                    'content@': {
                        templateUrl : 'views/timeline.html',
                        controller  : 'TimelineController'
                    }
                }
            }).state('app.productregister', {
                url: 'productregister',
                views: {
                    'content@': {
                        templateUrl : 'views/product-register.html',
                    }
                }
            }).state('app.product', {
                url: 'product/{id}',
                controller: function($stateParams){
                    $stateParams.id
                },
                views: {
                    'content@': {
                        templateUrl : 'views/product.html',
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    }).run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    })

;
