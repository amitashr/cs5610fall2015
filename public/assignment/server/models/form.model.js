"use strict";
var uuid = require('node-uuid');

module.exports = function(app) {
	var forms = require('./form.mock.json');

	var api = {
		Create: Create,
		FindAll: FindAll,
		FindById: FindById,
		FindFormByTitle: FindFormByTitle,
		FindFormByUserId: FindFormByUserId,
		FindFieldById: FindFieldById,		
		Update: Update,
		Delete: Delete,
		RemoveField: RemoveField,
		AddField: AddField,
		UpdateField: UpdateField
	};

	return api;

	function Create(form) {
		forms.push(form);
		return forms;
	}

	function FindAll() { return forms; }

	function FindById(id) {
		return forms.find(function(item, index, array) {
			return item.id === id;
		});
	}

	function FindFormByTitle(title) {
		return forms.filter(function(item, index, array) {
			return item.title === title;
		});
	}

	function FindFormByUserId(userId) {
		return forms.filter(function(item, index, array) {
			return item.userId.toString() === userId;
		});
	}

	function FindFieldById(formId, fieldId) {
		var form = FindById(formId);
		return form.fields.find(function(item, index, array) {
			return item.id === fieldId;
		});
	}

	function Update(id, newForm) {
		var form = FindById(id);
		for(var k in newForm) {
			form[k] = newForm[k];
		}
		return forms;
	}

	function Delete(id) {
		var index = forms.findIndex(function (item, index, array) {
			return item.id === id;
		});

		if (index != -1) {
			forms.splice(index, 1);
		}
		return forms;
	}

	function RemoveField(formId, fieldId) {
		var form = FindById(formId);
		var fieldIndex = form.fields.findIndex(function(item, index, array) {
			return item.id === fieldId;
		});

		form.fields.splice(fieldIndex, 1);
		return form.fields;
	}

	function AddField(formId, newField) {
		var form = FindById(formId);
		newField.id = uuid.v1();
		form.fields.push(newField);
		return form.fields;
	}

	function UpdateField(formId, fieldId, newField) {
		var field = FindFieldById(formId, fieldId);
		for(var k in newField) {
			field[k] = newField[k];
		}
	}


};