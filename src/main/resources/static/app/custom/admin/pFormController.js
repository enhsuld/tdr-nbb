angular
    .module('altairApp')
    	.controller("lutFormCtrl",['$scope','p_form','user_data','mainService','$state','sweet','DTOptionsBuilder','DTColumnDefBuilder','DTColumnBuilder','$timeout','$compile','gridService',
	        function ($scope,p_form,user_data,mainService,$state,sweet,DTOptionsBuilder, DTColumnDefBuilder,DTColumnBuilder,$timeout,$compile,gridService) {     
    		
    		

            $scope.sort = [];
            $scope.filter = [];

            var paginationOptions = {
                    pageNumber: 1,
                    pageSize: 5,
                    sort: null
                };

            $scope.gridOptions = {  };
            $scope.gridOptions.enableCellEditOnFocus = true;

            $scope.gridOptions = {
                paginationPageSizes: [5, 10, 20],
                paginationPageSize: paginationOptions.pageSize,
                enableColumnMenus:false,
                useExternalPagination: true,
                enableCellEditOnFocus:true,
                columnDefs: [
                    { name: 'id',enableCellEdit: false },
                    { name: 'data1',enableCellEdit: true },
                    { name: 'data2',enableCellEdit: true },
                    { name: 'data3',enableCellEdit: true }                    
                ],
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;
                    gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                        paginationOptions.pageNumber = newPage;
                        paginationOptions.pageSize = pageSize;;
                        gridService.readAll('form',pageSize,newPage).then(function(data){
                            $scope.gridOptions.data = data.content;
                            $scope.gridOptions.totalItems = data.totalElements;
                        });
                    });

                    gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                        $scope.sort = [];
                        angular.forEach(sortColumns, function (sortColumn) {
                            $scope.sort.push({
                                fieldName: sortColumn.name,
                                order: sortColumn.sort.direction
                            });
                        });
                        $scope.load();
                    });

                    gridApi.core.on.filterChanged($scope, function () {
                        $scope.filter = [];

                        var grid = this.grid;
                        angular.forEach(grid.columns, function (column) {
                            var fieldName = column.field;
                            var value = column.filters[0].term;
                            var operator = "contains";
                            if (value) {
                                if (fieldName == "id") operator = "equals";
                                else if (fieldName == "price") operator = "greaterThanOrEqualsTo";
                                $scope.filter.push({
                                    fieldName: fieldName,
                                    operator: operator,
                                    value: value
                                })
                            }
                        });

                        $scope.load();
                    });

                 /*   gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                        var id = rowEntity.__metadata.id;
                        var data = {};
                        data[colDef.name] = newValue;
                        console.log(data);
                        ProductsService.update(id, data).then(function(response){
                            $scope.load(); //The change may trigger other server side action that may change additional data
                            $scope.$apply();
                        });
                    });*/
                }
            };

            $scope.load = function () {
                gridService.readAll('form',paginationOptions.pageSize, paginationOptions.pageNumber, $scope.sort, $scope.filter).then(function (response) {
                	console.log(response.totalElements);
                    $scope.gridOptions.data = response.content;
                    $scope.gridOptions.totalItems = response.totalElements;
                });
            };

            $scope.load();
    		
    		
    		
    		
    		
    		
		    $scope.dtOptions = DTOptionsBuilder
    		   .newOptions()
    		      .withOption('ajax', {
	    		      url: "/form/paginated",
	    		      type: 'GET',
	    		      dataFilter: function(data){
	    		    	
	    		            var json = jQuery.parseJSON( data );
	    		            $scope.vdata=json.data;
	    		            json.recordsTotal = json.recordsTotal;
	    		            json.recordsFiltered = json.recordsFiltered;
	    		            json.data = json.data;
	    		            return JSON.stringify( json ); 
	    		        }
    		      })
    		      .withDataProp('data')
    		      .withOption('serverSide', true)
    		      .withOption('processing', false)
    		      /*.withOption('scrollY','200px')
                  .withOption('scrollCollapse',false)*/
    		      .withOption('paging',true)
		          .withOption('createdRow', function (row) {
			          // Recompiling so we can bind Angular directive to the DT
			          $compile(angular.element(row).contents())($scope);
			      })
			      .withOption('saveState', true)
    		      .withOption('order', [[0, 'asc']])    		    
	              .withDOM("<'dt-uikit-header'<'uk-grid'<'uk-width-medium-2-3'l><'uk-width-medium-1-3'f>>>" +
                    "<'uk-overflow-container'tr>" +
                    "<'dt-uikit-footer'<'uk-grid'<'uk-width-medium-3-10'i><'uk-width-medium-7-10'p>>>")
    		   	  .withPaginationType('full_numbers')
    		   	
	    		  .withButtons([
	    			   {
	                       extend:    'colvis',
	                       text:      '<i class="uk-icon-files-o"></i> Column visibility',
	                       titleAttr: 'Column visibility'
	                   },
	                   {
	                       extend:    'copyHtml5',
	                       text:      '<i class="uk-icon-files-o"></i> Copy',
	                       titleAttr: 'Copy'
	                   },
	                   {
	                       extend:    'print',
	                       text:      '<i class="uk-icon-print"></i> Print',
	                       titleAttr: 'Print'
	                   },
	                   {
	                       extend:    'excelHtml5',
	                       text:      '<i class="uk-icon-file-excel-o"></i> XLSX',
	                       titleAttr: ''
	                   },
	                   {
	                       extend:    'csvHtml5',
	                       text:      '<i class="uk-icon-file-text-o"></i> CSV',
	                       titleAttr: 'CSV'
	                   },
	                   {
	                       extend:    'pdfHtml5',
	                       text:      '<i class="uk-icon-file-pdf-o"></i> PDF',
	                       titleAttr: 'PDF'
	                   }
	               ]);
    		    $scope.dtColumns = [
    		    	/* DTColumnDefBuilder.newColumnDef('id').withTitle('Name'),
    	             DTColumnDefBuilder.newColumnDef(1).withTitle('Position'),
    	             DTColumnDefBuilder.newColumnDef(2).withTitle('Office'),
    	             DTColumnDefBuilder.newColumnDef(3).withTitle('Extn.'),
    	             DTColumnDefBuilder.newColumnDef(4).withTitle('Start date'),
    	             DTColumnDefBuilder.newColumnDef(5).withTitle('Salary')*/
    		    	 DTColumnBuilder.newColumn('id').withTitle('ID'),
    		         DTColumnBuilder.newColumn('data1').withTitle('levelname'),
    		         DTColumnBuilder.newColumn('data2').withTitle('levelname'),
    		         DTColumnBuilder.newColumn('data3').withTitle('levelname'),
    		         DTColumnBuilder.newColumn('data4').withTitle('levelname'),
    		    ];
             
         
    		
    		
    		
    		
    		
    		
    		
    		
    		
    		
	    		var aj=p_form;
	    	/*	var init={"text":"ROOT","value":"null"};	    	
				aj.push(init);*/
				
	        	$scope.domain="com.nbb.models.fn.LutForm.";
	        	
    			
    			
	    		var modalUpdate = UIkit.modal("#modal_update");
	    	      $scope.isupdate = 0;
	    	      $scope.org = function(){
	    	    	  $scope.formdata={};
	    	    	//  $scope.formdata.id=null;
	    	    	//  $scope.formdata.parentid=0;
	    	    	  modalUpdate.show();
	    	      }
	    	      
	    	      $scope.edit = function(id){
	    	    	  mainService.withdomain('get', '/core/api/LutForm/'+id).
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
	      
	     			var levels=[{"text":"Төлөвлөх","value":1},{"text":"Гүйцэтгэх","value":3},{"text":"Тайлагнах","value":4},{"text":"Нотлох зүйл, Шинжилгээний горим","value":2}];
	     			var autype=[{"text":"Төрийн","value":1},{"text":"ААН","value":2},{"text":"Дотоод","value":3}];
	     			
	     			 $scope.pmenuGrid = {
	 		                dataSource: {
	 		                   
	 		                    transport: {
	 		                    	read:  {
	 		                            url: "/core/list/LutForm",
	 		                            contentType:"application/json; charset=UTF-8",     
	 		                            data: {"sort":[{field: 'orderid', dir: 'desc'}]},
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
	 		                             	data1: { type: "string", validation: { required: true } },
	 		                             	data2: { type: "string" },
	 		                             	data3: { type: "string"},
	 		                                parentid: { type: "number", validation: { required: true }},
	 		                                data6: { type: "number", defaultValue:0 },
	 		                                data7: { type: "string" },
	 		                                data8: { type: "number", defaultValue:1 },
	 		                                data10: { type: "boolean" },
	 		                                data11: { type: "number", defaultValue:1 },
	 		                                data13: { type: "number", defaultValue:1 },
	 		                                data13: { type: "number" },
	 		                                orderid: { type: "number" },
	 		                             }
	 		                         }
	 		                     },
	 		                    pageSize: 5,
	 		                    serverFiltering: true,
	 		                    serverPaging: true,
	 		                    serverSorting: true,
	 		                    group: [{
	 		                        field: "data11"
	 		                    },{
	 		                        field: "data13"
	 		                    }],
	 		                },
	 		                //toolbar: ["create"],
	 		                toolbar: ["create","excel"],
	 		                excel: {
		 		                  filterable: true,
		 		                  allPages: true
		 		            },
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
	 		                	 	  { field: "data11", values:autype,title:"Төрөл"},
	 		                          { field:"data1", title: "Бүлэг" },
	 		                          { field: "data2", title:"Ажлын нэр" },
	 		                          { field: "data3", title:"Стандарт"},
	 		                          { field: "data7", title:"Sheet name"},
	 		                          { field: "data10", title:"Файл татуулах эсэх"},	 		                         
	 		                          { field: "data13", values:levels,title:"Үе шат"},
	 		                          { field: "parentid", values: aj, title:"Эцэг ажил"},
	 		                          { field: "orderid", title:"Дараалал"},
	 		                          { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }
                            ],
                            editable: "inline",
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
