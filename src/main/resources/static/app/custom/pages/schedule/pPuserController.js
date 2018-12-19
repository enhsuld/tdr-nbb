angular
    .module('altairApp')
    	.controller("userComCtrl",['$scope','p_org','p_pos','p_role','user_data','mainService','$state','sweet',
	        function ($scope,p_org,p_pos,p_role,user_data,mainService,$state,sweet) {       	
    		  /*  var aj=p_uni;
	    		var init={"text":"ROOT","value":"0"};	    	
				aj.push(init);*/
			    		
    			$scope.domain="com.nbb.models.LutUser.";
    			
    			$scope.selectize_a_data=p_org;
    			$scope.selectize_b_data= p_pos;
    			$scope.selectize_audit_data= [{"title":"Дотоод","value":1},{"title":"Гадаад","value":0}];
			    var planets_data = $scope.selectize_role = p_role;
    			
    			$scope.ud = {
	                "id":0 
	            };
    			
    			$scope.res = function(){
    				$scope.ud = {
    		                "id":0 ,
    		                "autype":0 
    		            };
    			} 			
    				
				$scope.addUser = function() {
					 var mdl = UIkit.modal("#modal_update_user");
					 $scope.ud.org=user_data.depid;
					 $scope.ud.autype=user_data.autype;
  	    		     mainService.withdata('PUT','/core/useradd/'+$scope.ud.id, $scope.ud)
	  		   			.then(function(data){
	  		   				
	  		   				
	  		   				if(data.re==1){
	  		   					mdl.hide();
	  		   					$scope.ud = {
		  			                "id":0 
		  			            };
		  		   				$(".k-grid").data("kendoGrid").dataSource.read(); 
	  		   					sweet.show('Мэдээлэл', 'Амжилттай засагдлаа.', 'success');
	  		   				}  		   				
	  		   				if(data.re==0){
	  		   					mdl.hide();
	  		   					$scope.ud = {
		  			                "id":0 
		  			            };
		  		   				$(".k-grid").data("kendoGrid").dataSource.read(); 
	  		   					sweet.show('Мэдээлэл', 'Амжилттай хадгаллаа.', 'success');
	  		   				}
		  		   			if(data.re==5){
	  		   					sweet.show('Анхаар', 'Нэвтрэх нэр хавхцаж байна..', 'warning');
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
                	if (cars==null || cars==""){}
                	else{var array = vdata.roleid.split(",");}
                	
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
  		                            data:{"custom":"where  autype="+user_data.autype+" and givenname!=null and familyname!=null and departmentid="+user_data.depid+"", "departmentid":""+user_data.depid+""},
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
  		                	  {title: "#",template: "<span class='row-number'></span>", width:"60px"},	                         
	                          { field:"familyname", title: "Овог"},
	                          { field:"givenname", title: "Нэр" },     
	                          { field:"mobile", title: "Утас",width: 200},
	                          { field:"email", title: "E-mail"},   
	                          { field:"positionid", title: "Эрх", values:p_pos, width: 200 },
	                          { field:"username", title: "Нэвтрэх нэр" },	                          
	                          { field:"password", hidden:true,title: "Нууц үг" ,width: 150},  
	                          { field:"isactive", hidden:true,title: "Идэвхитэй эсэх" ,width: 150},  
	                          { template: kendo.template($("#update").html()),  width: "240px"}
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
