angular
    .module('altairApp')
    .controller("nyaboCtrl", ['$rootScope', '$scope', '$timeout', 'user_data', 'mainService', 'sweet', '$state', 'Upload', 'fileUpload',
        function ($rootScope, $scope, $timeout, user_data, mainService, sweet, $state, Upload, fileUpload) {


            $('.dropify').dropify();


            $scope.formUpload = {};
            $scope.formFile = {};
            $scope.formTsalin = {};
            $scope.formHuulga = {};

            $scope.submitUploadDifference = function () {
                $scope.sendBtn = false;
                if ($scope.formFile.afl.$valid && $scope.afl) {
                    bar.css("width", "0%").text("0%");
                    progressbar.removeClass("uk-hidden");
                    $scope.uploadNotlohZuil($scope.afl, 1);
                }
            };


            $scope.submitUploadNotlohZuil = function () {
                $scope.sendBtn = false;
                if ($scope.formUpload.uploadfile.$valid && $scope.uploadfile) {
                    bar.css("width", "0%").text("0%");
                    progressbar.removeClass("uk-hidden");
                    $scope.uploadNotlohZuil($scope.uploadfile, 2);
                }
            };


            $scope.submitUploadTsalin = function () {
                $scope.sendBtn = false;
                if ($scope.formTsalin.tsalin.$valid && $scope.tsalin) {
                    bar.css("width", "0%").text("0%");
                    progressbar.removeClass("uk-hidden");
                    $scope.uploadNotlohZuil($scope.tsalin, 3);
                }
            };

            $scope.submitUploadHuulga = function () {
                $scope.sendBtn = false;
                if ($scope.formHuulga.huulga.$valid && $scope.huulga) {
                    bar.css("width", "0%").text("0%");
                    progressbar.removeClass("uk-hidden");
                    $scope.uploadNotlohZuil($scope.huulga, 4);
                }
            };

            $scope.download = function (id) {
                mainService.withdomain('get', '/api/file/download/' + id).then(function (data) {

                });
            };

            $scope.change = function () {
                $scope.diff = [];
            };

            $scope.pmenuGrid = {
                dataSource: {
                    transport: {
                        read: {
                            url: "/core/list/FileConverted",
                            contentType: "application/json; charset=UTF-8",
                            data: {"custom": "where userid=" + user_data.id, "sort": [{field: 'id', dir: 'desc'}]},
                            type: "POST"
                        },
                        update: {
                            url: "/core/update/" + $scope.domain + "",
                            contentType: "application/json; charset=UTF-8",
                            type: "POST",
                            complete: function (e) {
                                $(".k-grid").data("kendoGrid").dataSource.read();
                            }
                        },
                        destroy: {
                            url: "/core/delete/" + $scope.domain + "",
                            contentType: "application/json; charset=UTF-8",
                            type: "POST"
                        },
                        create: {
                            url: "/core/create/" + $scope.domain + "",
                            contentType: "application/json; charset=UTF-8",
                            type: "POST",
                            complete: function (e) {
                                $(".k-grid").data("kendoGrid").dataSource.read();
                            }
                        },
                        parameterMap: function (options) {
                            return JSON.stringify(options);
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total",
                        model: {
                            id: "id",
                            fields: {
                                id: {editable: false, nullable: true},
                                menuname: {type: "string", validation: {required: true}},
                                stateurl: {type: "string", defaultValue: '#'},
                                uicon: {type: "string"},
                                parentid: {type: "number"},
                                orderid: {type: "number"}
                            }
                        }
                    },
                    pageSize: 8,
                    serverFiltering: true,
                    serverPaging: true,
                    serverSorting: true
                },
                filterable: {
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
                    {title: "#", template: "<span class='row-number'></span>", width: "60px"},
                    {field: "name", title: "Нэр /Mn/"},
                    /*{ field: "flurl", title:"URL" },*/
                    {field: "fsize", title: "IKON"},
                    {field: "fdate", title: "Эцэг цэс"},
                    {template: kendo.template($("#download").html()), width: "90px"}
                ],
                dataBound: function () {
                    var rows = this.items();
                    $(rows).each(function () {
                        var index = $(this).index() + 1
                            + ($(".k-grid").data("kendoGrid").dataSource.pageSize() * ($(".k-grid").data("kendoGrid").dataSource.page() - 1));
                        ;
                        var rowLabel = $(this).find(".row-number");
                        $(rowLabel).html(index);
                    });
                },

            };
            $scope.diff = [];
            $scope.userId = user_data.id;

            $scope.uploadNotlohZuil = function (file, y) {
                var xurl = "";
                if (y == 1) {
                    xurl = '/api/checker';
                }
                else if (y == 2) {
                    xurl = '/api/nyabo';
                }
                else if (y == 3) {
                    xurl = '/api/tsh/1';
                }
                else {
                    xurl = '/api/tsh/2';
                }
                Upload.upload({
                    url: xurl,
                    data: {file: file, 'description': $scope.description}
                }).then(function (resp) {
                    if (y == 1) {
                        if (resp.data.diff.length == 0) {
                            sweet.show('Анхаар!', 'Дансны код тохирч байна.', 'success');
                        }
                        else {
                            $scope.aldaa = resp.data;
                            $scope.diffence = [];
                        }
                    }
                    else if (y == 2) {
                        if (resp.data.excel) {
                            $scope.naaltList = [];
                            $scope.ars = [];
                            $scope.sda = [];
                            $scope.ars = [];
                            $scope.diffence = resp.data.diff;
                            $scope.mainGridOptions = {
                                dataSource: {
                                    data: resp.data.diff,
                                    pageSize: 10
                                },
                                sortable: true,
                                height: 500,
                                pageable: {
                                    refresh: true,
                                    pageSizes: true,
                                    buttonCount: 5
                                },
                                columns: [
                                    {title: "#", template: "<span class='row-number'></span>", width: "60px"},
                                    {
                                        field: "sheet",
                                        title: "Хүснэгтийн нэр",
                                        width: "120px"
                                    }, {
                                        field: "code",
                                        title: "Дансны код",
                                        width: "120px"
                                    }, {
                                        field: "dans",
                                        title: "Дансны нэр",
                                        width: "300px"
                                    }, {
                                        field: "uld",
                                        title: "Үлдэгдэл",
                                        width: "120px"
                                    },
                                    {
                                        field: "uldDun",
                                        title: "Дүн",
                                        template: "<span class='cellRight'>#= kendo.toString(uldDun, 'n') # ₮</span>"
                                    },
                                    {
                                        field: "tulgalt",
                                        width: "300px",
                                        title: "Тулгалт хийгдэж буй үзүүлэлт",
                                    },
                                    {
                                        field: "uldDun2",
                                        title: "Дүн",
                                        template: "<span class='cellRight'>#= kendo.toString(uldDun2, 'n') # ₮</span>"
                                    },
                                    {
                                        field: "zuruu",
                                        title: "Зөрүү",
                                        template: "<span class='cellRight'>#= kendo.toString(zuruu, 'n') # ₮</span>"
                                    }
                                ],
                                dataBound: function () {
                                    var rows = this.items();
                                    $(rows).each(function () {
                                        var index = $(this).index() + 1
                                            + ($(".k-grid").data("kendoGrid").dataSource.pageSize() * ($(".k-grid").data("kendoGrid").dataSource.page() - 1));
                                        ;
                                        var rowLabel = $(this).find(".row-number");
                                        $(rowLabel).html(index);
                                    });
                                },
                            };
                            sweet.show('Анхаар!', 'Тайлан амжилттай хөрвүүлэгдлээ!!!', 'success');
                            $scope.viewExcel();
                        }
                        else {
                            $scope.viewExcel();
                            $scope.aldaa = resp.data;
                        }
                        /*  console.log(resp.data);
                          if(!resp.data.excel){
                              $scope.aldaa=resp.data;
                              if(resp.data.formula>0){
                                  $scope.formula=resp.data.formula;
                                  sweet.show('Анхаар!', 'Тайлангийн дансаа шалгана уу!!!', 'error');
                              }
                              else if(!resp.data.naalt){
                                  $scope.naaltList=resp.data.naaltList;
                                  $scope.ars=resp.data.additionalSheet;
                                  $scope.sda=resp.data.additionalSheet;
                                  if(resp.data.additionalSheet.length>0){
                                      sweet.show('Анхаар!', 'Зөрүүтэй хүснэгтээ шалгана уу!!!', 'error');
                                  }else{
                                      sweet.show('Анхаар!', 'Тайлангийн дансаа шалгана уу!!!', 'error');
                                  }
                              }
                              if(resp.data.additionalSheet>0){
                                 // $scope.ars=resp.data.additionalSheet;
                                  $scope.ars=resp.data.prefilter;
                                  $scope.errList=resp.data.prefilter;
                                  sweet.show('Анхаар!', 'Зөрүүтэй хүснэгтээ шалгана уу!!!', 'error');
                              }
                          }
                          if(resp.data.excel){

                          }*/
                        progressbar.removeClass("uk-hidden");
                        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                        $scope.ars = resp.data.error;
                        $scope.uploadfile = null;
                        $scope.uploadfileDif = null;
                        //$(".nnn .k-grid").data("kendoGrid").dataSource.read();
                        progressbar.addClass("uk-hidden");
                    }

                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);

                    percent = progressPercentage;
                    bar.css("width", percent + "%").text(percent + "%");
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });


            };


            var progressbar = $("#file_upload-progressbar"),
                bar = progressbar.find('.uk-progress-bar'),
                settings = {

                    action: '/api/nyabo', // upload url

                    allow: '*.(xlsx|xls)', // allow only images

                    loadstart: function () {
                        bar.css("width", "0%").text("0%");
                        progressbar.removeClass("uk-hidden");
                    },

                    progress: function (percent) {
                        percent = Math.ceil(percent);
                        bar.css("width", percent + "%").text(percent + "%");
                    },

                    allcomplete: function (response) {

                        bar.css("width", "100%").text("100%");

                        setTimeout(function () {
                            progressbar.addClass("uk-hidden");
                        }, 250);

                        console.log(response);
                        alert("Upload Completed")
                    }
                };

            var select = UIkit.uploadSelect($("#file_upload-select"), settings),
                drop = UIkit.uploadDrop($("#file_upload-drop"), settings);


            $scope.downloadExcel = function () {
                if (user_data.plan != "basic") {
                    $rootScope.content_preloader_show();
                    mainService.withdomain('get', '/api/file/verify/excel').then(function (response) {
                        if (response.excel) {
                            var link = document.createElement('a');
                            link.href = '/api/file/download/excel';
                            link.download = "Filename";
                            link.click();
                            setTimeout(function () {
                                $rootScope.content_preloader_hide();
                            }, 4000);

                        }
                        else if (response.balance===false) {
                            sweet.show('Анхаар!', 'Багцын эрх дууссан байна!!!', 'error');
                        }
                        else {
                            sweet.show('Анхаар!', 'Excel тайлан олдсонгүй!!!', 'error');
                            $rootScope.content_preloader_hide();
                        }
                    });
                }
                else {
                    sweet.show('Анхаар!', 'Багцаа дээшлүүлнэ үү!!!', 'error');
                }
            };
            $scope.surveyExcel = function () {
                if (user_data.plan != "basic") {
                    $rootScope.content_preloader_show();
                    mainService.withdomain('get', '/api/file/verify/excel').then(function (response) {
                        if (response.excel) {
                            var link = document.createElement('a');
                            link.href = '/api/file/download/survey';
                            link.download = "Filename";
                            link.click();
                            setTimeout(function () {
                                $rootScope.content_preloader_hide();
                            }, 4000);

                        }
                        else if (response.balance===false) {
                            sweet.show('Анхаар!', 'Багцын эрх дууссан байна!!!', 'error');
                        }
                        else {
                            sweet.show('Анхаар!', 'Excel тайлан олдсонгүй!!!', 'error');
                            $rootScope.content_preloader_hide();
                        }
                    });
                }
                else {
                    sweet.show('Анхаар!', 'Багцаа дээшлүүлнэ үү!!!', 'error');
                }
            };


            $("#spreadSheetZagwarView").kendoSpreadsheet({
                excel: {
                    // Required to enable Excel Export in some browsers
                    proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
                }
            });

            //  var spreadsheet = $("#spreadSheetZagwarView").data("kendoSpreadsheet");
            //   $("#spreadSheetZagwarView").kendoSpreadsheet({});
          //  $("#spreadSheetZagwarView").kendoSpreadsheet({});
            // $("#spreadSheetZagwarView").kendoSpreadsheet();
            $scope.viewExcel = function () {
                $rootScope.content_preloader_show();
                mainService.withdomain('get', '/api/file/verify/excel').then(function (response) {
                    console.log(response);
                    if (response.file || response.excel) {
                        $scope.xlsx = true;
                        $scope.purl = '/api/file/sheet/excel';
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', $scope.purl, true);
                        xhr.responseType = 'blob';

                        xhr.onload = function (e) {
                            if (this.status == 200) {
                                var blob = this.response;

                                console.log(blob);
                                var spreadsheet = $("#spreadSheetZagwarView").data("kendoSpreadsheet");
                                spreadsheet.fromFile(blob);
                                UIkit.modal("#modal_excel_file", {center: false}).show();
                            }
                            else {
                                var mySpreadsheet = $('body').find($("div[data-role='spreadsheet']"));
                                mySpreadsheet.css({width: 100});
                                mySpreadsheet.data("kendoSpreadsheet").resize();

                                sweet.show('Анхаар!', 'Файл устгагдсан байна.', 'error');
                            }
                        };
                        setTimeout(function () {
                            $rootScope.content_preloader_hide();
                        }, 3000);
                        xhr.send();
                    }
                    else {
                        sweet.show('Анхаар!', 'Excel тайлан оруулаагүй байна !!!', 'error');
                        $rootScope.content_preloader_hide();
                    }

                });
            };



            $('#spreadSheetZagwarView').height(
                $(window).height() - 400
            );

            $scope.viewExcel();
        }
    ]);
