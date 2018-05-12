'use strict';

angular.module('doeApp')
        .controller('ContactController', ['$scope', function($scope) {
			/* NOT WORKING YET

            };*/
        }])
		.filter('escape', function() {
			return window.encodeURIComponent;
		})
		.controller('TimelineController', ['$scope', 'timelineFactory', '$rootScope', function($scope, timelineFactory, $rootScope) {
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
		.controller('ProductRegisterController', ['$scope', '$http','UserService', function($scope, $http, UserService) {
            $scope.isUploading = false;
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
