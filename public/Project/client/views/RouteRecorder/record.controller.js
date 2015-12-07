"use strict";

(function(){

    angular.module("FormBuilderApp").controller("RecordController", RecordController);

    function RecordController($rootScope, $scope, UserService) {
        console.log("test");

        $scope.user = $rootScope.currentUser;



        /*$scope.update = update;

        function update() {
            console.log("Pressed");
            UserService.updateUser($scope.user.id, $scope.user).then(function(updatedUser){
                $scope.user = updatedUser;
            });
        } */

    }

})();