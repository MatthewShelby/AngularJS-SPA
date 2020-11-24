
app.service("OrjService", function ($http) {


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

        console.log('call query: ' + query);
        var RV = $http.get(query);
        console.log('Service RV: ' + RV);
        return RV;
    };



    this.getAllCategories = function () {
        console.log('call for: getAllCategories');
        var RV = $http.get("https://remotive.io/api/remote-jobs/categories");
        console.log('call done. RV: ' + RV);
        return RV;
    };


    this.scrollTo = function (eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        console.log('anchorSmoothScroll called');

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 300);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 200);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (var i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };



});



//full_time
//contract
//internship
//part_time