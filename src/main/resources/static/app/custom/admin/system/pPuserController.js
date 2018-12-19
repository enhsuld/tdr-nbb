angular
    .module('altairApp')
    	.controller("userCtrl",['$scope','p_plan','p_role','user_data','mainService','$state','sweet','Upload',
	        function ($scope,p_plan,p_role,user_data,mainService,$state,sweet,Upload) {      
    		
    			$scope.sendBtn=true;
    			$scope.submitUploadNotlohZuil = function() {
			       $scope.sendBtn=false;
			       if ($scope.formUpload.uploadfile.$valid && $scope.uploadfile) {
			    	 //   bar.css("width", "0%").text("0%");
                 //     progressbar.removeClass("uk-hidden");
                      $scope.uploadNotlohZuil($scope.uploadfile);
			       }
		        };
		        var modalNotloh = UIkit.modal("#modal_excel", {modal: false, keyboard: false, bgclose: false, center: false});    
		        $scope.uploadNotlohZuil = function (file) {
		    	   var  xurl ='/api/file/user/import';
		    	 
		          Upload.upload({
		              url: xurl,
		              data: {file: file, 'description': $scope.description}
		          }).then(function (resp) {
		        	 
		              console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
		           
		              UIkit.notify("Амжилттай хадгаллаа.", {status:'success'});
		              modalNotloh.hide();
		              $(".k-grid").data("kendoGrid").dataSource.read(); 
		          }, function (resp) {
		              console.log('Error status: ' + resp.status);
		          }, function (evt) {                  
		        	  
		          });
		       };
    		
    			$scope.domain="com.nbb.models.LutUser.";
    			
    			$scope.selectize_a_data=[];
    			$scope.selectize_b_data= p_plan;
    			$scope.selectize_audit_data= [{"title":"Дотоод","value":1},{"title":"Гадаад","value":0}];
			    var planets_data = $scope.selectize_role = p_role;
    			
    			$scope.ud = {
	                "id":0 ,"plan":0
	            };
    			
    			$scope.res = function(){
    				$scope.ud = {
    		                "id":0 ,
    		                "autype":0 
    		            };
    			} 			
    				
				$scope.addUser = function() {
					 var mdl = UIkit.modal("#modal_update_user");
					 if($scope.ud.planid!=0){
						 mainService.withdata('PUT','/core/useradd/'+$scope.ud.id, $scope.ud)
		  		   			.then(function(data){
	  		   				
	  		   				if(data.re==5){
	  		   					sweet.show('Анхаар', 'Хэрэглэгч давхцаж байна.', 'warning');
	  		   				}
	  		   				else if(data.re==1){
	  		   					sweet.show('Мэдээлэл', 'Амжилттай засагдлаа.', 'success');
	  		   					mdl.hide();
	  		   				}
		  		   			else if(data.re==0){
	  		   					sweet.show('Мэдээлэл', 'Амжилттай засагдлаа.', 'success');
	  		   					mdl.hide();
	  		   				}
	  		   				$scope.ud = {
	  			                "id":0 
	  			            };
	  		   				$(".k-grid").data("kendoGrid").dataSource.read();		   				
	  		   			});	
					 }
					 else{
						 sweet.show('Анхаар', 'Багцаа сонгоно уу.', 'warning');
					 } 
                         
               }
				
    			$scope.selectize_a_config = {
    	                plugins: {
    	                    'disable_options': {
    	                        disableOptions: ["c1","c2"]
    	                    }
    	                },
    	                create: false,
    	                maxItems: 1,
    	                placeholder: 'Сонгох...',
    	                optgroupField: 'parent_id',
    	                optgroupLabelField: 'title',
    	                optgroupValueField: 'ogid',
    	                valueField: 'value',
    	                labelField: 'text',
    	                searchField: 'title',	                	
    	            };
    			
    			 $scope.selectize_planets_config = {
	                plugins: {
	                    'remove_button': {
	                        label     : ''
	                    }
	                },
	                maxItems: null,
	                valueField: 'id',
	                labelField: 'title',
	                searchField: 'title',
	                create: false,
	                render: {
	                    option: function(planets_data, escape) {
	                        return  '<div class="option">' +
	                            '<span class="title">' + escape(planets_data.title) + '</span>' +
	                            '</div>';
	                    },
	                    item: function(planets_data, escape) {
	                        return '<div class="item"><a href="' + escape(planets_data.url) + '" target="_blank">' + escape(planets_data.title) + '</a></div>';
	                    }
	                }
	            };
    			 
				$scope.audit_config = {
	                plugins: {
	                    'disable_options': {
	                        disableOptions: ["c1","c2"]
	                    }
	                },
	                create: false,
	                maxItems: 1,
	                placeholder: 'Аудитын төрөл',
	                optgroupField: 'parent_id',
	                optgroupLabelField: 'title',
	                optgroupValueField: 'ogid',
	                valueField: 'value',
	                labelField: 'title',
	                searchField: 'title',	                	
	            };
                
                $scope.update=function(vdata){
                	
                	var cars = vdata.roleid;
                	
                	console.log(vdata);
                	
                	if (cars==null || cars==""){}
                	else{var array = vdata.roleid.split(",");}
                	
					$scope.ud = {						  
    		                "id": vdata.id,
    		                "org": vdata.departmentid,	    		           
    		                "planid": vdata.planid,
    		                "fname": vdata.familyname,
    		                "gname": vdata.givenname,	    		           
    		                "phone": vdata.mobile,
    		                "mail": vdata.email,
    		                "uname": vdata.username,	    
    		                "pass": vdata.password,
    		                "isac": vdata.isactive,
    		                "isst": vdata.isstate,
    		                "autype": vdata.autype,
    		                roles: array,
    		            };
					  		
	    			    	    	
	    		}
                $scope.puserGrid = {
  		                dataSource: {
  		                   
  		                    transport: {
  		                    	read:  {
  		                            url: "/core/list/LutUser",
  		                            contentType:"application/json; charset=UTF-8",    
  		                            /*data:{"custom":"where autype=2"},*/
  		                            type:"POST"
  		                        },
  		                        update: {
  		                            url: "/core/update/"+$scope.domain+"",
  		                            contentType:"application/json; charset=UTF-8",   
	  		                          complete: function(e) {
	  		                        	UIkit.notify("Амжилттай хадгаллаа.", {status:'success'});
	  	                            	$(".k-grid").data("kendoGrid").dataSource.read(); 
	  	                    		},
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
  		                             fields: {   
  		                             	id: { type: "number", editable: false,nullable: false},
  		                             	departmentid: { type: "number",  validation: { required: true } },	                             	
  		                             	email: { type: "string"},
  		                             	planid: { type: "number"},
  		                          	    balance: { type: "number",editable: false,},
  		                             	roleid: { type: "string"},
  		                             	givenname: { type: "string"},
  		                             	familyname: { type: "string"},
  		                             	autype: { type: "number", defaultValue:2},
  		                             	mobile: { type: "string"},	                                          	
  		                            	username: { type: "string", validation: { required: true} },
  		                            	password: { type: "string", validation: { required: true} },	     
  		                            	isst: { type: "boolean" }
  		                             }	                    
  		                         }
  		                    
  		                     },
  		                    pageSize: 8,
  		                    serverPaging: true,
  		                    serverSorting: true,
  		                    serverFiltering: true
  		                },
  		                toolbar: [{template: $("#add").html()}],
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
  		                resizable: true,
  		                columnMenu:true, 
  		                pageable: {
  		                    refresh: true,
  		                    pageSizes: true,
  		                    buttonCount: 5
  		                },
  		                columns: [
  		                	  {title: "#",template: "<span class='row-number'></span>", width:"60px"},
	                         
	                          { field:"username", title: "Нэвтрэх нэр" ,width: 150},	         
	                          { field:"mobile", title: "Утас",width: 150},
	                          { field:"email", title: "E-mail",width: 150},     
	                          { field:"planid", title: "Багц", values:p_plan, width: 150 },	  
	                          { field:"balance", title: "Үлдэгдэл",  width: 150 },	  
	                          { field:"password", hidden:true,title: "Нууц үг" ,width: 150},  
	                          { field:"isactive", title: "Идэвхитэй эсэх" ,width: 150},  
	                          { template: kendo.template($("#update").html()),  width: "150px"}
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
  		                      editable: "popup"
  		            }
	        }
    ]);
