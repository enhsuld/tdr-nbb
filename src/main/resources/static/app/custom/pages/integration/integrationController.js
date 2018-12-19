angular
    .module('altairApp')
    	.controller("integrationCtrl",['$scope','user_data','mainService','sweet','$state','p_cat','reason',
	        function ($scope,user_data,mainService,sweet,$state,p_cat,reason) {       	
    		
    			var modal = UIkit.modal("#modal_update");
    	    	
    			    	
    			$scope.domain="com.netgloo.models.MainAuditRegistration.";
    			
    			
    			$scope.read=function(item){
    				$state.go('restricted.work.mainwork',{issueId:item.id});
    			}
    			  
    			var aj=[{"text":"Хувиарлаагүй","value":"1"},{"text":"Хувиарласан","value":"2"},{"text":"Баталсан","value":"3"},{"text":"Буцаасан","value":"4"}];
    			
    			var alevel=[{"text":"Төлөвлөх үе шат","value":"3"},{"text":"Гүйцэтгэх үе шат","value":"4"},{"text":"Тайлагналын үе шат","value":"5"},{"text":"Тайлагналын дараах","value":"6"}];
	            
    			var orgtype=[{"text":"ААН","value":"2"},{"text":"ТШЗ","value":"1"}];
    			
	    		function init(){
	   	    		 mainService.withdomain('get','/core/rjson/'+user_data.id+'/'+$state.current.name+'.')
	   		   			.then(function(data){  		   				
	   		   				if(data.rread==1){
	   		   					
		   		   		       $scope.puserGrid = {
		   			                dataSource: {
		   			                    autoSync: true,
		   			                    transport: {
		   			                    	read:  {
		   			                            url: "/fin/list/MainAuditRegistrationAu",
		   			                            contentType:"application/json; charset=UTF-8",           
		   			                            data:{"userid":user_data.id, "depid":user_data.depid},
		   			                            type:"POST"
		   			                        },
		   			                        update: {
		   			                            url: "/core/update/"+$scope.domain+"",
		   			                            contentType:"application/json; charset=UTF-8",                                    
		   			                            type:"POST"
		   			                        },
		   			                        destroy: {
		   			                          //  url: "/core/delete/"+$scope.domain+"",
		   			                            contentType:"application/json; charset=UTF-8",                                    
		   			                            type:"POST",
		   			                            complete: function(e) {
		   			                            	 $("#notificationDestroy").trigger('click');
		   			                    		}
		   			                        },
		   			                        create: {
		   			                            url: "/core/create/"+$scope.domain+"",
		   			                            contentType:"application/json; charset=UTF-8",                                    
		   			                            type:"POST",
		   			                            complete: function(e) {
		   			                            	$("#notificationSuccess").trigger('click');
		   			                    			$(".k-grid").data("kendoGrid").dataSource.read(); 
		   			                    		}
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
		   			                resizable: true,
		   			                pageable: {
		   			                    refresh: true,
		   			                    pageSizes: true,
		   			                    buttonCount: 5
		   			                },
		   			                columns: [
			   			                	  {title: "#",template: "<span class='row-number'></span>", width:"60px", lockable: false},
		   			                          { field:"gencode", title: "Код", width:"200px"},        
		   			                          { field:"orgname", title: "Байгууллагын нэр",width:"200px"},
		   			                          { field:"regnum", title: "Байгууллагын регистр",width:"200px",},	
		   			                          { field:"orgtype", values:orgtype,width: 150, title: "Аудитын төрөл"},
		   			                          { field:"auditname", width: 200, title: "Аудитын нэр"},
		   			                          { field:"director", title: "Тэргүүлэх аудитор/ Захирал",filterable:false,width: 250},		   			                        
		   			                          { field:"chpos", title: "Чанарын баталгаажуулалт хийсэн ажилтны албан тушаал",width: 250},
		   			                          { field:"chname", title: "Чанарын баталгаажуулалт хийсэн ажилтны овог нэр",filterable:false,width: 250},
		   			                          { field:"apos", title: "Аудит хийсэн ажилтны албан тушаал",filterable:false,width: 250},	 
		   			                          { field:"aname", title: "Аудит хийсэн ажилтны овог нэр",filterable:false,width: 250},
		   			                          { field:"data6", title: "Аудит хийсэн баг",filterable:false,width: 250},
		   			                          {template: kendo.template($("#read").html()), width: "100px", locked: true}		                      
			   			                      ],
			   			                      dataBound: function () {
					   	   		                var rows = this.items();
					   	   		                  $(rows).each(function () {
					   	   		                      var index = $(this).index() + 1 
					   	   		                      + ($(".k-grid").data("kendoGrid").dataSource.pageSize() * ($(".k-grid").data("kendoGrid").dataSource.page() - 1));;
					   	   		                      var rowLabel = $(this).find(".row-number");
					   	   		                      $(rowLabel).html(index);
					   	   		                  });
						   	   		              var grid = this;
						   			              grid.tbody.find("tr").dblclick(function (e) {
						   			                  var dataItem = grid.dataItem(this);
						   			                  $scope.read(dataItem);
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
	   		   						//$scope.puserGrid.columns.push({template: kendo.template($('#update').html()),  width: 85})
	   		   					}
	   		   					
	   		   					
	   		   					
	   		   					$scope.integrationGrid = {
		   			                dataSource: {
		   			                    autoSync: true,
		   			                    transport: {
		   			                    	read:  {
		   			                            url: "/fin/list/MainAuditRegistrationAu",
		   			                            contentType:"application/json; charset=UTF-8",           
		   			                            data:{"userid":user_data.id, "depid":user_data.depid},
		   			                            type:"POST"
		   			                        },
		   			                        update: {
		   			                            url: "/core/update/"+$scope.domain+"",
		   			                            contentType:"application/json; charset=UTF-8",                                    
		   			                            type:"POST"
		   			                        },
		   			                        destroy: {
		   			                          //  url: "/core/delete/"+$scope.domain+"",
		   			                            contentType:"application/json; charset=UTF-8",                                    
		   			                            type:"POST",
		   			                            complete: function(e) {
		   			                            	 $("#notificationDestroy").trigger('click');
		   			                    		}
		   			                        },
		   			                        create: {
		   			                            url: "/core/create/"+$scope.domain+"",
		   			                            contentType:"application/json; charset=UTF-8",                                    
		   			                            type:"POST",
		   			                            complete: function(e) {
		   			                            	$("#notificationSuccess").trigger('click');
		   			                    			$(".k-grid").data("kendoGrid").dataSource.read(); 
		   			                    		}
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
		   			                persistSelection: true,
		   			                resizable: true,
		   			                pageable: {
		   			                    refresh: true,
		   			                    pageSizes: true,
		   			                    buttonCount: 5
		   			                },
		   			                change: onChange,
		   			                columns: [
		   			                		  { selectable: true, width: "50px" },
			   			                	  {title: "#",template: "<span class='row-number'></span>", width:"60px"},
		   			                          { field:"gencode", title: "Код", width:"200px"},        
		   			                          { field:"orgname", title: "Байгууллагын нэр",width:"200px"},
		   			                          { field:"regnum", title: "Байгууллагын регистр",width:"200px",},	
		   			                          { field:"orgtype", values:orgtype,width: 150, title: "Аудитын төрөл"},
		   			                          { field:"auditname", width: 200, title: "Аудитын нэр"}
			   			                      ],
			   			                      dataBound: function () {
					   	   		                var rows = this.items();
					   	   		                  $(rows).each(function () {
					   	   		                      var index = $(this).index() + 1 
					   	   		                      + ($(".k-grid").data("kendoGrid").dataSource.pageSize() * ($(".k-grid").data("kendoGrid").dataSource.page() - 1));;
					   	   		                      var rowLabel = $(this).find(".row-number");
					   	   		                      $(rowLabel).html(index);
					   	   		                  });
						   	   		              var grid = this;
						   			              grid.tbody.find("tr").dblclick(function (e) {
						   			                  var dataItem = grid.dataItem(this);
						   			                  $scope.read(dataItem);
						   			              });
					   	   		  	           },
		   			                      editable: "popup"
		   			            };
		   		   				function onChange(arg) {
		   		                    kendoConsole.log("The selected product ids are: [" + this.selectedKeyNames().join(", ") + "]");
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
