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
                    controller: 'PlaylistsCtrl'
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
        })
        .state('app.map-plugin', {
            url: '/map-plugin',
            views: {
                'menuContent': {
                    templateUrl: 'map-plugin.html',
                    controller: 'MapPluginCtrl'
                }
            }
        })
        .state('app.notifications', {
            url: '/notifications',
            views: {
                'menuContent': {
                    templateUrl: 'notifications.html',
                    controller: 'NotificationsCtrl as nf'
                }
            }
        });

    $urlRouterProvider.otherwise('/app/map-plugin');
})

.run(['$rootScope', '$ionicPlatform', function ($rootScope, $ionicPlatform) {
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
}])

.controller('AppCtrl', function ($scope, $ionicSideMenuDelegate) {

    $scope.$watch(function () {
        return $ionicSideMenuDelegate.isOpenLeft();
    }, function (isOpen) {
        var side_menu_left = document.getElementById('side_menu_left');
        if (!isOpen) {
            side_menu_left.setAttribute('class', 'menu menu-left');
        } else {
            side_menu_left.setAttribute('class', 'menu menu-left active');
        }
    });
})

// .controller('AppCtrl', function ($scope, $cordovaPush, $cordovaDialogs, $cordovaMedia, $cordovaToast, ionPlatform, $http, $ionicSideMenuDelegate) {

//     $scope.$watch(function () {
//         return $ionicSideMenuDelegate.isOpenLeft();
//     }, function (isOpen) {
//         var side_menu_left = document.getElementById('side_menu_left');
//         if (!isOpen) {
//             side_menu_left.setAttribute('class', 'menu menu-left');
//         } else {
//             side_menu_left.setAttribute('class', 'menu menu-left active');
//         }
//     });

//     $scope.notifications = [];

//     // call to register automatically upon device ready
//     ionPlatform.ready.then(function (device) {
//         $scope.register();
//     });


//     // Register
//     $scope.register = function () {
//         var config = null;

//         if (ionic.Platform.isAndroid()) {
//             config = {
//                 'senderID': 'YOUR_GCM_PROJECT_ID' // REPLACE THIS WITH YOURS FROM GCM CONSOLE - also in the project URL like: https://console.developers.google.com/project/434205989073
//             };
//         } else if (ionic.Platform.isIOS()) {
//             config = {
//                 'badge': 'true',
//                 'sound': 'true',
//                 'alert': 'true'
//             };
//         }

//         $cordovaPush.register(config).then(function (result) {
//             console.log('Register success ' + result);

//             $cordovaToast.showShortCenter('Registered for push notifications');
//             $scope.registerDisabled = true;
//             // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
//             if (ionic.Platform.isIOS()) {
//                 $scope.regId = result;
//                 storeDeviceToken('ios');
//             }
//         }, function (err) {
//             console.log('Register error ' + err);
//         });
//     };

//     // Notification Received
//     $scope.$on('$cordovaPush:notificationReceived', function (event, notification) {
//         console.log(JSON.stringify([notification]));
//         if (ionic.Platform.isAndroid()) {
//             handleAndroid(notification);
//         } else if (ionic.Platform.isIOS()) {
//             handleIOS(notification);
//             $scope.$apply(function () {
//                 $scope.notifications.push(JSON.stringify(notification.alert));
//             });
//         }
//     });

//     // Android Notification Received Handler
//     function handleAndroid(notification) {
//         // ** NOTE: ** You could add code for when app is in foreground or not, or coming from coldstart here too
//         //             via the console fields as shown.
//         console.log('In foreground ' + notification.foreground + ' Coldstart ' + notification.coldstart);
//         if (notification.event == 'registered') {
//             $scope.regId = notification.regid;
//             storeDeviceToken('android');
//         } else if (notification.event == 'message') {
//             $cordovaDialogs.alert(notification.message, 'Push Notification Received');
//             $scope.$apply(function () {
//                 $scope.notifications.push(JSON.stringify(notification.message));
//             });
//         } else if (notification.event == 'error')
//             $cordovaDialogs.alert(notification.msg, 'Push notification error event');
//         else $cordovaDialogs.alert(notification.event, 'Push notification handler - Unprocessed Event');
//     }

//     // IOS Notification Received Handler
//     function handleIOS(notification) {
//         // The app was already open but we'll still show the alert and sound the tone received this way. If you didn't check
//         // for foreground here it would make a sound twice, once when received in background and upon opening it from clicking
//         // the notification when this code runs (weird).
//         if (notification.foreground == '1') {
//             // Play custom audio if a sound specified.
//             if (notification.sound) {
//                 var mediaSrc = $cordovaMedia.newMedia(notification.sound);
//                 mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
//             }

//             if (notification.body && notification.messageFrom) {
//                 $cordovaDialogs.alert(notification.body, notification.messageFrom);
//             } else $cordovaDialogs.alert(notification.alert, 'Push Notification Received');

//             if (notification.badge) {
//                 $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
//                     console.log('Set badge success ' + result);
//                 }, function (err) {
//                     console.log('Set badge error ' + err);
//                 });
//             }
//         }
//         // Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
//         // in this case. You probably wouldn't be displaying anything at this point, this is here to show that you can process
//         // the data in this situation.
//         else {
//             if (notification.body && notification.messageFrom) {
//                 $cordovaDialogs.alert(notification.body, '(RECEIVED WHEN APP IN BACKGROUND) ' + notification.messageFrom);
//             } else $cordovaDialogs.alert(notification.alert, '(RECEIVED WHEN APP IN BACKGROUND) Push Notification Received');
//         }
//     }

