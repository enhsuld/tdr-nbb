angular
    .module('altairApp')
    	.controller("tryOutformCtrl", [
    	                           '$scope',
    	                           '$rootScope',
    	                           '$state',
    	                           'utils',
    	                           '$timeout',
    	                           'mainService',
    	                           'fileUpload',
    	                           'sweet',
    	                           'audit_dir',
    	                           'notices',
    	                           'org_type',
    	                           'risks',
    	                           'procedures',
    	                           'conftype',
    	                           'confMethod',
    	                           'confSourceO',
    	                           'confSourceI',
	        function ($scope,$rootScope,$state,utils,$timeout,mainService,fileUpload,sweet,audit_dir,notices,org_type,risks,procedures,conftype,confMethod,confSourceO,confSourceI) {
    	   
    	    var formdataDir = new FormData();
    	    $scope.formdata = {};
    	    
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
    	    
    		 $scope.noticePro = {};
    		
    		init();
    		var isfl=[{"text":"Тийм","value":"1" },{"text":"Үгүй","value": "0"}];
    		function init(){
    			$scope.noticePro.procedure = [{"text":"Аудитын чиглэлээ сонгоно уу","value":"0" }];
        	    $scope.noticePro.notice = [{"text":"Аудитын чиглэлээ сонгоно уу","value":"0" }];
        	    $scope.noticePro.risk = [{"text":"Аудитын чиглэлээ сонгоно уу","value":"0" }];
        	    
        	    $scope.domain = "LutTryout";
    			
    			if($state.params.param!=0){
    				mainService.withdomain('get', '/my/resource/LutTryout/'+$state.params.param).
	    			then(function(data){
	    				$scope.formdata=data[0];
	    			});
    			}
	    	}
    		
    		var conftype_data = $scope.selectize_conftype_options = conftype;
   			
   			$scope.selectize_conftype_config = {
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
   	                    option: function(conftype_data, escape) {
   	                        return  '<div class="option">' +
   	                            '<span class="title">' + escape(conftype_data.text) + '</span>' +
   	                            '</div>';
   	                    }
   	                }
   	            };
   			var confSourceO_data = $scope.selectize_confSourceO_options = confSourceO;
   			
   			$scope.selectize_confSourceO_config = {
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
   	                    option: function(confSourceO_data, escape) {
   	                        return  '<div class="option">' +
   	                            '<span class="title">' + escape(confSourceO_data.text) + '</span>' +
   	                            '</div>';
   	                    }
   	                }
   	            };
   			
   			var confSourceI_data = $scope.selectize_confSourceI_options = confSourceI;
   			
   			$scope.selectize_confSourceI_config = {
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
   	                    option: function(confSourceI_data, escape) {
   	                        return  '<div class="option">' +
   	                            '<span class="title">' + escape(confSourceI_data.text) + '</span>' +
   	                            '</div>';
   	                    }
   	                }
   	            };
   			
   			var confMethod_data = $scope.selectize_confMethod_options = confMethod;
   			
   			$scope.selectize_confMethod_config = {
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
   	                    option: function(confMethod_data, escape) {
   	                        return  '<div class="option">' +
   	                            '<span class="title">' + escape(confMethod_data.text) + '</span>' +
   	                            '</div>';
   	                    }
   	                }
   	            };
    	    
    	    var procedures_data = $scope.selectize_procedures_options = $scope.noticePro.procedure;
   			
   			$scope.selectize_procedures_config = {
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
   	                    option: function(procedures_data, escape) {
   	                        return  '<div class="option">' +
   	                            '<span class="title">' + escape(procedures_data.text) + '</span>' +
   	                            '</div>';
   	                    }
   	                }
   	            };
    	    
   			var notices_data = $scope.selectize_notices_options = $scope.noticePro.notice;
   			
   			$scope.selectize_notices_config = {
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
   	                    option: function(notices_data, escape) {
   	                        return  '<div class="option">' +
   	                            '<span class="title">' + escape(notices_data.text) + '</span>' +
   	                            '</div>';
   	                    }
   	                }
   	            };
   			
   			var risks_data = $scope.selectize_risks_options = $scope.noticePro.risk;
   			
   			$scope.selectize_risks_config = {
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
   	                    option: function(risks_data, escape) {
   	                        return  '<div class="option">' +
   	                            '<span class="title">' + escape(risks_data.text) + '</span>' +
   	                            '</div>';
   	                    }
   	                }
   	            };
   			$scope.fchnon = function(){
   				
    	    	$scope.noticePro.procedure = [{"text":"Аудитын чиглэлээ сонгоно уу","value":"0" }];
        	    $scope.noticePro.notice = [{"text":"Аудитын чиглэлээ сонгоно уу","value":"0" }];
        	    $scope.noticePro.risk = [{"text":"Аудитын чиглэлээ сонгоно уу","value":"0" }];
        	    procedures_data = $scope.selectize_procedures_options = $scope.noticePro.procedure;
	   			
	   			$scope.selectize_procedures_config = {
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
	   	                    option: function(procedures_data, escape) {
	   	                        return  '<div class="option">' +
	   	                            '<span class="title">' + escape(procedures_data.text) + '</span>' +
	   	                            '</div>';
	   	                    }
	   	                }
	   	            };
	   			notices_data = $scope.selectize_notices_options = $scope.noticePro.notice;
	   			
	   			$scope.selectize_notices_config = {
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
	   	                    option: function(notices_data, escape) {
	   	                        return  '<div class="option">' +
	   	                            '<span class="title">' + escape(notices_data.text) + '</span>' +
	   	                            '</div>';
	   	                    }
	   	                }
	   	            };
	   			risks_data = $scope.selectize_risks_options = $scope.noticePro.risk;
	   			
	   			$scope.selectize_risks_config = {
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
	   	                    option: function(risks_data, escape) {
	   	                        return  '<div class="option">' +
	   	                            '<span class="title">' + escape(risks_data.text) + '</span>' +
	   	                            '</div>';
	   	                    }
	   	                }
	   	            };
    	    }
   			
    	    $scope.direction = function(item){
    	     	if(typeof item === "undefined"){
    	     		$scope.fchnon();
    	     	}
    	     	else{
	    	    	mainService.withdomain('get', '/my/resource/LnkDirectionNoticeProcedureRisk/'+item).
	    			then(function(data){
	    				$scope.noticePro=data[0];   	            	    				
	    				console.log($scope.noticePro);
	    				if($scope.noticePro.procedure.length==0){
	    					$scope.noticePro.procedure = [{"text":"Харъяалагдах горим байхгүй байна","value":"0" }];
	    				}
	    				if($scope.noticePro.notice.length==0){
	    					$scope.noticePro.notice = [{"text":"Харъяалагдах батламж мэдэгдэл байхгүй байна","value":"0" }];
	    				}
	    				if($scope.noticePro.risk.length==0){
	    					$scope.noticePro.risk = [{"text":"Харъяалагдах эрсдэл байхгүй байна","value":"0" }];
	    				}
	    				
	    				 procedures_data = $scope.selectize_procedures_options = $scope.noticePro.procedure;
	    		   			
	    		   			$scope.selectize_procedures_config = {
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
	    		   	                    option: function(procedures_data, escape) {
	    		   	                        return  '<div class="option">' +
	    		   	                            '<span class="title">' + escape(procedures_data.text) + '</span>' +
	    		   	                            '</div>';
	    		   	                    }
	    		   	                }
	    		   	            };
	    		   			notices_data = $scope.selectize_notices_options = $scope.noticePro.notice;
	    		   			
	    		   			$scope.selectize_notices_config = {
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
	    		   	                    option: function(notices_data, escape) {
	    		   	                        return  '<div class="option">' +
	    		   	                            '<span class="title">' + escape(notices_data.text) + '</span>' +
	    		   	                            '</div>';
	    		   	                    }
	    		   	                }
	    		   	            };
	    		   			risks_data = $scope.selectize_risks_options = $scope.noticePro.risk;
	    		   			
	    		   			$scope.selectize_risks_config = {
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
	    		   	                    option: function(risks_data, escape) {
	    		   	                        return  '<div class="option">' +
	    		   	                            '<span class="title">' + escape(risks_data.text) + '</span>' +
	    		   	                            '</div>';
	    		   	                    }
	    		   	                }
	    		   	            };
	    			});	 
    	     	}
    	    }
    	    
    	    
        	$scope.submitadd = function(event) {
      		   event.preventDefault();
      		   console.log($scope.formdata);
      		   if($state.params.param==0){
					mainService.withdata('put','/my/addTryOut', $scope.formdata)
		   			.then(function(data){	
		   				sweet.show('Мэдээлэл', 'Амжилттай хадгаллаа.', 'success');	
		   				$state.go('restricted.pages.tryoutlist');
		   			});
				}
				else{
					mainService.withdata('put','/my/updateTryOut', $scope.formdata)
		   			.then(function(data){	
		   				sweet.show('Мэдээлэл', 'Амжилттай хадгаллаа.', 'success');	
		   				$state.go('restricted.pages.tryoutlist');
		   			});
				}
      		  
      		  
            }
			
			$scope.backtoview = function(){
				$state.go('restricted.pages.tryoutlist');
			}
			
   			
    	    var work_type_data = $scope.selectize_work_type_options = org_type;
   			
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
   			
        }]
    )
    
    


