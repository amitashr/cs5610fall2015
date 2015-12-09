
"use strict";

(function(){
	angular.module("FormBuilderApp").config(function($routeProvider) {
			$routeProvider
				.when("/home", {
					templateUrl: "./views/home/home.view.html"
				})
				.when("/login", {
					templateUrl: "./views/login/login.view.html"
				})
				.when("/register", {
					templateUrl: "./views/register/register.view.html"
				})
				.when("/profile", {
					templateUrl: "./views/profile/profile.view.html"
				})
				.when("/form", {
					templateUrl: "./views/form/form.view.html"
				})
				.when("/recordRoute", {
					templateUrl: "./views/RouteRecorder/record.view.html"
				})
				.when("/route/:routeId", {
					templateUrl: "./views/results/results.view.html",
					controller: "ResultsController"
				})
				.otherwise({
					redirectTo: "/home"
				});
	  	});

})();