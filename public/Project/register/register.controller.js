"use strict";

(function(){

	angular.module("FormBuilderApp").controller("RegisterController", RegisterController);

	function RegisterController($rootScope, $scope, $location, UserService) {
		$scope.$location = $location;
		$scope.register = register;
		$scope.user = {};

		function register() {
			UserService.createUser($scope.user, function(newUser){
				$rootScope.currentUser = newUser;
				$location.url('/profile');
			});
			
		}

	}

})();