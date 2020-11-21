
var app = angular.module("OrjApp", ['ngRoute', 'ngCookies', 'ngStorage']);

app.factory('ShareData', function () {
    return {
        value: 0
    }
});

app.config(["$routeProvider", function ($routeProvider) {
    //$routeProvider.when("/", {
    $routeProvider.when("/", {
        template: " Nothing Yet!",
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
        });
    } else {
        $scope.jobs = $localStorage.list;
    }




    $scope.goDetails = function (id) {
        ShareData.job = $scope.jobs.filter(function (item) {
            return item.id == id;
        })[0];
        //$window.alert('lst Ctrl - ShareData.job.title :' + ShareData.job.title);
        $location.path("/Details");

        // $route.reload();
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
    $cookieStore,
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

    $scope.htmlBind = $sce.trustAsHtml($scope.job.description);


    $location.hash('res');
    $anchorScroll();

    $scope.goToHome = function (id) {
        $localStorage.list = undefined;
        $location.hash('');
        $location.path("/");
    }

});





