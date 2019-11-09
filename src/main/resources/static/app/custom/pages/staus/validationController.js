angular
    .module('altairApp')
    .controller("validationCtrl",['$rootScope','$scope','mainService','$state','sweet','user_data',
        function ($rootScope,$scope,mainService,$state,sweet,user_data) {
            $rootScope.fullHeaderActive = true;
            
            $scope.$on('$destroy', function() {
                $rootScope.fullHeaderActive = false;
            });
        
            $scope.domain="com.nbb.models.LutValidation.";
            var sel=[{"text":"Үгүй","value":"0"},{"text":"Тийм","value":"1"}];
            var source_data = $scope.selectize_source_options = sel;
            $scope.selectize_source_config = {
                plugins: {
                    'remove_button': {
                        label     : ''
                    }
                },
                maxItems: 1,
                minItems:1,
                valueField: 'value',
                labelField: 'text',
                searchField: 'text',
                create: false,
                render: {
                    option: function(source_data, escape) {
                        return  '<div class="option">' +
                            '<span class="title">' + escape(source_data.text) + '</span>' +
                            '</div>';
                    }
                }
            };
            var val=[{"text":"ROOT","value":"0"},
                {"text":"Санхүүгийн байдлын тайлан дахь үзүүлэлтийн тулгалт буюу уялдаа","value":"1"},
                {"text":"Санхүүгийн үр дүнгийн тайлан дахь үзүүлэлтийн тулгалт буюу уялдаа","value":"2"},
                {"text":"Мөнгөн гүйлгээний тайлан дахь үзүүлэлтийн тулгалт буюу уялдаа","value":"3"},
                {"text":"Санхүүгийн тайлан хоорондын тулгалт буюу уялдаа","value":"4"},
                {"text":"Санхүүгийн тайлан, тодруулга хоорондын тулгалт буюу уялдаа","value":"5"}];
            var val_data = $scope.selectize_val_options = val;
            $scope.selectize_val_config = {
                plugins: {
                    'remove_button': {
                        label     : ''
                    }
                },
                maxItems: 1,
                minItems:1,
                valueField: 'value',
                labelField: 'text',
                searchField: 'text',
                create: false,
                render: {
                    option: function(val_data, escape) {
                        return  '<div class="option">' +
                            '<span class="title">' + escape(val_data.text) + '</span>' +
                            '</div>';
                    }
                }
            };
            var balance=[{"text":"Эхний үлдэгдэл","value":"1"},
                {"text":"Эцсийн үлдэгдэл","value":"2"},
                {"text":"Өмнөх оны гүйцэтгэл ","value":"21"},
                {"text":"Тайлант оны гүйцэтгэл","value":"22"}];
            var balance_data = $scope.selectize_balance_options = balance;
            $scope.selectize_balance_config = {
                plugins: {
                    'remove_button': {
                        label     : ''
                    }
                },
                maxItems: 1,
                minItems:1,
                valueField: 'value',
                labelField: 'text',
                searchField: 'text',
                create: false,
                render: {
                    option: function(balance_data, escape) {
                        return  '<div class="option">' +
                            '<span class="title">' + escape(balance_data.text) + '</span>' +
                            '</div>';
                    }
                }
            };

            $scope.puserGrid = {
                dataSource: {
                    transport: {
                        read:  {
                            url: "http://119.40.98.169:8088/core/list/LutValidation",
                            contentType:"application/json; charset=UTF-8",
                            data: {"custom":"where userid="+user_data.id+"","sort":[{field: 'id', dir: 'desc'}]},
                            type:"POST"
                        },
                        update: {
                            url: "http://119.40.98.169:8088/core/update/"+$scope.domain+"",
                            contentType:"application/json; charset=UTF-8",
                            type:"POST",
                            complete: function(e) {
                                $(".k-grid").data("kendoGrid").dataSource.read();
                            }
                        },
                        destroy: {
                            url: "http://119.40.98.169:8088/core/delete/"+$scope.domain+"",
                            contentType:"application/json; charset=UTF-8",
                            type:"POST"
                        },
                        create: {
                            url: "http://119.40.98.169:8088/core/create/"+$scope.domain+"",
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
                                userid: { type: "number", defaultValue:user_data.id},
                                code1: { type: "string",validation: { required: true } },
                                code2: { type: "string",validation: { required: true } },
                                title1: { type: "string",validation: { required: true } },
                                title2: { type: "string",validation: { required: true } },
                                balanceid: { type: "number",validation: { required: true } },
                                position1: { type: "string",validation: { required: true } },
                                position2: { type: "string",validation: { required: true } },
                                isformula1: { type: "number",validation: { required: true } },
                                isformula2: { type: "number",validation: { required: true } },
                                valid: { type: "number",validation: { required: true } },
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
                height: function(){
                    return $(window).height()-180;
                },
                sortable: true,
                resizable: true,
                toolbar: ["create"],
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                columns: [
                    {title: "#",template: "<span class='row-number'></span>", width:60},
                    { field: "valid", title: "Тулгалт" +"<span data-translate=''></span>",values:val,width:"300px",hidden:true},
                    { field: "balanceid", title: "Үлдэгдэл" +"<span data-translate=''></span>",values:balance,width:"150px"},
                    { field: "title1", title: "Үзүүлэлт 1" +"<span data-translate=''></span>",width:"250px"},
                    { field: "code1", title: "Дансны код 1" +"<span data-translate=''></span>",width:"150px"},
                    { field: "position1", title: "Байршил 1" +"<span data-translate=''></span>",width:"150px"},
                    { field: "isformula1", title: "Формула 1" +"<span data-translate=''></span>",values:sel,width:"150px"},
                    { field: "title2", title: "Үзүүлэлт 2" +"<span data-translate=''></span>",width:"350px"},
                    { field: "code2", title: "Дансны код 2" +"<span data-translate=''></span>",width:"150px"},
                    { field: "position2", title: "Байршил 2" +"<span data-translate=''></span>",width:"150px"},
                    { field: "isformula2", title: "Формула 2" +"<span data-translate=''></span>",values:sel,width:"150px"},
                    { command: ["edit", "destroy"], title: "&nbsp;", width: 270 }
                ],
                editable:"inline",
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
