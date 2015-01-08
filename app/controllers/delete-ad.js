app.controller('DeleteAdController',  [ 'AdsApi','$routeParams', '$location', '$interval', function( AdsApi, $routeParams, $location, $interval) {
    var self = this;
    self.header = {title:'Delete Ad'};

    AdsApi.checkLogin().then(function( data){
        // if logged
        self.ifNotLogged = false;
        self.ifLogged = true;
        self.header = {title:'Delete Ad', username: data.username};
    },function(){
        // if not logged
        self.ifNotLogged = true;
        self.ifLogged = false;

    });

    self.alerts = [];
    var killInterval = undefined;
    self.addAlert = function(type, msg) {
        self.alerts.push({type: type ,msg: msg});
        console.log(self.alerts);

        if (!angular.isDefined(killInterval)) {
            killInterval = $interval(function () {
                //function first(p){for(var i in p)return p[i];}
                self.closeAlert(0);
                //console.log('boom alert');
            }, 5000)
        }
    };
    self.closeAlert = function(index) {
        self.alerts.splice(index, 1);
        if (self.alerts.length == 0) {
            if (angular.isDefined(killInterval)) {
                $interval.cancel(killInterval);
                killInterval = undefined;
            }
        }
    };

    if ($routeParams.id){
        self.id = $routeParams.id;
    }

    AdsApi.getUserAd(self.id)
        .then(function(ad){
            self.ad = ad;
            console.log(ad);

        });

    self.title = 'Confirm Deleting Ad?';
    self.buttonName = 'Delete';

    self.submitClick = function() {
        //console.log('submit!');
        AdsApi.deleteUserAd(self.id)
            .then(function(ad){
                self.addAlert('success', 'Ad is Deleted');
            }, function(error){
                console.error(error);
            });

        //window.history.back();
    };

    self.cancelClick = function() {
        //console.log('cancel!');
        window.history.back();
    };



}]);
