"use strict";

module.exports = function(app, model) {
	//Create user
	app.post('/api/assignment/user', function(req, res) {
		console.log(req);
		res.json(model.Create(req.body));
	});


    //Find user
	app.get('/api/assignment/user', function(req, res) {
		if(req.param('username') == null && req.param('password') == null)
			res.json(model.FindAll());
		else if (req.param('password') == null)
			res.json(model.FindUserByUsername(req.param('username')));
		else {
			var credentials = {username: req.param('username'),
							   password: req.param('password')}
			res.json(model.FindUserByCredentials(credentials));
	    }
	});

	//Find user by id
	app.get('/api/assignment/user/:id', function(req, res) {
		res.json(model.FindById(req.params.id));
	});

	//Update user
	app.put('/assignment/user/:id', function(req, res) {
		res.json(model.Update(req.params.id, req.body));
	});


	//Delete user
	app.delete('/api/assignment/user/:id', function(req, res){
		res.json(model.Delete(req.params.id));
	});
};


