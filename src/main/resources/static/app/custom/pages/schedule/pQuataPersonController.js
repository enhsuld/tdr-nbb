angular
    .module('altairApp')
    	.controller("quatapersonCtrl",['$scope','$timeout','user_data','mainService','sweet','$state','p_cat','reason','users',
	        function ($scope,$timeout,user_data,mainService,sweet,$state,p_cat,reason,users) {       	
    		
    			var modal = UIkit.modal("#modal_audit");
    	    	
    		    var $formValidate = $('#newaudit');

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
                
    			$scope.domain="com.nbb.models.fn.MainAuditRegistration.";
    		
    			$scope.auditData={
    				"depid":user_data.depid,
    				"autype":user_data.autype
    			}
    			
    			$scope.selectize_payroll_options = [
 	                { value: 1, label: 'Төрийн' },
 	                { value: 2, label: 'Хувийн' },
 	            ];
    			
    			$scope.selectize_val_options = [
 	                { value: 1, label: 'ТШЗ' },
 	                { value: 2, label: 'ААН' },
 	                { value: 3, label: 'Бусад' }
 	            ];
    			
    			$scope.selectize_payroll_config = {
 	                maxItems: 1,
 	                valueField: 'value',
 	                labelField: 'label',
 	                create: false,
 	                placeholder: 'Аудитын төрөл...',
 	                onChange: function() {
	 	               	$scope.selectize_val_options = [
	 	 	                { value: 1, label: 'ТШЗ' },
	 	 	                { value: 2, label: 'ААН' },
	 	 	                { value: 3, label: 'Бусад' }
	 	 	            ];
 	                	
	                	if($scope.auditData.autype==1){
	        	  			$scope.paryDis=false;	        	  			
	        	  			for(var i = $scope.selectize_val_options.length - 1; i >= 0; i--){
	        	  			    if($scope.selectize_val_options[i].value == 3){
	        	  			        $scope.selectize_val_options.splice(i,1);
	        	  			    }
	        	  			}
	        	  			
	        	  		}
	        	  		else{
	        	  			
	        	  			$scope.paryDis=true;
	        	  			for(var i = $scope.selectize_val_options.length - 1; i >= 0; i--){
	        	  			    if($scope.selectize_val_options[i].value == 1){
	        	  			        $scope.selectize_val_options.splice(i,1);
	        	  			    }
	        	  			}
	        	  		}
	                }
 	            };
    			
    			
    			$scope.paryDis=true;
    			
 	            $scope.selectize_val_config = {
 	                maxItems: 1,
 	                valueField: 'value',
 	                labelField: 'label',
 	                create: false,
 	                placeholder: 'ААН төрөл...',
 	                onChange: function() {
 	                	
 	                    /*$timeout(function() {
 	                        $formValidate.parsley().validate();
 	                    })*/
 	                }
 	            };
    			
    			$scope.addnew=function(){
    				 mainService.withdomain("get","/fin/plan/"+user_data.depid).then(function(data){
    					 $scope.count=data.count;
    					 if(data.count>0){
    						 $scope.auditData={};
		    				 $scope.auditData={
			    				"depid":user_data.depid
			    			 }
		    				 UIkit.modal("#modal_audit").show();    
    					 }
    					 else{
    						 sweet.show('Анхаар', 'Багцын эрх дууссан байна.', 'error');
    					 }
											
    				});    			
    			}
    			$scope.update=function(item){
    				$scope.auditData=item;
    				$scope.auditData.lnkUsers=[];
    				angular.forEach(item.lnkMainUsers, function(value, key) {
    					$scope.auditData.lnkUsers.push(value.userid);
					});
    				UIkit.modal("#modal_audit").show();
    			}
    			$scope.submitAudit = function(){
    				if($scope.auditData.hasOwnProperty('id')){
    					mainService.withdata("post","/fin/update/com.nbb.models.fn.MainAuditRegistration.",$scope.auditData).then(function(response){
        					if (response){
        						$(".k-grid").data("kendoGrid").dataSource.read();
        						UIkit.modal("#modal_audit").hide();
        					}
        					else{
        						sweet.show('Анхаар', 'Аудит үүссэн байна.', 'error');
        					}
        				});
    				}
    				else{
    					mainService.withdata("post","/fin/create/com.nbb.models.fn.MainAuditRegistration.",$scope.auditData).then(function(response){
        					if (response){
        						$(".k-grid").data("kendoGrid").dataSource.read();
        						UIkit.modal("#modal_audit").hide();
        					}
        					else{
        						sweet.show('Анхаар', 'Аудит үүссэн байна.', 'error');
        					}
        				});
    				}
    				
    			}
    			
    			var planets_data = $scope.selectize_role = users;
    			$scope.selectize_planets_config = {
	                plugins: {
	                    'remove_button': {
	                        label     : ''
	                    }
	                },
	                maxItems: null,
	                valueField: 'value',
	                labelField: 'text',
	                searchField: 'text',
	                placeholder: "Баг сонгох",
	                create: false,
	                render: {
	                    option: function(planets_data, escape) {
	                        return  '<div class="option">' +
	                            '<span class="title">' + escape(planets_data.position) + '</span>' + ' <span style="margin-left:10px;" class="title">' + escape(planets_data.text) + '</span>'+
	                            '</div>';
	                    },
	                    item: function(planets_data, escape) {
	                        return '<div class="item"><a href="' + escape(planets_data.url) + '" target="_blank">' + escape(planets_data.text) + '</a></div>';
	                    }
	                }
	            };
    			 
    			var aj=[{"text":"Хувиарлаагүй","value":"1"},{"text":"Хувиарласан","value":"2"},{"text":"Баталсан","value":"3"},{"text":"Баталсан","value":"5"},{"text":"Баталсан","value":"6"},{"text":"Буцаасан","value":"4"}];
    			var orgtype=[{"text":"ААН","value":"2"},{"text":"ТШЗ","value":"1"},{"text":"Бусад","value":"3"}];
    			var autype=[{"text":"Төрийн","value":1},{"text":"Хувийн","value":2}];
	     
	    		function init(){
	   	    		 mainService.withdomain('get','/core/rjson/'+user_data.id+'/'+$state.current.name+'.')
	   		   			.then(function(data){   		   				
	   		   				if(data.rread==1){
	   		   					
		   		   		       $scope.puserGrid = {
		   			                dataSource: {
		   			                    autoSync: true,
		   			                    transport: {
		   			                    	read:  {
		   			                            url: "/fin/list/MainAuditRegistration",
		   			                            contentType:"application/json; charset=UTF-8",     
		   			                            data:{"custom":"where depid="+user_data.depid+" and isenabled=1", "depid":user_data.depid},
		   			                            type:"POST"
		   			                        },
		   			                        update: {
		   			                            url: "/core/update/"+$scope.domain+"",
		   			                            contentType:"application/json; charset=UTF-8",                                    
		   			                            type:"POST",
		   			                            complete: function(e) {
			   			                         	if(e.responseText=="false"){			 		                            		
			   		                            		UIkit.notify("Алдаа үүслээ.", {status:'warning'});
			   		                            	}else{
			   		                            		UIkit.notify("Амжилттай хадгаллаа.", {status:'success'});
			   		                            	}
		   			                    		//	$(".k-grid").data("kendoGrid").dataSource.read(); 
			   			                    	 }
		   			                        },
		   			                        destroy: {
			 		                            url: "/core/delete/"+$scope.domain+"",
			 		                            contentType:"application/json; charset=UTF-8",                                    
			 		                            type:"POST"
			 		                        },
		   			                        parameterMap: function(options) {
		   			                       	 return JSON.stringify(options);
		   			                       }
		   			                    },
		   			                    schema: {
		   			                     	data:"data",
		   			                     	total:"total",
		   			                     	 model: {                                	
		   			                             id: "id",
		   			                             fields: {   
		   			                             	id: { type: "number", editable: false,nullable: false},
		   			                             	gencode: { type: "string", editable: false },	                             	
		   			                             	orgtype: { type: "number" , editable: false},
		   			                             	orgname: { type: "string" , editable: true},
		   			                             	autype: { type: "number" , editable: false},
		   			                             	data1: { type: "string" , editable: false},
		   			                             	data2: { type: "string" , editable: false},
		   			                          		data3: { type: "string" , editable: false},	                                          	
		   			                       			data4: { type: "string", editable: false },
		   			                    			data5: { type: "string", editable: false },	   
		   			                    			data6: { type: "string", editable: false },
		   			                    			data7: { type: "string", editable: false},	
		   			                    			depid: { type: "number", editable: false},	
		   			                    			terguuleh: { type: "string",editable: false },	
		   			                    			stepid: { type: "string" , editable: false },	
		   			                    			auditname: { type: "string", editable: true },	
		   			                    			isenabled: { type: "boolean", editable: false },	
		   			                             }	                    
		   			                         }
		   			                     },
		   			                    pageSize: 5,
		   			                    serverPaging: true,
		   			                    serverSorting: true,
		   			                    serverFiltering: true
		   			                },
			   			             
			   			             filterable: {
			   	                   	 	mode: "row"
			   	                    },
			   	                    excel: {
	         	   		                fileName: "Organization Export.xlsx",
	         	   		                proxyURL: "//demos.telerik.com/kendo-ui/service/export",
	         	   		                filterable: true,
	         	   		                allPages: true
	         	   		            },
		   			                sortable: true,
		   			                reorderable: true,
		   			                resizable: true,
		   			                columnMenu: true,
		   			                pageable: {
		   			                    refresh: true,
		   			                    pageSizes: true,
		   			                    buttonCount: 5
		   			                },
		   			                columns: [
		   			                		  {title: "#",template: "<span class='row-number'></span>", width:"60px"},
		   			                          { field:"gencode", title: "Код", width:"200px"},        
		   			                          { field:"orgname", title: "Байгууллагын нэр",width:"200px"},
		   			                          { field:"regnum", title: "Байгууллагын регистр",width:"200px"},	
		   			                          { field:"autype", values:autype, title: "Аудитын төрөл",width:"200px"},	
		   			                          { field:"orgtype", values:orgtype, title: "Байгууллагын төрөл",width:"200px"},	
		   			                          { field:"auditname", width: 200, title: "Аудитын нэр"},
		   			                          { field:"dpos", title: "Тэргүүлэх аудитор/ Захирал",filterable:false,width: 250},	
		   			                          { field:"director", title: "Тэргүүлэх аудитор/ Захирал",filterable:false,width: 250},		   			                        
		   			                          { field:"chpos", title: "Чанарын баталгаажуулалт хийсэн ажилтны албан тушаал",width: 250},
		   			                          { field:"chname", title: "Чанарын баталгаажуулалт хийсэн ажилтны овог нэр",filterable:false,width: 250},
		   			                          { field:"apos", title: "Аудит хийсэн ажилтны албан тушаал",filterable:false,width: 250},	 
		   			                          { field:"aname", title: "Аудит хийсэн ажилтны овог нэр",filterable:false,width: 250},
		   			                          { field:"data6", title: "Аудит хийсэн баг",filterable:false,width: 250},
		   			                         
		   			                          ],
		   			                     /*  template:"<span style='cursor:pointer;' ng-click='editAuditName(dataItem)'>#:auditname#</span>"*/
		   			                       dataBound: function () {
					   	   		                var rows = this.items();
					   	   		                  $(rows).each(function () {
					   	   		                      var index = $(this).index() + 1 
					   	   		                      + ($(".k-grid").data("kendoGrid").dataSource.pageSize() * ($(".k-grid").data("kendoGrid").dataSource.page() - 1));;
					   	   		                      var rowLabel = $(this).find(".row-number");
					   	   		                      $(rowLabel).html(index);
					   	   		                  });
					   	   		  	           },
		   			                      editable: "popup"
		   			            };
	   		   					if(data.rcreate==1){
	   		   						$scope.puserGrid.toolbar= kendo.template($("#add").html());		
	   		   					}
	   		   					else if(data.rexport==1){
	   		   						$scope.puserGrid.toolbar=["excel","pdf"];
	   		   					}
	   		   					if(data.rupdate==1){	   		   						
	   		   						$scope.puserGrid.columns.push({template: kendo.template($('#update').html()), locked: true,lockable: false, width: 135})
	   		   					}
	   		   					if(data.rdelete==1){
	   		   						$scope.puserGrid.columns.push({command:["destroy"], locked: true,lockable: false, width: 140})
	   		   					}
	   		   				}
	   		   				else{
	   		   					$state.go('error.404');
	   		   				}			
	   		   		 });
	   	    	}
   			
	    		init();	            
	        
	        }
    ]);
