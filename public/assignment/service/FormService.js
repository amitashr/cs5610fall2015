"use strict";

(function(){
	angular.module("FormBuilderApp").factory("FormService", FormService);

	function FormService() {
		var forms = [];


		var service = {
			createFormForUser : createFormForUser,
			findAllFormsForUser : findAllFormsForUser,
			deleteFormById : deleteFormById,
			updateFormById : updateFormById
		};

		return service;

		function createFormForUser(userId, form, callback) {
			form.id = uuid.v1();
			form.userid = userId;
			forms.push(form);
			callback(form);
		}

		function findAllFormsForUser(userId, callback) {
			var foundForms = [];
			forms.forEach(function (form) {
				if (form.userid === userId) {
					foundForms.push(form);
				}
			});
			callback(foundForms);
		}

		function deleteFormById(formId, callback) {
			forms.forEach(function (form, index) {
				if (form.id === formId) {
					forms.splice(index, 1);
					callback(forms);
				}

			});
		}

		function updateFormById(formId, newForm, callback) {
			forms.forEach(function (form, index) {
				if (form.id === formId) {
					form.name = newForm.name
					callback(form);
				}
			})
		}

	}

})();