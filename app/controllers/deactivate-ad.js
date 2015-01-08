app.controller('DeactivateAdController',  [ 'AdsApi','$routeParams', '$location', function( AdsApi, $routeParams, $location) {
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


    AdsApi.getUserAd(self.id)
        .then(function(ad){
            self.ad = ad;
            console.log(ad);

        });

    self.title = 'Confirm Deactivating Ad?';
    self.buttonName = 'Deactivate';
    self.submitClick = function() {

        console.log('submit!');
        AdsApi.deactivateUserAd(self.id)
            .then(function(ad){


            });

        //window.history.back();
    };
    self.cancelClick = function() {
        console.log('cancel!');
        window.history.back();
    };

    if ($routeParams.id){
        self.id = $routeParams.id;
    }








}]);
