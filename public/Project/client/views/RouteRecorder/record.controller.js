"use strict";

(function(){

    angular.module("FormBuilderApp").controller("RecordController", RecordController);

    function RecordController($rootScope, $scope, $location, UserService) {
        console.log("test");

        $scope.user = $rootScope.currentUser;
        $scope.record = record;

        $scope.verifyLogin = verifyLogin;

        verifyLogin();

        function verifyLogin() {
            if (! $scope.user) {
                alert("Please log in");
                $location.url('/home');
            }

        }

        function record() {
            var source = document.getElementById("source");
            var dest = document.getElementById("dest");
            if(!dest.value){
                alert("Must enter destination");
            } else if (!source.value) {
                alert("Must enter source");
            } else {
                var customMarkers = [];
                var id = 0;
                var m = {};
                for(var marker in markers){
                    id = id + 1;
                    m.id = id;
                    m.lng = markers[marker].position.lng();
                    m.lat = markers[marker].position.lat();
                    customMarkers.push(m);
                    m = {};
                }

                $scope.route.markers = customMarkers;
                $scope.route.user = $scope.user;
                UserService.recordRoute($scope.route);
                alert("Route recorded successfully");
                $location.url('/home');

            }

        }


        /*$scope.update = update;

        function update() {
            console.log("Pressed");
            UserService.updateUser($scope.user.id, $scope.user).then(function(updatedUser){
                $scope.user = updatedUser;
            });
        } */

    }

})();