'use strict';

angular.module('doeApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";

            $scope.dishes = menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
            });

            $scope.select = function(setTab) {
                $scope.tab = setTab;

                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {

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
            };
        }])

		.controller('TimelineController', ['$scope', 'timelineFactory', function($scope, timelineFactory) {
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
		.controller('LoginController', ['$scope', 'loginService', function($scope, loginService) {
            $scope.showLogin = false;
            $scope.message = "Loading ...";
        }])
		.controller('SignupController', ['$scope', 'signupService', function($scope, signupService) {
            $scope.showLogin = false;
            $scope.message = "Loading ...";
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
