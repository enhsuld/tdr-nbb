angular
    .module('altairApp')
    .controller('login_v2Ctrl', [
        '$scope',
        '$rootScope',
        'utils',
        '$http',
        '$state',
        'mainService',
        '__env',
        function ($scope,$rootScope,utils,$http,$state,mainService,__env) {


            var $formValidate = $('#form_validation');
            
            $formValidate
                .parsley()
                .on('form:validated',function() {
                    $scope.$apply();
                })
                .on('field:validated',function(parsleyField) {
                    if($(parsleyField.$element).hasClass('md-input')) {
                        $scope.$apply();
                    }
                });


                
                var authenticate = function(credentials, callback) {
                    
                    var headers = credentials ? {
                        authorization : "Basic "
                                + btoa(unescape(encodeURIComponent(credentials.username)) + ":"
                                        + unescape(encodeURIComponent(credentials.password)))
                    } : {};
    
                    $http.get(__env.apiUrl()+'/user', {
                        headers : headers
                    }).then(function(response) {
                        if (response.data.name) {
                            //$rootScope.user=response.data;
                            $rootScope.authenticated = true;
                        } else {
                            $rootScope.authenticated = false;
                        }
                        callback && callback($rootScope.authenticated);
                    }, function() {
                        $rootScope.authenticated = false;
                        callback && callback(false);
                    });
                    
        
                }
    
                authenticate();
                $scope.credentials = {};
                
                $scope.login = function() {
                    $rootScope.loggedout=false;
                    authenticate($scope.credentials, function(authenticated) {
                        if (authenticated) {
                            console.log("Login succeeded");                            
                            
                            $http.get(__env.apiUrl()+"/core/defaultSuccess").then(
                            function (response) {
                                $state.go(response.data.url);
                               // $state.go("restricted.dashboard");
                            });
        					
                            $scope.error = false;
                            $rootScope.authenticated = true;
                        } else {				
                            $scope.error = true;
                            console.log("Login failed")					
                            $rootScope.authenticated = false;
                        }
                    })
                };


            $scope.registerFormActive = false;

            var $login_card = $('#login_card'),
                $login_form = $('#login_form'),
                $login_help = $('#login_help'),
                $register_form = $('#register_form'),
                $login_password_reset = $('#login_password_reset');

            // show login form (hide other forms)
            var login_form_show = function() {
                $login_form
                    .show()
                    .siblings()
                    .hide();
            };

            // show register form (hide other forms)
            var register_form_show = function() {
                $register_form
                    .show()
                    .siblings()
                    .hide();
            };

            // show login help (hide other forms)
            var login_help_show = function() {
                $login_help
                    .show()
                    .siblings()
                    .hide();
            };

            // show password reset form (hide other forms)
            var password_reset_show = function() {
                $login_password_reset
                    .show()
                    .siblings()
                    .hide();
            };

            $scope.loginHelp = function($event) {
                $event.preventDefault();
                utils.card_show_hide($login_card,undefined,login_help_show,undefined);
            };

            $scope.backToLogin = function($event) {
                $event.preventDefault();
                $scope.registerFormActive = false;
                utils.card_show_hide($login_card,undefined,login_form_show,undefined);
            };

            $scope.registerForm = function($event) {
                $event.preventDefault();
                $scope.registerFormActive = true;
                utils.card_show_hide($login_card,undefined,register_form_show,undefined);
            };

            $scope.passwordReset = function($event) {
                $event.preventDefault();
                utils.card_show_hide($login_card,undefined,password_reset_show,undefined);
            };

        }
    ]);