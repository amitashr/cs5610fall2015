"use strict";

(function(){

	angular.module("FormBuilderApp").controller("ProfileController", ProfileController);

	function ProfileController($rootScope, $scope, $location, UserService) {
		console.log("test");

		$scope.user = $rootScope.currentUser;
		$scope.update = update;
		$scope.verifyLogin = verifyLogin;

		verifyLogin();

		function verifyLogin() {
			if (! $scope.user) {
				alert("Please log in");
				$location.url('/home');
			}

		}

		function update() {
			console.log("Pressed");
			UserService.updateUser($scope.user.id, $scope.user).then(function(updatedUser){
				$scope.user = updatedUser;
			});
		}

	}

})();