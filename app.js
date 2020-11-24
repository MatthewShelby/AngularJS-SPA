
var app = angular.module("OrjApp", ['ngRoute',  'ngStorage']);

app.factory('ShareData', function () {
    return {
        value: 0
    }
});

app.config(["$routeProvider", function ($routeProvider, $window) {
    //$routeProvider.when("/", {
    $routeProvider.when("/", {
        controller: "mainController"
    });
    $routeProvider.when("/List", {
        templateUrl: "list.html",
        controller: "listController"
    });
    $routeProvider.when("/Details", {
        templateUrl: "details.html",
        controller: "detailsController"
    });


    //$routeProvider.
    //    when('/', { templateUrl: 'pages/' + ** params.siteType ** + '/locationList.html', controller: Location }).
    //    when('/locationDetail/:projectId', {
    //        templateUrl: function (params) { return 'pages/' + ** params.siteType ** + '/locationDetail.html'; },
    //        controller: Location
    //    }).
    //    otherwise({ redirectTo: '/' });

}]);





//  ==========   MAIN CONTROLLER
app.controller("mainController", function (
    $scope,
    $location,
    OrjService,
    ShareData,
    $route,
    $rootScope,
    $localStorage
) {


    var catsOrigin = OrjService.getAllCategories();
    var allcats = {
        "id": 1000,
        "name": "All Categories",
        "slug": "all"
    };
    catsOrigin.then(function (res) {
        $scope.cats = [].concat(allcats, res.data.jobs);
    });

    $scope.GO = function () {
        console.log('GO!');

        ShareData.search = $scope.searchText;
        ShareData.compName = $scope.searchComp;
        ShareData.cat = $scope.selectedCat;
        ShareData.Jtype = $scope.Jtype;
        $localStorage.isNewSearch = true;
        $location.path("/List");
        $route.reload();
    };
    //$scope.start = function () {
    //    $location.hash('filter');
    //    $anchorScroll();
    //};
    $scope.gotoElement = function (eID) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(eID);

        // call $anchorScroll()
        OrjService.scrollTo(eID);

    };
});











//  ==========   LIST CONTROLLER
app.controller("listController", function (
    $scope,
    $location,
    OrjService,
    ShareData,
    $route,
    $window,
    $localStorage
) {
    changeTemplate();



    console.log('listController Start. cat: ' + ShareData.cat + ' search: ' + ShareData.search + ' comp: ' + ShareData.compName);

    if ($localStorage.isNewSearch) {
        var list = OrjService.getJobsList(ShareData.cat, ShareData.search, ShareData.compName);

        list.then(function (result) {
            var jobs = result.data.jobs;
            console.log('Jtype: ' + ShareData.Jtype);
            if (ShareData.Jtype != 'all') {
                $scope.jobs = jobs.filter(function (item) {
                    return item.job_type == ShareData.Jtype;
                });
            } else {
                $scope.jobs = jobs;
            }

            $localStorage.list = $scope.jobs;
            $localStorage.isNewSearch = false;
            console.log('$scope.jobs[0].title: ' + $scope.jobs[0].title);
            $location.hash('res');
            OrjService.scrollTo('res');

        });
    } else {
        $scope.jobs = $localStorage.list;
    }



    function changeTemplate() {

        var screenWidth = $window.innerWidth;
        console.log('changeTemplate   screenWidth: ' + screenWidth);

        if (screenWidth < 768) {
            $scope.Records = 'list-mobile.html';
            console.log('$scope.templateUrl: ' + $scope.Records);
        } else if (screenWidth >= 768) {
            $scope.Records = 'list-desktop.html';
            console.log('$scope.templateUrl: ' + $scope.Records);

        }
    }


    $scope.goDetails = function (id) {
        ShareData.job = $scope.jobs.filter(function (item) {
            return item.id == id;
        })[0];
        //$window.alert('lst Ctrl - ShareData.job.title :' + ShareData.job.title);
        $location.path("/Details");

        //$route.reload();
    }



});




//  ==========   DETAILS CONTROLLER
app.controller("detailsController", function (
    $scope,
    $location,
    OrjService,
    ShareData,
    $route,
    $sce,
    $localStorage,
    $anchorScroll,
    $window
) {
    if (ShareData.job == undefined) {
        $scope.job = $localStorage.job;

    } else {
        $scope.job = ShareData.job;
        $localStorage.job = ShareData.job;
    }

    changeTemplate();

    $scope.htmlBind = $sce.trustAsHtml($scope.job.description);


    $location.hash('resDetails');
    OrjService.scrollTo('resDetails');

    $scope.goToHome = function (id) {
        $localStorage.list = undefined;
        $location.hash('');
        $location.path("/");

    }
    $scope.backToList = function (id) {
        $location.hash('');
        $location.hash('res');

        $location.path("/List");

    }


    function changeTemplate() {

        var screenWidth = $window.innerWidth;
        console.log('changeTemplate    screenWidth: ' + screenWidth);

        if (screenWidth < 768) {
            $scope.detailsContent = 'details-mobile.html';
        } else if (screenWidth >= 768) {
            $scope.detailsContent = 'details-desktop.html';

        }
    }
});





