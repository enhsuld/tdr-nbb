angular
    .module('altairApp')
    	.controller("stausCtrl",['$scope','p_menu','user_data','mainService','$state','sweet',
	        function ($scope,p_menu,user_data,mainService,$state,sweet) {       	
    		var aj=p_menu;
    		var init={"text":"ROOT","value":"null"};	    	
			aj.push(init);
			
        	$scope.domain="com.nbb.models.fn.LutStaus.";
        	
        	var progressbar = $("#file_upload-progressbar"),
                bar         = progressbar.find('.uk-progress-bar'),
                settings    = {

                    action: '/api/excel/upload/zagwarExcel/0', // upload url

                    allow : '*.(xlsx)', // allow only images

                    loadstart: function() {
                        bar.css("width", "0%").text("0%");
                        progressbar.removeClass("uk-hidden");
                    },

                    progress: function(percent) {
                        percent = Math.ceil(percent);
                        bar.css("width", percent+"%").text(percent+"%");
                    },

                    allcomplete: function(response) {

                        bar.css("width", "100%").text("100%");

                        setTimeout(function(){
                            progressbar.addClass("uk-hidden");
                        }, 250);
                        $(".k-grid").data("kendoGrid").dataSource.read(); 
                      //  alert("Upload Completed")
                    }
                };
        	
        /*		$scope.update = function(item){
				  mainService.withdomain('get', '/api/excel/files/'+item.id).
					then(function(data){
						$scope.formdata=data[0];
						modalUpdate.show();
					});  
				}*/
				 
        		var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

                $scope.treelistOptions = {
                    dataSource: {
                        transport: {
                        	read:  {
	                            url: "/core/tree/list/LutForms",
	                            contentType:"application/json; charset=UTF-8",     
	                            data: {"sort":[{field: 'id', dir: 'desc'}]},
	                            type:"POST"
	                        },
                            update: {
                                url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                                dataType: "jsonp"
                            },
                            destroy: {
                                url: crudServiceBaseUrl + "/EmployeeDirectory/Destroy",
                                dataType: "jsonp"
                            },
                            create: {
                                url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
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
                                id: "id",
                                parentId: "parentid",
                                fields: {
                                    id: { type: "number", editable: false, nullable: false },
                                    parentid: { nullable: true, type: "number" },
                                    data1: { type: "string" },
                                    data2: { type: "string" },
                                    data3: { type: "string" },
                                    data4: { type: "string" },
                                    data5: { type: "string" },
                                    data6: { type: "string" },
                                    data7: { type: "string" },
                                    data8: { type: "string" },
                                },
                                
                            }
                        }
                    },
                    sortable: true,
                    editable: "popup",
                    columns: [
                        { field: "data1", title: "ЧБА-ын ишлэл", width: "100px" },
                        { field: "data2", title:"Чанарын баталгаажуулалтын асуулга" },
                        { field: "data3", title:"АОУС /АДБОУС (Холбогдох дүрэм, журам, гарын авлага)"},
                        { field: "data4", title:"Тийм", width: "150px"},
                        { field: "data5", title:"Үгүй", width: "150px"},
                        { field: "data6", title:"Ү/Х", width: "150px"},
                        { field: "data7", title:"Тайлбар", width: "150px"},
                        { field: "data8", title:"Ажлын баримтын ишлэл", template: kendo.template("<a class='md-btn md-btn-flat md-btn-flat-primary md-btn-wave' href='javascript:void(0)'>#:data8#</a>"), width: "150px"},
                        { command: ["edit"],width: "150px" }
                    ],
                };
        	
				$scope.download = function(id){
				  mainService.withdomain('get', '/api/excel/files/'+id).
					then(function(data){
						$scope.formdata=data[0];
						modalUpdate.show();
					});  
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

        	  	var select = UIkit.uploadSelect($("#file_upload-select"), settings),
                drop   = UIkit.uploadDrop($("#file_upload-drop"), settings);
        	
	    
     			 $scope.fileGrid = {
 		                dataSource: {
 		                   
 		                    transport: {
 		                    	read:  {
 		                            url: "/core/list/LutStaus",
 		                            contentType:"application/json; charset=UTF-8",     
 		                            data: {"sort":[{field: 'id', dir: 'desc'}]},
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
 		                          { field:"filename", title: "Нэр /Mn/" },
 		                          { field: "fileurl", title:"Эцэг цэс"},
 		                          { field: "createDate", title:"Дараалал", width: "200px" },
 		                          {template: kendo.template($("#extend").html()), width: "300px"}
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
