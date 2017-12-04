'use strict';

angular.module('doeApp')
        .controller('ContactController', ['$scope', function($scope) {
/*
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
			$scope.sendFeedback = function() {
                console.log($scope.feedback);

                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.getFeedback().save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };*/
        }])

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
						$scope.showLoading = false;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
            );

			}
        }])
		.controller('ProductRegisterController', ['$scope', 'UserService', function($scope, UserService) {
            $scope.isUploading = false;
            $scope.message = "Loading ...";
			$scope.saveProduct = function () {
				createNewProduct(UserService.token);
			}
        }])
		/* NOT WORKING YET
		.controller('ProductRegisterController', ['$scope', 'productRegisterFactory', function($scope, productRegisterFactory) {
            $scope.isUploading = false;
            $scope.message = "Loading ...";
			$scope.saveProduct = function () {
				$scope.isUploading = true;
				$scope.productRegisterFactory = new productRegisterFactory();
				$scope.productRegisterFactory.data = new FormData($('#prodregister')[0]);
				$scope.items = productRegisterFactory.save()
					.$promise.then(
						function(response) {
							$scope.items = response;
							$scope.isUploading = false;
							alert("New product created with Success!");
						},
						function(response) {
							$scope.isUploading = false;
							$scope.message = "Error: "+response.status + " " + response.statusText;
							alert("Error to connect to server, please try again later!");
						}
				);
			}
        }])*/
;
