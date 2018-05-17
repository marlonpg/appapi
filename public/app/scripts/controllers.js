'use strict';

angular.module('doeApp')
        .controller('ContactController', ['$scope', function($scope) {
			/* NOT WORKING YET

            };*/
        }])
		.filter('escape', function() {
			return window.encodeURIComponent;
		})
		.controller('TimelineController', ['$scope', 'timelineFactory', '$rootScope', '$location', function($scope, timelineFactory, $rootScope, $location) {
            $scope.showTimeline = false;
            $scope.message = "Loading ...";			
            $scope.items = timelineFactory.getTimelineProducts().query()
                .$promise.then(
                    function(response) {
                        $scope.items = response;
                        $scope.showTimeline = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
			);
			
			$scope.goToProduct = function(productId){
				console.log("PRODUCTID: " + productId);
				$scope.selectedProductId = productId;
				$location.path("product");
			}
			
        }])
		
		.controller('LoginController', ['$scope', 'loginService', '$http', 'UserService', function($scope, loginService, $http, UserService) {
            $scope.showLoading = false;
            $scope.message = "Loading ...";
			$scope.login = function(){
				$scope.showLoading = true;
				loginService.login().save($scope.user).$promise.then(
                    function(response) {
						if(response.success){
							$scope.user = {email:"", password:""};
							$scope.loginForm.$setPristine();
							$scope.showLoading = false;
							UserService.token = response.token;
							UserService.name = response.name;
							UserService.email = response.email;
							//route back to home;
							$scope.$state.go("app.timeline");
						} else {
							$scope.messageClass = "alert alert-danger";
							$scope.message = "Error: "+response.message;
						}
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
				);
			}
        }])
		
		.controller('SignupController', ['$scope', 'signupService', function($scope, signupService) {
            $scope.showLoading = false;
            $scope.message = "Loading ...";
			$scope.signup = function(){
				$scope.showLoading = true;
				signupService.signup().save($scope.user).$promise.then(
                    function(response) {
                        //response.user;
						$scope.user = {name:"", email:"", password:""};
						$scope.signupForm.$setPristine();
						$scope.messageClass = "alert alert-success alert-dismissable";
						$scope.message = response.message;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
            	);

			}
        }])
		.controller('ProductController', ['$scope', '$http','productService', function($scope, $http, productService) {
            $scope.showPage = false;
			$scope.message = "Loading ...";
			console.log($scope.selectedProductId);
			productService.getProduct($scope.selectedProductId).query()
				.$promise.then(
					function(response) {
						$scope.product = response;
						$scope.showPage = true;
					},
					function(response) {
						$scope.message = "Error: "+response.status + " " + response.statusText;
					}
			);

			/*$scope.product = {
				"userEmail": "admin@doe",
				"name": "Botas de couro",
				"description": "asdasdasdasd",
				"city": "Osório",
				"state": "RS",
				"zipCode": "95520000",
				"category": "on",
				"expirationDate": "",
				"filePath": "/uploads/1526517031719botasdecouro.jpg",
				};*/

        }])
		.controller('ProductRegisterController', ['$scope', '$http','UserService', function($scope, $http, UserService) {
            $scope.message = "Loading ...";
			$scope.saveProduct = function () {
				createNewProduct(UserService.token)
				.done(function(data) {
					$scope.$state.go("app.timeline");
					console.log('success', data) 
				})
				.fail(function(xhr) {
					if(!xhr.responseJSON.loggedIn){
						var response = confirm("You must be logged to do this operation!");
						if (response == true) {
							$scope.$state.go("app.login");
						}
					} else {
						alert(xhr.responseJSON.message)
					}
					console.log('error', xhr);
				});;
			}
        }])		
		.controller('MenuController', ['$scope', 'UserService', function($scope, UserService) {
			$scope.name = UserService.name;
        }])
;
