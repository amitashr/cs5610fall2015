"use strict";

(function(){

	angular.module("FormBuilderApp").controller("RegisterController", RegisterController);

	function RegisterController($rootScope, $scope, $location, UserService) {
		$scope.register = register;
		$scope.user = {};

		function register() {
			UserService.createUser($scope.user).then(function(newUser){
				$rootScope.currentUser = newUser;
				$location.url('/profile');
			});
			
		}

	}

})();