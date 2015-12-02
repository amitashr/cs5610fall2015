"use strict";

module.exports = function(app, model) {
	//Create user
	app.post('/api/assignment/user', function(req, res) {
		var user = req.body;
    	model.Create(user).then(function(newUser) {
        		res.json(newUser);
      		});
	});


    //Find user
	app.get('/api/assignment/user', function(req, res) {
		if(req.param('username') == null && req.param('password') == null) {
			console.log("Finding all");
			model.FindAll().then(function(users){
				res.json(users);
			});
		}
			
		else if (req.param('password') == null)
			mode.FindUserByUsername(req.param('username')).then(function(user){
				res.json(user);
			});
		else {
			var credentials = {username: req.param('username'),
							   password: req.param('password')};
			model.FindUserByCredentials(credentials).then(function(user){
				res.json(user);
			});
	    }
	});

	//Find user by id
	app.get('/api/assignment/user/:id', function(req, res) {
		model.FindById(req.params.id).then(function(user){
			res.json(user);
		});
	
	});

	//Update user
	app.put('/api/assignment/user/:id', function(req, res) {
		console.log("Calling update");
		model.Update(req.params.id, req.body).then(function(user){
			res.json(user);
		});
		
	});


	//Delete user
	app.delete('/api/assignment/user/:id', function(req, res){
		model.Delete(req.params.id).then(function(users){
			res.json(users);
		});
		
	});
};


