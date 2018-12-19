angular
    .module('altairApp')
    	.controller("surveyAccCtrl", [
    	                           '$scope',
    	                           '$rootScope',
    	                           '$stateParams',
    	                           '$state',
    	                           '$timeout',
    	                           'sweet',
    	                           'mainService',
    	                           'user_data',
    	                           'survey_dir',
    	                           'app_data',
    	                           'acc_data',
	        function ($scope,$rootScope,$stateParams,$state,$timeout,sweet,mainService,user_data,survey_dir,app_data,acc_data) { 
       	   
	    	  $scope.domain="com.nbb.models.bs.FinJournal.";
	    	  var tf=[{"text":"ү","value":"false"},{"text":"т","value":"true"}];	   
	    	
	    	  $scope.fl={
	    			  debCre:0
	    	  };
	    	  $scope.total=0;
	    	  $scope.appdata=app_data;
	    	  $scope.mainobj=app_data;
	    	  $scope.from = $stateParams.planid;
	    	  
	    	  $rootScope.toBarActive = true;

	          $scope.$on('$destroy', function() {
	              $rootScope.toBarActive = false;
	          });
	    	  
	    	  if(acc_data.data7=='В-3-1Т'){
	    		  if($scope.appdata.orgtype==1){
	    			  survey_dir=[{"text":"МӨНГӨН ХӨРӨНГӨ","value":31}];
	    			  $scope.fl.account=31;
	    		  }
	    		  else{
	    			  survey_dir=[{"text":"МӨНГӨН ХӨРӨНГӨ","value":11}];	    			
	    			  $scope.fl.account=11;
	    		  }
	    		  $scope.fl.dans="МӨНГӨН ХӨРӨНГӨ";
	    		  $scope.fl.lavlagaa='В-3-1Т';
	    	  }
	    	  if(acc_data.data7=='В-3-2Т'){
	    		  if($scope.appdata.orgtype==1){
	    			  survey_dir=[{"text":"АВЛАГА","value":33}];
	    			  $scope.fl.account=33;
	    		  }
	    		  else{
	    			  survey_dir=[{"text":"АВЛАГА","value":12}];
	    			  $scope.fl.account=12;
	    		  }	    		  
	    		  $scope.fl.dans="АВЛАГА";
	    		  $scope.fl.lavlagaa='В-3-2Т';
	    	  }
	    	  if(acc_data.data7=='В-3-3Т'){
	    		  if($scope.appdata.orgtype==1){
	    			  survey_dir=[{"text":"БАРАА МАТЕРИАЛ","value":35}];
	    			  $scope.fl.account=35;
	    		  }
	    		  else{
	    			  survey_dir=[{"text":"БАРАА МАТЕРИАЛ","value":14}];
	    			  $scope.fl.account=14;
	    		  }	    		 
	    		  $scope.fl.dans="БАРАА МАТЕРИАЛ";
	    		  $scope.fl.lavlagaa='В-3-3Т';
	    	  }
	    	  if(acc_data.data7=='В-3-4Т'){
	    		  if($scope.appdata.orgtype==1){
	    			  survey_dir=[{"text":"ҮНДСЭН ХӨРӨНГӨ","value":39}];
	    			  $scope.fl.account=39;
	    		  }
	    		  else{
	    			  survey_dir=[{"text":"ҮНДСЭН ХӨРӨНГӨ","value":20}];
	    			  $scope.fl.account=20;
	    			  $scope.fl.dans="ҮНДСЭН ХӨРӨНГӨ";
	    		  }		
	    		  $scope.fl.dans="ҮНДСЭН ХӨРӨНГӨ";
	    		  $scope.fl.lavlagaa='В-3-4Т';
	    	  }
	    	  if(acc_data.data7=='В-3-5Т'){
	    		  
	    		  if($scope.appdata.orgtype==1){
	    			  survey_dir=[{"text":"НИЙТ ӨР ТӨЛБӨР","value":4}];
	    			  $scope.fl.account=4;
	    		  }
	    		  else{
	    			  survey_dir=[{"text":"НИЙТ ӨР ТӨЛБӨР","value":31}];
	    			  $scope.fl.account=35;
	    		  }
	    		  $scope.fl.dans="НИЙТ ӨР ТӨЛБӨР";
	    		  $scope.fl.lavlagaa='В-3-5Т';
	    	  }
	    	  if(acc_data.data7=='В-3-6Т'){
	    		  
	    		  if($scope.appdata.orgtype==1){
	    			  survey_dir=[{"text":"Эздийн өмч","value":40}];
	    			  $scope.fl.account=4;
	    		  }
	    		  else{
	    			  survey_dir=[{"text":"Эздийн өмч","value":51}];
	    			  $scope.fl.account=51;
	    		  }
	    		  $scope.fl.dans="Эздийн өмч";
	    		  $scope.fl.lavlagaa='В-3-6Т';
	    	  }
	    	  
	    	  
	    	  if(acc_data.data7=='В-3-7Т'){
	    		  if($scope.appdata.orgtype==1){
	    			  survey_dir=[{"text":"ОРЛОГО","value":1}];
	    			  $scope.fl.account=1;
	    		  }
	    		  else{
	    			  survey_dir=[{"text":"ОРЛОГО","value":51}];
	    			  $scope.fl.account=51;
	    		  }	    		 
	    		  $scope.fl.dans="ОРЛОГО";
	    		  $scope.fl.lavlagaa='В-3-7Т';
	    	  }
	    	
	    	  if(acc_data.data7=='В-3-8Т'){
	    		  if($scope.appdata.orgtype==1){
	    			  survey_dir=[{"text":"ЗАРДАЛ","value":2}];
	    			  $scope.fl.account=2;
	    		  }
	    		  else{
	    			  survey_dir=[{"text":"ЗАРДАЛ","value":70}];
	    			  $scope.fl.account=70;
	    		  }	    		
	    		  $scope.fl.dans="ЗАРДАЛ";
	    		  $scope.fl.lavlagaa='В-3-8Т';
	    	  }
	    	  
	    	  if(acc_data.data7=='General'){
	    		  if($scope.appdata.orgtype==1){
	    			  survey_dir=[{"text":"Бүгд","value":800}];
	    			  $scope.fl.account=800;
	    		  }
	    		  else{
	    			  survey_dir=[{"text":"Бүгд","value":800}];
	    			  $scope.fl.account=800;
	    		  }	    		
	    		  $scope.fl.dans="Бүгд";
	    		  $scope.fl.lavlagaa='Ерөнхий түүвэр';
	    	  }
	    	  
	    	  $scope.dir=survey_dir;
	    	  $scope.fl.org= $scope.appdata.orgname;
	    	  $scope.fl.year=$scope.appdata.audityear;
	    	  $scope.fl.planid=$stateParams.planid;
	    	  $scope.fl.formid=$stateParams.formid;
	    	  
	    	  $scope.status=0;
	    	  $scope.excelExport=function(){
	    		  $rootScope.content_preloader_show();
	    		  mainService.withdata('post','/fin/survey/export/'+$scope.fl.planid+'/'+$stateParams.levelid, $scope.fl).then(function(response){
	    			  if(response!=false){
		           			 var link = document.createElement('a');
 	 					 link.href = '/api/excel/export/nbb/'+$scope.fl.planid+'/'+$stateParams.formid;
 	 					 link.download = "Filename";
 	 					 link.click();	
 	 					 $rootScope.content_preloader_hide();
		           		 }
		           		 else{
		           			 sweet.show('Анхаар!', 'Excel тайлан оруулаагүй байна !!!', 'error');
		           			 $rootScope.content_preloader_hide();
		           		 }
		          });	    		 
	    	  }
	    	  
	    	  $scope.excelSearch=function(){
	    		  $scope.status=1;	
	    		  console.log($scope.fl.debCre);
	    		  if($scope.fl.searchType==1){
	    			  if($scope.fl.t1>0){
	    				 /* $scope.kdata.transport.read.data={
       	    				  "custom":"where planid="+$stateParams.planid+" and  t.data10>"+$scope.fl.t1+" and ((data8 like '"+$scope.fl.account+"%') or (data9 like '"+$scope.fl.account+"%'))",  "sort":[{"field":"id","dir":"asc"}]	 
       	    		  	  }		    			
	                	  $("#kGrid").data("kendoGrid").dataSource.read(); */
	    				  
	    				  mainService.withdomain('get','/fin/survey/searchType1/'+$scope.fl.account+'/'+$scope.fl.t1+'/'+$stateParams.planid+'/'+$stateParams.levelid+'/'+$scope.fl.debCre)
				   			.then(function(data){
				   				$scope.fl.totalAccAmount=data.sum;	
				   				$scope.fl.totalError=data.sumError;
				   				$scope.fl.errorPercentage=$scope.fl.totalError*100/$scope.fl.totalAccAmount;
				   				$scope.fl.totalAccError=$scope.fl.totalAmount*$scope.fl.errorPercentage/100;
				   				
				   				$scope.fl.ids=data.ids;
				   				$scope.kdata.transport.read.data={
				    				"custom":"where id in("+data.ids+")"
		  		   				}
		  		   				$("#kGrid").data("kendoGrid").dataSource.read(); 
				   		  });
		    		  }
	    			  if($scope.fl.t1==null){
	    				  $scope.kdata.transport.read.data={
			    				"custom":"where stepid="+$stateParams.levelid+" and planid="+$stateParams.planid+" and  (data8 like '"+$scope.fl.account+"%') or (data9 like '"+$scope.fl.account+"%')"
	  		   				}
	    				  $("#kGrid").data("kendoGrid").dataSource.read(); 
	    			  }
	    		  }
	    		  if($scope.fl.searchType==2){
	    			  var psize=Math.round($scope.total*$scope.fl.t2/100);
		    		  
					/*  $scope.kdata.transport.read.data={
		    				"custom":"where  (planid="+$stateParams.planid+" and  data8 like '"+$scope.fl.account+"%') or (planid="+$stateParams.planid+" and  data9 like '"+$scope.fl.account+"%')", "rand":true, "customPsize": psize,"sort":[{"field":"id","dir":"asc"}]	 
		    		  }
						
					  $("#kGrid").data("kendoGrid").dataSource.read(); */
					  $scope.fl.psize=psize;
						
					  mainService.withdomain('get','/fin/survey/searchType4/'+$scope.fl.account+'/'+psize+'/'+$stateParams.planid+'/'+$stateParams.levelid+'/'+$scope.fl.debCre)
			   			.then(function(data){
			   				
			   				$scope.countPsize=data.count;
			   				
			   				$scope.total=data.count;
	  		   				$scope.fl.totalAccAmount=data.sum;	
	  		   				$scope.fl.totalError=data.sumError;
	  		   				$scope.fl.errorPercentage=$scope.fl.totalError*100/$scope.fl.totalAccAmount;
	  		   				$scope.fl.totalAccError=$scope.fl.totalAmount*$scope.fl.errorPercentage/100;
		    			  
	  		   				$scope.fl.ids=data.ids;
	  		   				$scope.kdata.transport.read.data={
			    				"custom":"where id in("+data.ids+")"
	  		   				}
	  		   				$("#kGrid").data("kendoGrid").dataSource.read(); 
		    			  
			   		  });
	    		  }
	    		  if($scope.fl.searchType==3){
	    				if($scope.fl.t3<2){
							mainService.withdomain('get','/fin/survey/searchType3/'+$scope.fl.account+'/'+$scope.fl.t3+'/'+$stateParams.planid+'/'+$stateParams.levelid+'/'+$scope.fl.debCre)
		  		   			.then(function(data){
		  		   				
		  		   				$scope.fl.totalAccAmount=data;	
		  		   				$scope.fl.errorPercentage=$scope.fl.totalError*100/$scope.fl.totalAccAmount;
		  		   				$scope.fl.totalAccError=$scope.fl.totalAmount*$scope.fl.errorPercentage/100;
				    			if($scope.fl.account==800){
				    				$scope.kdata.transport.read.data={
					    				"custom":"where stepid="+$stateParams.levelid+" and data10>"+$scope.fl.t3*$scope.fl.totalAmount/100+" and  planid="+$stateParams.planid+""
			  		   				}
				    			}else{
				    				$scope.kdata.transport.read.data={
					    				"custom":"where stepid="+$stateParams.levelid+" and (data10>"+$scope.fl.t3*$scope.fl.totalAmount/100+" and  planid="+$stateParams.planid+" and  data8 like '"+$scope.fl.account+"%') or (data10>"+$scope.fl.t3*$scope.fl.totalAmount/100+" and  planid="+$stateParams.planid+" and  data9 like '"+$scope.fl.account+"%')"
			  		   				}
				    			}
		  		   				
		  		   				
		  		   				$("#kGrid").data("kendoGrid").dataSource.read(); 
		  		   				
		  		   			/*mainService.withdomain('get','/fin/survey/totalAccError/'+parseInt(value)+'/0/'+$stateParams.planid+'/'+$stateParams.levelid)
  	    		   			.then(function(data){
  	    		   				$scope.fl.totalError=data;
  	    		   				$scope.fl.errorPercentage=$scope.fl.totalError*100/$scope.fl.totalAccAmount;
  	    		   				$scope.fl.totalAccError=$scope.fl.totalAmount*$scope.fl.errorPercentage;
  	    		   			});	
		  		   				
		  		   				mainService.withdomain('get','/fin/survey/totalAccError/'+$scope.fl.account+'/'+$scope.fl.t3*$scope.fl.totalAmount/100+'/'+$stateParams.planid)
				  		   			.then(function(dt){
				  		   				$scope.fl.totalError=dt;	  		   				
				  		   				$scope.fl.errorPercentage=$scope.fl.totalError*100/$scope.fl.totalAccAmount;
				  		   				$scope.fl.totalAccError=$scope.fl.totalAmount*$scope.fl.errorPercentage;
				  		   		});	*/
		  		   			
		  		   		    });	
						}
	    		  }
	    		  if($scope.fl.searchType==4){	    			  
	    				if($scope.fl.t4>1){
	    					
							mainService.withdomain('get','/fin/survey/searchType4/'+$scope.fl.account+'/'+$scope.fl.t4+'/'+$stateParams.planid+'/'+$stateParams.levelid+'/'+$scope.fl.debCre)
		  		   			.then(function(data){
		  		   				
			  		   			$scope.total=$scope.fl.t4;
		  		   				$scope.fl.totalAccAmount=data.sum;	
		  		   				$scope.fl.totalError=data.sumError;
		  		   				$scope.fl.errorPercentage=$scope.fl.totalError*100/$scope.fl.totalAccAmount;
		  		   				$scope.fl.totalAccError=$scope.fl.totalAmount*$scope.fl.errorPercentage/100;
		  		   				$scope.fl.ids=data.ids;
		  		   				$scope.kdata.transport.read.data={
				    				"custom":"where id in("+data.ids+")"
		  		   				}
		  		   				$("#kGrid").data("kendoGrid").dataSource.read(); 
		  		   				
		  		   			
		  		   		    });	
						}
	    		  }
	    		  if($scope.fl.searchType==5){	    
	    				if($scope.fl.t5>1){
							mainService.withdomain('get','/fin/survey/searchType5/'+$scope.fl.account+'/'+$scope.fl.t5+'/'+$stateParams.planid+'/'+$stateParams.levelid+'/'+$scope.fl.debCre)
		  		   			.then(function(data){
		  		   				
			  		   			$scope.total=$scope.fl.t5;
			  		   			$scope.fl.psize=$scope.fl.t5;
		  		   				$scope.fl.totalAccAmount=data.sum;	
		  		   				$scope.fl.totalError=data.sumError;
		  		   				$scope.fl.errorPercentage=$scope.fl.totalError*100/$scope.fl.totalAccAmount;
		  		   				$scope.fl.totalAccError=$scope.fl.totalAmount*$scope.fl.errorPercentage/100;
		  		   				$scope.fl.ids=data.ids;
		  		   				$scope.kdata.transport.read.data={
				    				"custom":"where id in("+data.ids+")", "sort":[{"field":"data10","dir":"desc"}]
		  		   				}
		  		   				$("#kGrid").data("kendoGrid").dataSource.read(); 
		  		   				
		  		   			
		  		   		    });	
						}
	    		  }
	    		  
	    		
	    		  
	    		  if($scope.fl.searchType!=5){
	    			   mainService.withdomain('get','/fin/survey/accTotalAmount/'+$scope.fl.account+'/0/'+$stateParams.planid+'/'+$stateParams.levelid+'/'+$scope.fl.debCre)
		   			   .then(function(data){
		   				if($("#amm").val()!=null){
		   					$scope.fl.totalAccAmount=data;
		   					mainService.withdomain('get','/fin/survey/totalAccError/'+parseInt($scope.fl.account)+'/0/'+$stateParams.planid+'/'+$stateParams.levelid+'/0')
	    		   			.then(function(data){
	    		   				$scope.fl.totalError=data;
	    		   				$scope.fl.errorPercentage=$scope.fl.totalError*100/$scope.fl.totalAccAmount;
	    		   				$scope.fl.totalAccError=$scope.fl.totalAmount*$scope.fl.errorPercentage/100;
	    		   			});	
		   				}    		   				
		   				$scope.fl.totalAmount=data;
		   			});
	    		  }
	    	  }
	    	  
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
				 	   $scope.fl.searchText="Мөнгөн дүн";
				    }
				    if($scope.fl.searchType==2){
				 	   $scope.typeOne=false;
				 	   $scope.typeTwo=true;
				 	   $scope.typeThree=false;
				 	   $scope.typeFour=false;
				 	   $scope.typeFive=false;
				 	   $scope.fl.searchText="Нийт гүйлгээний";
				    }
				    if($scope.fl.searchType==3){
				 	   $scope.typeOne=false;
				 	   $scope.typeTwo=false;
				 	   $scope.typeThree=true;
				 	   $scope.typeFour=false;
				 	   $scope.typeFive=false;
				 	   $scope.fl.searchText="Материаллаг байдлын";
				    }
				    if($scope.fl.searchType==4){
				 	   $scope.typeOne=false;
				 	   $scope.typeTwo=false;
				 	   $scope.typeThree=false;
				 	   $scope.typeFour=true;
				 	   $scope.typeFive=false;
				 	   $scope.fl.searchText="Санамсаргүй";
				    }
				    if($scope.fl.searchType==5){
				 	   $scope.typeOne=false;
				 	   $scope.typeTwo=false;
				 	   $scope.typeThree=false;
				 	   $scope.typeFour=false;
				 	   $scope.typeFive=true;
				 	   $scope.fl.searchText="Хамгийн өндөр дүнтэй";
				    }
				    
				    if($scope.fl.account==800){
				    	$scope.kdata.transport.read.data={
	  	    				"custom":"where (stepid="+$stateParams.levelid+" and planid="+$stateParams.planid+") "	 
	  	    		  	}
				    }
				    else{
				    	$scope.kdata.transport.read.data={
	  	    				"custom":"where (stepid="+$stateParams.levelid+" and planid="+$stateParams.planid+" and  data8 like '"+$scope.fl.account+"%') or (stepid="+$stateParams.levelid+" and  planid="+$stateParams.planid+" and  data9 like '"+$scope.fl.account+"%')"	 
	  	    		  	}
				    }
					
				    $("#kGrid").data("kendoGrid").dataSource.read(); 
				}
	    	  
			
	    	  	    	  
	    	  $scope.toolbarClick = function() {
	    		  $("#kGrid").data("kendoGrid").dataSource.read(); 
	    	  }
	    	  	    	  
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
		                disable:true,
		                maxItems: 1,
		                valueField: 'value',
		                labelField: 'text',
		                searchField: 'text',
		                placeholder: 'Данс сонгоно уу...',
		                onInitialize: function(selectize){
		                    selectize.on('change', function() {
		                    	var value = $scope.fl.account;
		                        if(value!=undefined && value!=null && value.length>0){
	                        	   mainService.withdomain('get','/fin/survey/accTotalAmount/'+value+'/0/'+$stateParams.planid+'/'+$stateParams.levelid+'/'+$scope.fl.debCre)
			      		   			.then(function(data){
			      		   				if($("#amm").val()!=null){
			      		   					$scope.fl.totalAccAmount=data;
			      		   					mainService.withdomain('get','/fin/survey/totalAccError/'+parseInt(value)+'/0/'+$stateParams.planid+'/'+$stateParams.levelid+'/0')
			      	    		   			.then(function(data){
			      	    		   				$scope.fl.totalError=data;
			      	    		   				$scope.fl.errorPercentage=$scope.fl.totalError*100/$scope.fl.totalAccAmount;
			      	    		   				$scope.fl.totalAccError=$scope.fl.totalAmount*$scope.fl.errorPercentage;
			      	    		   			});	
			      		   				}    		   				
			      		   				$scope.fl.totalAmount=data;
			      		   			});	
		                        }
		                     
		                         
	                            if (value) {
	                            	if($scope.fl.amount==undefined){
	                            		if(value==800){
	                            			$scope.kdata.transport.read.data={
    	                	    				"custom":"where  stepid="+$stateParams.levelid+" and  planid="+$stateParams.planid+" ",  "sort":[{"field":"id","dir":"asc"}]	 
    	                	    		  	}
	                            		}
	                            		else{
	                            			$scope.kdata.transport.read.data={
    	                	    				"custom":"where  (stepid="+$stateParams.levelid+" and  planid="+$stateParams.planid+" and  data8 like '"+parseInt(value)+"%') or (stepid="+$stateParams.levelid+" and  planid="+$stateParams.planid+" and  data9 like '"+parseInt(value)+"%')",  "sort":[{"field":"id","dir":"asc"}]	 
    	                	    		  	}
	                            		}
	                            		
	                          	}
	                          	else{
	                          		 $scope.kdata.transport.read.data={
	                	    				  "custom":"where (stepid="+$stateParams.levelid+" and  planid="+$stateParams.planid+" and  t.data10>"+$scope.fl.amount+" and data8 like '"+parseInt(value)+"%') or (stepid="+$stateParams.levelid+" and  planid="+$stateParams.planid+" and  t.data10>"+$scope.fl.amount+" and data9 like '"+parseInt(value)+"%')",  "sort":[{"field":"id","dir":"asc"}]	 
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
	                        
	                        if (value) {
	                        	 if($scope.fl.amount==undefined){
	                        		 $scope.kdata.transport.read.data={
	              	    				  "custom":"where (stepid="+$stateParams.levelid+" and  planid="+$stateParams.planid+" and  data8 like '"+parseInt(value)+"%') or (stepid="+$stateParams.levelid+" and  planid="+$stateParams.planid+" and  data9 like '"+parseInt(value)+"%')",  "sort":[{"field":"id","dir":"asc"}]	 
	              	    		  	 }
	                        	 }
	                        	 else{
	                        		 $scope.kdata.transport.read.data={
	              	    				  "custom":"where (stepid="+$stateParams.levelid+" and  planid="+$stateParams.planid+" and t.data10>"+$scope.fl.amount+" and data8 like '"+parseInt(value)+"%') or (stepid="+$stateParams.levelid+" and  planid="+$stateParams.planid+" and t.data10>"+$scope.fl.amount+" and data9 like '"+parseInt(value)+"%')",  "sort":[{"field":"id","dir":"asc"}]	 
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
	    	  // height: $(window).height()*0.7,
	    	  $scope.puserGrid = {        
                  filterable: true,
                  sortable: true,
                  columnMenu:true, 
                  resizable: true,
                  pageable: {
	                    refresh: true,
	                    pageSizes: true,
	                    buttonCount: 5,
	                    pageSizes: [ 10,25,50,100,500,'All' ],
	                },
                  height:700,
                  toolbar: kendo.template($("#template").html()),
                 
                  columns: [			
                  		{title: "Д/д",template: "<span class='row-number'></span>", width:60},
  						/*{ field: "data3", title: "<span style='vertical-align:middle'>Баримт № </span>", width:100},*/
  						{ field: "data2", title: "Огноо", width:120},
  						{ field: "data16", title: "Гүйлгээний утга",width:200},
  						{ field: "data8", title: "Дебет", width:100},
  						{ field: "data9", title: "Кредит", width:120},
  						{ field: "data10", title: "Мөнгөн дүн",width:150, template: "<span class='cellRight'>#= kendo.toString(data10, 'n') # ₮</span>", aggregates: ["sum"], footerTemplate: "<div>Хуудасны дүн: #= kendo.toString(sum, 'n') # ₮</div>"},
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
                        { field: "amount", aggregates: ["sum"], footerTemplate: "<div>Алдааны дүн: #= kendo.toString(sum, 'n') # ₮</div>", template:"# if (amount != 0) { # <span class='md-bg-red-10'>#:kendo.toString(amount, 'n')# ₮</span> # } else { # <span class='lala md-bg-red-100'></span> # } #", title: "Алдааны дүн", width:150},
                        { field: "description", editor:zipCodesEditor, title: "<span style='vertical-align:middle'>Тайлбар</span>", width: 350},
                    ],
                    dataBound: function(){
                  	    var grid = this;
                  	    $scope.total=this.dataSource.total();	
                  	    $scope.fl.psize=this.dataSource.total();
                  	   /* if($scope.fl.searchType!=2 && $scope.fl.searchType!=5){
                  	    	 $scope.fl.psize=this.dataSource.total();
                  	    }*/
                  	   
	                  	if($scope.fl.searchType==2){
	                  		$scope.total=$scope.countPsize;
	               	    }
                  	    
                  	    var rows = this.items();
  	                    $(rows).each(function () {
  		                      var index = $(this).index() + 1 
  		                      + ($(".k-grid").data("kendoGrid").dataSource.pageSize() * ($(".k-grid").data("kendoGrid").dataSource.page() - 1));;
  		                      var rowLabel = $(this).find(".row-number");
  		                      $(rowLabel).html(index);
  	                    });
              	  },
                    editable: true,
                }
  	    	  
	    	  
  	    	  $scope.kdata= {
  				   autoSync: true,
                   transport: {
                   	read:  {
                   		url: "/fin/list/FinJournal",
                           contentType:"application/json; charset=UTF-8",       
                           //data: {"custom":"where (stepid="+$stateParams.levelid+" and  planid="+$stateParams.planid+" and  data8 like '"+parseInt($scope.fl.account)+"%') or (stepid="+$stateParams.levelid+" and planid="+$stateParams.planid+" and  data9 like '"+parseInt($scope.fl.account)+"%')","sort":[{field: 'id', dir: 'asc'}]},
                           type:"POST"
                       },
                       update: {
                           url: "/core/update/"+$scope.domain+"",
                           contentType:"application/json; charset=UTF-8",                                    
                           type:"POST",
                           complete: function(e) {
                        	   $scope.excelSearch();
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
                   pageSize: 50,
                   serverPaging: true,
                   serverFiltering: true,
                   serverSorting: true,
                   aggregate: [ { field: "data10", aggregate: "sum" },
                       { field: "amount", aggregate: "sum" },
                       { field: "data10", aggregate: "min" },
                       { field: "data10", aggregate: "max" }]
  	    	  }
       }
    	                         
]);
