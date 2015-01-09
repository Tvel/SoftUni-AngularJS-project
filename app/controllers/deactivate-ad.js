app.controller('DeactivateAdController',  [ 'AdsApi','$routeParams', '$location', '$interval', function( AdsApi, $routeParams, $location, $interval) {
    var self = this;
    self.header = {title:'Deactivate Ad'};

    AdsApi.checkLogin().then(function( data){
        // if logged
        self.ifNotLogged = false;
        self.ifLogged = true;
        self.header = {title:'Deactivate Ad', username: data.username};
    },function(){
        // if not logged
        self.ifNotLogged = true;
        self.ifLogged = false;

    });

    self.alerts = [];
    /*
     * Interval is needed so alerts can be closed one by one every 5 seconds
     */
    var killInterval = undefined;
    self.addAlert = function(type, msg) {
        self.alerts.push({type: type ,msg: msg});
        console.log(self.alerts);

        if (!angular.isDefined(killInterval)) {
            killInterval = $interval(function () {
                self.closeAlert(0);
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
    self.title = 'Confirm Deactivating Ad?';
    self.buttonName = 'Deactivate';
    self.submitClick = function() {
        AdsApi.deactivateUserAd(self.id)
            .then(function(ad){
                self.addAlert('success', 'Ad is deactivated');
            }, function(error){
                console.error(error);
            });

        window.history.back();
    };
    self.cancelClick = function() {
        window.history.back();
    };










}]);
