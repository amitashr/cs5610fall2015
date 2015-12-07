"use strict";

(function(){
	angular.module("FormBuilderApp").factory("UserService", UserService);
	
	function UserService() {
		var users = [];

		/*
		A user object is of the form: {userid: "", username: "", password: "", firstname: "", lastname: "", email: ""}
		*/

		var service = {
			findUserByUsernameAndPassword : findUserByUsernameAndPassword,
			findAllUsers : findAllUsers,
			createUser : createUser,
			deleteUserById : deleteUserById,
			updateUser : updateUser
		};

		return service;

		

		function findUserByUsernameAndPassword(username, password, callback) {
			users.forEach(function (user) {
				
				if (user.username === username && user.password === password) {
					callback(user);
				
				}
			})
		}

		function findAllUsers(callback) {
			callback(users);
		}

		function createUser(user, callback) {
			user.id = uuid.v1(); 
			users.push(user);
			callback(user);
		}

		function deleteUserById(userid, callback) {

			users.forEach(function (user, index) {
				if (user.id === userid) {
					users.splice(index, 1);
					callback(users);
				}
			})
		}

		function updateUser(userid, update_info, callback) {
			users.forEach(function (user) {
				if (user.id === userid) {
					user.username = update_info.username;
					user.password = update_info.password;
					user.firstname = update_info.firstname;
					user.lastname = update_info.lastname;
					user.email = update_info.email;
					callback(user);
				}
			});
		}

	}


})();