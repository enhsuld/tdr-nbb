angular
    .module('altairApp')
    	.controller("userCtrl",['$scope','p_role','user_data','mainService','$state','sweet',
	        function ($scope,p_role,user_data,mainService,$state,sweet) {       	
    		  /*  var aj=p_uni;
	    		var init={"text":"ROOT","value":"0"};	    	
				aj.push(init);*/
			
    		
    			$scope.domain="com.netgloo.models.LutUser.";
    			
    			
    			$scope.selectize_a_data=[];
    			$scope.selectize_b_data= [];
			    var planets_data = $scope.selectize_role = p_role;
    			
    			$scope.ud = {
	                "id":0,
	                "org": "",	    		           
	                "pos": "",
	                "fname": "",
	                "gname": "",	    		           
	                "phone": "",
	                "mail": "",
	                "uname": "",	    		           
	                "pass": "",
	                "roles": "",
	                "isac": "",
	                "isst": "",
	                roles: ["925","933"],	  
	            };
    			
    			$scope.res=function(){
    				$scope.ud = {
    		                "id":0,
    		                "org": "",	    		           
    		                "pos": "",
    		                "fname": "",
    		                "gname": "",	    		           
    		                "phone": "",
    		                "mail": "",
    		                "uname": "",	    		           
    		                "pass": "",
    		                "roles": "",
    		                "isac": "",
    		                "isst": ""
    		            };			
    				
    			}   			
    				
				$scope.addUser = function() {
					 var mdl = UIkit.modal("#modal_update_user");
  	    		     mainService.withdata('PUT','/core/useradd/'+$scope.ud.id, $scope.ud)
	  		   			.then(function(data){
	  		   				mdl.hide();
	  		   				
	  		   				$(".k-grid").data("kendoGrid").dataSource.read(); 
	  		   				if(data.re==1){
	  		   					sweet.show('Мэдээлэл', 'Амжилттай засагдлаа.', 'success');
	  		   				}  		   				
	  		   				if(data.re==0){
	  		   					sweet.show('Мэдээлэл', 'Амжилттай хадгаллаа.', 'success');
	  		   				}		   				
	  		   			});	 
                         
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
                
                $scope.update=function(vdata){
                	
                	var cars = vdata.roleid;
                	if (cars==null || cars==""){}
                	else{var array = vdata.roleid.split(",");}
                	
                	
                	console.log(array);
					$scope.ud = {						  
    		                "id": vdata.id,
    		                "org": vdata.departmentid,	    		           
    		                "pos": vdata.positionid,
    		                "fname": vdata.familyname,
    		                "gname": vdata.givenname,	    		           
    		                "phone": vdata.mobile,
    		                "mail": vdata.email,
    		                "uname": vdata.username,	    
    		                "pass": vdata.password,
    		                "isac": vdata.isactive,
    		                "isst": vdata.isstate,
    		                roles: array,
    		            };
					
					//$scope.ud.roles= vdata.roleid;
					console.log($scope.ud.roles);
	            	/*
	               	    		    
	    			mainService.getDetail('/core/action/read/'+$scope.domain+'/'+vdata.id)
	    			then(function(data){	    			
	    				$scope.data = data;
	    		        angular.forEach($scope.data, function(value, key){
	    		          
	    		        });    				
	    			});	*/   		
	    			    	    	
	    		}
    			
                
             
       	     $scope.puserGrid = {
		                dataSource: {
		                   
		                    transport: {
		                    	read:  {
		                            url: "/core/list/LutUser",
		                            contentType:"application/json; charset=UTF-8",   
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
		                             	positionid: { type: "number"},
		                             	roleid: { type: "string"},
		                             	givenname: { type: "string"},
		                             	familyname: { type: "string"},
		                             	mobile: { type: "string"},	                                          	
		                            	username: { type: "string", validation: { required: true} },
		                            	password: { type: "string", validation: { required: true} },	                            
		                            	isactive: { type: "boolean" },
		                            	isst: { type: "boolean" }
		                             }	                    
		                         }
		                    
		                     },
		                    pageSize: 8,
		                    serverPaging: true,
		                    serverSorting: true,
		                    serverFiltering: true
		                },
		                toolbar: [{template: $("#add").html()},"excel","pdf"],
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
		                          { field:"familyname", title: "Овог",width: 150},
		                          { field:"givenname", title: "Нэр",width: 150 },     
		                          { field:"mobile", title: "Утас",width: 150},
		                          { field:"email", title: "E-mail",width: 150},
		                          { field:"roleid", title: "Эрх" ,width: 150},	     
		                          { field:"username", title: "Нэвтрэх нэр" ,width: 150},	                          
		                          { field:"password", title: "Нууц үг" ,width: 150},  
		                          { field:"isactive", title: "Идэвхитэй эсэх" ,width: 150},  
		                          { template: kendo.template($("#update").html()),  width: "240px"}
		                          ],
		                      editable: "popup"
		            }   
            //console.log(data);
	        }
    ]);
