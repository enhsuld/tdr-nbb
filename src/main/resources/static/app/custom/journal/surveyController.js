angular
    .module('altairApp')
    	.controller("surveyCtrl", [
    	                           '$scope',
    	                           '$rootScope',
    	                           '$state',
    	                           '$timeout',
    	                           'sweet',
    	                           'mainService',
    	                           'user_data',
    	                           'survey_dir',
    	                           'totalAmount',
    	                           'totalError',
	        function ($scope,$rootScope,$state,$timeout,sweet,mainService,user_data,survey_dir,totalAmount,totalError) { 
    	              	            	   
	    	  $scope.domain="com.nbb.models.fn.FinJournal.";
	    	  var tf=[{"text":"ү","value":"false"},{"text":"т","value":"true"}];	   
	    	  
	    	  //var dataSource2 = $("#grid").data("kendoGrid").dataSource;
	    	  $scope.totalAmount=totalAmount;
	    	  $scope.totalError=totalError;
	    	  $scope.fl={};
	    	  $scope.total=0;
	    	  $scope.dir=survey_dir;
	    	  $scope.puserGrid = {        
                filterable: true,
                sortable: true,
                columnMenu:true, 
                resizable: true,
                height: $(window).height()*0.7,
                toolbar: kendo.template($("#template").html()),
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                columns: [						
						{ field: "data1", title: "Д/д", width:100},
						{ field: "data3", title: "<span style='vertical-align:middle'>Баримт № </span>", width:100},
						{ field: "data2", title: "Огноо", width:120},
						{ field: "data16", title: "Гүйлгээний утга",width:250},
						{ field: "data8", title: "Дебет", width:150},
						{ field: "data9", title: "Кредит", width:150},
						{ field: "data10", title: "Мөнгөн дүн",width:150, aggregates: ["sum"], footerTemplate: "<div>Нийт: #= sum #</div>"},
						{
	                        title: "Сорилийн дүн",
	                        columns: [{
	                            field: "a",
	                            title: "а",
	                            width: 70,
	                            values:tf,
	                            filterable:false,
	                            editor: a ,
	                            headerTemplate: '<span style="float: left; width: 100%; height:100%;" title="Дансны харилцаа үнэн зөв хийгдсэн эсэх.">а</span>'
	                        },{
	                            field: "b",
	                            title: "б",
	                            width: 70,
	                            values:tf,
	                            filterable:false,
	                            editor: b ,
	                            headerTemplate: '<span style="float: left; width: 100%; height:100%;" title="Кассын баримтууд урьдчилан дугаарлагдсан эсэх.">б</span>'
	                            
	                        },{	                            
	                            field: "c",
	                            title: "в",
	                            width: 70,
	                            values:tf,
	                            filterable:false,
	                            editor: c ,
	                            headerTemplate: '<span style="float: left; width: 100%; height:100%;" title="Журнал, ерөнхий дансанд үнэн зөв туссан эсэх.">в</span>'
	                        },{
	                            field: "d",
	                            title: "г",
                        	    width: 70,
                        	    values:tf,
                        	    filterable:false,
                        	    editor: d ,
                        	    headerTemplate: '<span style="float: left; width: 100%; height:100%;" title="Анхан шатны баримтыг бүрдүүлсэн эсэх.">г</span>'
	                        },{
	                            field: "e",
	                            title: "д",
                                width: 70,
                                values:tf,
                                filterable:false,
                                editor: e ,
                                headerTemplate: '<span style="float: left; width: 100%; height:100%;" title="Төрийн сангийн төлбөр тооцооны журам, бусад хууль тогтоомжид нийцсэн эсэх.">д</span>'
	                        }]
                      },
                      { field: "amount", aggregates: ["sum"], footerTemplate: "<div>Нийт: #= sum #</div>", template:"# if (amount != 0) { # <span class='md-bg-red-10'>#:amount#</span> # } else { # <span class='lala md-bg-red-100'></span> # } #", title: "Алдааны дүн", width:150},
                      { field: "description", editor:zipCodesEditor, title: "<span style='vertical-align:middle'>Тайлбар</span>", width: 200},
                  ],
                  dataBound: function(){
                	    var grid = this;
                	    $scope.total=this.dataSource.total();	       
            	  },
                  editable: true,
              }
	    	  
	    	  $scope.kdata={
				 autoSync: true,
                 transport: {
                 	read:  {
                 		url: "/fin/list/FinJournal",
                         contentType:"application/json; charset=UTF-8",       
                         data: {"sort":[{field: 'id', dir: 'asc'}]},
                         type:"POST",
                         complete: function(e){
                        	
                         }
                     },
                     update: {
                         url: "/core/update/"+$scope.domain+"",
                         contentType:"application/json; charset=UTF-8",                                    
                         type:"POST",
                         complete: function(e) {
                         	 $(".k-grid").data("kendoGrid").dataSource.read(); 
                         	 mainService.withdomain('get','/fin/survey/totalError/0')
	         		   			.then(function(data){
	         		   				$scope.totalError=data;
         		   			});	
                         }
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
                     		 data1: { editable: false,nullable: true},
                     		 data3: { editable: false,nullable: true},
                     		 data2: { editable: false,nullable: true},
                     		 data16: { editable: false,nullable: true},
                     		 data8: { editable: false,nullable: true},
                     		 data9: { editable: false,nullable: true},
                     		 data10: { type:"number", editable: false,nullable: true},
                     		 a: { type: "boolean"},
                     		 b: { type: "boolean" },     
                     		 c: { type: "boolean"},
                     		 d: { type: "boolean"},
                     		 e: { type: "boolean"},
                     		 amount: { type: "number"},
                     		 description: { type: "string"},
                          }
                      }
                  },
                 pageSize: 1000,
                /* batch: true,*/
                 serverPaging: true,
                 serverFiltering: true,
                 serverSorting: true,
                 aggregate: [ { field: "data10", aggregate: "sum" },
                     { field: "amount", aggregate: "sum" },
                     { field: "data10", aggregate: "min" },
                     { field: "data10", aggregate: "max" }]
	    	  }
	    	  
	    	  $scope.lavlagaa="B-3.1T";
	    	  $scope.org="Ус Цаг Уур Орчны Шинжилгээний Алба";
	    	  $scope.year="2016 он";
	    	  
	    	   $scope.forms_advanced = {
	                   "input_error": "Something wrong",
	                   "input_ok": "All ok",
	                   "ionslider_1": 23,
	                   "ionslider_2": {
	                       "from": 160,
	                       "to": 592
	                   },
	                   "ionslider_3": 40,
	                   "ionslider_4": {
	                       "from": 20,
	                       "to": 80
	                   },
	                   selectize_planets: ["2", "3"]
	               };
	    	  
	    	  
				$scope.searchChange= function(){
					 if($scope.fl.searchType==1){
				 	   $scope.typeOne=true;
				 	   $scope.typeTwo=false;
				 	   $scope.typeThree=false;
				 	   $scope.typeFour=false;
				 	   $scope.typeFive=false;
				    }
				    if($scope.fl.searchType==2){
				 	   $scope.typeOne=false;
				 	   $scope.typeTwo=true;
				 	   $scope.typeThree=false;
				 	   $scope.typeFour=false;
				 	   $scope.typeFive=false;
				    }
				    if($scope.fl.searchType==3){
				 	   $scope.typeOne=false;
				 	   $scope.typeTwo=false;
				 	   $scope.typeThree=true;
				 	   $scope.typeFour=false;
				 	   $scope.typeFive=false;
				    }
				    if($scope.fl.searchType==4){
				 	   $scope.typeOne=false;
				 	   $scope.typeTwo=false;
				 	   $scope.typeThree=false;
				 	   $scope.typeFour=true;
				 	   $scope.typeFive=false;
				    }
				    if($scope.fl.searchType==5){
				 	   $scope.typeOne=false;
				 	   $scope.typeTwo=false;
				 	   $scope.typeThree=false;
				 	   $scope.typeFour=false;
				 	   $scope.typeFive=true;
				    }
				}
	    	  
				$scope.fl={
					"t1":0,
					"t2":0,
					"t3":0,
					"t4":0,
					"t5":0
				}
	    	 	    	
				
				$scope.t2Change =function(){
					if($scope.fl.account==undefined){
						mainService.withdomain('get','/fin/survey/searchType2/0/'+$scope.fl.t2)
	  		   			.then(function(data){
	  		   				$scope.totalError=data;		    			  
	  		   		  });	
					}
					else{
						
						var psize=Math.round($scope.total*$scope.fl.t2/100);
						$scope.kdata.transport.read.data={
	  	    				"custom":"where (data8 like '"+$scope.fl.account+"%') or (data9 like '"+$scope.fl.account+"%')", "rand":true, "customPsize": psize,"sort":[{"field":"id","dir":"asc"}]	 
	  	    		  	}
						
						$("#kGrid").data("kendoGrid").dataSource.read(); 
						
						mainService.withdomain('get','/fin/survey/searchType2/'+$scope.fl.account+'/'+$scope.fl.t2)
	  		   			.then(function(data){
	  		   				$scope.totalAccAmount=data;	
	  		   				$scope.errorPercentage=$scope.totalError*100/$scope.totalAccAmount;
	  		   				$scope.totalAccError=$scope.totalAmount*$scope.errorPercentage;
	  		   				
		  		   			/*mainService.withdomain('get','/fin/survey/accAmount/'+$scope.fl.account+'/'+$scope.fl.amount)
			  		   			.then(function(dt){
			  		   				$scope.totalAccAmount=dt;	  		   				
			  		   				$scope.errorPercentage=$scope.totalError*100/$scope.totalAccAmount;
			  		   				
			  		   				$scope.totalAccError=$scope.totalAmount*$scope.errorPercentage;
			  		   		});	*/
		    			  
	  		   		  });	
					}					 
				}
				$scope.t3Change =function(){
					console.log($scope.fl.t3);
					if($scope.fl.account==undefined){
						alert("dansaa songono uu");
					/*	mainService.withdomain('get','/fin/survey/searchType3/0/'+$scope.fl.t3)
	  		   			.then(function(data){
	  		   				$scope.totalError=data;
		  		   			mainService.withdomain('get','/fin/survey/searchType2/0/'+$scope.fl.t2)
			  		   			.then(function(dt){
			  		   				$scope.totalAccAmount=dt;	  		   				
			  		   				$scope.errorPercentage=$scope.totalError*100/$scope.totalAccAmount;
			  		   				
			  		   				$scope.totalAccError=$scope.totalAmount*$scope.errorPercentage;
			  		   		});	
		    			  
	  		   		  });	*/
					}
					else{
						if($scope.fl.t3<2){
							mainService.withdomain('get','/fin/survey/searchType3/'+$scope.fl.account+'/'+$scope.fl.t3)
		  		   			.then(function(data){
		  		   				
		  		   				$scope.totalAccAmount=data;	
		  		   				$scope.errorPercentage=$scope.totalError*100/$scope.totalAccAmount;
		  		   				$scope.totalAccError=$scope.totalAmount*$scope.errorPercentage;
		  		   				
			  		   			/*mainService.withdomain('get','/fin/survey/accAmount/'+$scope.fl.account+'/'+$scope.fl.amount)
				  		   			.then(function(dt){
				  		   				$scope.totalAccAmount=dt;	  		   				
				  		   				$scope.errorPercentage=$scope.totalError*100/$scope.totalAccAmount;
				  		   				
				  		   				$scope.totalAccError=$scope.totalAmount*$scope.errorPercentage;
				  		   		});	*/
			    			  
		  		   		    });	
						}						
					}	
				}
				$scope.t4Change =function(){
					if($scope.fl.account==undefined){
						mainService.withdomain('get','/fin/survey/searchType4/0/'+$scope.fl.t4)
	  		   			.then(function(data){
	  		   				$scope.totalError=data;
	  		   		  });
					}
					else{
						if($scope.fl.t4>1){
							mainService.withdomain('get','/fin/survey/searchType4/'+$scope.fl.account+'/'+$scope.fl.t4)
		  		   			.then(function(data){
		  		   				$scope.total=$scope.fl.t4;
		  		   				$scope.totalAccAmount=data.sum[0];	
		  		   				$scope.totalError=data.sumError[0];
		  		   				$scope.errorPercentage=$scope.totalError*100/$scope.totalAccAmount;
		  		   				$scope.totalAccError=$scope.totalAmount*$scope.errorPercentage;
		  		   		    });	
						}						
					}	
				}
	    	    $scope.t5Change =function(){
	    	    	if($scope.fl.account==undefined){
						mainService.withdomain('get','/fin/survey/searchType4/0/'+$scope.fl.t5)
	  		   			.then(function(data){
	  		   				$scope.totalError=data;
	  		   		  });
					}
					else{
						if($scope.fl.t5>1){
							mainService.withdomain('get','/fin/survey/searchType5/'+$scope.fl.account+'/'+$scope.fl.t5)
		  		   			.then(function(data){
		  		   				$scope.total=$scope.fl.t5;
		  		   				$scope.totalAccAmount=data.sum[0];	
		  		   				$scope.totalError=data.sumError[0];
		  		   				$scope.errorPercentage=$scope.totalError*100/$scope.totalAccAmount;
		  		   				$scope.totalAccError=$scope.totalAmount*$scope.errorPercentage;
		  		   		    });	
						}						
					}	
	    	    }
	    	    
	    	    $scope.amountChange = function(){
	    		  if($scope.fl.amount==undefined){
	    			  $scope.kdata.transport.read.data={
  	    				  "custom":"where (data8 like '"+$scope.fl.account+"%') or (data9 like '"+$scope.fl.account+"%')",  "sort":[{"field":"id","dir":"asc"}]	 
  	    		  	 }
	    		  }
	    		  else{
	    			  if($scope.fl.account!=undefined){
	    				  mainService.withdomain('get','/fin/survey/totalAccError/'+$scope.fl.account+'/'+$scope.fl.amount)
		  		   			.then(function(data){
		  		   				console.log(data);
		  		   				$scope.totalError=data;
			  		   			mainService.withdomain('get','/fin/survey/accAmount/'+$scope.fl.account+'/'+$scope.fl.amount)
				  		   			.then(function(dt){
				  		   				$scope.totalAccAmount=dt;	  		   				
				  		   				$scope.errorPercentage=$scope.totalError*100/$scope.totalAccAmount;
				  		   				
				  		   				$scope.totalAccError=$scope.totalAmount*$scope.errorPercentage;
				  		   		});	
			    			  
		  		   		  });
	    			  }
	    			  if($scope.fl.amount>10000){
	    				 
		    			  if($scope.fl.account==undefined){
		    				  $scope.kdata.transport.read.data={
	       	    				  "custom":"where t.data10>"+$scope.fl.amount+"",  "sort":[{"field":"id","dir":"asc"}]	 
	       	    		  	  }
		    			  }
		    			  else{
		    				  $scope.kdata.transport.read.data={
	       	    				  "custom":"where (t.data10>"+$scope.fl.amount+" and data8 like '"+$scope.fl.account+"%') or (t.data10>"+$scope.fl.amount+" and data9 like '"+$scope.fl.account+"%')",  "sort":[{"field":"id","dir":"asc"}]	 
	       	    		  	  }
		    			  }
		    			
	                	  $("#kGrid").data("kendoGrid").dataSource.read(); 
		    		  }
	    		  }
	    	  }
	    	  	    	  
	    	  $scope.toolbarClick = function() {
	    		  $("#kGrid").data("kendoGrid").dataSource.read(); 
	    	  }
	    	  
	    	/*  function onDataBound(e) {  
	              e.preventDefault();  
	              $scope.total=this.dataSource.total();	             
	          } 
	    	  */
	    	  
	    	  
	    	  
	    	  $scope.searchSource = {
	                  options: [
	                      {
	                          id: 1,
	                          title: "Мөнгөн дүн",
	                          value: 1,
	                          parent_id: 1
	                      },
	                      {
	                          id: 2,
	                          title: "Нийт гүйлгээний ",
	                          value: 2,
	                          parent_id: 2
	                      },
	                      {
	                          id: 3,
	                          title: "Материаллаг байдлын",
	                          value: 3,
	                          parent_id: 2
	                      },
	                      {
	                          id: 4,
	                          title: "Санамсаргүй ",
	                          value: 4,
	                          parent_id: 3
	                      },
	                      {
	                          id: 5,
	                          title: "Хамгийн өндөр дүнтэй ",
	                          value: 5,
	                          parent_id: 3
	                      }
	                  ]
	              };
		    	  
	    	      $scope.selectize_seachType_config = {
		             
		                create: false,
		                maxItems: 1,
		                placeholder: 'Аргаа сонгоно уу...',
		                optgroups: [
		                    {value: 1, label: 'Мөнгөн дүнгээр'},
		                    {value: 2, label: 'Хувиар'},
		                    {value: 3, label: 'Тоогоор'},
		                    {value: 4, label: 'Огноогоор'},
		                    {value: 5, label: 'Бусад'},
		                ],
		                optgroupField: 'parent_id',
		                valueField: 'value',
		                labelField: 'title',
		                searchField: 'title',
		                onInitialize: function(selectize){
		                    selectize.on('change', function() {	                    	
		                      
		                    });
		                }
		            };
		    	  
		    	  
	    	      $scope.selectize_acc_config = {
		                plugins: {
		                    'tooltip': ''
		                },
		                create: false,
		                maxItems: 1,
		                valueField: 'value',
		                labelField: 'text',
		                searchField: 'text',
		                placeholder: 'Данс сонгоно уу...',
		                onInitialize: function(selectize){
		                    selectize.on('change', function() {
		                    	var value = $scope.fl.account;
		                          
		                        mainService.withdomain('get','/fin/survey/accTotalAmount/'+parseInt(value)+'/0')
		      		   			.then(function(data){
		      		   				if($("#amm").val()!=null){
		      		   					$scope.totalAccAmount=data;
		      		   					mainService.withdomain('get','/fin/survey/totalAccError/'+parseInt(value)+'/0')
		      	    		   			.then(function(data){
		      	    		   				$scope.totalError=data;
		      	    		   				$scope.errorPercentage=$scope.totalError*100/$scope.totalAccAmount;
		      	    		   				$scope.totalAccError=$scope.totalAmount*$scope.errorPercentage;
		      	    		   			});	
		      		   				}    		   				
		      		   				$scope.totalAmount=data;
		      		   			});	
		                         
	                            if (value) {
	                            	if($scope.fl.amount==undefined){
	                            		$scope.kdata.transport.read.data={
	                	    				  "custom":"where (data8 like '"+parseInt(value)+"%') or (data9 like '"+parseInt(value)+"%')",  "sort":[{"field":"id","dir":"asc"}]	 
	                	    		  	 }
	                          	}
	                          	else{
	                          		 $scope.kdata.transport.read.data={
	                	    				  "custom":"where (t.data10>"+$scope.fl.amount+" and data8 like '"+parseInt(value)+"%') or (t.data10>"+$scope.fl.amount+" and data9 like '"+parseInt(value)+"%')",  "sort":[{"field":"id","dir":"asc"}]	 
	                	    		  	 }
	                          	}                        	
	                          	$("#kGrid").data("kendoGrid").dataSource.read(); 
	                            } else {
	                            	$("#kGrid").data("kendoGrid").dataSource.filter({});
	                            }
		                    });
		                    selectize.on('focus', function() {
		                        console.log('on "focus" event fired');
		                    });
		                }
		          };
	    	      
		    	  $scope.dir=survey_dir;
		    	  
		    	    var dropDown = $("#acc").kendoDropDownList({
	                    dataTextField: "text",
	                    dataValueField: "value",
	                    autoBind: false,
	                    optionLabel: "Данс сонгоно уу...",
	                    dataSource: survey_dir,
	                    change: function() {
	                        var value = this.value();                       
	                        mainService.withdomain('get','/fin/survey/accTotalAmount/'+parseInt(value)+'/0')
	    		   			.then(function(data){
	    		   				if($("#amm").val()!=null){
	    		   					$scope.totalAccAmount=data;
	    		   					mainService.withdomain('get','/fin/survey/totalAccError/'+parseInt(value)+'/0')
	    	    		   			.then(function(data){
	    	    		   				$scope.totalError=data;
	    	    		   				$scope.errorPercentage=$scope.totalError*100/$scope.totalAccAmount;
	    	    		   				$scope.totalAccError=$scope.totalAmount*$scope.errorPercentage;
	    	    		   			});	
	    		   				}    		   				
	    		   				$scope.totalAmount=data;
	    		   			});	
	                       
	                        
	                       
	                        
	                        if (value) {
	                        	 if($scope.fl.amount==undefined){
	                        		 $scope.kdata.transport.read.data={
	              	    				  "custom":"where (data8 like '"+parseInt(value)+"%') or (data9 like '"+parseInt(value)+"%')",  "sort":[{"field":"id","dir":"asc"}]	 
	              	    		  	 }
	                        	 }
	                        	 else{
	                        		 $scope.kdata.transport.read.data={
	              	    				  "custom":"where (t.data10>"+$scope.fl.amount+" and data8 like '"+parseInt(value)+"%') or (t.data10>"+$scope.fl.amount+" and data9 like '"+parseInt(value)+"%')",  "sort":[{"field":"id","dir":"asc"}]	 
	              	    		  	 }
	                        	 }                        	
	                        	 $("#kGrid").data("kendoGrid").dataSource.read(); 
	                        	//$("#kGrid").data("kendoGrid").dataSource.filter({"logic":"or","filters":[{"field":"data8","operator":"startswith",value: parseInt(value)},{"field":"data9",value: parseInt(value),"operator":"startswith"}]});
	                        } else {
	                        	$("#kGrid").data("kendoGrid").dataSource.filter({});
	                        }
	                    }
	                });
		    	    
	    	  var zipCodesEditor = function (container, options) {
	    		    $('<textarea data-bind="value: ' + options.field + '"></textarea>').appendTo(container);
	    		};
	    		
	    	  function a(container, options) {
                  $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:a">').appendTo(container);
                  $('<label class="k-checkbox-label">&#8203;</label>').appendTo(container);
              }
	    	  function b(container, options) {
                  $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:b">').appendTo(container);
                  $('<label class="k-checkbox-label">&#8203;</label>').appendTo(container);
              }
	    	  function c(container, options) {
                  $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:c">').appendTo(container);
                  $('<label class="k-checkbox-label">&#8203;</label>').appendTo(container);
              }
	    	  function d(container, options) {
                  $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:d">').appendTo(container);
                  $('<label class="k-checkbox-label">&#8203;</label>').appendTo(container);
              }
	    	  function e(container, options) {
                  $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:e">').appendTo(container);
                  $('<label class="k-checkbox-label">&#8203;</label>').appendTo(container);
              }
	    	  
	    	  $scope.categoryDropDownEditor = function(container, options) {
			      var editor = $('<textarea cols="30" rows="4" class="k-textbox md-bg-red-100" style="float:left;height:100%;" data-bind="value: ' + options.field + '"></textarea>')
			      .appendTo(container);
		     }
       }
    	                         
]);
