"use strict";

(function(){
	angular.module("FormBuilderApp")
	  .controller("FormController", FormController);

	function FormController($rootScope, $scope, FormService) {
		$scope.addForm = addForm;
		$scope.updateForm = updateForm;
		$scope.selectForm = selectForm;
		$scope.deleteForm = deleteForm;


		

		var userid = $rootScope.currentUser.id;

		var init = function() {
			if (userid){
        		FormService.findAllFormsForUser(userid).then(function (forms) {
            		$scope.forms = forms;
          		});
      		}
     	}
    	
    	init();


		function addForm() {
			FormService.createFormForUser(userid, $scope.newForm).then(function(newForm) {
				$scope.forms.push(newForm);
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