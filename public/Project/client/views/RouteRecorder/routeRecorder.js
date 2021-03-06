"use strict";

var map;
var markers={};
var markerId = 0;
var poly;
var counter = 0;
var watchId;
var autoFlag = false;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 15
    });

    poly = new google.maps.Polyline({
        strokeColor: '#0066ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });
    poly.setMap(map);


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });
}

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    map.panTo(marker.position);
    map.setZoom(15);
    var path = poly.getPath();
    path.push(location);
    markerId = markerId + 1;
    markers[markerId] = marker;
    google.maps.event.addListener(marker, "rightclick", function (point) {
        delMarker(markerId)
    });
}

function delMarker(id) {
    var path = poly.getPath();
    var marker = markers[id];
    console.log(marker.position.lng());
    path.pop();
    marker.setMap(null);
    delete markers[id];
    markerId = markerId - 1;
}

function resultMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 12
    });

    poly = new google.maps.Polyline({
        strokeColor: '#0066ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });
    poly.setMap(map);

    var markers = $scope.route.markers;
    console.log(markers);


}

function autoRecord() {
    console.log("Recording...");
    var button;
    if (!autoFlag) {
        autoFlag = true;
        button = document.getElementById("autoRecord");
        button.innerHTML = "Stop";
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(placeMarkerRecord);
        } else {
            alert("Your browser does not support geolocation");
        }
    } else {
        autoFlag = false;
        button = document.getElementById("autoRecord");
        button.innerHTML = "Auto Record Route";
        stopWatching();
    }


}

function placeMarkerRecord(pos) {
    counter += 1;
    if(counter % 6 == 0 || counter == 0) {
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        placeMarker(new google.maps.LatLng(lat,lng));
    }

}

function stopWatching() {
    console.log("Recording stoped");
    navigator.geolocation.clearWatch(watchId);
    navigator.geolocation.getCurrentPosition(function(position) {
        placeMarker(position);
    });
}
