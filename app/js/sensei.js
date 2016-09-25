
var sensei = angular.module('Sensei', ['ngMaterial']);

var {ipcRenderer} = require('electron');

sensei.directive('jjMain', function () {
    var controller = ['$scope', function ($scope) {
        ipcRenderer.on('juke-started', function (ev) {
            document.getElementById('juke-view').reload(); // Hack, to load webpage again
            $scope.status = "Ready";
        });

        $scope.init = function () {
            $scope.status = "Ready";
            $scope.startJuke();
        }

        $scope.startJuke = function () {
            // Start Juke-Jitsu Server
            $scope.status = "Starting up...";
            ipcRenderer.send('juke-start');
        }

        $scope.init();
    }];

    return {
        controller: controller,
        template:
'<md-button class="md-primary md-raised" ng-click="startJuke()">\
Start Juke\
</md-button>\
<br/>\
<span>{{status}}</span>'
    }
});

sensei.controller('MainController', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
    $scope.status = 'Ready';
}]);
