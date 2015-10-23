
"use strict";

(function(){
	angular.module("FormBuilderApp").config(function($routeProvider) {
			$routeProvider
				.when("/home", {
					templateUrl: "./home/home.view.html"
				})
				.when("/login", {
					templateUrl: "./login/login.view.html"
				})
				.when("/register", {
					templateUrl: "./register/register.view.html"
				})
				.when("/profile", {
					templateUrl: "./profile/profile.view.html"
				})
				.when("/form", {
					templateUrl: "./form/form.view.html"
				})
				.otherwise({
					redirectTo: "/home"
				});
	  	});

})();