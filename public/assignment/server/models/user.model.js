"use strict";

var users = require("./user.mock.json");
var uuid = require("node-uuid");

module.exports = function(app) {
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
		user.id = uuid.v1();
		users.push(user);
		return user;
	}

	function FindAll() { return users; }

	function FindById(id) {
		return users.find(function(item, index, array) {
			return item.id === id;
		});
	}

	function FindUserByUsername(username) {
		return users.find(function(item, index, array) {
			return item.username === username;
		});
	}

    function FindUserByCredentials(cred) {
    	return users.find(function(item, index, array) {
    		return item.username === cred.username &&
    		  item.password === cred.password;
    	});
    }

	function Update(id, newUser) {
		var user = FindById(id);
		for(var k in newUser) {
			user[k] = newUser[k];
		}
		return user;
	}

	function Delete(id) {
		var index = users.findIndex(function (item, index, array) {
			return item.id === id;
		});

		if (index != -1) {
			users.splice(index, 1);
		}
		return users;
	}

};