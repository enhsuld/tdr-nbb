angular
    .module('altairApp')
    	.controller("majorCtrl",['$rootScope','$timeout','$scope','cfpLoadingBar','user_data','mainService','sweet','$state','$stateParams','mainobj','Upload','fileUpload',
	        function ($rootScope,$timeout,$scope,cfpLoadingBar,user_data,mainService,sweet,$state,$stateParams,mainobj,Upload,fileUpload) {       	
    		
    		
    			$scope.mainobj=mainobj;
    			$scope.domain="com.nbb.models.fn.LnkAuditFile.";
    			
			    $scope.switches = {
	                switch_e: mainobj.isreport,
	                switch_model: true
	            };
			    
			    $scope.reportChange=function(){
			    	$scope.mainobj.isreport=$scope.switches.switch_e;
			    	mainService.withdata('post', '/api/work/'+mainobj.id, $scope.mainobj).
					then(function(data){
						if($scope.mainobj.isreport){
							UIkit.notify("Үйлчлүүлэгч тайлан оруулах боломжтой.", {status:'success', pos: 'top-center'});
						}
						else{
							UIkit.notify("Үйлчлүүлэгч тайлан оруулах боломжгүй.", {status:'danger', pos: 'top-center'});
						}
					});
			    }
			    
		        $scope.timeline_data = [
	                {
	                    'icon': '&#xE85D;',
	                    'date': moment().startOf('month').add(7, 'days').format("MM-DD-YYYY"),
	                    "status": "success",
	                    "description": "Created ticket",
	                    "link_text": "#3289",
	                    "slide_animation": "uk-animation-slide-left",
	                    "slide_animation_reversed": "uk-animation-slide-right"
	                },
	                {
	                    'icon': '&#xE5CD;',
	                    'date': moment().startOf('month').add(8, 'days').format("MM-DD-YYYY"),
	                    "status": "danger",
	                    "description": "Deleted post",
	                    "link_text": "Reiciendis eligendi ullam earum in labore labore sit.",
	                    "slide_animation": "uk-animation-slide-left",
	                    "slide_animation_reversed": "uk-animation-slide-right"
	                },
	                {
	                    'icon': '&#xE410;',
	                    'date': moment().startOf('month').add(9, 'days').format("MM-DD-YYYY"),
	                    "status": "",
	                    "description": "Added photo",
	                    "image": "assets/img/gallery/Image01.jpg",
	                    "slide_animation": "uk-animation-slide-left",
	                    "slide_animation_reversed": "uk-animation-slide-right"
	                },
	                {
	                    'icon': '&#xE0B9;',
	                    'date': moment().startOf('month').add(11, 'days').format("MM-DD-YYYY"),
	                    "status": "primary",
	                    "description": "New comment on post",
	                    "link_text": "Magnam eos nesciunt.",
	                    "post_excerpt": "Quo eos quis aut molestiae dolorem et sed quas iste voluptatibus ea ut voluptas distinctio",
	                    "slide_animation": "uk-animation-slide-left",
	                    "slide_animation_reversed": "uk-animation-slide-right"
	                },
	                {
	                    'icon': '&#xE7FE;',
	                    'date': moment().startOf('month').add(12, 'days').format("MM-DD-YYYY"),
	                    "status": "warning",
	                    "description": "Added to Friends",
	                    "user_avatar": "assets/img/avatars/avatar_02_tn.png",
	                    "user_name": "Tia Rutherford",
	                    "user_status": "Repudiandae asperiores numquam et molestiae.",
	                    "slide_animation": "uk-animation-slide-left",
	                    "slide_animation_reversed": "uk-animation-slide-right"
	                }
	            ]
    			   
    			$scope.iscompany=user_data.iscompany;
    			    			
    			$scope.modalZegwarExcel = function(){
    				mainService.withdomain('get', '/api/files/3/'+mainobj.orgtype).
					then(function(data){
						$scope.formdata=data[0];
						modalUpdate.show();
					});
    			}
    			
    			var modalNotloh = UIkit.modal("#modal_notloh_zuil", {modal: false, keyboard: false, bgclose: false, center: false});
        	  	$scope.addnew = function(){
        	  		$scope.sendBtn=true;
        	  		modalNotloh.show();
        	  		$scope.description=null;
        	  		$scope.uploadfile=null;
        	  		progressbar.addClass("uk-hidden");
        	  	}
        	  	
        	  	$scope.selectJournal = function(){
        	  		$scope.dataSource = new kendo.data.PivotDataSource({
                         transport: {
                        	 read:  {
                        		url: "/fin/list/FinJournalPivot",
                        		 data:{"planid":mainobj.id},
                                contentType:"application/json; charset=UTF-8",                                      
                                type:"POST",
                             },
                    	     parameterMap: function(options) {
                            	 return JSON.stringify(options);
                             }
                         },
                         schema: {                        	 
                        	 data:"data",
                         	 total:"total",
                             cube: {
                                 dimensions: {
                                	 data2: { caption: "Огноо" },
                                     data16: { caption: "Гүйлгээний утга" },
                                	 data8: { caption: "Дебет" },
                                     data9: { caption: "Кредит" },                                 
                                	 data10: { caption: "Мөнгөн дүн" },
                            	     a: { caption: "Дансны харилцаа үнэн зөв хийгдсэн эсэх." },
                                     b: { caption: "Кассын баримтууд урьдчилан дугаарлагдсан эсэх." },
                                   	 c: { caption: "Журнал, ерөнхий дансанд үнэн зөв туссан эсэх." },
                                     d: { caption: "Анхан шатны баримтыг бүрдүүлсэн эсэх." },
                                     e: { caption: "Төрийн сангийн төлбөр тооцооны журам, бусад хууль тогтоомжид нийцсэн эсэх." },
                                     amount: { caption: "Алдааны дүн" },
                                	 description: { caption: "Тайлбар" },
                                 },
                                 measures: {
                                     "Гүйлгээний дүн": { field: "data10", format: "{0:n}", aggregate: "sum" },
                                     "Дундаж": { field: "data10", format: "{0:n}", aggregate: "average" },
                                     "Гүйлгээний тоо": { field: "data10", aggregate: "count" }
                                 }
                             }
                         },
                         columns: [{ name: "data10", expand: false }],
                         rows: ["data8", "data9"],
                         measures: [{ name: "Гүйлгээний дүн"},{ name: "Гүйлгээний тоо"}]
    	          });
    	          $scope.optionsConf = {
    	              height: function(){
    	            	  return $(window).height()-150;
    	              }
    	          };
    	          
    	          var pivotgrid = $("#pivotgrid").kendoPivotGrid({
    	                excel: {
    	                    fileName: "Ерөнхий журналын шинжилгээ",
    	                    proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
    	                    filterable: true
    	                },
    	                filterable: true,
    	                sortable: true,
    	                columnWidth: 200,
    	                height: function(){
      	            	  return $(window).height()-150;
      	                },
    	                dataSource: $scope.dataSource
    	            }).data("kendoPivotGrid");
    	          
    	          $("#export").click(function() {
                      pivotgrid.saveAsExcel();
                  });
    	          
	    	  		var modalPivot = UIkit.modal("#modal_full_pivot", {modal: false, keyboard: false, bgclose: false, center: false});
	    	  		modalPivot.show();
        	  		
 		        }

              
                
        	  	
        	  	
        	  	$scope.report = function(){
        	  		mainService.withdomain('get', '/api/excel/report/'+mainobj.id).
					then(function(data){
						$scope.reportData=data;
					});
        	  	}

    			$scope.categoryDropDownEditor = function(container, options) {
    		        var editor = $('<textarea ng-disabled="!iscompany"  class="k-textbox md-bg-red-100" style="float:left;height:100%;" data-bind="value: ' + options.field + '"></textarea>')
    		        .appendTo(container);
    		    }
    			
    			$scope.auditorEditor = function(container, options) {
    		        var editor = $('<textarea ng-disabled="iscompany"  class="k-textbox md-bg-red-100" style="float:left;height:100%;" data-bind="value: ' + options.field + '"></textarea>')
    		        .appendTo(container);
    		    }
    			
    			$scope.fileGrid = {
	                dataSource: {	                   
	                    autoSync:true,
	                	transport: {
	                    	read:  {
	                            url: "/core/list/LnkAuditFile",
	                            contentType:"application/json; charset=UTF-8",     
	                            data: {"custom":"where appid="+mainobj.id+""},
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
	                             	filename: { type: "string",editable:false, validation: { required: true } },
	                            	mimetype: { type: "string",editable:false, validation: { required: true } },
	                             	fileurl: { type: "string",editable:false, defaultValue:'#'},
	                             }
	                         }
	                     },
	                    pageSize: 10,
	                    serverFiltering: true,
	                    serverPaging: true,
	                    serverSorting: true
	                },
	                //toolbar: ["create"],
	                //toolbar: kendo.template($("#add").html()),		
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
	                          { field:"filename",template:"<a  class='uk-text-primary uk-margin-remove' href='/api/files/#:appid#/#:id#' target='_self' download='#:filename#'>#:filename#</a>", title: "Файлын нэр" },
	                          { field: "mimetype", title:"Хэмжээ", template:"<span>#:mimetype#</span>"}, 		                         
	                          { field:"description",  editor: $scope.categoryDropDownEditor, title: "Тайлбар"},
	                          { field: "comment", title:"Аудиторийн санал",  editor: $scope.auditorEditor, template:"<span class='uk-text-danger'>#:comment#</span>"},
	                          {template: kendo.template($("#downNotloh").html()), width: "200px"}
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
			    var $formValidatenotloh = $('#form_validation_notloh');

   	            $formValidatenotloh
   	                .parsley()
   	                .on('form:validated',function() {
   	                    $scope.$apply();
   	                })
   	                .on('field:validated',function(parsleyField) {
   	                    if($(parsleyField.$element).hasClass('md-input')) {
   	                        $scope.$apply();
   	                    }
   	                });
    			 
    			
    			$scope.submitUploadNotlohZuil = function() {
  			       $scope.sendBtn=false;
  			       if ($scope.formUpload.uploadfile.$valid && $scope.uploadfile) {
  			    	    bar.css("width", "0%").text("0%");
                         progressbar.removeClass("uk-hidden");
                         $scope.uploadNotlohZuil($scope.uploadfile, $scope.mainobj.id);
  			       }
  		        };
 	 		        
  		        $scope.uploadNotlohZuil = function (file,i) {
  		    	   var xurl="";
  		    	   if(i!=0){
  		    		   xurl ='/api/file/upload/audit/'+i;
  		    	   }
  		    	   
  		          Upload.upload({
  		              url: xurl,
  		              data: {file: file, 'description': $scope.description}
  		          }).then(function (resp) {
  		        	  progressbar.removeClass("uk-hidden");
  		              console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
  		              $(".notloh .k-grid").data("kendoGrid").dataSource.read(); 
  		              if(resp.data.excel){
  	                      UIkit.notify("Амжилттай хадгаллаа.", {status:'success'});
  	                    modalNotloh.hide();
  		              }
  		              else if(resp.data==false){
  		            	  UIkit.notify("Excel загвар тохирохгүй байна.", {status:'error'});
  		              }
  		            modalNotloh.hide();
  		          }, function (resp) {
  		              console.log('Error status: ' + resp.status);
  		          }, function (evt) {
  		              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
  		             
  		              percent = progressPercentage;
                        bar.css("width", percent+"%").text(percent+"%");                    
  		              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
  		          });
  		       };
  		       
    			
    			if(user_data.iscompany){
    				$scope.fileGrid.toolbar= kendo.template($("#add").html());
    				$scope.fileGrid.columns.push({ command: ["destroy"], title: "&nbsp;", width: "140px" });
    				$scope.fileGrid.editable=true;
    			}
    			else{
    				$scope.fileGrid.editable=true;
    			}
    			
    			
    			
    			$scope.domain1="com.nbb.models.fn.LnkAuditForm.";

    			var dt=0;
    			
    			if($scope.iscompany){
    				dt=1;
    			}
    			
    			var levels=[{"text":"Төлөвлөх","value":1},{"text":"Гүйцэтгэх","value":3},{"text":"Тайлагнах","value":4},{"text":"Нотлох зүйл, Шинжилгээний горим","value":2}];
    			var alevel=[{"text":"Төлөвлөх","value":1},{"text":"Гүйцэтгэх","value":2}];
    			$scope.levelEditor = function(container, options) {
    				if(options.model.data13==2){
    					$('<input required name="' + options.field + '"/>')
                        .appendTo(container)
                        .kendoDropDownList({
                            autoBind: false,
                            dataTextField: "text",
                            dataValueField: "value",
                            dataSource: alevel
                        });
    				}    		       
    		    }
    			
    		    $scope.mainGridOptions = {
		          dataSource: {
		        	  autoSync: true,
		        	  transport: {
		        		   read:  {
	                            url: "/core/list/LnkAuditForm",
	                            contentType:"application/json; charset=UTF-8",     
	                            data: { "custom":"where appid="+$stateParams.issueId+" and parentid is null","sort":[{field: 'orderid', dir: 'asc'}]},
	                            type:"POST"
	                        },
	                        update: {
	                            url: "/fin/update/"+$scope.domain1+"",
	                            contentType:"application/json; charset=UTF-8",                                    
	                            type:"POST",
	                            complete: function(e) {
		                         	if(e.responseText=="false"){			 		                            		
	                            		UIkit.notify("Алдаа үүслээ.", {status:'warning'});
	                            	}else{
	                            		UIkit.notify("Амжилттай хадгаллаа.", {status:'success'});
	                            	}
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
                         	    id:  { nullable: false, type: "number"},
                                 parentid: { nullable: true, type: "number" },
                                 formid: { type: "number" },
                                 data1: { type: "string",editable:false },
                                 data2: { type: "string",editable:false },
                                 data3: { type: "string" ,editable:false},
                                 data4: { type: "string" },
                                 data5: { type: "string" },
                                 data6: { type: "string" },
                                 data7: { type: "string" },
                                 data8: { type: "string" ,editable:false},
                              }		                    
                         }
                     },
		            pageSize: 20,
		            group: {
                        field: "data13"
                    },
		            serverPaging: true,
		            serverSorting: true
		          },
		          sortable: true,
		          pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                  },
              	  detailExpand: function(e){
                    e.sender.tbody.find('.k-detail-row').each(function(idx, item){
                      if(item !== e.detailRow[0]){
                        e.sender.collapseRow($(item).prev());
                      }
                    })
                  },
		          dataBound: function () {		        	  
		        	  var grid =this;
		        	//  this.expandRow(this.tbody.find("tr.k-master-row").first());
		        	  grid.element.delegate("tbody>tr", "dblclick", function (e) {
		        		  var $target = $(e.target);
		        		  if (!$target.hasClass("k-hierarchy-cell")){
		        			  grid.expandRow($(this));
		        			  
		        			  $(".afl .k-grid").data("kendoGrid").dataSource.read();
		        			  
		                  }
		        		  else{
		        			  grid.collapseRow($(this));
		        		  }
		        	  });
  	              },
		          columns: [
	                    { field: "data1", title: "Дугаар", width:130 },
	                    { field: "data2", title:"Чанарын баталгаажуулалтын асуулга" },
	                    { field: "levelid", width:120, title:" ", editor: $scope.levelEditor, template:"#if (levelid==1 && data13==2) {# <span>Төлөвлөх</span> #} else if(levelid==2 && data13==2){# <span>Гүйцэтгэх</span> #}#", values:alevel},
	                    { field: "data13", title: "Үе шат", values:levels, hidden:true},
	                               
	                ],
		          editable: true
		        };
    		    
    		    $scope.auditorEditor = function(container, options) {
 			        var editor = $('<textarea cols="30" rows="2" class="k-textbox md-bg-red-100" style="float:left;min-height:150px;" data-bind="value: ' + options.field + '"></textarea>')
 			        .appendTo(container);
 			    }
    		    
    		    var steps=[];  		    
    		   
    		    var asd=[{"text":"Буцаасан","value":5},{"text":"Хадгалсан","value":0},{"text":"Илгээсэн","value":1},{"text":"Хянасан","value":2},{"text":"Баталгаажсан","value":3}];
    		    if(user_data.positionid==1){
    		    	steps=[{"text":"Илгээх","value":1}];
    		    	$scope.mainGridOptions.columns.push({ title: "Шийдвэр", width:130, editor: function(container, options) {
    		    		console.log(options.model);
      		          if(options.model.stepid == 0 || options.model.stepid == 5) {
      		        	$('<input required name="' + options.field + '"/>')
                        .appendTo(container)
                        .kendoDropDownList({
                            autoBind: false,
                            dataTextField: "text",
                            dataValueField: "value",
                            dataSource: steps
                        });
      		          } else {
      		        	$("<strong>Not editable</strong>").appendTo(container);
      		          }
      		        }, field:"stepid", values:asd});
    		    	$scope.mainGridOptions.columns.push({ title: "Төлөв", width:100,template:kendo.template($("#step").html())});
    		    	$scope.mainGridOptions.columns.push({ title: "Санал",width:100, template:kendo.template($("#comment").html())});
    		    }
    		    if(user_data.positionid==2){
    		    	steps=[{"text":"Буцаасан","value":5},{"text":"Хянасан","value":2}];
    		    	$scope.mainGridOptions.columns.push({ title: "Шийдвэр", width:130, editor: function(container, options) {
    		    		console.log(options.model);
      		          if(options.model.stepid != 1) {
      		          	$("<strong>Not editable</strong>").appendTo(container);
      		          } else {
      		        	 $('<input required name="' + options.field + '"/>')
                         .appendTo(container)
                         .kendoDropDownList({
                             autoBind: false,
                             dataTextField: "text",
                             dataValueField: "value",
                             dataSource: steps
                         });
      		          }
      		        }, field:"stepid", values:asd});
    		    	$scope.mainGridOptions.columns.push({ title: "Төлөв", width:100,template:kendo.template($("#step").html())});
    		    	$scope.mainGridOptions.columns.push({ title: "Санал",width:100, template:kendo.template($("#comment").html())});
    		    }
    		    if(user_data.positionid==3){
    		    	steps=[{"text":"Буцаасан","value":5},{"text":"Батлах","value":3}];
    		    	$scope.mainGridOptions.columns.push({ title: "Шийдвэр", width:130, editor: function(container, options) {
    		    		console.log(options.model);
      		          if(options.model.stepid != 2) {
      		          	$("<strong>Not editable</strong>").appendTo(container);
      		          } else {
      		        	 $('<input required name="' + options.field + '"/>')
                         .appendTo(container)
                         .kendoDropDownList({
                             autoBind: false,
                             dataTextField: "text",
                             dataValueField: "value",
                             dataSource: steps
                         });
      		          }
      		        }, field:"stepid", values:asd});
    		    	
    		    	$scope.mainGridOptions.columns.push({ title: "Төлөв", width:100,template:kendo.template($("#step").html())});
    		    	$scope.mainGridOptions.columns.push({ title: "Санал",width:100, template:kendo.template($("#comment").html())});
    		    }
    		    
    		    var aj=[{"text":"Тийм","value":1},{"text":"Үгүй","value":0}];
    		    var yesno=[{"text":"Тийм","value":true},{"text":"Үгүй","value":false}];
    		    if($scope.iscompany){
    		    	$scope.edit=false;
    		    }
    		    else{
    		    	$scope.edit=true;
    		    }
    		    
		        $scope.ordersGridOptions = function(dataItem) {
		          return {
		            dataSource: {
		              autoSync: true,
		              transport: {
		            		read:  {
	            			    url: "/core/list/LnkAuditForm",
	                            contentType:"application/json; charset=UTF-8",     
	                            data: { "custom":"where appid="+$stateParams.issueId+" and data8=1","sort":[{field: 'id', dir: 'asc'}]},
	                            type:"POST"
	                        },
	                        update: {
	                            url: "/core/update/"+$scope.domain1+"",
	                            contentType:"application/json; charset=UTF-8",                                    
	                            type:"POST",
	                            complete: function(e) {
		                         	if(e.responseText=="false"){			 		                            		
	                            		UIkit.notify("Алдаа үүслээ.", {status:'warning'});
	                            	}else{
	                            		UIkit.notify("Амжилттай хадгаллаа.", {status:'success'});
	                            	}
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
                        	    id:  { nullable: false, type: "number"},
                                parentid: { nullable: true, type: "number" },
                                formid: { type: "number" },
                                data1: { type: "string",editable:false },
                                data2: { type: "string",editable:false },
                                data3: { type: "string" ,editable:false},
                                data4: { type: "number" },
                                data5: { type: "boolean" },
                                data6: { type: "number" },
                                data7: { type: "string" ,editable:false},
                                data8: { type: "string" ,editable:false},
                                data9: { type: "string"},
                             }	                    
                         }
                      },
		              serverPaging: true,
		              serverSorting: true,
		              serverFiltering: true,
		           /*   group: {
                          field: "data3"
                        },*/
		              pageSize: 50,
		              filter: { field: "parentid", operator: "eq", value: dataItem.formid }
		            },
		            scrollable: true,
		            resizable: true,
		            reorderable: true,
		            filterable: true,
		            sortable: true,
		            pageable: {
	                    refresh: true,
	                    pageSizes: true,
	                    buttonCount: 5
	                },
		            columns: [
		            	/*{title: "№",template: "<span class='row-number'></span>", width:60},*/
		            	{ field: "data1", title: "№",filterable:false, width:60 },
	                    { field: "data2", title:"Чанарын баталгаажуулалтын асуулга", width:300},
	                    { field: "data3", title:"Бүлэг", hidden: true, width:300},
	                    { field: "data4", attributes: {"class": "customClassCenter"},  title:"Татуулах", values:aj, width:132},
	                    { field: "data6",  attributes: {"class": "customClassCenter"}, title:"Хийсэн эсэх", values:aj,width:132},
	                 /*   { field: "data9", title:"Тайлбар", editor: $scope.categoryDropDownEditor, editable:false,width:300},*/
	                    { field: "data8", title:"Маягт хавсрах", template: kendo.template($("#uptemp").html()), width: 160},
	                    { field: "data7", title:"Загвар татах / харах", template: kendo.template($("#downtemp").html()), width: 150},
	                  
	                    { title:"Нотлох баримт", template: kendo.template($("#file").html())}
	                ],
	                dataBound: function(){
                  	    var grid = this;
                  	    var rows = this.items();
  	                    $(rows).each(function () {
  		                      var index = $(this).index()  
  		                      + ($(".afl .k-grid").data("kendoGrid").dataSource.pageSize() * ($(".k-grid").data("kendoGrid").dataSource.page() - 1));;
  		                      var rowLabel = $(this).find(".row-number");
  		                      $(rowLabel).html(index);
  	                    });
              	  },
		            editable: $scope.edit
		          };
		         
		          $scope.ordersGridOptions.columns.push({template: kendo.template($('#file').html()), locked: true,lockable: false, width: 300})
		        };
		        $scope.planid=$stateParams.issueId;
		        
		        $scope.reportDelete= function(dataItem,y){
		        	mainService.withdomain('get','/api/excel/delete/report/'+dataItem.appid+'/'+dataItem.id).then(function(response){
		           		if(response){
		           			$scope.reportData.splice(y, 1);
		           			sweet.show('Анхаар!', 'Excel тайлан устлаа!!!', 'success');		
		           		}
		           		else{
		           			sweet.show('Анхаар!', 'Excel тайлан олдсонгүй!!!', 'error');
		           		}		           		
		           	});
		        }
		        
		        
		        $scope.exportPlan= function(dataItem){
		        	 $rootScope.content_preloader_show();
		        	 var link = document.createElement('a');
 					 link.href = '/api/word/export/report/'+dataItem.appid+'/'+dataItem.id;
 					 link.download = "Filename";
 					 link.click();	
 					 setTimeout(function(){
 						 $rootScope.content_preloader_hide();
                     }, 7000);
		        }
		        
		        $scope.exportWord= function(dataItem){
		        	 $rootScope.content_preloader_show();
		        	 var link = document.createElement('a');
					 link.href = '/api/word/export/'+dataItem.data7+'/'+dataItem.appid+'/'+dataItem.id;
					 link.download = "Filename";
					 link.click();	
					 setTimeout(function(){
						 $rootScope.content_preloader_hide();
                    }, 7000);
		        }
		        
		        $scope.reportExcel= function(dataItem){
		        	 $rootScope.content_preloader_show();
		          	 mainService.withdomain('get','/api/excel/verify/report/'+dataItem.appid+'/'+dataItem.id).then(function(response){
		           		 if(response!=false){
		           			 var link = document.createElement('a');
   	 					 link.href = '/api/excel/export/report/'+dataItem.appid+'/'+dataItem.id;
   	 					 link.download = "Filename";
   	 					 link.click();	
   	 					 if(dataItem.data7=='АТ'){
   	 						 setTimeout(function(){
           	 					 $rootScope.content_preloader_hide();
   	                         }, 5000);
   	 					 }
   	 					 else{
   	 						 setTimeout(function(){
           	 					 $rootScope.content_preloader_hide();
   	                         }, 1000);
   	 					 }
   	 					
		           		 }
		           		 else{
		           			 sweet.show('Анхаар!', 'Excel тайлан олдсонгүй!!!', 'error');
		           			 $rootScope.content_preloader_hide();
		           		 }
		           		
		           	 });
		        }
		        
		        $scope.b4Download = function(){
		        	 $rootScope.content_preloader_show();
		        		mainService.withdomain('get','/api/excel/export/problem/'+$scope.planid+'/0').then(function(response){
			           		 if(response!=false){
			           			 var link = document.createElement('a');
	   	 					 link.href = '/api/excel/export/problem/'+$scope.planid+'/0';
	   	 					 link.download = "Filename";
	   	 					 link.click();	
	   	 				 $rootScope.content_preloader_hide();
	   	 					 if(dataItem.data7=='АТ'){
	   	 						 setTimeout(function(){
	           	 					 $rootScope.content_preloader_hide();
	   	                         }, 5000);
	   	 					 }
	   	 					 else{
	   	 						 setTimeout(function(){
	           	 					
	   	                         }, 1000);
	   	 					 }
	   	 					
			           		 }
			           		 else{
			           			 sweet.show('Анхаар!', 'Асуудал олдсонгүй!!!', 'error');
			           			 $rootScope.content_preloader_hide();
			           		 }
			           		
			           	 });
		        }
    			
		        $scope.exportExcel = function(dataItem){
		        	 $rootScope.content_preloader_show();
		          	 mainService.withdomain('get','/api/excel/verify/nbb/'+dataItem.appid+'/'+dataItem.formid).then(function(response){
		           		 if(response!=false){
		           			 var link = document.createElement('a');
    	 					 link.href = '/api/excel/export/nbb/'+dataItem.appid+'/'+dataItem.formid;
    	 					 link.download = "Filename";
    	 					 link.click();	
    	 					 if(dataItem.data7=='АТ'){
    	 						 setTimeout(function(){
            	 					 $rootScope.content_preloader_hide();
    	                         }, 5000);
    	 					 }
    	 					 else if(dataItem.data7=='18.Payroll'){
    	 						 setTimeout(function(){
            	 					 $rootScope.content_preloader_hide();
    	                         }, 5000);
    	 					 }
    	 					 else{
    	 						 setTimeout(function(){
            	 					 $rootScope.content_preloader_hide();
    	                         }, 2000);
    	 					 }
    	 					
		           		 }
		           		 else{
		           			 sweet.show('Анхаар!', 'Excel тайлан оруулаагүй байна !!!', 'error');
		           			 $rootScope.content_preloader_hide();
		           		 }
		           		
		           	 });
	            }
		        
		     
		        
		        $scope.formFileDelete = function(item){
		        	
		        	sweet.show({
			        	   title: 'Баталгаажуулалт',
	 		            text: 'Та энэ үйлдлийг хийхдээ итгэлтэй байна уу?',
	 		            type: 'warning',
	 		            showCancelButton: true,
	 		            confirmButtonColor: '#DD6B55',
	 		            confirmButtonText: 'Тийм',
			    	    cancelButtonText: 'Үгүй',
	 		            closeOnConfirm: false,
	 		            closeOnCancel: false
			          
			        }, function(inputvalue) {
			        	 if (inputvalue) {
			        		 mainService.withdomain('get','/api/excel/delete/attach/'+item.id).then(function(response){
			   		           		if(response){
			   		           			sweet.show('Анхаар!', 'Файл устлаа!!!', 'success');		
			   		           		}
			   		           		else{
			   		           			sweet.show('Анхаар!', 'Файл олдсонгүй!!!', 'error');
			   		           		}		           		
			   		           	    $(".afl .k-grid").data("kendoGrid").dataSource.read();
		        			   });
			        	 }
			        	 else{
			        		 
			        		 }
		        	});
		        }
		        
		        $("#spreadSheetZagwarView").kendoSpreadsheet();
		        $scope.viewExcel =function(dataItem){
		        	 $rootScope.content_preloader_show();
		        	 $scope.workTitle=dataItem.data2;
		          	 mainService.withdomain('get','/api/excel/verify/nbb/'+dataItem.appid+'/'+dataItem.formid).then(function(response){
		           		 if(response!=false){
		           			$scope.xlsx=true;
			         	    $scope.purl='/api/excel/export/nbb/'+dataItem.appid+'/'+dataItem.formid;
			         	    var xhr = new XMLHttpRequest();
				           	xhr.open('GET',  $scope.purl, true);
				           	xhr.responseType = 'blob';
				           	 
				           	xhr.onload = function(e) {
				           	  if (this.status == 200) {
				           	    // get binary data as a response
				           		  
				           	    var blob = this.response;
				           	    
				           	    console.log(blob);
				           	    var spreadsheet = $("#spreadSheetZagwarView").data("kendoSpreadsheet");
				 		            spreadsheet.fromFile(blob);				 		          
							   		UIkit.modal("#modal_excel_file", {center: false}).show();
				           	  }
				           	  else{
				           		  sweet.show('Анхаар!', 'Файл устгагдсан байна.', 'error');
				           	  }
				           	};
				            setTimeout(function(){
          	 					 $rootScope.content_preloader_hide();
  	                         }, 3000);
				           	xhr.send();    	 					
		           		 }
		           		 else{
		           			 sweet.show('Анхаар!', 'Excel тайлан оруулаагүй байна !!!', 'error');
		           			 $rootScope.content_preloader_hide();
		           		 }
		           		
		           	 });
	            }
		        
		    	
		        $scope.picture=function(x){    	         	   
	         	   if(x.split('.').length>0){
	         		   if(x.split('.')[x.split('.').length-1]=='jpeg' || x.split('.')[x.split('.').length-1]=='jpg' || x.split('.')[x.split('.').length-1]=='png' || x.split('.')[x.split('.').length-1]=='gif'){
	         			   return true;
	         		   }
	         		  
	         	   }
	         	   return false;
	            }
		        $scope.checkExcel=function(x){    	         	   
		         	   if(x.split('.').length>0){
		         		   if(x.split('.')[x.split('.').length-1]=='xlsx' || x.split('.')[x.split('.').length-1]=='xls'){
		         			   return true;
		         		   }
		         		  
		         	   }
		         	   return false;
		            }
		        $scope.checkPdf=function(x){    	         	   
		         	   if(x.split('.').length>0){
		         		   if(x.split('.')[x.split('.').length-1]=='pdf'){
		         			   return true;
		         		   }
		         		  
		         	   }
		         	   return false;
		            }
		        $scope.formFileView= function(item){
		        	console.log(item);
		        	var ispic=$scope.picture(item.filename);
		        	if(ispic){
		        		$scope.fileId=item.id;
		        		UIkit.modal("#modal_lightbox_pic", {center: false}).show();
		        	}
		        	var isexcel=$scope.checkExcel(item.filename);
		        	if(isexcel){
		        		$scope.xlsx=true;
		        		$scope.purl='/formfile/'+item.id;
		         	    var xhr = new XMLHttpRequest();
			           	xhr.open('GET',  $scope.purl, true);
			           	xhr.responseType = 'blob';
			           	 
			           	xhr.onload = function(e) {
			           	  if (this.status == 200) {
			           	    // get binary data as a response
			           	    var blob = this.response;
			           	    var spreadsheet = $("#spreadSheetFileView").data("kendoSpreadsheet");
			 		            spreadsheet.fromFile(blob);		 		          
			 		            UIkit.modal("#modal_notloh_file", {modal: false, keyboard: false, bgclose: false, center: false}).show();
			           	  }
			           	  else{
			           		  sweet.show('Анхаар!', 'Файл устгагдсан байна.', 'error');
			           	  }
			           	};
			           	 
			           	xhr.send();
		        	}
		        	var ispdf=$scope.checkPdf(item.filename);
		        	if(ispdf){
		        		$scope.pdf=true;
		        		$scope.pdfurl='/formfile/'+item.id;
		        		
		        		var url = '/formfile/'+item.id;
		        		// The workerSrc property shall be specified.
		        		PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

		        		var pdfDoc = null,
		        		    pageNum = 1,
		        		    pageRendering = false,
		        		    pageNumPending = null,
		        		    scale = 0.8,
		        		    canvas = document.getElementById('the-canvas'),
		        		    ctx = canvas.getContext('2d');

		        		function renderPage(num) {
		        		  pageRendering = true;
		        		  // Using promise to fetch the page
		        		  pdfDoc.getPage(num).then(function(page) {
		        		    var viewport = page.getViewport(scale);
		        		    canvas.height = viewport.height;
		        		    canvas.width = viewport.width;

		        		    // Render PDF page into canvas context
		        		    var renderContext = {
		        		      canvasContext: ctx,
		        		      viewport: viewport
		        		    };
		        		    var renderTask = page.render(renderContext);

		        		    // Wait for rendering to finish
		        		    renderTask.promise.then(function() {
		        		      pageRendering = false;
		        		      if (pageNumPending !== null) {
		        		        // New page rendering is pending
		        		        renderPage(pageNumPending);
		        		        pageNumPending = null;
		        		      }
		        		    });
		        		  });

		        		  // Update page counters
		        		  document.getElementById('page_num').textContent = pageNum;
		        		}

		        		/**
		        		 * If another page rendering in progress, waits until the rendering is
		        		 * finised. Otherwise, executes rendering immediately.
		        		 */
		        		function queueRenderPage(num) {
		        		  if (pageRendering) {
		        		    pageNumPending = num;
		        		  } else {
		        		    renderPage(num);
		        		  }
		        		}

		        		/**
		        		 * Displays previous page.
		        		 */
		        		function onPrevPage() {
		        		  if (pageNum <= 1) {
		        		    return;
		        		  }
		        		  pageNum--;
		        		  queueRenderPage(pageNum);
		        		}
		        		document.getElementById('prev').addEventListener('click', onPrevPage);

		        		/**
		        		 * Displays next page.
		        		 */
		        		function onNextPage() {
		        		  if (pageNum >= pdfDoc.numPages) {
		        		    return;
		        		  }
		        		  pageNum++;
		        		  queueRenderPage(pageNum);
		        		}
		        		document.getElementById('next').addEventListener('click', onNextPage);

		        		/**
		        		 * Asynchronously downloads PDF.
		        		 */
		        		PDFJS.getDocument(url).then(function(pdfDoc_) {
		        		  pdfDoc = pdfDoc_;
		        		  document.getElementById('page_count').textContent = pdfDoc.numPages;

		        		  // Initial/first page rendering
		        		  renderPage(pageNum);
		        		});
		        		
		        		modalpdf.show();		        		
		        	}
		        }
		        
		        var modalpdf = UIkit.modal("#modal_pdf", {modal: false, keyboard: false, bgclose: false, center: false});
		        
		        $("#spreadSheetFileView").kendoSpreadsheet();
		        $scope.viewExcelNotloh =function(dataItem){
		        	$scope.xlsx=false;
		        	$scope.pdf=false;
		        	$scope.img=false;
		        	if(dataItem.mimetype=='xlsx' || dataItem.mimetype=='xls'){
		        		$scope.xlsx=true;
		        		$scope.purl='/api/file/download/'+dataItem.appid+'/'+dataItem.id;
		         	    var xhr = new XMLHttpRequest();
			           	xhr.open('GET',  $scope.purl, true);
			           	xhr.responseType = 'blob';
			           	 
			           	xhr.onload = function(e) {
			           	  if (this.status == 200) {
			           	    // get binary data as a response
			           	    var blob = this.response;
			           	    var spreadsheet = $("#spreadSheetFileView").data("kendoSpreadsheet");
			 		            spreadsheet.fromFile(blob);		 		          
			 		            UIkit.modal("#modal_notloh_file", {modal: false, keyboard: false, bgclose: false, center: false}).show();
			           	  }
			           	  else{
			           		  sweet.show('Анхаар!', 'Файл устгагдсан байна.', 'error');
			           	  }
			           	};
			           	 
			           	xhr.send();
		        	}
		        	if(dataItem.mimetype=='pdf'){
		        		$scope.pdf=true;
		        		$scope.pdfurl='/api/files/'+dataItem.appid+'/'+dataItem.id;
		        		
		        		var url = '/api/files/'+dataItem.appid+'/'+dataItem.id;
		        		// The workerSrc property shall be specified.
		        		PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

		        		var pdfDoc = null,
		        		    pageNum = 1,
		        		    pageRendering = false,
		        		    pageNumPending = null,
		        		    scale = 0.8,
		        		    canvas = document.getElementById('the-canvas'),
		        		    ctx = canvas.getContext('2d');

		        		function renderPage(num) {
		        		  pageRendering = true;
		        		  // Using promise to fetch the page
		        		  pdfDoc.getPage(num).then(function(page) {
		        		    var viewport = page.getViewport(scale);
		        		    canvas.height = viewport.height;
		        		    canvas.width = viewport.width;

		        		    // Render PDF page into canvas context
		        		    var renderContext = {
		        		      canvasContext: ctx,
		        		      viewport: viewport
		        		    };
		        		    var renderTask = page.render(renderContext);

		        		    // Wait for rendering to finish
		        		    renderTask.promise.then(function() {
		        		      pageRendering = false;
		        		      if (pageNumPending !== null) {
		        		        // New page rendering is pending
		        		        renderPage(pageNumPending);
		        		        pageNumPending = null;
		        		      }
		        		    });
		        		  });

		        		  // Update page counters
		        		  document.getElementById('page_num').textContent = pageNum;
		        		}

		        		/**
		        		 * If another page rendering in progress, waits until the rendering is
		        		 * finised. Otherwise, executes rendering immediately.
		        		 */
		        		function queueRenderPage(num) {
		        		  if (pageRendering) {
		        		    pageNumPending = num;
		        		  } else {
		        		    renderPage(num);
		        		  }
		        		}

		        		/**
		        		 * Displays previous page.
		        		 */
		        		function onPrevPage() {
		        		  if (pageNum <= 1) {
		        		    return;
		        		  }
		        		  pageNum--;
		        		  queueRenderPage(pageNum);
		        		}
		        		document.getElementById('prev').addEventListener('click', onPrevPage);

		        		/**
		        		 * Displays next page.
		        		 */
		        		function onNextPage() {
		        		  if (pageNum >= pdfDoc.numPages) {
		        		    return;
		        		  }
		        		  pageNum++;
		        		  queueRenderPage(pageNum);
		        		}
		        		document.getElementById('next').addEventListener('click', onNextPage);

		        		/**
		        		 * Asynchronously downloads PDF.
		        		 */
		        		PDFJS.getDocument(url).then(function(pdfDoc_) {
		        		  pdfDoc = pdfDoc_;
		        		  document.getElementById('page_count').textContent = pdfDoc.numPages;

		        		  // Initial/first page rendering
		        		  renderPage(pageNum);
		        		});
		        		
		        		modalpdf.show();		        		
		        	}
		        	if($scope.picture(dataItem.filename)){
		        		$scope.img=true;
		        		$scope.purl='/api/files/'+dataItem.appid+'/'+dataItem.id;
		        		UIkit.modal("#modal_notloh_file", {modal: false, keyboard: false, bgclose: false, center: false}).show();
		        	}
	            }
		        
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
	         
	            
	            

	            var selectize_val_options = $scope.selectize_val_options = [];

	            $scope.selectize_val_config = {
	                maxItems: 1,
	                valueField: 'data1',
	                labelField: 'data1',
	                create: false,
	                placeholder: 'Данс сонгох...',
	                onChange: function() {
	                    $timeout(function() {
	                        $formValidate.parsley().validate();
	                    })
	                }
	            };
	            
	            var modal_a_4 = UIkit.modal("#modal_a_4", {modal: false, keyboard: false, bgclose: false, center: false});
		        
	            $scope.a4data={};
	            
		        $scope.selectA4 = function(x,y){
		        	$scope.a4formid=y;
		        	$scope.sendBtn=true;		     
		        	$rootScope.content_preloader_show();           
			       	mainService.withdomain('get','/api/excel/a4/'+y+'/'+$scope.planid).then(function(response){
			       		$rootScope.content_preloader_hide();          
			       		if(response.plan==false){
			       			sweet.show('Анхаар!', 'Төлөвлөлтийн үе шатны Excel тайлан устсан байна!!!', 'warning');	
			       		}
			       		else if(response.process==false){
			       			sweet.show('Анхаар!', 'Гүйцэтгэлийн үе шатны Excel тайлан устсан байна!!!', 'warning');	
			       		}
			       		else{
			       			modal_a_4.show();			           		 
			           		$scope.a4=response;
			           		for(var i=0;i<=response.length;i++) {
			           			selectize_val_options.push(response[i]);
			           		}
			       		}		           		
		           	});
	        	}
		        
		       
		        
		        $scope.selectB31 = function(item){		        	
		        	$scope.sendBtn=true;		        	
		        	console.log(item);
		        	var level=item.levelid;
		        	if(level==2){
		        		level=level+1;
		        	}
		        	$state.go('restricted.work.accSurvey',{planid:item.appid,formid:item.formid,levelid:level});
	        	}
		        
		        
	            $scope.submitA4 = function() {
			       $scope.sendBtn=false;
			       UIkit.modal("#modal_a_4").hide();
			       $rootScope.content_preloader_show();         
			       mainService.withdata('post','/api/excel/a4/'+$scope.a4formid+'/'+$scope.planid, $scope.a4data).then(function(response){
			    	   UIkit.notify("Амжилттай хадгаллаа.", {status:'success', pos: 'top-right'});
			    	   $rootScope.content_preloader_hide();   
			    	   $(".afl .k-grid").data("kendoGrid").dataSource.read();
		           });
		        };
		        
		        
		        var modal_upload = UIkit.modal("#modal_excel_upload", {modal: false, keyboard: false, bgclose: false, center: false});
		        $scope.uploadExcel = function(x,y){
		        	 $scope.workTitle=x.data2;
		        	 //cfpLoadingBar.start();
		        	 $scope.sendBtn=true;
		        	 $scope.uploadfile=null;
		        	 $scope.file=null;
		        	 progressbar.addClass("uk-hidden");
		        	 modal_upload.show();
		        	 $scope.noteid=y;
	        	}
		        
		        $scope.modalPayRollExcel = function(item){
		        	console.log(item);
		        	 $scope.workTitle=item.data2;
		        	 //cfpLoadingBar.start();
		        	 $scope.sendBtn=true;
		        	 $scope.uploadfile=null;
		        	 $scope.file=null;
		        	 progressbar.addClass("uk-hidden");
		        	 modal_upload.show();
		        	 $scope.noteid=item.formid;
		        }
		        
		    	
			    $scope.submitUpload = function() {
			       $scope.sendBtn=false;
			       if ($scope.formUpload.uploadfile.$valid && $scope.uploadfile) {
			    	   bar.css("width", "0%").text("0%");
                       progressbar.removeClass("uk-hidden");
			           $scope.upload($scope.uploadfile, $scope.noteid);
			       }
		        };
		     
    		    
    			var select = UIkit.uploadSelect($("#file_upload-select"), settings),
                drop   = UIkit.uploadDrop($("#file_upload-drop"), settings);
 
			    $('.dropify').dropify();

			    $('.dropify-mn').dropify({
	                messages: {
	                    default: 'Excel тайлан оруулна',
	                    replace: 'Excel тайлан шинээр оруулах бол энд дарна уу',
	                    remove:  'Солих',
	                    error:   'Алдаа үүслээ'
	                }
	            });

			    $scope.fileChange = function(){
			    	$scope.errList=[];
			    }
			    var modal = UIkit.modal("#modal_header_footer_print", {modal: false, keyboard: false, bgclose: false, center: false});
				$scope.modalExcel =function(dataItem){		
    				modal.show();
    				$scope.sendBtn=true;
    				$scope.file=null;
    				$scope.ars=[];
    				$scope.allData=dataItem;
    				progressbar.addClass("uk-hidden");
    			}
				
				var modalDownload = UIkit.modal("#modal_header_footer_download", {modal: false, keyboard: false, bgclose: false, center: false});
				$scope.modalExcelDownload =function(dataItem){	
					mainService.withdomain('get', '/api/excel/report/'+mainobj.id+'/'+dataItem.data13).
					then(function(data){
						$scope.reportData=data;
						if(data.length>0){
							modalDownload.show();
		    				progressbar.addClass("uk-hidden");
						}
						else{
							 UIkit.notify("Тайлан татаагүй байна.", {status:'warning', pos: 'top-right'});
						}
					});					
    			}
				
			    var comType=[{"text":"Залруулах","value":1},{"text":"Акт тавих","value":2},{"text":"Албан шаардлага өгөх","value":3},{"text":"Зөвлөмж өгөх","value":4}];
			    
			    var comResult=[{"text":"Залруулсан","value":1},{"text":"Залруулаагүй","value":2},{"text":"Зөвшөөрсөн","value":3},{"text":"Тайлбартай","value":4}];
			    
			    var ismatter=[{"text":"Материаллаг","value":1},{"text":"Материаллаг бус","value":0}];
			    
			    var lastlevel=[{"text":"Төлөвлөх","value":1},{"text":"Гүйцэтгэх","value":2},{"text":"Түүвэр","value":3}];
			    
				var modalProb = UIkit.modal("#modal_problem_grid", {modal: false, keyboard: false, bgclose: false, center: false});
				$scope.fin=true;
				$scope.modalProblemAkt = function(dataItem){
					modalProb.show();
					$scope.fin=false;
					$scope.ash=false;
					$scope.akt=true;
					$scope.integration=false;
					$scope.problem=false;
					$scope.advice=false;
					$scope.domainProblem="com.nbb.models.fn.LnkAuditProblem.";
					$scope.problemTitle=dataItem.data2;
					$scope.problemGridAkt = {
			                dataSource: {	                   
			                    autoSync:true,
			                	transport: {
			                    	read:  {
			                            url: "/core/list/LnkAuditProblem",
			                            contentType:"application/json; charset=UTF-8",     
			                            data: {"custom":"where appid="+mainobj.id+" and finish=1 and result=2"},
			                            type:"POST"
			                        },
			                        update: {
			                            url: "/core/update/"+$scope.domainProblem+"",
			                            contentType:"application/json; charset=UTF-8",                                    
			                            type:"POST",
			                            complete: function(e) {
			                            	$(".k-grid").data("kendoGrid").dataSource.read(); 
			                    		}
			                        },
			                        destroy: {
			                            url: "/core/delete/"+$scope.domainProblem+"",
			                            contentType:"application/json; charset=UTF-8",                                    
			                            type:"POST"
			                        },
			                        create: {
			                        	url: "/core/create/"+$scope.domainProblem+"",
			                            contentType:"application/json; charset=UTF-8",                                    
			                            type:"POST",
			                            data:{"appid":+mainobj.id,"active":true},
			                            complete: function(e) {
			                            	 $rootScope.content_preloader_show();
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
			                             	acc: { type: "string",editable:false, validation: { required: true } },
			                            	accCode: { type: "number", editable:false },
			                             	problem: { type: "string", editable:false,validation: { required: true } },
			                             	aktName: { type: "string"},
			                             	aktZaalt: { type: "string" },
			                             	amount: { type: "number", editable:false},
			                             	stepid: { type: "number", editable:false},
			                            	comMatter: { type: "number", editable:false},
			                             	matter: { type: "number", editable:false},
			                             	commentType: { type: "number"},
			                             	answer: { type: "number"},
			                             	result: { type: "number", editable:false},
			                            	comResult: { type: "number", editable:false},
			                            	comAmount: { type: "number", editable:false},
			                            	comAktName: { type: "string"},
			                            	comAktZaalt: { type: "string"},
			                            	finalAmount:{type:"number"},
			                            	finalAktAmount:{type:"number"},
			                            	active:{type:"boolean", defaultValue:true}
			                             }
			                         }
			                     },
			                    pageSize: 10,
			                    serverFiltering: true,
			                    serverPaging: true,
			                    serverSorting: true,
			                  /*  group: {
			                        field: "acc"
			                    },*/
			                    group: [{
                                     field: "acc" 
			                    	},{
                                     field: "stepid" 
			                    	},{
                                     field: "finDate" 
			                    	}],
	
			                },		
			                filterable:{
				                	 mode: "row"
				                },
			                height: function(){
	    	            	  return $(window).height()-90;
	    	                },
	    	                //toolbar: kendo.template($("#template").html()),
	    	                //toolbar: ["create", "save", "cancel"],
			                sortable: true,
			                resizable: true,
			                pageable: {
			                    refresh: true,
			                    pageSizes: true,
			                    buttonCount: 5
			                },
			                columns: [
			                	 	  { title: "№", attributes: {"class": "customClassCenter"}, template: "<span class='row-number'></span>", width:60},
			                          { field:"acc", attributes: {"class": "customClassCenter"}, template:"<span>#=acc#</span><br><span>#=accCode#</span>",title: "Сорил хийсэн дансны нэр",width:200},				                          
			                          { field:"problem", attributes: {
			                              "class": "customClass",
			                          }, title: "Аудитаар илэрсэн асуудал",template:"<span class='just'>#:problem#</span> <a href='/api/excel/export/akt/{{planid}}/#:id#'  target='_self' download='асуудлын бүртгэл'  class='md-btn md-btn-mini md-btn-wave'><i class='uk-icon-download'></i></a>", width:200 },	
			                          { field:"amount", attributes: {"class": "customClassCenter"}, title:"Дүн", template:"<span>#:amount# ₮</span>", width:200}, 	
			                          { field:"finDate", title:"Эцэслэсэн огноо",hidden:true,  width:200}, 	
			                    /*      { field:"matter", values:ismatter, title: "Санхүүгийн тайланд үзүүлэх нөлөө (материаллаг, материаллаг бус)", width:200},
			                          { field:"commentType", values:comType, title:"Аудиторын санал (бүртгэлийн бичилт, тооцоолол)", width:200},
			                          { field:"aktName",editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын нэр", width:200},
			                          { field:"aktZaalt",editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын заалт", width:200},
			                          { field:"comResult", values:comResult, title:"Тухайн байгууллагын зөвшөөрсөн эсэх", width:200},
			                          { field:"comAmount", title:"Тухайн байгууллагын саналын  дүн", width:200},*/
			              /*            { field:"comResult", values:comResult, title:"Тухайн байгууллагын зөвшөөрсөн эсэх", width:200},
			                          { field:"comAmount", title:"Тухайн байгууллагын саналын  дүн", width:200},*/
			                          { field:"comMatter", values:ismatter, title:"Санхүүгийн тайланд үзүүлэх нөлөө (материаллаг, материаллаг бус)", width:200},
			                          { field:"comAktName",attributes: {"class": "customClass"}, editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын нэр", width:200},
			                          { field:"comAktZaalt",attributes: {"class": "customClass"}, editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын заалт", width:200},
			                          { field:"stepid", title: "Үе шат", hidden:true,values:lastlevel, width:200},	
			                          { field:"finalAktAmount", attributes: {"class": "customClassCenter"}, template:"<span>#:finalAktAmount# ₮</span>", title: "Аудитаар эцэслэсэн дүн", width:200},
			                          { template:"<a href='/api/excel/export/akt/{{planid}}/#:id#'  target='_self' download='асуудлын бүртгэл'  class='k-button k-button-icontext'><i class='uk-icon-download'></i> Татах</a>",  width:100},
		                    ],
		                    editable:true,
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
				

				$scope.modalProblemAsh = function(dataItem){
					modalProb.show();
					$scope.fin=false;
					$scope.ash=true;
					$scope.akt=false;
					$scope.integration=false;
					$scope.problem=false;
					$scope.advice=false;
					$scope.domainProblem="com.nbb.models.fn.LnkAuditProblem.";
					$scope.problemTitle=dataItem.data2;
					$scope.problemGridAsh = {
			                dataSource: {	                   
			                    autoSync:true,
			                	transport: {
			                    	read:  {
			                            url: "/core/list/LnkAuditProblem",
			                            contentType:"application/json; charset=UTF-8",     
			                            data: {"custom":"where appid="+mainobj.id+" and finish=1 and result=3"},
			                            type:"POST"
			                        },
			                        update: {
			                            url: "/core/update/"+$scope.domainProblem+"",
			                            contentType:"application/json; charset=UTF-8",                                    
			                            type:"POST",
			                            complete: function(e) {
			                            	$(".k-grid").data("kendoGrid").dataSource.read(); 
			                    		}
			                        },
			                        destroy: {
			                            url: "/core/delete/"+$scope.domainProblem+"",
			                            contentType:"application/json; charset=UTF-8",                                    
			                            type:"POST"
			                        },
			                        create: {
			                        	url: "/core/create/"+$scope.domainProblem+"",
			                            contentType:"application/json; charset=UTF-8",                                    
			                            type:"POST",
			                            data:{"appid":+mainobj.id},
			                            complete: function(e) {
			                            	 $rootScope.content_preloader_show();
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
			                             	acc: { type: "string",editable:false, validation: { required: true } },
			                            	accCode: { type: "number", editable:false },
			                             	problem: { type: "string", editable:false,validation: { required: true } },
			                             	aktName: { type: "string"},
			                             	aktZaalt: { type: "string" },
			                             	amount: { type: "number", editable:false},
			                             	stepid: { type: "number", editable:false},
			                            	comMatter: { type: "number", editable:false},
			                             	matter: { type: "number", editable:false},
			                             	commentType: { type: "number"},
			                             	answer: { type: "number"},
			                             	result: { type: "number", editable:false},
			                            	comResult: { type: "number"},
			                            	comAmount: { type: "number"},
			                            	comAktName: { type: "string"},
			                            	comAktZaalt: { type: "string"},
			                            	finalAmount:{type:"number"},
			                            	finalAshAmount:{type:"number"}
			                             }
			                         }
			                     },
			                    pageSize: 10,
			                    serverFiltering: true,
			                    serverPaging: true,
			                    serverSorting: true,
			                  /*  group: {
			                        field: "acc"
			                    },*/
			                    group: [{
                                     field: "acc" 
			                    	},{
                                     field: "stepid" 
			                    	},{
                                     field: "finDate" 
			                    	}],
	
			                },		
			                filterable:{
				                	 mode: "row"
				                },
			                height: function(){
	    	            	  return $(window).height()-90;
	    	                },
	    	                //toolbar: kendo.template($("#template").html()),
	    	                //toolbar: ["create", "save", "cancel"],
			                sortable: true,
			                resizable: true,
			                pageable: {
			                    refresh: true,
			                    pageSizes: true,
			                    buttonCount: 5
			                },
			                columns: [
			                	 	  { title: "№",template: "<span class='row-number'></span>", width:60},
			                	 	  { field:"acc", attributes: {"class": "customClassCenter"}, template:"<span>#=acc#</span><br><span>#=accCode#</span>",title: "Сорил хийсэн дансны нэр",width:200},				                          
			                	 	  { field:"problem", attributes: {"class": "customClass"}, title: "Аудитаар илэрсэн асуудал",
			                          template:"<span class='just'>#:problem#</span> <a href='/api/excel/export/ash/{{planid}}/#:id#'  target='_self' download='асуудлын бүртгэл'  class='md-btn md-btn-mini md-btn-wave'><i class='uk-icon-download'></i></a>", width:200 },	
			                          { field:"amount",  attributes: {"class": "customClassCenter"}, title:"Дүн", template:"<span>#:amount# ₮</span>", width:200}, 	
			                          { field:"finDate", title:"Эцэслэсэн огноо",hidden:true,  width:200}, 	
			                    /*      { field:"matter", values:ismatter, title: "Санхүүгийн тайланд үзүүлэх нөлөө (материаллаг, материаллаг бус)", width:200},
			                          { field:"commentType", values:comType, title:"Аудиторын санал (бүртгэлийн бичилт, тооцоолол)", width:200},
			                          { field:"aktName",editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын нэр", width:200},
			                          { field:"aktZaalt",editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын заалт", width:200},
			                          { field:"comResult", values:comResult, title:"Тухайн байгууллагын зөвшөөрсөн эсэх", width:200},
			                          { field:"comAmount", title:"Тухайн байгууллагын саналын  дүн", width:200},*/
			                          { field:"comMatter", values:ismatter, title:"Санхүүгийн тайланд үзүүлэх нөлөө (материаллаг, материаллаг бус)", width:200},
			                          { field:"result", values:comType, title:"Уулзалтын үр дүнгийн баталгаажуулалт", width:200},
			                          { field:"comAktName",attributes: {"class": "customClass"}, editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын нэр", width:200},
			                          { field:"comAktZaalt",attributes: {"class": "customClass"}, editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын заалт", width:200},
			                          { field:"stepid", hidden:true, title: "Үе шат",values:lastlevel, width:200},	
			                          { field:"finalAshAmount", attributes: {"class": "customClassCenter"}, template:"<span>#:finalAshAmount# ₮</span>", title: "Аудитаар эцэслэсэн дүн", width:200},
			                          { template:"<a href='/api/excel/export/ash/{{planid}}/#:id#'  target='_self' download='асуудлын бүртгэл'  class='k-button k-button-icontext'><i class='uk-icon-download'></i> Татах</a>",  width:100},
		                    ],
		                    editable:true,
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
				
				$scope.modalZuvlumjView = function(dataItem){
					modalProb.show();
					$scope.fin=false;
					$scope.ash=false;
					$scope.akt=false;
					$scope.integration=false;
					$scope.problem=false;
					$scope.advice=true;
					$scope.domainProblem="com.nbb.models.fn.LnkAuditProblem.";
					$scope.problemTitle=dataItem.data2;
					$scope.problemGridZuv = {
			                dataSource: {	                   
			                    autoSync:true,
			                	transport: {
			                    	read:  {
			                            url: "/core/list/LnkAuditProblem",
			                            contentType:"application/json; charset=UTF-8",     
			                            data: {"custom":"where appid="+mainobj.id+" and finish=1 and result=4"},
			                            type:"POST"
			                        },
			                        update: {
			                            url: "/core/update/"+$scope.domainProblem+"",
			                            contentType:"application/json; charset=UTF-8",                                    
			                            type:"POST",
			                            complete: function(e) {
			                            	$(".k-grid").data("kendoGrid").dataSource.read(); 
			                    		}
			                        },
			                        destroy: {
			                            url: "/core/delete/"+$scope.domainProblem+"",
			                            contentType:"application/json; charset=UTF-8",                                    
			                            type:"POST"
			                        },
			                        create: {
			                        	url: "/core/create/"+$scope.domainProblem+"",
			                            contentType:"application/json; charset=UTF-8",                                    
			                            type:"POST",
			                            data:{"appid":+mainobj.id},
			                            complete: function(e) {
			                            	 $rootScope.content_preloader_show();
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
			                             	acc: { type: "string",editable:false, validation: { required: true } },
			                            	accCode: { type: "number", editable:false },
			                             	problem: { type: "string", editable:false,validation: { required: true } },
			                             	aktName: { type: "string"},
			                             	aktZaalt: { type: "string" },
			                             	amount: { type: "number", editable:false},
			                             	stepid: { type: "number", editable:false},
			                            	comMatter: { type: "number", editable:false},
			                             	matter: { type: "number", editable:false},
			                             	commentType: { type: "number"},
			                             	answer: { type: "number"},
			                             	result: { type: "number", editable:false},
			                            	comResult: { type: "number"},
			                            	comAmount: { type: "number"},
			                            	comAktName: { type: "string"},
			                            	comAktZaalt: { type: "string"},
			                            	finalAmount:{type:"number"},
			                            	finalZuvAmount:{type:"number"}			                            	
			                             }
			                         }
			                     },
			                    pageSize: 10,
			                    serverFiltering: true,
			                    serverPaging: true,
			                    serverSorting: true,
			                  /*  group: {
			                        field: "acc"
			                    },*/
			                    group: [{
                                     field: "acc" 
			                    	},{
                                     field: "stepid" 
			                    	},{
                                     field: "finDate" 
			                    	}],
	
			                },		
			                filterable:{
				                	 mode: "row"
				                },
			                height: function(){
	    	            	  return $(window).height()-90;
	    	                },
			                sortable: true,
			                resizable: true,
			                pageable: {
			                    refresh: true,
			                    pageSizes: true,
			                    buttonCount: 5
			                },
			                columns: [
			                	 	  { title: "№",template: "<span class='row-number'></span>", width:60},
			                	 	  { field:"acc", attributes: {"class": "customClassCenter"}, template:"<span>#=acc#</span><br><span>#=accCode#</span>",title: "Сорил хийсэн дансны нэр",width:200},
			                	 	  { field:"problem", attributes: {"class": "customClass"}, title: "Аудитаар илэрсэн асуудал",width:200},
			                	 	 /* { field:"problem", attributes: {"class": "customClass"}, title: "Аудитаар илэрсэн асуудал",
			                          template:"<span class='just'>#:problem#</span> <a href='/api/excel/export/ash/{{planid}}/#:id#'  target='_self' download='асуудлын бүртгэл'  class='md-btn md-btn-mini md-btn-wave'><i class='uk-icon-download'></i></a>", width:200 },*/	
			                          { field:"amount",  attributes: {"class": "customClassCenter"}, title:"Дүн", template:"<span>#:amount# ₮</span>", width:200}, 	
			                          { field:"finDate", title:"Эцэслэсэн огноо",hidden:true,  width:200}, 	
			                    /*      { field:"matter", values:ismatter, title: "Санхүүгийн тайланд үзүүлэх нөлөө (материаллаг, материаллаг бус)", width:200},
			                          { field:"commentType", values:comType, title:"Аудиторын санал (бүртгэлийн бичилт, тооцоолол)", width:200},
			                          { field:"aktName",editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын нэр", width:200},
			                          { field:"aktZaalt",editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын заалт", width:200},
			                          { field:"comResult", values:comResult, title:"Тухайн байгууллагын зөвшөөрсөн эсэх", width:200},
			                          { field:"comAmount", title:"Тухайн байгууллагын саналын  дүн", width:200},*/
			                          { field:"comMatter", values:ismatter, title:"Санхүүгийн тайланд үзүүлэх нөлөө (материаллаг, материаллаг бус)", width:200},
			                 /*         { field:"result", values:comType, title:"Уулзалтын үр дүнгийн баталгаажуулалт", width:200},
			                          { field:"comAktName",attributes: {"class": "customClass"}, editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын нэр", width:200},
			                          { field:"comAktZaalt",attributes: {"class": "customClass"}, editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын заалт", width:200},*/
			                          { field:"stepid", hidden:true,title: "Үе шат",values:lastlevel, width:200},	
			                          { field:"finalZuvAmount", attributes: {"class": "customClassCenter"}, template:"<span>#:finalZuvAmount# ₮</span>", title: "Аудитаар эцэслэсэн дүн", width:200},
			                         /* { template:"<a href='/api/excel/export/ash/{{planid}}/#:id#'  target='_self' download='асуудлын бүртгэл'  class='k-button k-button-icontext'><i class='uk-icon-download'></i> Татах</a>",  width:100},*/
		                    ],
		                    editable:true,
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
				
				
				$scope.modalProblemIntegration = function(dataItem){
					modalProb.show();
					$scope.fin=false;
					$scope.ash=false;
					$scope.akt=false;
					$scope.problem=false;
					$scope.integration=true;
					$scope.advice=false;
					$scope.finItem=dataItem;
					$scope.domainProblem="com.nbb.models.fn.LnkAuditProblem.";
					$scope.problemTitle=dataItem.data2;
					$scope.problemGridIntegration = {
			                dataSource: {	                   
			                    autoSync:true,
			                	transport: {
			                    	read:  {
			                            url: "/core/list/LnkAuditProblem",
			                            contentType:"application/json; charset=UTF-8",     
			                            data: {"custom":"where appid="+mainobj.id+" and finish=1"},
			                            type:"POST"
			                        },
			                        update: {
			                            url: "/core/update/"+$scope.domainProblem+"",
			                            contentType:"application/json; charset=UTF-8",                                    
			                            type:"POST",
			                            complete: function(e) {
			                            	$(".k-grid").data("kendoGrid").dataSource.read(); 
			                    		}
			                        },
			                        destroy: {
			                            url: "/core/delete/"+$scope.domainProblem+"",
			                            contentType:"application/json; charset=UTF-8",                                    
			                            type:"POST"
			                        },
			                        create: {
			                        	url: "/core/create/"+$scope.domainProblem+"",
			                            contentType:"application/json; charset=UTF-8",                                    
			                            type:"POST",
			                            data:{"appid":+mainobj.id},
			                            complete: function(e) {
			                            	 $rootScope.content_preloader_show();
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
			                             	acc: { type: "string",editable:false, validation: { required: true } },
			                            	accCode: { type: "number", editable:false },
			                             	problem: { type: "string", editable:false,validation: { required: true } },
			                             	aktName: { type: "string"},
			                             	aktZaalt: { type: "string" },
			                             	amount: { type: "number", editable:false},
			                             	stepid: { type: "number", editable:false},
			                            	comMatter: { type: "number", editable:false},
			                             	matter: { type: "number", editable:false},
			                             	commentType: { type: "number"},
			                             	answer: { type: "number"},
			                             	result: { type: "number", editable:false},
			                            	comResult: { type: "number"},
			                            	comAmount: { type: "number"},
			                            	comAktName: { type: "string"},
			                            	comAktZaalt: { type: "string"},
			                            	finalAmount: { type: "number"},			                            	
			                             }
			                         }
			                     },
			                    pageSize: 10,
			                    serverFiltering: true,
			                    serverPaging: true,
			                    serverSorting: true,
			                  /*  group: {
			                        field: "acc"
			                    },*/
			                    group: [{
                                     field: "acc" 
			                    	},{
                                     field: "finDate" 
			                    	}],
	
			                },		
			                filterable:{
				                	 mode: "row"
				                },
			                height: function(){
	    	            	  return $(window).height()-90;
	    	                },
	    	                toolbar: kendo.template("<a role='button' ng-click='lastAb(finItem)' class='k-button k-button-icontext' href='javascript:void()'><span class='k-icon k-i-file-excel' style='margin-top:2px;'></span> Эцэслэх</a> " +
	    	                		"<a role='button' class='k-button k-button-icontext' href='/api/excel/export/integration/{{planid}}/{{finItem.formid}}'><span class='k-icon k-i-file-excel' style='margin-top:2px;'></span> АБ 20</a>"),
	    	                //toolbar: ["create", "save", "cancel"],
			                sortable: true,
			                resizable: true,
			                pageable: {
			                    refresh: true,
			                    pageSizes: true,
			                    buttonCount: 5
			                },
			                columns: [
			                	 	  { title: "№",template: "<span class='row-number'></span>", width:60},
			                          { field:"acc", title: "Сорил хийсэн дансны нэр",template:"<span>#=acc#</span> <br> <span>#=accCode#</span>",width:200},				                          
			                          { field:"problem", title: "Аудитаар илэрсэн асуудал", width:200 },	
			                          { field:"amount", title:"Дүн", template:"<span>#:amount# ₮</span>", width:200}, 	
			                          { field:"finDate", title:"Эцэслэсэн огноо",hidden:true,  width:200}, 	
			                    /*      { field:"matter", values:ismatter, title: "Санхүүгийн тайланд үзүүлэх нөлөө (материаллаг, материаллаг бус)", width:200},
			                          { field:"commentType", values:comType, title:"Аудиторын санал (бүртгэлийн бичилт, тооцоолол)", width:200},
			                          { field:"aktName",editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын нэр", width:200},
			                          { field:"aktZaalt",editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын заалт", width:200},
			                          { field:"comResult", values:comResult, title:"Тухайн байгууллагын зөвшөөрсөн эсэх", width:200},
			                          { field:"comAmount", title:"Тухайн байгууллагын саналын  дүн", width:200},*/
			                          { field:"comMatter", values:ismatter, title:"Санхүүгийн тайланд үзүүлэх нөлөө (материаллаг, материаллаг бус)", width:200},
			                          { field:"result", values:comType, title:"Уулзалтын үр дүнгийн баталгаажуулалт", width:200},
			                       /*   { field:"comAktName",editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын нэр", width:200},
			                          { field:"comAktZaalt",editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын заалт", width:200},*/
			                          { field:"stepid", title: "Үе шат",values:lastlevel, width:200},	
			                         /* { field:"finalAmount", title: "Аудитаар эцэслэсэн дүн", width:200},*/
		                    ],
		                    editable:true,
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
				
				$scope.lastAb = function(item){
					mainService.withdomain('get','/api/excel/export/last/'+$scope.planid+'/'+item.formid).then(function(response){
			       		$rootScope.content_preloader_hide();          
			       		if(response==false){
			       			sweet.show('Анхаар!', 'Баталгаажуулсан уулзалтын үр дүн олдсонгүй!!!', 'warning');	
			       		}
			       		else{
			       			sweet.show('Анхаар!', 'Амжилттай эцэслэгдлээ.', 'success');	
			       		}		           		
		           	});
				}
				
				$scope.modalProblem = function(dataItem){
					$rootScope.content_preloader_show();
					$scope.ash=false;
					$scope.akt=false;
					$scope.integration=false;
					$scope.problem=true;
					$scope.advice=false;
					mainService.withdomain('get', '/api/excel/problem/'+mainobj.id).
					then(function(data){
						$rootScope.content_preloader_hide();
						modalProb.show();
						$scope.fin=true;
						$scope.domainProblem="com.nbb.models.fn.LnkAuditProblem.";
						$scope.problemTitle=dataItem.data2;
						$scope.problemGrid = {
				                dataSource: {	                   
				                   // autoSync:true,
				                	transport: {
				                    	read:  {
				                            url: "/core/list/LnkAuditProblem",
				                            contentType:"application/json; charset=UTF-8",     
				                            data: {"custom":"where appid="+mainobj.id+" and active=1 and finish=0"},
				                            type:"POST",
				                            complete: function(e) {
				                            	 $rootScope.content_preloader_hide();
				                    		}
				                        },
				                        update: {
				                            url: "/core/update/"+$scope.domainProblem+"",
				                            contentType:"application/json; charset=UTF-8",                                    
				                            type:"POST",
				                            complete: function(e) {
				                            	$(".k-grid").data("kendoGrid").dataSource.read(); 
				                    		}
				                        },
				                        destroy: {
				                            url: "/core/delete/"+$scope.domainProblem+"",
				                            contentType:"application/json; charset=UTF-8",                                    
				                            type:"POST"
				                        },
				                        create: {
				                        	url: "/core/create/"+$scope.domainProblem+"",
				                            contentType:"application/json; charset=UTF-8",                                    
				                            type:"POST",
				                            data:{"appid":+mainobj.id, "active":true},
				                            complete: function(e) {
				                            	 $rootScope.content_preloader_show();
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
				                             	acc: { type: "string", validation: { required: true } },
				                            	accCode: { type: "number" },
				                             	problem: { type: "string", validation: { required: true } },
				                             	aktName: { type: "string"},
				                             	aktZaalt: { type: "string" },
				                             	amount: { type: "number"},
				                             	stepid: { type: "number"},
				                            	comMatter: { type: "number"},
				                             	matter: { type: "number"},
				                             	commentType: { type: "number"},
				                             	answer: { type: "number"},
				                             	result: { type: "number"},
				                            	comResult: { type: "number"},
				                            	comAmount: { type: "number"},
				                            	comAktName: { type: "string"},
				                            	comAktZaalt: { type: "string"},
				                             }
				                         }
				                     },
				                    pageSize: 3,
				                    serverFiltering: true,
				                    serverPaging: true,
				                    serverSorting: true,
				                  /*  group: {
				                        field: "acc"
				                    },*/
				                    group: [{
	                                     field: "insDate" 
				                    	}],
		
				                },		
				                filterable:{
					                	 mode: "row"
					                },
				               /* height: function(){
		    	            	  return $(window).height()-100;
		    	                },*/
		    	                toolbar: kendo.template($("#template").html()),
		    	                //toolbar: ["create", "save", "cancel"],
				                sortable: true,
				                resizable: true,
				                pageable: {
				                    refresh: true,
				                    pageSizes: true,
				                    buttonCount: 5
				                },
				                columns: [
				                	 	  { title: "№",template: "<span class='row-number'></span>",  locked: true, lockable: false,width:60},
				                	 	  { field:"insDate", hidden:true,title: "Огноо"},	
				                          { field:"acc", editor: $scope.textEditor,title: "Сорил хийсэн дансны нэр",width:150,  locked: true, lockable: false},				                          
				                          { field:"problem",editor: $scope.textEditor, title: "Аудитаар илэрсэн асуудал", width:200 ,  locked: true, lockable: false},	
				                          { field:"amount", title:"Дүн", template:"<span>#:amount# ₮</span>", width:200,  locked: true, lockable: false}, 		                         
				                          { field:"matter", values:ismatter, title: "Санхүүгийн тайланд үзүүлэх нөлөө (материаллаг, материаллаг бус)", width:200},
				                          { field:"commentType", values:comType, title:"Аудиторын санал (бүртгэлийн бичилт, тооцоолол)", width:200},
				                          { field:"aktName",editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын нэр", width:200},
				                          { field:"aktZaalt",editor: $scope.textEditor, title:"Зөрчсөн эрхийн актын заалт", width:200},
				                          { field:"comResult", values:comResult, title:"Тухайн байгууллагын зөвшөөрсөн эсэх", width:200},
				                          { field:"comAmount", title:"Тухайн байгууллагын саналын  дүн", width:200},
				                          { field:"comMatter", values:ismatter, title:"Санхүүгийн тайланд үзүүлэх нөлөө (материаллаг, материаллаг бус)", width:200},
				                          { field:"result", values:comType, title:"Уулзалтын үр дүнгийн баталгаажуулалт", width:200},
				                          { field:"comAktName", title:"Зөрчсөн эрхийн актын нэр", editor: $scope.textEditor, width:200},
				                          { field:"comAktZaalt", title:"Зөрчсөн эрхийн актын заалт", editor: $scope.textEditor, width:200},
				                          { field:"stepid", title: "Үе шат",values:lastlevel, width:200},	
				                          { field:"accCode", title: "Дэд данс", width:200},
			                    ],
			                    editable:true,
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
						
					});	
					
					 
				}
				
				 $scope.abExport = function(dataItem){
		        	 $rootScope.content_preloader_show();
		        	 console.log(dataItem);
		          	 mainService.withdomain('get','/api/excel/export/problem/'+$scope.planid+'/0').then(function(response){
		           		
		           		
		           	 });
	            }
				
				$scope.textEditor = function(container, options) {
			        var editor = $('<textarea cols="30" rows="2" class="k-textbox md-bg-red-100" style="float:left;min-height:150px;" data-bind="value: ' + options.field + '"></textarea>')
			        .appendTo(container);
			    }
				
				$scope.finishProblems = function(){
					$rootScope.content_preloader_show();   
					mainService.withdomain('get','/fin/problem/'+$scope.planid).then(function(response){
			       		$rootScope.content_preloader_hide();          
			       		if(response==false){
			       			sweet.show('Анхаар!', 'Баталгаажуулсан уулзалтын үр дүн олдсонгүй!!!', 'warning');	
			       		}
			       		else{
			       			sweet.show('Анхаар!', 'Амжилттай эцэслэгдлээ.', 'success');	
			       			$(".problem .k-grid").data("kendoGrid").dataSource.read(); 
			       		}		           		
		           	});
				}
				
				$scope.upFile = function(item){
					UIkit.modal("#modal_form_file", {modal: false,center: false}).show();
					$scope.sendBtn=false;	
					$scope.dataItemUp=item;
				}
				
				$scope.submitUploadFormFile= function(){
				    if ($scope.formFile.afl.$valid && $scope.afl) {
			    	   bar.css("width", "0%").text("0%");
                       progressbar.removeClass("uk-hidden");
			           $scope.upload($scope.afl,3);
				    }
				}
				
			    $scope.submit = function() {
				   $scope.sendBtn=false;				  
			       if ($scope.form.file.$valid && $scope.file) {
			    	   bar.css("width", "0%").text("0%");
                       progressbar.removeClass("uk-hidden");
			           $scope.upload($scope.file,0);
			       }
		       };

		       
		       
		      // upload on file select or drop
		       $scope.upload = function (file,i) {
		    	   var xurl="";
		    	   if(i==0){
		    		   xurl ='/api/excel/upload/zagwarExcel/'+$stateParams.issueId+'/'+$scope.allData.data13;
		    	   }
		    	   else if(i==3){
		    		   xurl ='/api/excel/upload/afl/'+$stateParams.issueId+'/'+$scope.dataItemUp.id;
		    	   }
		    	   else{
		    		   xurl ='/api/excel/upload/form/'+$stateParams.issueId+'/'+i;
		    	   }
		    	   
		           Upload.upload({
		              url: xurl,
		              data: {file: file, 'username': $scope.username}
		           }).then(function (resp) {
		        	  UIkit.modal("#modal_form_file", {modal: false, keyboard: false, bgclose: false, center: false}).hide();
		        	  progressbar.removeClass("uk-hidden");
		              console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
		              $scope.errList=resp.data;
		          	  $scope.uploadfile=null;
		        	  $scope.file=null;
		              if(resp.data.excel){
	                      UIkit.notify("Амжилттай хадгаллаа.", {status:'success', pos: 'top-right'});
	                      modal.hide();
		              }
		              else if(resp.data==false){
		            	  UIkit.notify("Excel загвар тохирохгүй байна.", {status:'error', pos: 'top-right'});
		            	  $scope.sendBtn=true;
		              }
		              else if(resp.data.excel==false && resp.data.support==false){
		            	  UIkit.notify("Excel загвар тохирохгүй байна. "+resp.data.sheetname+"", {status:'error', pos: 'top-right'});
		            	  $scope.sendBtn=true;
		            	  $scope.ars=resp.data.error;
		              }
		             
		              else if(resp.data.file==false){
		            	  UIkit.notify("Системийн админтай холбогдоно уу.", {status:'error', pos: 'top-right'});
		            	  modal.hide();
	                      modal_upload.hide();
		              }
		              else if(resp.data){		            	 
		            	  UIkit.notify("Амжилттай хадгаллаа.", {status:'success', pos: 'top-right'});
	                      modal.hide();
	                      modal_upload.hide();
		              }
		              else{
		            	  console.log(resp);
		            	  $scope.errorAccount=true;
		            	  if(resp.data.support){
		            		  UIkit.notify("Алдаа үүслээ.", {status:'warning', pos: 'top-right'});		            		 		            		
		            	  }
		            	  else{
		            		  console.log(resp);
		            		  if(resp.data!=null){
		            			  $scope.forms=resp.data;
		            			  angular.forEach($scope.forms, function(value, key){
		            				  UIkit.notify(value.fname+ " маягтыг амжилттай хавсарлаа.", {status:'success', pos: 'top-right'});
            			          });
		            			//  console.log($scope.ordersGridOptions.return.dataSource.filter);
		            			 /* $scope.ordersGridOptions.return.dataSource.transport.read.data={
		      	  	    				"custom":"where appid= '"+$stateParams.issueId+"' " 
		      	  	    		  }*/
		      						
		            			  
		            			  $(".afl .k-grid").data("kendoGrid").dataSource.read();
		            		  }
		            		  else{
		            			  UIkit.notify("Excel загвар тохирохгүй байна.", {status:'error', pos: 'top-right'});
		            		  }		            		 
		            		  progressbar.addClass("uk-hidden");
		            	  }
		            	  $scope.ars=resp.data.error;
		            	  $scope.sendBtn=true;
		            	//  modal.hide();
			             // modal_upload.hide();
		              }
		              
		             
		              
		              $(".afl .k-grid").data("kendoGrid").dataSource.read();
		              progressbar.addClass("uk-hidden");
		          }, function (resp) {
		        	  if(resp.status==500){
		        		  UIkit.notify("Excel загвар тохирохгүй байна.", {status:'error', pos: 'top-right'});
		        		  modal.hide();
	                      modal_upload.hide();
		        	  }
		          }, function (evt) {
		              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);		             
		              percent = progressPercentage;
                      bar.css("width", percent+"%").text(percent+"%");                    
		           //   console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		          });
		       };

		       
		        $scope.categoryDropDownEditor = function(container, options) {
			        var editor = $('<textarea cols="30" rows="2" class="k-textbox md-bg-red-100" style="float:left;min-height:150px;" data-bind="value: ' + options.field + '"></textarea>')
			        .appendTo(container);
			    }
   			        
   			$scope.errorAccount=false;        
   			//$scope.ars=[];
   		    var progressbar = $(".file_upload-progressbar"),
               bar         = progressbar.find('.uk-progress-bar'),
               settings    = {

                   action: '/api/excel/upload/zagwarExcel/'+$stateParams.issueId, // upload url

                   allow : '*.(xlsx,xls)', // allow only images

                   loadstart: function() {
                       bar.css("width", "0%").text("0%");
                       progressbar.removeClass("uk-hidden");
                   },

                   progress: function(percent) {
                       percent = Math.ceil(percent);
                       bar.css("width", percent+"%").text(percent+"%");
                   },

                   allcomplete: function(data) {

                       bar.css("width", "100%").text("100%");

                       setTimeout(function(){
                           progressbar.addClass("uk-hidden");
                       }, 250);
                       if(JSON.parse(data).excel){
                       	modal.hide();
                       }
                       else{
                           $scope.errorAccount=true;
                           UIkit.notify("Алдаа үүслээ.", {status:'warning'});
                           $scope.ars=JSON.parse(data).error;
                           modal.hide();
                       }
                   }
               };
   		    
   		    
   	     var b4progressbar = $("#b4-uploader"),
         bar         = b4progressbar.find('.uk-progress-bar'),
         b4settings    = {

             action: '/api/excel/upload/b4/'+$stateParams.issueId, // upload url

             allow : '*.(xlsx|xls)', // allow only images
             
             multiple: true,
             
             loadstart: function() {
                 bar.css("width", "0%").text("0%");
                 b4progressbar.removeClass("uk-hidden");
             },

             progress: function(percent) {
                 percent = Math.ceil(percent);
                 bar.css("width", percent+"%").text(percent+"%");
             },

             allcomplete: function(data) {

                 bar.css("width", "100%").text("100%");

                 setTimeout(function(){
                	 b4progressbar.addClass("uk-hidden");
                 }, 250);
                 $scope.file_b4="";
                 console.log(data);
                 alert("Upload Completed")
             }
         };

   	     var select = UIkit.uploadSelect($("#file_upload-b4"), b4settings),
         dropb4   = UIkit.uploadDrop($("#file_upload-drop"), settings);
    		
    	 }
    ]);
