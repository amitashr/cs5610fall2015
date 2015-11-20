"use strict";

(function(){

	angular.module("FormBuilderApp").controller("ProfileController", ProfileController);

	function ProfileController($rootScope, $scope, UserService) {
		$scope.user = $rootScope.currentUser;
		function update() {

			UserService.updateUser($scope.user.id, $scope.user).then(function(updatedUser){});
		}

	}

})();