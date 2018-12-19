angular
    .module('altairApp')
    	.controller("orglistCtrl", [
    	                           '$scope',
    	                           '$rootScope',
    	                           '$state',
    	                           '$timeout',
    	                           'user_data',
    	                           'mainService',
    	                           'sweet',
	        function ($scope,$rootScope,$state,$timeout,user_data,mainService,sweet) { 
    	                        	   
	    	  $scope.domain="com.nbb.models.fn.SubAuditOrganization.";
	    	  
	    	  $scope.org=function(){   		  
	    		  
	    			$state.go('restricted.pages.orgform',{param: 0});	    			    	    	
	    	  },	
	    	  $scope.edit=function(i){    		  
	    			$state.go('restricted.pages.orgform',{param: i});	    			    	    	
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
  		 				   			sweet.show('Анхаар!', 'Байгууллага амжилттай устлаа.', 'success');
  				    			});
  	 		            }else{
  	 		                sweet.show('Анхаар!', 'Устгах үйлдэл хийгдсэнгүй!!!', 'error');
  	 		            }    		
  			        });
      	      }
    	      $scope.pmenuGrid = {
		                dataSource: {
		                   
		                    transport: {
		                    	read:  {
		                            url: "/core/list/SubAuditOrganization",
		                            contentType:"application/json; charset=UTF-8",         
		                            sort:[{field: "id", dir: "asc"}],
		                            type:"POST"
		                        },
		                        update: {
		                            url: "/core/update/"+$scope.domain+"",
		                            contentType:"application/json; charset=UTF-8",                                    
		                            type:"POST"
		                        },
		                        destroy: {
		                            url: "/core/delete/"+$scope.domain+"",
		                            contentType:"application/json; charset=UTF-8",                                    
		                            type:"POST",
		                            complete: function(e) {
		                            	 $("#notificationDestroy").trigger('click');
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
		                        		 departmentid: { type: "number"},		                        		
		                        		 phone: { type: "string",validation: { required: true } },
		                        		 orgname: { type: "string", validation: { required: true} },	
		                        		 orgcode: { type: "string", validation: { required: true} }, 
		                        		 departmentid: { type: "number" },
		                        		 categoryid: { type: "number" },
		                        		 fincategoryid: { type: "number" },
		                        		 progid: { type: "number" },
		                        		 regid: { type: "number" },
		                        		 stateregid: { type: "string" },
		                        		 fsorg: { type: "string" },
		                        		 taxorg: { type: "string" },
		                        		 ndorg: { type: "string" },
		                        		 headorder: { type: "string" },		                        		
		                        		 banks: { type: "string" },
		                        		 statebanks: { type: "string" },
		                        		 web: { type: "string" },
		                        		 email: { type: "string" },
		                        		 address: { type: "string" },
		                        		 phone: { type: "string" },
		                        		 fax: { type: "string" },
		                        		 headfullname: { type: "string" },
		                        		 heademail: { type: "string" },
		                        		 headreg: { type: "string" },
		                        		 headphone: { type: "string" },
		                        		 headprof: { type: "string" },
		                        		 accfullname: { type: "string" },
		                        		 accphone: { type: "string" },
		                        		 accemail: { type: "string" },
		                        		 accwyear: { type: "string" },
		                        		 accprof: { type: "string" },
		                        		 budget1: { type: "string" },
		                        		 budget2: { type: "string" },
		                        		 budget3: { type: "string" },
		                        		 complation1: { type: "string" },
		                        		 complation2: { type: "string" },
		                        		 complation3: { type: "string" },
		                        		 headwnum: { type: "string" },
		                        		 comwnum: { type: "string" },
		                        		 serwnum: { type: "string" },
		                        		 otherwnum: { type: "string" },
		                        		 conwnum: { type: "string" },
		                        		 createdate: { type: "string" }
		                        		 		                        		 
		                             }
		                         }
		                     },
		                    pageSize: 8,
		                    serverPaging: true,
		                    serverFiltering: true,
		                    serverSorting: true
		                },
		                toolbar: kendo.template($("#addorg").html()),
		                filterable:{
		                	 mode: "row"
		                },
		                excel: {
	   		                fileName: "Organization Export.xlsx",
	   		                proxyURL: "//demos.telerik.com/kendo-ui/service/export",
	   		                filterable: true,
	   		                allPages: true
	   		            },	     	   		        
		                sortable: true,
		                columnMenu:true, 
		                resizable: true,		                
		                pageable: {
		                    refresh: true,
		                    pageSizes: true,
		                    buttonCount: 5
		                },
		                columns: [				
		                	{ title: "#",template: "<span class='row-number'></span>", locked: true, width:"70px"},
								{ field: "orgname", locked: true, title: "Нэр"+ "<span data-translate=''></span>" ,width: 450 },								
								{ field: "orgcode", title: "Байгууллагын код" +"<span data-translate=''></span>",width: 220, locked: true},							
								{ field: "lutDepartment.departmentname", title: "Аудит хийх байгууллага" +"<span data-translate=''></span>",  width: 250},
								{ field: "lutCategory.categoryname", title: "Ангилал" +"<span data-translate=''></span>",  width: 250},
								{ field: "lutFincategory.fincategoryname", title: "Санхүүжилтийн хэлбэр" +"<span data-translate=''></span>",  width: 250},
								{ field: "lutExpProgcategory.progname", title: "Төсвийн зарлагын хөтөлбөрийн ангилал" +"<span data-translate=''></span>",  width: 250},
								{ field: "phone", title: "Утас" +"<span data-translate=''></span>" ,width: 150},
								{ field: "regid", title: "Регистрийн дугаар" +"<span data-translate=''></span>",width: 220},
								{ field: "stateregid", title: "УБ-ийн дугаар "  +"<span data-translate=''></span>",width: 220},
								{ field: "fsorg", title: "Санхүүгийн тайлан тушаадаг газар " +"<span data-translate=''></span>",width: 220},
								{ field: "taxorg", title: "Харилцагч татварын байгууллага" +"<span data-translate=''></span>",width: 220},
								{ field: "ndorg", title: "Харилцагч НД-ын байгууллага " +"<span data-translate=''></span>",width: 220},
								{ field: "headorder", title: "Удирдлагын томилдог албан тушаал " +"<span data-translate=''></span>",width: 220},
								{ field: "banks", title: "Харилцагч арилжааны банк, дансны дугаар " +"<span data-translate=''></span>",width: 220},
								{ field: "statebanks", title: "Төрийн сан дахь харилцах банкны дугаар" +"<span data-translate=''></span>",width: 220},
								{ field: "web", title: "Цахим хуудас " +"<span data-translate=''></span>",width: 220},
								{ field: "eamil", title: "И-мэйл " +"<span data-translate=''></span>",width: 220},
								{ field: "address", title: "Албан ёсны хаяг " +"<span data-translate=''></span>",width: 220},
								{ field: "fax", title: "Факс " +"<span data-translate=''></span>",width: 220},
								{ field: "headsurname", title: "Удирдлагын овог" +"<span data-translate=''></span>",width: 220},
								{ field: "headfullname", title: "Удирдлагын нэр" +"<span data-translate=''></span>",width: 220},
								{ field: "headpos", title: "Удирдлагын албан тушаал " +"<span data-translate=''></span>",width: 220},
								{ field: "headphone", title: "Утас " +"<span data-translate=''></span>",width: 220},
								{ field: "heademail", title: "И-мэйл " +"<span data-translate=''></span>",width: 220},									
								{ field: "headwyear", title: "Ажилласан жил " +"<span data-translate=''></span>",width: 220},										
								{ field: "headproff", title: "Мэргэжил " +"<span data-translate=''></span>",width: 220},
								{ field: "accsurname", title: "Нягтлангийн овог" +"<span data-translate=''></span>",width: 220},
								{ field: "accfullname", title: "Нягтлангийн нэр " +"<span data-translate=''></span>",width: 220},
								{ field: "accpos", title: "Нягтлангийн албан тушаал " +"<span data-translate=''></span>",width: 220},
								{ field: "accphone", title: "Утас " +"<span data-translate=''></span>",width: 220},
								{ field: "accemail", title: "И-мэйл  " +"<span data-translate=''></span>",width: 220},
								{ field: "accwyear", title: "Ажилласан жил " +"<span data-translate=''></span>",width: 220},
								{ field: "accprof", title: "Мэргэжил " +"<span data-translate=''></span>",width: 220},
								{ field: "budget1", title: "Батлагдсан төсөв 2013 он" +"<span data-translate=''></span>",width: 220},
								{ field: "budget2", title: "Батлагдсан төсөв 2014 он" +"<span data-translate=''></span>",width: 220},
								{ field: "budget3", title: "Батлагдсан төсөв 2015 он" +"<span data-translate=''></span>",width: 220},
								{ field: "complation1", title: "Төсвийн гүйцэтгэл 2013 он" +"<span data-translate=''></span>",width: 220},
								{ field: "complation2", title: "Төсвийн гүйцэтгэл 2014 он" +"<span data-translate=''></span>",width: 220},
								{ field: "complation3", title: "Төсвийн гүйцэтгэл 2015 он" +"<span data-translate=''></span>",width: 220},
								{ field: "ar1", title: "Аудитын дүгнэлт 2013 он" +"<span data-translate=''></span>",width: 220},
								{ field: "ar2", title: "Аудитын дүгнэлт 2014 он" +"<span data-translate=''></span>",width: 220},
								{ field: "ar3", title: "Аудитын дүгнэлт 2015 он" +"<span data-translate=''></span>",width: 220},
								{ field: "headwnum", title: "Удирдах ажилтан " +"<span data-translate=''></span>",width: 220},
								{ field: "comwnum", title: "Гүйцэтгэх ажилтан " +"<span data-translate=''></span>",width: 220},
								{ field: "serwnum", title: "Үйлчлэх ажилтан " +"<span data-translate=''></span>",width: 220},
								{ field: "conwnum", title: "Гэрээт ажилтан " +"<span data-translate=''></span>",width: 220},
								{ field: "otherwnum", title: "Бусад ажилтан " +"<span data-translate=''></span>",width: 220},									
								{ field: "createdate", title: "Байгуулагдсан огноо " +"<span data-translate=''></span>",width: 220},
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
		            } 
	    	           
	         
        }]
    )
    
 