angular
    .module('altairApp')
    	.controller("transactionCtrl",['$scope','p_menu','user_data','mainService','$state','sweet',
	        function ($scope,p_menu,user_data,mainService,$state,sweet) {       	
	    		var aj=p_menu;
	    		var init={"text":"ROOT","value":"null"};	    	
				aj.push(init);
				
	        	$scope.domain="com.nbb.models.LutMenu.";
	        	
	        	   // autocomplete
	            $('.autocomplete_template').on('click','#autocomplete_template_results .item', function(e) {
	                e.preventDefault();
	                var $this = $(this);
	                $state.go($this.attr('href'));
	                $('.autocomplete_template > input').val('');
	            })
	            
	            
	            $scope.form_template = [
                [
                    {
                        'type': 'text',
                        'name': 'firstName',
                        'label': 'Дансны код',
                        'wi': 1,
                        'disable':false
                    },
                    {
                        'type': 'text',
                        'name': 'firstName',
                        'label': 'Дансны нэр',
                        'wi': 1,
                        'disable':true
                    },
                    {
                        'type': 'number',
                        'name': 'debit',
                        'label': 'Дебет',
                        'wi': 1,
                        'disable':false
                    },
                    {
                        'type': 'number',
                        'name': 'credit',
                        'label': 'Кредит',
                        'wi': 1,
                        'disable':false
                    },
                    {
                        'type': 'text',
                        'name': 'firstName',
                        'label': 'Харилцагч',
                        'wi': 1,
                        'disable':true
                    },
                    {
                        'type': 'text',
                        'name': 'firstName',
                        'label': 'Вальют тоо',
                        'wi': 1,
                        'disable':true
                    },
                    {
                        'type': 'text',
                        'name': 'firstName',
                        'label': 'Вальют ханш',
                        'wi': 1,
                        'disable':true
                    },
                    {
                        'type': 'text',
                        'name': 'firstName',
                        'label': 'КТ',
                        'wi': 1,
                        'disable':true
                    },
                    {
                        'type': 'text',
                        'name': 'firstName',
                        'label': 'Баримт №',
                        'wi': 2,
                        'disable':true
                    }
                ]                
            ];

            $scope.form_dynamic = [];
            $scope.form_dynamic.push($scope.form_template);

            $scope.form_dynamic_model = [];

            $scope.myTrackingFunction =function(sectionIndex,name){
            	if(name=='debit'){
            		$scope.form_dynamic_model[sectionIndex]['credit']=0;
            	}
            	else{
            		$scope.form_dynamic_model[sectionIndex]['debit']=0;
            	}
            }
            // clone section
            $scope.cloneSection = function($event,$index) {
                $event.preventDefault();
                var dbt=0;
                var crt=0;
                angular.forEach($scope.form_dynamic, function(value, key) {
                	if($scope.form_dynamic_model[key]['debit']!=undefined){
                		dbt=dbt+$scope.form_dynamic_model[key]['debit'];
                	}
                	if($scope.form_dynamic_model[key]['credit']!=undefined){
                		crt=crt+$scope.form_dynamic_model[key]['credit'];
                	}                	
            	});
                
                $scope.form_dynamic_model.push([]);
                
                if(dbt-crt>0){
                	$scope.form_dynamic_model[$scope.form_dynamic_model.length-1]['credit']=dbt-crt;
            	} else if(dbt-crt==0){
            		$scope.form_dynamic_model[$scope.form_dynamic_model.length-1]['credit']=crt-dbt;
            		$scope.form_dynamic_model[$scope.form_dynamic_model.length-1]['debit']=crt-dbt;
            	}      
            	else{
            		$scope.form_dynamic_model[$scope.form_dynamic_model.length-1]['debit']=crt-dbt;
            		
            	}
                
                $scope.form_dynamic.push($scope.form_template);
                
                dbt=0;
            	crt=0;
               
            };

            // delete section
            $scope.deleteSection = function($event,$index) {
                $event.preventDefault();
                $scope.form_dynamic_model.splice($index,1);
                $scope.form_dynamic.splice($index,1);
            };

            $scope.$on('onLastRepeat', function (scope, element, attrs) {
                altair_uikit.reinitialize_grid_margin();
            });
	    		
			$scope.mainGridOptions = {
	          dataSource: {
	            type: "odata",
	            transport: {
	              read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
	            },
	            pageSize: 5,
	            serverPaging: true,
	            serverSorting: true
	          },
	          sortable: true,
	          pageable: true,
	          toolbar: ["create", "save", "cancel"],
	          dataBound: function() {
	            this.expandRow(this.tbody.find("tr.k-master-row").first());
	          },
	          columns: [{
	            field: "FirstName",
	            title: "First Name"            
	          }],
	          editable: true
	        };
	
	        $scope.ordersGridOptions = function(dataItem) {
	          return {
	            dataSource: {
	              type: "odata",
	              transport: {
	                read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
	              },
	              serverPaging: true,
	              serverSorting: true,
	              serverFiltering: true,
	              pageSize: 5,
	              filter: { field: "EmployeeID", operator: "eq", value: dataItem.EmployeeID }
	            },
	            toolbar: ["create", "save", "cancel"],
	            scrollable: false,
	            sortable: true,
	            pageable: true,
	            dataBound: function() {
	              this.expandRow(this.tbody.find("tr.k-master-row").first());
	            },
	            columns: [
	              { field: "OrderID", title:"ID", width: "56px" },                   
	              { field: "ShipName", title: "Ship Name" }
	            ],
	            editable: true
	          };
	        };
	    		
	        
	        var crudServiceBaseUrl = "//demos.telerik.com/kendo-ui/service";
	        $scope.productsDataSource = {
	          batch: true,
	          transport: {
	            read:  {
	              url: crudServiceBaseUrl + "/Products",
	              dataType: "jsonp"
	            },
	            create: {
	              url: crudServiceBaseUrl + "/Products/Create",
	              dataType: "jsonp"
	            },
	            parameterMap: function(options, operation) {
	              if (operation !== "read" && options.models) {
	                return {models: kendo.stringify(options.models)};
	              }
	            }
	          },
	          schema: {
	            model: {
	              id: "ProductID",
	              fields: {
	                ProductID: { type: "number" },
	                ProductName: { type: "string" }
	              }
	            }
	          }
	        }
					
	        $scope.someAngularFunction = function(){
	          console.log("executed");
	        },
	        
	        $scope.customOptions = {
	          filter: "startswith",
	          dataSource: $scope.productsDataSource,
	          dataTextField: "ProductName",
	          dataValueField: "ProductID",
	          noDataTemplate: $("#noDataTemplate").html()
	        }; 

	        $scope.addNew = function(widgetId, value) {
	          var widget = $("#" + widgetId).getKendoDropDownList();
	          var dataSource = widget.dataSource;

	          if (confirm("Are you sure?")) {
	            dataSource.add({
	              ProductID: 0,
	              ProductName: value
	            });

	            dataSource.one("sync", function() {
	              widget.select(dataSource.view().length - 1);
	            });

	            dataSource.sync();
	          }
	        };
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		var modalUpdate = UIkit.modal("#modal_update");
	    	      $scope.isupdate = 0;
	    	      $scope.org = function(){
	    	    	  $scope.formdata={};
	    	    	//  $scope.formdata.id=null;
	    	    	//  $scope.formdata.parentid=0;
	    	    	  modalUpdate.show();
	    	      }
	    	      
	    	      $scope.edit = function(id){
	    	    	  mainService.withdomain('get', '/core/api/LutMenu/'+id).
		    			then(function(data){
		    				$scope.formdata=data[0];
		    				modalUpdate.show();
		    			});  
	    	      }
	    	      $scope.editDetail = function(id){
	    	    	  mainService.withdomain('get', '/core/api/LutMenu/'+id).
		    			then(function(data){
		    				$scope.formdata=data[0];
		    				modalUpdate.show();
		    			});  
	    	      }
	    	      
	    	      $scope.submitForm = function($event){
	    	    	  
	    	    	  if($scope.formdata.id==null){
	    	    		  mainService.withdata('POST', '/core/create/'+$scope.domain,  $scope.formdata).
	  	    				then(function(data){
		  	    				modalUpdate.hide();
		  	    				$event.preventDefault();
		  		   				sweet.show('Мэдээлэл', 'Үйлдэл амжилттай.', 'success');
		              			$(".k-grid").data("kendoGrid").dataSource.read(); 
	  	    				});
	    	    	  }else{
	    	    		  mainService.withdata('POST', '/core/update/'+$scope.domain,  $scope.formdata).
		    				then(function(data){
		  	    				modalUpdate.hide();
		  	    				$event.preventDefault();
		  		   				sweet.show('Мэдээлэл', 'Үйлдэл амжилттай.', 'success');
		              			$(".k-grid").data("kendoGrid").dataSource.read(); 
		    				});
	    	    	  }
	    	    	  
	    	      }
	    	      $scope.deleteO = function(id){
	     	    	 
	    				sweet.show({
	  			        	   title: 'Баталгаажуулалт',
	  	   		            text: 'Та устгахдаа итгэлтэй байна уу?',
	  	   		            type: 'warning',
	  	   		            showCancelButton: true,
	  	   		            confirmButtonColor: '#DD6B55',
	  	   		            confirmButtonText: 'Тийм',
	  			    	    cancelButtonText: 'Үгүй',
	  	   		            closeOnConfirm: false,
	  	   		            closeOnCancel: false
	  			          
	  			        }, function(inputvalue) {
	  			        	 if (inputvalue) {
	  			        		 $scope.formdata = {};
	  			        		 $scope.formdata.id = id;
	  			        		 mainService.withdata('POST', '/core/delete/'+$scope.domain,  $scope.formdata).
	  				    			then(function(data){
	  	                    			$(".k-grid").data("kendoGrid").dataSource.read(); 
	  		 				   			sweet.show('Анхаар!', 'Амжилттай устлаа.', 'success');
	  				    			});
	  	 		            }else{
	  	 		                sweet.show('Анхаар!', 'Устгах үйлдэл хийгдсэнгүй!!!', 'error');
	  	 		            }    		
	  			        });
	      	      }
	    	      
	    	      var isfile_data = $scope.selectize_isfile_options = aj;
	     			
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
	      
	     			 $scope.pmenuGrid = {
	 		                dataSource: {
	 		                   
	 		                    transport: {
	 		                    	read:  {
	 		                            url: "/core/list/LutMenu",
	 		                            contentType:"application/json; charset=UTF-8",     
	 		                            data: {"custom":"where parentid is null","sort":[{field: 'id', dir: 'asc'}]},
	 		                            type:"POST"
	 		                        },
	 		                        update: {
	 		                            url: "/core/update/"+$scope.domain+"",
	 		                            contentType:"application/json; charset=UTF-8",                                    
	 		                            type:"POST",
	 		                            complete: function(e) {
	 		                            	$(".k-grid").data("kendoGrid").dataSource.read(); 
	 		                    		}
	 		                        },
	 		                        destroy: {
	 		                            url: "/core/delete/"+$scope.domain+"",
	 		                            contentType:"application/json; charset=UTF-8",                                    
	 		                            type:"POST"
	 		                        },
	 		                        create: {
	 		                        	url: "/core/create/"+$scope.domain+"",
	 		                            contentType:"application/json; charset=UTF-8",                                    
	 		                            type:"POST",
	 		                            complete: function(e) {
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
	 		                             fields: {   
	 		                             	id: { editable: false,nullable: true},
	 		                             	menuname: { type: "string", validation: { required: true } },
	 		                             	stateurl: { type: "string", defaultValue:'#'},
	 		                                uicon: { type: "string"},
	 		                                parentid: { type: "number"},
	 		                                orderid: { type: "number" }
	 		                             }
	 		                         }
	 		                     },
	 		                    pageSize: 10,
	 		                    serverFiltering: true,
	 		                    serverPaging: true,
	 		                    serverSorting: true
	 		                },
	 		               // detailInit: detailInit,
	                        dataBound: function() {
	                            this.expandRow(this.tbody.find("tr.k-master-row").first());
	                        },
	 		              //  toolbar: kendo.template($("#addorg").html()),
	 		                filterable:{
	 			                	 mode: "row"
	 			                },
	 		                sortable: true,
	 		                resizable: true,
	 		                pageable: {
	 		                    refresh: true,
	 		                    pageSizes: true,
	 		                    buttonCount: 5
	 		                },
	 		                columns: [
	 		                	 	  {title: "#",template: "<span class='row-number'></span>", width:"60px"},
	 		                          { field:"menuname", title: "Нэр /Mn/" },
	 		                          { field: "stateurl", title:"URL" },
	 		                          { field: "uicon", title:"IKON"},
	 		                          { field: "parentid", values: aj, title:"Эцэг цэс"},
	 		                          { field: "orderid", title:"Дараалал", width: "200px" }
                            ],
	                        dataBound: function () {
   	   		                var rows = this.items();
   	   		                  $(rows).each(function () {
   	   		                      var index = $(this).index() + 1 
   	   		                      + ($(".k-grid").data("kendoGrid").dataSource.pageSize() * ($(".k-grid").data("kendoGrid").dataSource.page() - 1));;
   	   		                      var rowLabel = $(this).find(".row-number");
   	   		                      $(rowLabel).html(index);
   	   		                  });
   	   		  	           },
	 		                      
	 		            };  	

	        }
    ]);
