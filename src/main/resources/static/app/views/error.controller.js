angular
    .module('altairApp')
    .controller('errorController', [
        '$scope',
        '$rootScope',
        '$http',
        '$state',
        '$location',
        'utils',
        'mainService',
        '$cookies',
        '$httpParamSerializer',
        '$timeout',
        'user',
        '__env',
        function ($scope,$rootScope,$http,$state,$location,utils, mainService, $cookies,$httpParamSerializer,$timeout,user, __env) {
            console.log('init error controller');

            $scope.goBack = function () {
                console.log('i am hitting go back!');
                window.location.href = "/";
                //$location.path('/');
                //$state.go('restricted.dashboard');
            }
        }
    ]);