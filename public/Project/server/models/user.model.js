"use strict";

var q = require("q");

module.exports = function(app, mongoose, db) {
	var schema = require('./user.schema.js')(mongoose);
    var UserModel = mongoose.model('UserModel', schema);

	var api = {
		Create: Create,
		FindAll: FindAll,
		FindById: FindById,
		FindUserByUsername: FindUserByUsername,
		FindUserByCredentials: FindUserByCredentials,
		Update: Update,
		Delete: Delete

	};

	return api;

	function Create(user) {
		var deferred = q.defer();
		user.id = user._id = mongoose.Types.ObjectId();
    	UserModel.create(user, function(err, newUser) {
      		if (err)
        		deferred.reject(err);
      		else {
      			deferred.resolve(newUser);
      		}
        		
    	});
    	return deferred.promise;
	}

	function FindAll() { 
		var deferred = q.defer();
		console.log("Finding all in model");
		UserModel.find(function(err, users) {
      		if (err)
        		deferred.reject(err);
      		else {
      			console.log(users);
      			deferred.resolve(users);
      		}
      			
    	});
    	return deferred.promise;
	}

	function FindById(id) {
		var deferred = q.defer();
		UserModel.findOne({id : id}, function(err, user) {
      	if (err)
        	deferred.reject(err);
      	else
        	deferred.resolve(user);
    	});

    	return deferred.promise;

	}

	function FindUserByUsername(username) {
		var deferred = q.defer();
		var uname = {username : username};
		UserModel.findOne(uname, function(err, user) {
      		if (err)
        		deferred.reject(err);
      		else
        		deferred.resolve(user);
    	});

    	return deferred.promise;
	}

    function FindUserByCredentials(cred) {
    	var deferred = q.defer();
    	//var username = cred.username;
    	//var password = cred.password;
    	UserModel.findOne(cred, function(err, user) {
      		if (err)
        		deferred.reject(err);
      		else
        		deferred.resolve(user);
    	});
    	return deferred.promise;
    }

	function Update(id, newUser) {
		console.log("Update happening");
		var deferred = q.defer();
		console.log(newUser);
		UserModel.findOneAndUpdate({id : id}, {
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			username: newUser.username,
			password: newUser.password,
			email: newUser.email
		}, function(err){
			if (err)
            		deferred.reject(err);
          		else {
          			console.log("Update success");
          			deferred.resolve(newUser);
          		}
            		
			}
		);
		return deferred.promise;
	}

	function Delete(id) {
		var deferred = q.defer();
		UserModel.remove({id: id}, function(err){
      	if(err)
        	deferred.reject(err);
        else {
        	FindAll().then(function(users){
            	deferred.resolve(user);
         	});
      	}
    	});

    	return deferred.promise;
		
	}

};