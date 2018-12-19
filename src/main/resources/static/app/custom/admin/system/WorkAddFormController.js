angular
    .module('altairApp')
    	.controller("workAddformCtrl", [
    	                           '$scope',
    	                           '$rootScope',
    	                           '$state',
    	                           'utils',
    	                           '$timeout',
    	                           'mainService',
    	                           'fileUpload',
    	                           'sweet',
    	                           'audit_dir',
    	                           'au_work',
    	                           'work_type',
    	                           'au_level',
    	                           'au_type',
	        function ($scope,$rootScope,$state,utils,$timeout,mainService,fileUpload,sweet,audit_dir,au_work,work_type,au_level,au_type) {
    	   
    	    var formdataDir = new FormData();
    	    
    	    var $formValidate = $('#user_add_form');
    		
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
    	    
    		init();
    		var isfl=[{"text":"Тийм","value":"1" },{"text":"Үгүй","value": "0"}];
    		function init(){
    			$scope.domain = "LutAuditWork";
    			
    			if($state.params.param!=0){
    				mainService.withdomain('get', '/core/resource/LutAuditWork/'+$state.params.param).
	    			then(function(data){
	    				console.log(data[0]);
	    				$scope.formdata=data[0];
	    				$scope.issaved=1;
	    			});
    			}
    			else{
    				$scope.formdata = {};
    				$scope.formdata.isdettrial = false;
    				$scope.formdata.isfile = 0;
    			}
	    	}
   	        
	        $scope.getTheUFiles = function ($files) {
	                angular.forEach($files, function (value, key) {
	                	formdataDir.append("files", value);
	                	$scope.formdata.removeFile = 1; 
	                });
	            };

    	    var init={"text":"ROOT","value":"0"};	    	
    	    au_work.push(init);
    	    
    	    $scope.removeFile = function(formdata){
    	    	formdata.filepath=null;
    	    }
    	    
    	    $scope.fch = function(item){
    	    	formdataDir = new FormData();
    	    	angular.element('.dropify-clear').triggerHandler('click');
    	    	if($scope.formdata.isfile=='0'){
    	    		 var x = {isfile: "false"};
         			 formdataDir.append("files", x);    	   
         		   }
    	    }
    	    
        	$scope.submitWorkadd = function(event) {
      		   event.preventDefault();
      		   console.log($scope.formdata);
      		   if($scope.formdata.isfile=='0'){
     			 var x = {isfile: "false"};
     			 formdataDir.append("files", x);    	   
     		   }
      		   if($state.params.param!=0 && $scope.formdata.removeFile !=1){
      			 var x = {isfile: "false"};
     			 formdataDir.append("files", x);   
      		   }
      		   if($scope.formdata.removeFile !=1 && $scope.formdata.isfile==1 && $scope.formdata.filepath==null){
      			   sweet.show('Мэдээлэл', 'Файлаа оруулна уу!!!.', 'error');
      		   }else{
	      		   var data = JSON.stringify($scope.formdata);   
	      		   formdataDir.append("obj", data);    
	      		   if($state.params.param!=0){
		      			 fileUpload.uploadFileToUrl('/core/updateWork', formdataDir)
		   			   	.then(function(data){ 
		   			   		sweet.show('Мэдээлэл', 'Амжилттай хадгалагдлаа.', 'success');
			   				$state.go('restricted.pages.worklist');	
			   			});	
	      		   }
	      		   else{
	      			   fileUpload.uploadFileToUrl('/core/addWork', formdataDir)
	      			   	.then(function(data){ 
	      			   		sweet.show('Мэдээлэл', 'Амжилттай хадгалагдлаа.', 'success');
	      			   		$state.go('restricted.pages.worklist');	
	  	   			});	
	      		   }
	        	}
            }
			
			$scope.backtoview = function(){
				$state.go('restricted.pages.worklist');
			}
			
    	    var isfile_data = $scope.selectize_isfile_options = isfl;
   			
   			$scope.selectize_isfile_config = {
   	                plugins: {
   	                    'remove_button': {
   	                        label     : ''
   	                    }
   	                },
   	                maxItems: 1,
   	                minItems:1,
   	                valueField: 'value',
   	                labelField: 'text',
   	                searchField: 'text',
   	                create: false,
   	                render: {
   	                    option: function(isfile_data, escape) {
   	                        return  '<div class="option">' +
   	                            '<span class="title">' + escape(isfile_data.text) + '</span>' +
   	                            '</div>';
   	                    }
   	                }
   	            };
   		 $('.dropify').dropify();

         $('.dropify-fr').dropify({
             messages: {
                 default: 'Файлаа сонгоно уу',
                 replace: 'Дарж хуулах',
                 remove:  'Устгах',
                 error:   'Алдаа гарлаа'
             }
         });
    	    var au_type_data = $scope.selectize_au_type_options = au_type;
   			
   			$scope.selectize_au_type_config = {
   	                plugins: {
   	                    'remove_button': {
   	                        label     : ''
   	                    }
   	                },
   	                maxItems: null,
   	                minItems:1,
   	                valueField: 'value',
   	                labelField: 'text',
   	                searchField: 'text',
   	                create: false,
   	                render: {
   	                    option: function(au_type_data, escape) {
   	                        return  '<div class="option">' +
   	                            '<span class="title">' + escape(au_type_data.text) + '</span>' +
   	                            '</div>';
   	                    }
   	                }
   	            };
   			
   			var au_level_data = $scope.selectize_au_level_options = au_level;
   			
   			$scope.selectize_au_level_config = {
   	                plugins: {
   	                    'remove_button': {
   	                        label     : ''
   	                    }
   	                },
   	                maxItems: 1,
   	                minItems:1,
   	                valueField: 'value',
   	                labelField: 'text',
   	                searchField: 'text',
   	                create: false,
   	                render: {
   	                    option: function(au_level_data, escape) {
   	                        return  '<div class="option">' +
   	                            '<span class="title">' + escape(au_level_data.text) + '</span>' +
   	                            '</div>';
   	                    }
   	                }
   	            };
    	    
   			var au_level_data = $scope.selectize_au_level_options = au_level;
   			
   			$scope.selectize_au_level_config = {
   	                plugins: {
   	                    'remove_button': {
   	                        label     : ''
   	                    }
   	                },
   	                maxItems: 1,
   	                minItems:1,
   	                valueField: 'value',
   	                labelField: 'text',
   	                searchField: 'text',
   	                create: false,
   	                render: {
   	                    option: function(au_level_data, escape) {
   	                        return  '<div class="option">' +
   	                            '<span class="title">' + escape(au_level_data.text) + '</span>' +
   	                            '</div>';
   	                    }
   	                }
   	            };
   			
    	    var work_type_data = $scope.selectize_work_type_options = work_type;
   			
   			$scope.selectize_work_type_config = {
   	                plugins: {
   	                    'remove_button': {
   	                        label     : ''
   	                    }
   	                },
   	                maxItems: null,
   	                minItems:1,
   	                valueField: 'value',
   	                labelField: 'text',
   	                searchField: 'text',
   	                create: false,
   	                render: {
   	                    option: function(work_type_data, escape) {
   	                        return  '<div class="option">' +
   	                            '<span class="title">' + escape(work_type_data.text) + '</span>' +
   	                            '</div>';
   	                    }
   	                }
   	            };
    	    
    	    var audit_dir_data = $scope.selectize_audit_dir_options = audit_dir;
   			
   			$scope.selectize_audit_dir_config = {
   	                plugins: {
   	                    'remove_button': {
   	                        label     : ''
   	                    }
   	                },
   	                maxItems: 1,
   	                minItems:1,
   	                valueField: 'value',
   	                labelField: 'text',
   	                searchField: 'text',
   	                create: false,
   	                render: {
   	                    option: function(audit_dir_data, escape) {
   	                        return  '<div class="option">' +
   	                            '<span class="title">' + escape(audit_dir_data.text) + '</span>' +
   	                            '</div>';
   	                    }
   	                }
   	            };
   			
   			var au_work_data = $scope.selectize_au_work_options = au_work;
   			
   			$scope.selectize_au_work_config = {
   	                plugins: {
   	                    'remove_button': {
   	                        label     : ''
   	                    }
   	                },
   	                maxItems: 1,
   	                minItems:1,
   	                valueField: 'value',
   	                labelField: 'text',
   	                searchField: 'text',
   	                create: false,
   	                render: {
   	                    option: function(au_work_data, escape) {
   	                        return  '<div class="option">' +
   	                            '<span class="title">' + escape(au_work_data.text) + '</span>' +
   	                            '</div>';
   	                    }
   	                }
   	            };
        }]
    )
    
    


