angular
    .module('altairApp')
    .controller('mailbox_v2Ctrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        'messages',
        function ($rootScope,$scope,$timeout,messages) {

            $scope.messages = messages;

            $('#mailboxV2')
                .on('ifChanged', '.select_message', function() {
                    $(this).is(':checked') ? $(this).closest('tr').addClass('row-selected') : $(this).closest('tr').removeClass('row-selected');
                });

        }
    ])
;