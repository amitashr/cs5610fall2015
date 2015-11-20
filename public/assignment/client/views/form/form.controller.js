"use strict";

(function(){
	angular.module("FormBuilderApp")
	  .controller("FormController", FormController);

	function FormController($rootScope, $scope, FormService) {
		$scope.addForm = addForm;
		$scope.updateForm = updateForm;
		$scope.selectForm = selectForm;
		$scope.deleteForm = deleteForm;

		$scope.newForm = {};

		var userid = $rootScope.currentUser.id;

		FormService.findAllFormsForUser(userid).then(function(forms){
			$scope.forms = forms;
		});

		function addForm() {
			FormService.createFormForUser(userid, $scope.newForm).then(function(form) {
				$scope.forms.push(form);
				$scope.newForm = {};
			});
		}

		function selectForm(index) {
			$scope.selectedForm = $scope.forms[index];
			$scope.newForm.name = $scope.selectedForm.name;
		}

		function updateForm() {
			if ($scope.selectedForm) {
				FormService.updateFormById($scope.selectedForm.id, $scope.newForm).then(function(updatedForm) {});
			}
		}

		function deleteForm(index) {
			FormService.deleteFormById($scope.forms[index].id).then(function(forms){
				$scope.forms.splice(index, 1);
			});
		}

	}
})();