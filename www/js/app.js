// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

'use strict';
angular.module('starter', ['ionic', 'starter.services'])

.config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
    //$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);

    $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'menu.html',
            controller: 'AppCtrl'
        })
        .state('app.camera', {
            url: '/camera',
            views: {
                'menuContent': {
                    templateUrl: 'camera.html',
                    controller: 'CameraCtrl'
                }
            }
        })
        .state('app.location', {
            url: '/location',
            views: {
                'menuContent': {
                    templateUrl: 'location.html',
                    controller: 'LocationCtrl'
                }
            }
        })
        .state('app.playlists', {
            url: '/playlists',
            views: {
                'menuContent': {
                    templateUrl: 'playlists.html',
                    controller: 'PlaylistsCtrl'
                }
            }
        })
        .state('app.single', {
            url: '/playlists/:playlistId',
            views: {
                'menuContent': {
                    templateUrl: 'playlist.html',
                    controller: 'PlaylistCtrl'
                }
            }
        })
        .state('app.sqlite', {
            url: '/sqlite',
            views: {
                'menuContent': {
                    templateUrl: 'sqlite.html',
                    controller: 'SQLiteCtrl as sq'
                }
            }
        })
        .state('app.map', {
            url: '/map',
            views: {
                'menuContent': {
                    templateUrl: 'map.html',
                    controller: 'MapCtrl'
                }
            }
        })
        .state('app.birthday', {
            url: '/birthday',
            views: {
                'menuContent': {
                    templateUrl: 'birthday.html',
                    controller: 'BirthdayCtrl as bd'
                }
            }
        });

    $urlRouterProvider.otherwise('/app/playlists');
})

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.controller('AppCtrl', function () {})

.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [{
        title: 'Reggae',
        id: 1
    }, {
        title: 'Chill',
        id: 2
    }, {
        title: 'Dubstep',
        id: 3
    }, {
        title: 'Indie',
        id: 4
    }, {
        title: 'Rap',
        id: 5
    }, {
        title: 'Cowbell',
        id: 6
    }];
})

.controller('PlaylistCtrl', function () {})

.controller('CameraCtrl', function ($scope, CameraServices) {

    $scope.takePhoto = function () {
        CameraServices.takePhoto().then(function (imageURI) {
            console.log(imageURI);
            $scope.lastPhoto = imageURI;
        }, function (err) {
            console.err(err);
        }, {
            quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false
        });
    };

    $scope.getPhoto = function () {
        CameraServices.getPhoto().then(function (imageURI) {
            console.log(imageURI);

            // var photo_split;
            // if (imageURI.substring(0, 21) == 'content://com.android') {
            //     photo_split = imageURI.split('%3A');
            //     imageURI = 'content://media/external/images/media/' + photo_split[1];
            // }
            // console.log(imageURI);

            $scope.lastPhoto = imageURI;

        }, function (err) {
            console.err(err);
        }, {
            quality: 50
        });
        //Specify the source to get the photos.
        // navigator.camera.getPicture($scope.onSuccess, $scope.onFail, {
        //     quality: 50,
        //     destinationType: Camera.DestinationType.FILE_URI,
        //     sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
        // });

    };
})

.controller('LocationCtrl', function ($scope) {

    $scope.getLocation = function () {
        var option = {
            maximumAge: 3000,
            timeout: 5000,
            enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition($scope.onSuccess, function (message) {
            alert('Failed to get the current position.');
            console.log(message);
        }, option);
    };

    $scope.onSuccess = function (position) {
        console.log(position);
        $scope.longitude = position.coords.longitude;
        $scope.latitude = position.coords.latitude;
        $scope.$apply();
    };

})


.controller('SQLiteCtrl', function ($scope) {
    var self = this;
    var app = {};

    app.db = null;

    app.openDb = function () {
        var dbName = 'Todo.sqlite';
        if (window.navigator.simulator === true) {
            // For debugin in simulator fallback to native SQL Lite
            console.log('Use built in SQL Lite');
            app.db = window.openDatabase(dbName, '1.0', 'Cordova Demo', 200000);
        } else {
            app.db = window.sqlitePlugin.openDatabase(dbName);
        }
    };

    app.createTable = function () {
        var db = app.db;
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS todo(ID INTEGER PRIMARY KEY ASC, todo TEXT, added_on DATETIME)', []);
        });
    };

    app.addTodo = function (todoText) {
        var db = app.db;
        db.transaction(function (tx) {
            var addedOn = new Date();
            tx.executeSql('INSERT INTO todo(todo, added_on) VALUES (?,?)', [todoText, addedOn],
                app.onSuccess,
                app.onError);
        });
    };

    app.onError = function (tx, e) {
        console.log('Error: ' + e.message);
    };

    app.onSuccess = function () {
        app.refresh();
    };

    app.deleteTodo = function (id) {
        var db = app.db;
        db.transaction(function (tx) {
            tx.executeSql('DELETE FROM todo WHERE ID=?', [id],
                app.onSuccess,
                app.onError);
        });
    };

    app.refresh = function () {
        self.todos = [];
        var render = function (tx, rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                console.log(rs.rows.item(i));
                self.todos.push(rs.rows.item(i));
                // app.deleteTodo(rs.rows.item(i).ID);
            }
            $scope.$apply();
        };

        var db = app.db;
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM todo', [],
                render,
                app.onError);
        });
    };

    self.addTodo = function () {
        console.log(self.todo);
        if (self.todo !== '') {
            app.addTodo(self.todo);
        }
        self.todo = '';
    };

    self.todo = '';

    // navigator.splashscreen.hide();
    app.openDb();
    app.createTable();
    app.refresh();

})

