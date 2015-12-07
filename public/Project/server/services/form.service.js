"use strict";

module.exports = function(app, model) {
	//Get form by userid
	app.get('/api/assignment/user/:userId/form', function(req, res) {
		console.log("Finding forms");
		model.FindFormByUserId(req.params.userId).then(function(forms){
			res.json(forms);
		});
	});

	//get form by id
	app.get('/api/assignment/form/:formId', function(req, res) {
		model.FindById(req.params.formId).then(function(form){
			res.json(form);

		});
	});

	//delete form
	app.delete('/api/assignment/form/:formId', function(req, res){
		model.Delete(req.params.formId).then(function(forms) {
			res.json(forms);
		});
	});

	//create form
	app.post('/api/assignment/user/:userId/form', function(req, res) {
		var newForm = req.body;
		console.log(newForm);
		model.Create(req.params.userId, newForm).then(function(form) {
			res.json(form);
		});
	});

	//Update form
	app.put('/api/assignment/form/:formId', function(req, res) {
		model.Update(req.params.formId, req.body).then(function(form) {
			res.json(form);
		});
	});
};