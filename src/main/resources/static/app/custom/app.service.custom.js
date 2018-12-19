altairApp
.factory('customLoader', function ($http, $q) {
    return function (options) {
      var deferred = $q.defer();
   /*   $http({
    	   method:'GET',
	       url:'/audit/api/lang/' + options.key 
      }).success(function (data) {
        deferred.resolve(data);
      }).error(function () {
        deferred.reject(options.key);
      });*/
      
      return deferred.promise;
    }
})
.factory('dataService',['$resource',
	function($resource){
	    var service = $resource('/API/V1', {}, {
	       get: {
	        url: '/form/paginated',
	        method: 'GET',
	      }
	    });
	    return service;
	}
])
.service('gridService',['$http', function ($http) {

    var self = this;

    self.getStudents =function getStudents(url,pageNumber,size) {
        pageNumber = pageNumber > 0?pageNumber - 1:0;
        return  $http({
            method: 'GET',
            url: 'api/'+url+'/get?page='+pageNumber+'&size='+size
        }).then(function (response) {
            return response.data;
        });
    };
    self.readAll = function (url,pageSize, pageNumber, sort, filter) {
        return $http({
            method: 'GET',
            url: 'api/'+url+'/list',
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                sort: sort,
                filter: filter
            }
        }).then(function (response) {
            return response.data;
        });
    };
}])
.factory('downloadService', ['$q', '$timeout', '$window',
    function($q, $timeout, $window) {
        return {
            download: function(name) {

                var defer = $q.defer();

                $timeout(function() {
                        $window.location = 'download?name=' + name;

                    }, 1000)
                    .then(function() {
                        defer.resolve('success');
                    }, function() {
                        defer.reject('error');
                    });
                return defer.promise;
            }
        };
    }
])
.service('sessionService',[
   '$rootScope',
   '$http',
   '$location',
   function($rootScope,$http,$location,$state) {
	   

    var session = {};
    session.login = function(data) {
        return $http.post("/login", "username=" + data.username +
        "&password=" + data.password, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        } ).then(function(data) {
        	var success=data.data;
        	if(success!=false){
        		// alert("hooo noo success");
        		 $rootScope.authenticated = true;
        		 localStorage.setItem("session", {});
        	}
        	else{
        		  $rootScope.authenticated = false;
        	}
        }, function(data) {
           // alert("error logging in");
        });
    };

    session.logout = function() {
   		  $http.post("/logout", {}).success(function() {
   		    $rootScope.authenticated = false;
   		    $location.path("/login");
   		    localStorage.setItem("session", false);
   		  }).error(function(data) {
   		    $rootScope.authenticated = false;
   		  });
   		};

    session.isLoggedIn = function() {
        return localStorage.getItem("session") !== null;
    };
    return session;
}])

.service('fileUpload', ['$http','$q','sweet', function ($http,$q,sweet) {
    this.uploadFileToUrl = function(uploadUrl, file){
    	var deferred = $q.defer();
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, file, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
       .then(function (response) {
    	   deferred.resolve(response.data);
        });
        
        return deferred.promise;
    }
}])

.service('mainService', function ($http, $q) {
	var master= {};
	
    this.add=function(item){    	
    	master= angular.copy(item);
    	return master;
    }
    this.view=function(){    
    	
    	return master;
    }
    
    this.getDetail=function(curl){
		var deferred = $q.defer();

        $http({
			method:'GET',
        	url:curl
        })
        .then(function (response) {
            if (response.status == 200) {
                deferred.resolve(response.data);
            }
            else {
                deferred.reject('Error getting');
            }
        });

        return deferred.promise;
	}
    
    this.withdomain=function(method,url){
    	var deferred = $q.defer();
        $http({
            method:method,           
            url:url           
        })
        .then(function (response) {
        	 deferred.resolve(response.data);
        });

        return deferred.promise;
    }
    
    this.withdata=function(method,url,data){
    	var deferred = $q.defer();

        $http({
        	 method:method,
             url:url,
             data: data
        })
        .then(function (response) {
            if (response.status == 200) {
                deferred.resolve(response.data);
            }
            else {
            	deferred.reject('Error occured doing action withdata');
            }
        });

        return deferred.promise;
    }
    
    this.http=function(method,url){
    	var deferred = $q.defer();

        $http({
            method:method,
            url:url
        })
        .then(function (response) {
            if (response.status == 200) {
                deferred.resolve(response.data);
            }
            else {
                deferred.reject('Error occured doing action withoutdata');
            }
        });

        return deferred.promise;
    }
    
    this.http=function(method,url,data){
    	var deferred = $q.defer();

        $http({
        	 method:method,
             url:url,
            data: data
        })
        .then(function (response) {
            if (response.status == 200) {
                deferred.resolve(response.data);
            }
            else {
            	deferred.reject('Error occured doing action withdata');
            }
        });

        return deferred.promise;
    }
});