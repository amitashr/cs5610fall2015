"use strict";

(function(){

    angular.module("FormBuilderApp").controller("ResultsController", ResultsController);

    function ResultsController($rootScope, $scope, $location, $routeParams, UserService) {
        $scope.$location = $location;
        $scope.display = display;
        var id = $routeParams.routeId;
        display(id);
        var markers = [];

        function display(id) {
            console.log(id);
            UserService.findRouteById(id).then(function(route) {
                $scope.route = route;
                if (route.dest != null)
                    $scope.routename = route.source + " to " + route.dest;
                else
                    $scope.routename = "Route from " + route.source;

                var map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: 9
                });

                var poly = new google.maps.Polyline({
                    strokeColor: '#0066ff',
                    strokeOpacity: 1.0,
                    strokeWeight: 3
                });
                poly.setMap(map);

                var pos = {
                    lat: $scope.route.markers[0].lat,
                    lng: $scope.route.markers[0].lng
                };

                map.setCenter(pos);
                var startLatLng = new google.maps.LatLng($scope.route.markers[0].lat, $scope.route.markers[0].lng);
                var endLatLng = new google.maps.LatLng($scope.route.markers[$scope.route.markers.length - 1].lat, $scope.route.markers[$scope.route.markers.length - 1].lng);
                var startMarker = new google.maps.Marker({
                    position: startLatLng,
                    map: map
                });
                map.setZoom(15);
                map.panTo(startMarker.position);
                var endMarker = new google.maps.Marker({
                    position: endLatLng,
                    map: map
                });
                //placeMarker(new google.maps.LatLng($scope.route.markers[0].lat, $scope.route.markers[0].lng));
                //placeMarker(new google.maps.LatLng($scope.route.markers[$scope.route.markers.length - 1].lat, $scope.route.markers[$scope.route.markers.length - 1].lng));

                var marker;
                for (marker in $scope.route.markers) {
                    var path = poly.getPath();
                    pos = new google.maps.LatLng($scope.route.markers[marker].lat, $scope.route.markers[marker].lng);
                    path.push(pos);
                }
            });

        }

        function placeMarker(location) {
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
        }



    }

})();