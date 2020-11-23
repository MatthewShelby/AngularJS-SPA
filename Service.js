
app.service("OrjService", function ($http, $sce,) {


    this.getJobsList = function (cat, search, compName) {

        console.log('call for: getJobsList');
        var query = "https://remotive.io/api/";
        if (cat == undefined || cat == 'all' || cat == null || cat == '') {
            query += "remote-jobs?limit=50";
        } else {
            query += "remote-jobs?category=" + cat + '&limit=50';
        }

        if (search == undefined || search == null || search == '') {

        } else {
            query += "&search=" + search;
        }

        if (compName == undefined || compName == null || compName == '') {

        } else {
            query += "&company_name=" + compName;
        }

        var trustedUrl = $sce.trustAsResourceUrl(query);


        var RV = {};
        $http.jsonp(trustedUrl, { jsonpCallbackParam: 'callback' })
            .then(function (data) {
                console.log(data.found);
                RV = data;
            });

        /*
        console.log('call query: ' + query);
        var RV = $http.get(query);
        console.log('Service RV: ' + RV);
        */

        return RV;
    };


    this.getAllJobs = function () {
        console.log('call for: getAllJobs');
        //var RV = $http.get("https://remotive.io/api/remote-jobs?category=software-dev&limit=30");
        //console.log('call getAll done. RV: ' + RV);
        ////console.log('call getAll done. RV: ' + JSON.stringify(RV.data.jobs[0]));
        //return RV;
        return $http.get("https://remotive.io/api/remote-jobs?category=software-dev&limit=30");
    };

    this.getAllCategories = function () {

        console.log('call for: getAllCategories');


        var RV = $http.get("https://remotive.io/api/remote-jobs/categories",);
        console.log('call done. RV: ' + RV);





        //return $http({
        //    method: 'GET',
        //    url: 'https://remotive.io/api/remote-jobs/categories/?format=json&callback=?',
        //    dataType: 'jsonp',
            
        //});
    


        //var RV = {};

        //var url = "//remotive.io/api/remote-jobs/categories";
        //var trust = $sce.trustAsResourceUrl(url);
        //$http.get(url, {
        //    params: {
        //        format: 'jsonp', headers: {
        //            'Content-Type': 'application/json; charset=utf-8'
        //        }
        //    }
        //})
        //    .then(function (data) {
        //        console.log('data[0]: ' + data[0]);
        //        RV = data;
        //    });

        //console.log('call done. RV: ' + RV);

        return RV;
    };

    this.getByCats = function (cat, limit) {
        console.log('call for: getByCats');
        var query = "https://remotive.io/api/";
        if (cat == undefined || cat == 'all' || cat == null || cat == '') {
            query += "remote-jobs?limit=5";
        } else {
            query += "remote-jobs?category=" + cat + '&limit=' + limit;
        }
        var RV = $http.get(query);
        console.log('call query. RV: ' + RV);
        return RV;
    };


});



app.config(function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
});