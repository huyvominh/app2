angular.module('starter.services', [])

.factory('CameraServices', ['$q', function ($q) {

    return {
        takePhoto: function (options) {
            var q = $q.defer();

            navigator.camera.getPicture(function (result) {
                // Do any magic you need
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            }, options);

            return q.promise;
        },

        getPhoto: function (options) {
            var q = $q.defer();
            options = {};
            options.sourceType = navigator.camera.PictureSourceType.SAVEDPHOTOALBUM;
            options.destinationType = navigator.camera.DestinationType.FILE_URI;
            navigator.camera.getPicture(function (result) {
                // Do any magic you need
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            }, options);

            return q.promise;
        }

    }
}])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var friends = [{
        id: 0,
        name: 'Scruff McGruff'
    }, {
        id: 1,
        name: 'G.I. Joe'
    }, {
        id: 2,
        name: 'Miss Frizzle'
    }, {
        id: 3,
        name: 'Ash Ketchum'
    }];

    return {
        all: function () {
            return friends;
        },
        get: function (friendId) {
            // Simple index lookup
            return friends[friendId];
        }
    }
});
