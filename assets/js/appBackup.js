var app = angular.module('MonApplicationGoogleMap', []);
app.controller('MonControllerPrincipal', function ($scope) {

    $scope.title = "Mon application Google Map";
    $scope.todolist = [];
    $scope.form = {};
    $scope.form.todoAddress = "";


    $scope.error = false;

    var geocoder;
    var map;

    $scope.initialize = function () {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-34.397, 150.644);
        var mapOptions = {
            zoom: 14,
            center: latlng
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
    };
    $scope.codeAddress = function () {
        var address = $scope.form.todoAddress;


        if (address !== "") {
            geocoder.geocode({'address': address}, function (results, status) {
                if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                } else {

                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });

        } else {

            $scope.error = true;
        }


    };

    $scope.initialize();


});