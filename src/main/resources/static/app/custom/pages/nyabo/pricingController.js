angular
    .module('altairApp')
    .controller("pricingCtrl", ['$rootScope', '$scope', '$timeout', 'user_data', 'mainService', 'sweet', '$state', 'Upload', 'fileUpload','$filter',
        function ($rootScope, $scope, $timeout, user_data, mainService, sweet, $state, Upload, fileUpload,$filter) {

            $scope.pricingVersion = function(item){
                $scope.versionId=item;
                UIkit.modal("#modal_payment_request_print", {center: false}).show();
            };

        }
    ]);
