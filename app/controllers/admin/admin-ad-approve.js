app.controller('AdminApproveAdController',  [ 'AdminAdsApi','AdsApi','$routeParams', '$location',  function( AdminAdsApi,AdsApi, $routeParams, $location) {
    var self = this;
    self.header = {title:'Approve Ad'};

    AdsApi.checkLogin().then(function( data){
        // if logged
        if(!data.isAdmin) $location.path('home');
        self.ifNotLogged = false;
        self.ifLogged = true;
        self.header = {title:'Approve Ad', username: data.username};
    },function(){
        // if not logged
        self.ifNotLogged = true;
        self.ifLogged = false;
        $location.path('login');
    });

    if ($routeParams.id){
        self.id = $routeParams.id;
    }

    AdminAdsApi.adminAd(self.id)
        .then(function(ad){
            self.ad = ad;
            console.log(ad);

        });
    self.title = 'Confirm Approving Ad?';
    self.buttonName = 'Approve';
    self.submitClick = function() {
        AdminAdsApi.adminApproveAd(self.id)
            .then(function(ad){
                self.addAlert('success', 'Ad is approved');
            }, function(error){
                console.error(error);
            });

        window.history.back();
    };
    self.cancelClick = function() {
        window.history.back();
    };

}]);