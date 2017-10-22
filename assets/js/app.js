var app = angular.module('MonApplicationGoogleMap', ['ngAnimate']);
app.controller('MonControllerPrincipal', function ($scope) {

    $scope.title = "Ma Super App Todolist";
    $scope.todolist = [];
    $scope.form = {};
    $scope.form.todoAddress = "";
    $scope.error = false;
    $scope.ButtonEditPushed = false;
    $scope.errorForm = false;



    var geocoder;
    var map;


    // Form init
    $scope.initForm = function () {
        $scope.form.todoName = "";
        $scope.form.todoDescription = "";
        $scope.form.todoDate = "";
        $scope.form.todoAddress = "";
        $scope.displayedMap = false;

    };

    // Add an Element in todolist
    $scope.addElementTodolist = function () {

        if ($scope.myForm.$invalid) {

            return;

        } else {
            var obj = {
                name: $scope.form.todoName,
                description: $scope.form.todoDescription,
                date: $scope.form.todoDate,
                address: $scope.form.todoAddress
            };
            $scope.todolist.push(obj);
            $scope.initForm();
        }


    };


    $scope.editTodo = function (index) {

        $scope.ButtonEditPushed = true;
        var todoUpdate;
        todoToUpdate = $scope.todolist[index];
        $scope.form.todoName = todoToUpdate.name;
        $scope.form.todoDescription = todoToUpdate.description;
        $scope.form.todoDate = todoToUpdate.date;
        $scope.form.todoAddress = todoToUpdate.address;

    };


    $scope.updateTodo = function () {


        if ($scope.myForm.$invalid) {
            $scope.ButtonEditPushed = true;

            return;

        } else {
            $scope.ButtonEditPushed = false;

            todoToUpdate.name = $scope.form.todoName;
            todoToUpdate.description = $scope.form.todoDescription;
            todoToUpdate.date = $scope.form.todoDate;
            todoToUpdate.address = $scope.form.todoAddress;

            var newAddress = todoToUpdate.address;

            $scope.displayGoogleMap(1, newAddress);
            $scope.initForm();
        }
    };

// Delete an Element from Todolist
    $scope.deleteTodo = function (index) {

        if (parseInt(index) >= 0 && $scope.todolist[index] !== undefined) {
            // Delete the toodoo
            $scope.todolist.splice(index, 1);

        }
        $scope.ButtonEditPushed = false;
        $scope.initForm();
    };



// Google Map Init
    $scope.googleMapInit = function () {

        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-34.397, 150.644);
        var mapOptions = {
            zoom: 14,
            center: latlng
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
    };

//Display Google map
    $scope.displayGoogleMap = function (index, address) {

        if (typeof(address) == 'undefined') {


            if (parseInt(index) >= 0 && $scope.todolist[index] !== undefined) {

                googleMapObject = $scope.todolist[index];

                var address = googleMapObject.address;


                if (address !== "") {

                    $scope.googleMapInit();


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
            }
        } else {


            if (address !== "") {

                $scope.googleMapInit();


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
        }

    };

})
;