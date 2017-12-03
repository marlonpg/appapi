'use strict';

angular.module('doeApp', ['ui.router', 'ngResource'])
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
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
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
            });
        $urlRouterProvider.otherwise('/');
    });
