angular
    .module('altairApp')
    .controller('main_headerCtrl', [
        '$timeout',
        '$rootScope',
        '$scope',
        '$window',
        '$state',
        'sessionService',
        'mainService',
        'fileUpload',
        function ($timeout,$rootScope,$scope,$window,$state,sessionService,mainService,fileUpload) {

        	$('.dropify').dropify();
        	
        	mainService.withdomain('get','/api/user')
	  			.then(function(data){
	  				 $rootScope.user =  data;		
	  				 $scope.user=data;	
		  	});
        	
        	var changePasswordDialogModal = UIkit.modal("#changePasswordDialog");
  		    $scope.changePasswordDialog=function(){
  		    	changePasswordDialogModal.show();
  		    }
  		    $scope.psAlert=false;
  		    $scope.p = {};
  		    $scope.psOldAlert=false;
  		    
  		    $scope.rep =  function(){
  		    	if($scope.p.new_password ==  $scope.p.new_password_confirm){
  		    		 $scope.psOldAlert=false;  		    		 
  		    	}
  		    	else{
  		    		 $scope.psOldAlert=true;
  		    	}
  		    }
  		    
  		    $scope.submitChangePasswordReq = function(){
          	  mainService.withdata("post","/changeUserPassword",$scope.p).then(function(data){
          		  if (data == true){
          			UIkit.modal("#changePasswordDialog").hide();
          			UIkit.notify("Нууц үг амжилттай солигдлоо.", {status:'success', pos: 'top-right'});
          		  }
          		  else{
          			 $scope.psOldAlert=true;
          		  }
          	  });
        	}
  		    
			var formdataAttach = new FormData(); 
			$scope.submitChangeUserDataReq= function(event) { 
				 formdataAttach.append("obj", $scope.user);    
				 fileUpload.uploadFileToUrl('/work/attach', formdataAttach)
			   	 	.then(function(data){ 
					    formdataAttach = new FormData();
				});
			}
  		  
  		    
  		    $scope.changeUserDataDialog = function(){
    		    UIkit.modal("#changeUserdataDialog").show();
    	    }
        	 
            $scope.user_data = {
                name: "Lue Feest",
                avatar: "assets/img/avatars/avatar_11_tn.png",
                alerts: [],
                messages: []
            };
            
          

            $scope.logout = sessionService.logout;
            
            $scope.alerts_length = $scope.user_data.alerts.length;
            $scope.messages_length = $scope.user_data.messages.length;


            $('#menu_top').children('[data-uk-dropdown]').on('show.uk.dropdown', function(){
                $timeout(function() {
                    $($window).resize();
                },280)
            });

            // autocomplete
            $('.header_main_search_form').on('click','#autocomplete_results .item', function(e) {
                e.preventDefault();
                var $this = $(this);
                $state.go($this.attr('href'));
                $('.header_main_search_input').val('');
            })

        }
    ])
;