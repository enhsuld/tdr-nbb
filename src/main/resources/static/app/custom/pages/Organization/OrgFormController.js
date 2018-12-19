angular
    .module('altairApp')
    	.controller("orgformCtrl", [
    	                           '$scope',
    	                           '$rootScope',
    	                           '$state',
    	                           'utils',
    	                           '$timeout',
    	                           'mainService',
    	                           'p_dep',
    	                           'p_tez',
    	                           'p_aures',
    	                           'p_fin',
    	                           'p_cat',
    	                           'p_prog',
    	                           'sweet',
    	                           'p_edit',
    	                           'user_data',
	        function ($scope,$rootScope,$state,utils,$timeout,mainService,p_dep,p_tez,p_aures,p_fin,p_cat,p_prog,sweet,p_edit,user_data) {
    	                        	
    	                        	   
    	                       
            	   var $formValidate = $('#form_validation');
            	 
   	            	$formValidate
   	                .parsley()
   	               
   	                .on('form:validated',function() {
   	                    $scope.$apply();
   	                 console.log("999999");
   	                })
   	                
   	                .on('field:validated',function(parsleyField) {
   	                    if($(parsleyField.$element).hasClass('md-input')) {
   	                        $scope.$apply();
   	                    }
   	                });
   	            	
   	            $scope.depch=false;
   	             
   	            if(user_data.username=="admin"){
   	            	 $scope.depch=false;
   	            }
   	            else{
   	            	$scope.depch=true;
   	            }
        	  
                $scope.orgdata=p_edit;
                $scope.enterValidation = function(){
            	    return true;
            	};

            	$scope.exitValidation = function(){
            	    return true;
            	};
            	
            	angular.forEach($scope.orgdata.ypr, function(val, index) {    	
            		
            		 if(index==0){ 
            			 $scope.orgdata.year1=val.year;  
            			 $scope.orgdata.budget1=val.plan;  
            			 $scope.orgdata.complation1=val.report;  
            			 $scope.orgdata.ar1=val.auditresult;  
   					}
            		 if(index==1){            	
            			 $scope.orgdata.year2=val.year;  
            			 $scope.orgdata.budget2=val.plan;  
            			 $scope.orgdata.complation2=val.report;  
            			 $scope.orgdata.ar2=val.auditresult;  
   					}
            		 if(index==2){        
            			 $scope.orgdata.year3=val.year;  
            			 $scope.orgdata.budget3=val.plan;  
            			 $scope.orgdata.complation3=val.report;  
            			 $scope.orgdata.ar3=val.auditresult;  
   					}
            	});
            	
            	
            	if($scope.orgdata.id!=0){            		
            		
            		if($scope.orgdata.banks=="no"){
            			$scope.banks=[
                    		{"xbankname":"", "xbankaccount":""},
                    	];
            		}
            		else{
            			var str=JSON.stringify($scope.orgdata.banks);
            			var strr=str.substring(1, 4);
	            			if(strr=="yes"){
	            				$scope.banks=[
	                        		{"xbankname":$scope.orgdata.banks.substring(3), "xbankaccount":""},
	                        	];
	            			}
	            			else{
	            				$scope.banks=$scope.orgdata.banks.a1;
	            			}
            			
            			}
            		//console.log($scope.orgdata.banks);
            		if($scope.orgdata.statebanks=="no"){
            			$scope.statebanks=[
                    		{"sbankaccount":""},
                    	];
            		}
            		else{
            			var str=JSON.stringify($scope.orgdata.statebanks);
            			var strr=str.substring(1, 4);
            			if(strr=="yes"){
            				$scope.statebanks=[
                        		{"sbankaccount":$scope.orgdata.statebanks.substring(3)},
                        	];
            			}
            			else{
            				$scope.statebanks=$scope.orgdata.statebanks.a1;
            			}
            			
            			}
            		if($scope.orgdata.statedir=="no"){
            			$scope.sdirections=[
                    		{"sdirection":""},
                    	];
            		}
            		else{
            			var str=JSON.stringify($scope.orgdata.statedir);
            			var strr=str.substring(1, 4);
            			if(strr=="yes"){
            				$scope.banks=[
                        		{"sdirection":$scope.orgdata.statedir.substring(3)},
                        	];
            			}
            			else{
            				$scope.sdirections=$scope.orgdata.statedir.a1;
            			}            			
            			
            			}
            		if($scope.orgdata.owndir=="no"){
            			$scope.xdirections=[
                    		{"xdirection":""},
                    	];
            		}
            		else{
            			var str=JSON.stringify($scope.orgdata.owndir);
            			var strr=str.substring(1, 4)
            			if(strr=="yes"){
            				$scope.banks=[
                        		{"xdirection":$scope.orgdata.owndir.substring(3)},
                        	];
            			}
            			else{
            				$scope.sdirections=$scope.orgdata.owndir.a1;
            			} 
            			
            			$scope.xdirections=$scope.orgdata.owndir.a1;
            			}
                }
            	else{
            		$scope.orgdata.departmentid=user_data.depid;
            		$scope.banks=[
                		{"xbankname":"", "xbankaccount":""},
                	];
                	$scope.statebanks=[
                		{"sbankaccount":""},
                	];
                	$scope.sdirections=[
                		{"sdirection":""},
                	];
                	$scope.xdirections=[
                		{"xdirection":""},
                	];
            	}
            	$scope.addxb= function() {
            		var xb=[
                		{"xbankname":"", "xbankaccount":""},
                	];
            		$scope.banks= $scope.banks.concat(xb);
				}
            	$scope.addsb= function() {
            		var sb=[
                		{"sbankaccount":""},
                	];
            		$scope.statebanks= $scope.statebanks.concat(sb);
				}
            	$scope.addsd= function() {
            		
            		var sd=[
                		{"sdirection":""},
                	];            		
            		$scope.sdirections= $scope.sdirections.concat(sd);            		
				}
            	$scope.addxd= function() {
            		
            		var xd=[
                		{"xdirection":""},
                	];            		
            		$scope.xdirections= $scope.xdirections.concat(xd);            		
				}
            	$scope.removexb= function(i) {             		
  	  	    	  var s="";
      	    	  angular.forEach($scope.banks, function(val, index) {    			  
          			
          			     if(val.xbankaccount==i){
          			    	 s=index;     
          			    	 $scope.banks.splice(s, 1);        			    	 
       					}
          			     
       			});
         	       }
            	$scope.removesb= function(i) { 
  	  	    	  var s="";
      	    	  angular.forEach($scope.statebanks, function(val, index) {    			  
          			 
          			     if(val.sbankaccount==i){
          			    	 s=index;     
          			    	 $scope.statebanks.splice(s, 1);        			    	 
       					}
          			     
       			});
         	       }
            	$scope.removesd= function(i) { 
  	  	    	  var s="";
      	    	  angular.forEach($scope.sdirections, function(val, index) {    			  
          			 
          			     if(val.sdirection==i){
          			    	 s=index;     
          			    	 $scope.sdirections.splice(s, 1);        			    	 
       					}
          			     
       			});
         	       }
            	$scope.removexd= function(i) { 
  	  	    	  var s="";
      	    	  angular.forEach($scope.xdirections, function(val, index) {    			  
          			 
          			     if(val.xdirection==i){
          			    	 s=index;     
          			    	 $scope.xdirections.splice(s, 1);        			    	 
       					}
          			     
       			});
         	       }
            	
            	//example using context object
            	$scope.exitValidation = function(context){
            		if(		$scope.orgdata.orgcode!=null && 
            				$scope.orgdata.departmentid!=null && 
            				$scope.orgdata.fincategoryid!=null && 
            				$scope.orgdata.catid!=null && 
            				$scope.orgdata.progid!=null && 
            				$scope.orgdata.orgname!=null 
            				){return true;}
            		else{
            			sweet.show('Мэдээлэл', 'Мэдээлэл дутуу байна.', 'error');
            		};
            		
            	}
            	
                              
               $scope.selectize_a_data = {
                       options: [p_tez]
                   };
             
               $scope.selectize_c_data = {
                       options: [p_dep]
                   };
               $scope.selectize_d_data = {
                       options: [p_fin]
                   };
               $scope.selectize_e_data = {
                       options: [p_cat]
                   };
               $scope.selectize_f_data = {
                       options: [p_prog]
                   };
               $scope.selectize_g_data = {
                       options: [p_aures]
                   };
               $scope.selectize_a_config = {
                       plugins: {
                           'disable_options': {
                               disableOptions: ["c1","c2"]
                           }
                       },
                       create: false,
                       maxItems: 1,
                       placeholder: 'Сонго...',
                       optgroupField: 'parent_id',
                       optgroupLabelField: 'title',
                       optgroupValueField: 'ogid',
                       valueField: 'value',
                       labelField: 'text',
                       searchField: 'title'
                   };
               $scope.selectize_b_data = {
                       options: []
                   };
               
               $scope.choose=function(){ 
            	  
            	   mainService.withdata('GET','/core/sel/ttz/'+$scope.orgdata.tez)
            	   .then(function(data){	
		   				
		   				var a=data;
		   				var b="";
		   				angular.forEach(a, function(value, key){
		   			     if(value.code!=null){
		   						b=value.code;
		   					}
		   				});
		   				$scope.orgdata.orgcode=b;
		   			 $scope.selectize_b_data = {
		                       options: [data]
		                   };
		             
		               
		               $scope.selectize_b_config = {
		                       plugins: {
		                           'disable_options': {
		                               disableOptions: ["c1","c2"]
		                           }
		                       },
		                       create: false,
		                       maxItems: 1,
		                       placeholder: 'Сонго...',
		                       optgroupField: 'parent_id',
		                       optgroupLabelField: 'title',
		                       optgroupValueField: 'ogid',
		                       valueField: 'value',
		                       labelField: 'text',
		                       searchField: 'title'
		                   };
		   				});
            	   
            	  
               } 
               $scope.choose1=function(){               	   
            	   mainService.withdata('GET','/core/sel/code/'+$scope.orgdata.ttz)
            	   .then(function(data){
            		   var b="";
		   				angular.forEach(data, function(value, key){
		   			     if(value.code!=null){
		   						b=value.code;
		   					}
		   			  $scope.orgdata.orgcode=b;
		   				});
		   				});
            	  
               }
               $scope.addOrg = function() {	             	   
            	   
            	   
            	   var s="[";
       	    	  angular.forEach($scope.banks, function(val, index) {    			  
           			          s=s + '{"xbankname":"'+val.xbankname+'",'+'"xbankaccount":"'+val.xbankaccount+'"},'
        			});
       	    	  s=s+']';
       	    	  
       	    	  
       	    	 var s1="[";
      	    	  angular.forEach($scope.statebanks, function(val, index) {    			  
          			          s1=s1 + '{"sbankaccount":"'+val.sbankaccount+'"},'
       			});
      	    	  s1=s1+']';
      	    	  
      	    	  
      	    	  
      	    	 var s2="[";
      	    	  angular.forEach($scope.sdirections, function(val, index) {    			  
          			          s2=s2 + '{"sdirection":"'+val.sdirection+'"},'
       			});
      	    	  s2=s2+']';
      	    	  
      	    	 var s3="[";
      	    	  angular.forEach($scope.xdirections, function(val, index) {    			  
          			          s3=s3 + '{"xdirection":"'+val.xdirection+'"},'
       			});
      	    	  s3=s3+']';
      	    	 
      	    	  
      	    	  
      	    	  
            	   $scope.orgdata.banks=s;
        		   $scope.orgdata.statebanks=s1;
    			   $scope.orgdata.statedir=s2;
				   $scope.orgdata.owndir=s3;
				   
				   var numa=$scope.orgdata.banks.length;
				   var numb=$scope.orgdata.statebanks.length;
				   var numc=$scope.orgdata.statedir.length;
				   var numd=$scope.orgdata.owndir.length;
				   
				   
				   
				   if(numa<3900 && numb<3900 && numc<3900 && numd<3900 && $scope.orgdata.departmentid!=null){
					   if($scope.orgdata.orgname!=null && $scope.orgdata.orgname!=""){
						   mainService.withdata('PUT','/core/orgadd/'+$scope.orgdata.id, $scope.orgdata)
				   			.then(function(data){			   				
				   				if(data.re==1){
				   					sweet.show('Мэдээлэл', 'Амжилттай засагдлаа.', 'success');
				   					$state.go('restricted.pages.orglist');
				   				}
				   				if(data.re==2){
				   					sweet.show('Мэдээлэл', 'Байгууллагын код давхцаж байна.', 'error');		   					
				   				}
				   				if(data.re==3){
				   					sweet.show('Мэдээлэл', 'Байгууллагын код болон улсын бүртгэлийн дугаараа оруулана уу!.', 'error');		   					
				   				}
				   				if(data.re==5){
				   					sweet.show('Мэдээлэл', 'Байгууллагын улсын бүртгэлийн дугаараа оруулана уу!.', 'error');		   					
				   				}
				   				if(data.re==6){
				   					sweet.show('Мэдээлэл', 'Байгууллагын кодоо оруулана уу!.', 'error');		   					
				   				}
				   				if(data.re==7){
				   					sweet.show('Мэдээлэл', 'Байгууллагын улсын бүртгэлийн дугаар 7-н оронтой тоо байх ёстой!.', 'error');		   					
				   				}
				   				if(data.re==8){
				   					sweet.show('Мэдээлэл', 'Байгууллагын код 16-н оронтой тоо байх ёстой.', 'error');		   					
				   				}
				   				if(data.re==9){
				   					sweet.show('Мэдээлэл', 'Байгууллагын улсын бүртгэлийн дугаар 7-н оронтой тоо, код 16-н оронтой тоо байх ёстой!.', 'error');		   					
				   				}
				   				if(data.re==21){
				   					sweet.show('Мэдээлэл', 'Алдаа гарлаа.', 'error');		   					
				   				}
				   				if(data.re==0){
				   					sweet.show('Мэдээлэл', 'Амжилттай хадгаллаа.', 'success');
				   					$state.go('restricted.pages.orglist');
				   				}		   				
				   			});
					   }
					   else{
						   sweet.show('Мэдээлэл', 'Байгууллагын нэрээ оруулана уу.', 'error');
					   }					   
				   }
				   else{
					   if(numa>=3900){						  
						   sweet.show('Мэдээлэл', 'Харилцагч арилжааны банкны мэдээлэл хадгалах хэмжээнжээс их байна.', 'error');
					   }
					   else if(numb>=3900){
						   sweet.show('Мэдээлэл', 'Төрийн сан банкны дансны мэдээлэл хадгалах хэмжээнжээс их байна.', 'error');
					   }
					   else if(numc>=3900){
						   sweet.show('Мэдээлэл', 'Үйл ажиллагааны чиглэлийн мэдээлэл хадгалах хэмжээнжээс их байна.', 'error');
					   }
					   else if(numd>=3900){
						   sweet.show('Мэдээлэл', 'Хууль, тогтоомжоор тодорхойлсон чиг үүрэгийн мэдээлэл хадгалах хэмжээнжээс их байна.', 'error');
					   }
					   else{						   
						   sweet.show('Мэдээлэл', 'Аудит хийх байгууллага сонгоно уу.', 'error');
					   }
				   }
				  
	    		   	 
                       
            }
        }]
    )
    
    


