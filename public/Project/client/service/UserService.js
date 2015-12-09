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
			updateUser : updateUser,
			recordRoute : recordRoute,
			findAllRoutes : findAllRoutes,
			searchForRoutes : searchForRoutes,
			findRouteById : findRouteById
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

		function recordRoute(route) {
			var deferred = $q.defer();
			console.log(route);
			$http.post('/api/assignment/route', route).success(function(resp) {
				deferred.resolve(resp);
			});

			return deferred.promise;
		}

		function findAllRoutes() {
			var deferred = $q.defer();
			$http.get('/api/assignment/route').success(function(resp) {
				deferred.resolve(resp);
			});

			return deferred.promise;
		}

		function searchForRoutes(source, dest, terrain, difficulty) {
			var deferred = $q.defer();
			$http.get('/api/assignment/searchRoutes?source='+source+'&dest='+dest+'&terrain='+terrain+'&difficulty='+difficulty).success(function(resp) {
				deferred.resolve(resp);
			});

			return deferred.promise;

		}

		function findRouteById(id) {
			var deferred = $q.defer();
			$http.get('/api/assignment/routeById?id='+id).success(function (resp) {
				deferred.resolve(resp);
			});

			return deferred.promise;
		}

	}


})();