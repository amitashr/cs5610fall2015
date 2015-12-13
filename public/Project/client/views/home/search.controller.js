/**
 * Created by Amitash on 12/7/15.
 */

"use strict";

(function(){

    angular.module("FormBuilderApp").controller("SearchController", SearchController);

    function SearchController($scope, UserService, $location) {
        $scope.search = search;
        $scope.navigate = navigate;

        function search() {
            UserService.searchForRoutes($scope.source, $scope.dest, $scope.terrain, $scope.difficulty).then(function(routes) {
                    $scope.routes = routes;
                });
        }

        function navigate(index) {
            var url = "/route/" + $scope.routes[index]._id;
            $location.path(url);
        }

    }

})();