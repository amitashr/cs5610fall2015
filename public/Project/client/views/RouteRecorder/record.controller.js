"use strict";

(function(){

    angular.module("FormBuilderApp").controller("RecordController", RecordController);

    function RecordController($rootScope, $scope, UserService) {
        console.log("test");

        $scope.user = $rootScope.currentUser;
        $scope.record = record;

        function record() {
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