"use strict";

(function(){
	angular.module("FormBuilderApp").factory("UserService", UserService);
	
	function UserService($http, $q) {

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

		

		function findUserByUsernameAndPassword(username, password) {
			var deferred = $q.defer();
			$http.get('/api/assignment/user?username='+username+'&password='+password).success(function(resp) {
			   	   deferred.resolve(resp);
			   });

			return deferred.promise;
		}

		function findAllUsers() {
			var deferred = $q.defer();
			$http.get('/api/assignment/user').success(function(resp) {
			    	deferred.resolve(resp);
			    });

			return deferred.promise;
			
		}

		function createUser(user) {
			var deferred = $q.defer();
			$http.post('/api/assignment/user', user).success(function(resp) {
					if (resp === "Error")
						deferred.reject(resp);
					else
			    		deferred.resolve(resp);
			    });
			return deferred.promise;
		}

		function deleteUserById(userid) {
			var deferred = $q.defer();
			$http.delete('/api/assignment/user/'+userid).success(function(resp) {
			    	deferred.resolve(resp);
			    });

			return deferred.promise;
		}

		function updateUser(userid, update_info) {
			console.log("Update button pressed");
			var deferred = $q.defer();
			$http.put('/api/assignment/user/'+userid, update_info).success(function(resp) {
			    	deferred.resolve(resp);
			    });

			return deferred.promise;
		}

	}


})();