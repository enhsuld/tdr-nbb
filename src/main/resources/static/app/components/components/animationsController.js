angular
    .module('altairApp')
    .controller('animationsCtrl', [
        '$scope',
        function ($scope) {

            $scope.replayAnimations = function($event) {
                $event.preventDefault();
                console.log($event);
                $('#hierarchical-show').addClass('hierarchical_show');
                $('#hierarchical-slide').addClass('hierarchical_slide');
            };

        }
    ]);