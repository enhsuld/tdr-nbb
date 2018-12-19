angular
    .module('altairApp')
    	.controller("menuCtrl",['$scope','p_menu','user_data','mainService','$state','sweet',
	        function ($scope,p_menu,user_data,mainService,$state,sweet) {       	
	    		var aj=p_menu;
	    		var init={"text":"ROOT","value":"null"};	    	
				aj.push(init);
				
	        	$scope.domain="com.nbb.models.LutMenu.";
	        	
    			var $formValidate = $('#form_val');
	    		
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
	 		                            data: {"sort":[{field: 'id', dir: 'asc'}]},
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
	 		                    pageSize: 8,
	 		                    serverFiltering: true,
	 		                    serverPaging: true,
	 		                    serverSorting: true
	 		                },
	 		                //toolbar: ["create"],
	 		                toolbar: kendo.template($("#addorg").html()),
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
	 		                          { field: "orderid", title:"Дараалал", width: "200px" },
	 		                          {template: kendo.template($("#extend").html()), width: "200px"}
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
