"use strict";

module.exports = function(app, model) {
	//Get form by userid
	app.get('/api/assignment/user/:userId/form', function(req, res) {
		res.json(model.FindFormByUserId(req.params.userID));
	});

	//get form by id
	app.get('/api/assignment/form/:formId', function(req, res) {
		res.json(model.FindById(req.params.formId));
	});

	//delete form
	app.delete('/api/assignment/form/:formId', function(req, res){
		res.json(model.Delete(req.params.formId));
	});

	//create form
	app.post('/api/assignment/user/:userId/form', function(req, res) {
		var uuid = require('node-uuid');
		var newForm = req.body;
		newForm.id = uuid.v1();
		newForm.userId = Number(req.params.userId);
		res.json(model.Create(newForm));
	});

	//Update form
	app.put('/api/assignment/form/:formId', function(req, res) {
		res.json(model.Update(req.params.formId, req.body));
	});
};