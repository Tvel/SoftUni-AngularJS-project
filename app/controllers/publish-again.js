app.controller('PublishAgainAdController',  [ 'AdsApi','$routeParams', '$location', '$interval', function( AdsApi, $routeParams, $location, $interval) {
    var self = this;
    self.header = {title:'Publish Again Ad'};

    AdsApi.checkLogin().then(function( data){
        // if logged
        self.ifNotLogged = false;
        self.ifLogged = true;
        self.header = {title:'Publish Again Ad', username: data.username};
    },function(){
        // if not logged
        self.ifNotLogged = true;
        self.ifLogged = false;

    });


    if ($routeParams.id){
        self.id = $routeParams.id;
    }

    AdsApi.getUserAd(self.id)
        .then(function(ad){
            self.ad = ad;
            //console.log(ad);
        });

    self.title = 'Confirm Publishing Ad?';
    self.buttonName = 'Publish';

    self.submitClick = function() {
        //console.log('submit!');
        AdsApi.publishAgainUserAd(self.id)
            .then(function(ad){
                self.addAlert('success', 'Ad is Published');
            }, function(error){
                console.error(error);
            });

        window.history.back();
    };

    self.cancelClick = function() {
        //console.log('cancel!');
        window.history.back();
    };










}]);
