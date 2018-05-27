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
            $scope.products = timelineFactory.getTimelineProducts().query()
                .$promise.then(
                    function(response) {
                        $scope.products = response;
                        $scope.showTimeline = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
			);
        }])
		.controller('ProductController', ['$scope', '$http','productService', '$stateParams', 'UserService', function($scope, $http, productService, $stateParams, UserService) {
			$scope.showWish = false;
			$scope.showDelete = false;
			productService.getProduct($stateParams.id).query()
				.$promise.then(
					function(response) {
						$scope.product = response[0];
					},
					function(response) {
						$scope.message = "Error: "+response.status + " " + response.statusText;
					}
			);
			productService.getUserFromProduct($stateParams.id).get()
				.$promise.then(
					function(response) {
						$scope.userContact = response;
						$scope.changeButtonsVisibility();
					},
					function(response) {
						$scope.message = "Error: "+response.status + " " + response.statusText;
					}
			);

			$scope.deleteProduct = function(){
				var deleteProduct = window.confirm('Você quer mesmo deletar o Produto "'+ $scope.product.name + '"?');
				if(deleteProduct){
					productService.deleteProduct($stateParams.id).remove()
						.$promise.then(
							function(response) {
								console.log(response);
								$scope.$state.go("app.timeline");
							},
							function(response) {
								alert("Você não tem permissão para deletar este produto.");
								console.log("Error deleteProduct: "+response.status + " " + response.statusText);
								$scope.message = "Error: "+response.status + " " + response.statusText;
							}
						);
				}
			}
			$scope.changeButtonsVisibility = function(){
				console.log(UserService.email);
				console.log($scope.userContact.userEmail);
				if(UserService && UserService.email && UserService.email == $scope.userContact.userEmail){
					$scope.showWish = false;
					$scope.showDelete = true;
				} else if(UserService && UserService.email && UserService.email !== $scope.userContact.userEmail){
					console.log($scope.userContact.userEmail);
					console.log($scope.userContact);
					$scope.showWish = true;
					$scope.showDelete = false;
				}
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
						$scope.user = {name:"", cellphone:"", email:"", password:""};
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
