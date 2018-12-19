angular
    .module('altairApp')
    	.controller("fileCtrl",['$scope','$timeout','Upload','mainService','$state','sweet',
	        function ($scope,$timeout,Upload,mainService,$state,sweet) {       	
	 				
	        	$scope.domain="com.nbb.models.FileUpload.";
	        	
	        	var progressbar = $("#file_upload-progressbar"),
	                bar         = progressbar.find('.uk-progress-bar'),
	                settings    = {

	                    action: '/api/file/upload/zagwarExcel', // upload url

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
	        	
					$scope.download = function(id){
					  mainService.withdomain('get', '/api/files/'+id).
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
	        	
	        	  	var sel_aan = $scope.selectize_val_options = [
	 	                { value: 1, text: 'ТШЗ' },
	 	                { value: 2, text: 'ААН' },
	 	                { value: 3, text: 'Бусад' },
	 	            ];
	        	  	 
	        	  	var selectize_payroll_options= $scope.selectize_payroll_options= [{"text":"Төрийн","value":1},{"text":"Хувийн","value":2}];
	        	  	var autype= [{"text":"Гадаад","value":1},{"text":"Дотоод","value":2}];

	        	  	$scope.paryDis=false;

	        	  	$scope.selectize_payroll_config = {
		 	                maxItems: 1,
		 	                valueField: 'value',
		 	                labelField: 'text',
		 	                create: false,
		 	                placeholder: 'Аудитын төрөл сонгох...',
		 	                onChange: function() {
			 	               	$scope.selectize_val_options = [
			 	 	                { value: 1, text: 'ТШЗ' },
			 	 	                { value: 2, text: 'ААН' },
			 	 	                { value: 3, text: 'Бусад' }
			 	 	            ];
		 	                	
			                	if($scope.payroll==1){       	  			
			        	  			for(var i = $scope.selectize_val_options.length - 1; i >= 0; i--){
			        	  			    if($scope.selectize_val_options[i].value == 3){
			        	  			        $scope.selectize_val_options.splice(i,1);
			        	  			    }
			        	  			}
			        	  			
			        	  		}
			        	  		else{			        	
			        	  			for(var i = $scope.selectize_val_options.length - 1; i >= 0; i--){
			        	  			    if($scope.selectize_val_options[i].value == 1){
			        	  			        $scope.selectize_val_options.splice(i,1);
			        	  			    }
			        	  			}
			        	  		}
			                }
		 	            };
	        	  	
	 	            $scope.selectize_val_config = {
	 	                maxItems: 1,
	 	                valueField: 'value',
	 	                labelField: 'text',
	 	                create: false,
	 	                placeholder: 'ААН төрөл сонгох...',
	 	                onChange: function() {
	 	                    $timeout(function() {
	 	                        $formValidate.parsley().validate();
	 	                    })
	 	                }
	 	            };
    	    
	        	    var $formValidate = $('#form_validation');

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
		            var modal = UIkit.modal("#modal_a_4");
	        	  	$scope.addnew = function(){
	        	  		$scope.sendBtn=true;	        	  		
	        	  		modal.show();
	        	  	}
	        	  	
	        	  	
	        	    $scope.submitUpload = function() {
	 			       $scope.sendBtn=false;
	 			       if ($scope.formUpload.uploadfile.$valid && $scope.uploadfile && $scope.formUpload.uploadfileAdmin.$valid && $scope.uploadfileAdmin) {
	 			    	   bar.css("width", "0%").text("0%");
	                        progressbar.removeClass("uk-hidden");
	                        if($scope.aan==1){
	                        	 $scope.upload($scope.uploadfile,$scope.uploadfileAdmin, $scope.aan, $scope.payroll);
	                        }
	                        else{
	                        	 $scope.upload($scope.uploadfile,$scope.uploadfileAdmin, $scope.aan, $scope.payroll);
	                        }
	 			       }
	 		        };
	 		        
	 		       // upload on file select or drop
	 		       $scope.upload = function (file,fileAdmin,i,y) {
	 		    	   var xurl="";
	 		    	   console.log(i);
	 		    	   if(i!=0){
	 		    		   xurl ='/api/file/upload/zagwarExcel/'+$scope.aan+'/'+y;
	 		    	   }
	 		    	   
	 		          Upload.upload({
	 		              url: xurl,
	 		              data: {file: file,fileAdmin: fileAdmin, 'username': $scope.username}
	 		          }).then(function (resp) {
	 		        	  progressbar.removeClass("uk-hidden");
	 		              console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
	 		              $(".k-grid").data("kendoGrid").dataSource.read(); 
	 		              if(resp.data.excel){
	 	                      UIkit.notify("Амжилттай хадгаллаа.", {status:'success'});
	 	                      modal.hide();
	 		              }
	 		              else if(resp.data==false){
	 		            	  UIkit.notify("Excel загвар тохирохгүй байна.", {status:'error'});
	 		              }
	 		              modal.hide();
	 		          }, function (resp) {
	 		              console.log('Error status: ' + resp.status);
	 		          }, function (evt) {
	 		              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	 		             
	 		              percent = progressPercentage;
	                       bar.css("width", percent+"%").text(percent+"%");                    
	 		              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	 		          });
	 		       };
	        	  	
	        	  	
	     			$scope.fileGrid = {
 		                dataSource: {
 		                   
 		                    transport: {
 		                    	read:  {
 		                            url: "/core/list/FileUpload",
 		                            contentType:"application/json; charset=UTF-8",     
 		                            data: {"custom":"where autype=1","sort":[{field: 'id', dir: 'desc'}]},
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
 		                //toolbar: ["create"],
 		                toolbar: kendo.template($("#add").html()),		
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
 		                	 	  { field: "autype", title:"Аудитын төрөл", values:autype},
 		                	 	  { field: "payroll", title:"Аудитын төрөл", values:selectize_payroll_options},
 		                	 	  { field: "aan", values:sel_aan, title:"ААН төрөл "},
 		                          { field:"filename",template:"<a  class='uk-text-primary uk-margin-remove' href='/api/file/name/1/#:filename#.' target='_self' download='#:filename#'>#:filename#</a>", title: "Үйлчлүүлэгчийн загвар" },
 		                          { field: "filesize", title:"Хэмжээ", template:"<span>#:filesize# KB</span>"}, 		                         
 		                          { field:"filenameAdmin", title: "Админий загвар",template:"<a  class='uk-text-primary uk-margin-remove' href='/api/file/name/2/#:filenameAdmin#.' target='_self' download='#:filenameAdmin#'>#:filenameAdmin#</a>" },
		                          { field: "filesizeAdmin", title:"Хэмжээ", template:"<span>#:filesizeAdmin# KB</span>"},
 		                          {template: kendo.template($("#extend").html()), width: "110px"}
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
