"use strict";

(function(){

	angular.module("FormBuilderApp").controller("ProfileController", ProfileController);

	function ProfileController($rootScope, $scope, $location, UserService) {
		$scope.$location = $location;
		$scope.user = $rootScope.currentUser;
		function update() {

			UserService.updateUser($scope.user.id, $scope.user, function(updatedUser){});
		}

	}

})();