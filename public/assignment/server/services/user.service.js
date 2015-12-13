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

	//Update Route
	app.put('/api/assignment/updateRoute', function(req, res) {
		console.log("Calling route update");
		model.UpdateRoute(req.body).then(function(route){
			res.json(route);
		});
	});


	//Delete user
	app.delete('/api/assignment/user/:id', function(req, res){
		model.Delete(req.params.id).then(function(users){
			res.json(users);
		});
		
	});

	//Add route
	app.post('/api/assignment/route', function(req, res) {
		console.log(req.body);
		model.CreateRoute(req.body).then(function(route){
			res.json(route);
		});
		res.json(req.body);
	});

	//Find all routes
	app.get('/api/assignment/route', function(req, res) {
		model.FindAllRoutes().then(function(routes){
			res.json(routes);
		})
	});

	//Search for routes
	app.get('/api/assignment/searchRoutes', function(req, res){
		var searchObj = {};
		console.log(req.param("source"));
		console.log(req.param("dest"));
		console.log(req.param("terrain"));
		if (req.param("dest") == "undefined" || false)
			console.log("works");

		if (req.param("source") != null && req.param("source") != "undefined")
			searchObj.source = new RegExp(req.param("source"), "i");
		if (req.param("dest") != null && req.param("dest") != "undefined")
			searchObj.dest = new RegExp(req.param("dest"), "i");
		if (req.param("terrain") != null && req.param("terrain") != "undefined")
			searchObj.terrain = new RegExp(req.param("terrain"), "i");
		if (req.param("difficulty") != null && req.param("difficulty") != "undefined")
			searchObj.difficulty = new RegExp(req.param("difficulty"), "i");
		model.SearchForRoutes(searchObj).then(function(routes){
			res.json(routes);
		})
	});

	app.get('/api/assignment/routeById', function(req, res) {
		console.log("ID in js " + req.param("id"));
		model.FindRouteById(req.param("id")).then(function (route) {
			res.json(route);
		})
	});
};