.controller('MapCtrl', function ($scope, $ionicLoading, $window, $q) {
    // function onDeviceReady() {
    //     document.addEventListener('online', onOnline, false);
    //     document.addEventListener('resume', onResume, false);
    //     loadMapsApi();
    // }

    // function onOnline() {
    //     loadMapsApi();
    // }

    // function onResume() {
    //     loadMapsApi();
    // }

    // function loadMapsApi() {
    //     console.log('12144');
    //     // if online and maps not already loaded
    //     //    then load maps api
    // }

    function lazyLoadApi() {
        var deferred = $q.defer();
        $window.initialize = function () {
            deferred.resolve();
        };
        var s = document.createElement('script'); // use global document since Angular's $document is weak
        s.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize';
        document.body.appendChild(s);
        return deferred.promise;
    }

    if ($window.google && $window.google.maps) {
        console.log('gmaps already loaded');
        onMapsApiLoaded();
    } else {
        lazyLoadApi().then(function () {
            console.log('promise resolved');
            if ($window.google && $window.google.maps) {
                console.log('gmaps loaded');
                onMapsApiLoaded();
            } else {
                alert('gmaps not loaded');
                console.log('gmaps not loaded');
            }
        }, function () {
            console.log('promise rejected');
        });
    }

    function onMapsApiLoaded() {
        var option = {
            maximumAge: 3000,
            timeout: 5000,
            enableHighAccuracy: true
        };

        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;

            var myLatlng = new google.maps.LatLng(lat, long);

            var mapOptions = {
                center: myLatlng,
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById('map'), mapOptions);

            $scope.map = map;

            new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Your position!'
            });

        }, function (message) {
            alert('Failed to get the current position.');
            console.log(message);
        }, option);
    }

    // document.addEventListener('deviceready', onDeviceReady, false);

})

.controller('BirthdayCtrl', ['$scope', '$ionicPopup', function ($scope, $ionicPopup) {
    var self = this;
    self.name = '';
    self.birthday = '';

    self.isDisableSubmit = function () {
        if (self.name === '' || self.birthday === '' || self.birthday === null || typeof self.birthday === 'undefined') {
            return true;
        }
        return false;
    };

    self.submit = function () {
        if (!self.isDisableSubmit()) {
            var message = '';
            var toDay = new Date();

            if (toDay < self.birthday) {
                message = 'What do you mean \'You came from the future\'?';
            } else {
                var days = calculateNextBirthday(self.birthday, toDay);

                if (days === 0) {
                    message = 'Your birthday is today!';
                } else {
                    message = 'Your birthday will be in ' + days + ' days from now.';
                }
            }

            var alertPopup = $ionicPopup.alert({
                title: 'Hi ' + self.name + ',',
                template: message
            });

            alertPopup.then(function () {
                console.log('alert closed!');
            });
        }
    };

    function calculateNextBirthday(your_birthday, now) {
        var month = your_birthday.getMonth();
        var day = your_birthday.getDate();
        var year = now.getFullYear();
        your_birthday = new Date(year, month, day);

        if (month == now.getMonth() && day == now.getDate()) {
            return 0;
        }

        if (your_birthday < now) {
            your_birthday = new Date(year + 1, month, day);
        }

        var diff = now - your_birthday;

        return Math.abs(millisecondsToDays(diff));
    }

    function millisecondsToDays(milliseconds) {
        var temp = Math.floor(milliseconds / 1000);
        var days = Math.floor((temp %= 31536000) / 86400);
        return days;
    }
}]);