//     // Stores the device token in a db using node-pushserver (running locally in this case)
//     //
//     // type:  Platform type (ios, android etc)
//     function storeDeviceToken(type) {
//         // Create a random userid to store with it
//         var user = {
//             user: 'user' + Math.floor((Math.random() * 10000000) + 1),
//             type: type,
//             token: $scope.regId
//         };
//         console.log('Post token for registered device with data ' + JSON.stringify(user));

//         $http.post('http://192.168.1.16:8000/subscribe', JSON.stringify(user))
//             .success(function (data, status) {
//                 console.log('Token stored, device is successfully subscribed to receive push notifications.');
//             })
//             .error(function (data, status) {
//                 console.log('Error storing device token.' + data + ' ' + status);
//             });
//     }

//     // Removes the device token from the db via node-pushserver API unsubscribe (running locally in this case).
//     // If you registered the same device with different userids, *ALL* will be removed. (It's recommended to register each
//     // time the app opens which this currently does. However in many cases you will always receive the same device token as
//     // previously so multiple userids will be created with the same token unless you add code to check).
//     function removeDeviceToken() {
//         var tkn = {
//             'token': $scope.regId
//         };
//         $http.post('http://192.168.1.16:8000/unsubscribe', JSON.stringify(tkn))
//             .success(function (data, status) {
//                 console.log('Token removed, device is successfully unsubscribed and will not receive push notifications.');
//             })
//             .error(function (data, status) {
//                 console.log('Error removing device token.' + data + ' ' + status);
//             });
//     }

//     // Unregister - Unregister your device token from APNS or GCM
//     // Not recommended:  See http://developer.android.com/google/gcm/adv.html#unreg-why
//     //                   and https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/index.html#//apple_ref/occ/instm/UIApplication/unregisterForRemoteNotifications
//     //
//     // ** Instead, just remove the device token from your db and stop sending notifications **
//     $scope.unregister = function () {
//         console.log('Unregister called');
//         removeDeviceToken();
//         $scope.registerDisabled = false;
//         //need to define options here, not sure what that needs to be but this is not recommended anyway
//         //        $cordovaPush.unregister(options).then(function(result) {
//         //            console.log('Unregister success ' + result);//
//         //        }, function(err) {
//         //            console.log('Unregister error ' + err)
//         //        });
//     };


// })

.controller('PlaylistsCtrl', function ($scope, $stateParams) {
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

    if ($stateParams.playlistId !== null) {

        $scope.playlistTitle = '';

        var result = $scope.playlists.filter(function (obj) {
            return obj.id == $stateParams.playlistId;
        });

        if (result !== null && result.length > 0) {
            $scope.playlistTitle = result[0].title;
        }
    }
})

.controller('PlaylistCtrl', function ($scope, $stateParams, $state) {
    console.log($state.get('app.playlists'));
    console.log($scope.playlists);
    console.log($stateParams);
})

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
            saveToPhotoAlbum: true
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

    $scope.openImage = function () {
        console.log($scope.lastPhoto);
    };
})

.controller('LocationCtrl', function ($scope, $ionicLoading) {

    $scope.getLocation = function () {
        // Setup the loader
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        var option = {
            maximumAge: 3000,
            timeout: 5000,
            enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition($scope.onSuccess, function (message) {
            $ionicLoading.hide();
            alert('Failed to get the current position.');
            console.log(message);
        }, option);
    };

    $scope.onSuccess = function (position) {
        console.log(position);
        $scope.longitude = position.coords.longitude;
        $scope.latitude = position.coords.latitude;
        $scope.$apply();

        $ionicLoading.hide();
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
        // Setup the loader
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

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

            $ionicLoading.hide();

        }, function (message) {
            $ionicLoading.hide();
            alert('Failed to get the current position.');
            console.log(message);
        }, option);
    }

    // document.addEventListener('deviceready', onDeviceReady, false);

})

.controller('MapPluginCtrl', function ($scope, $ionicSideMenuDelegate) {
    $scope.map = {};
    document.addEventListener('deviceready', function () {
        var div = document.getElementById('map_canvas');

        // Initialize the map view
        var GOOGLE = new plugin.google.maps.LatLng(10.777135, 106.695614);
        $scope.map = plugin.google.maps.Map.getMap(div, {
            'camera': {
                'latLng': GOOGLE,
                'zoom': 17
            }
        });


        // Wait until the map is ready status.
        $scope.map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

    }, false);

    function onMapReady() {
        console.log('ready');

        //map.setBackgroundColor('#fff');
        var GOOGLE = new plugin.google.maps.LatLng(10.777135, 106.695614);
        $scope.map.addMarker({
            'position': GOOGLE,
            'title': 'Hello GoogleMap for Cordova!'
        }, function (marker) {
            marker.showInfoWindow();
        });
    }

    // $scope.$watch(function () {
    //     return $ionicSideMenuDelegate.isOpenLeft();
    // }, function (isOpen) {
    //     var side_menu_left = document.getElementById('side_menu_left');
    //     if (!isOpen) {
    //         side_menu_left.style.visibility = 'hidden';
    //     } else {
    //         side_menu_left.style.visibility = 'visible';
    //     }
    // });
})

.controller('BirthdayCtrl', ['$scope', '$ionicPopup', '$ionicLoading', function ($scope, $ionicPopup, $ionicLoading) {

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
        // Setup the loader
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

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

            $ionicLoading.hide();

            var alertPopup = $ionicPopup.alert({
                title: 'Hi ' + self.name + ',',
                template: message
            });

            alertPopup.then(function () {
                console.log('alert closed!');
            });
        }

        $ionicLoading.hide();
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
}])

.controller('NotificationsCtrl', function () {});
