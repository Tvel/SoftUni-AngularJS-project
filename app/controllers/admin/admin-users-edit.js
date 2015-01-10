app.controller('AdminEditUserController',  [ 'AdminAdsApi','AdsApi','$routeParams', '$location',  function( AdminAdsApi, AdsApi, $routeParams, $location) {
    var self = this;
    self.header = {title:'Edit User'};

    AdsApi.checkLogin().then(function( data){
        // if logged
        if(!data.isAdmin) $location.path('home');
        self.ifNotLogged = false;
        self.ifLogged = true;
        self.header = {title:'Edit Ad', username: data.username};
    },function(){
        // if not logged
        self.ifNotLogged = true;
        self.ifLogged = false;
        $location.path('login');
    });

    if ($routeParams.id){
        self.id = $routeParams.id;
    }






    self.submitEditAd = function (){
        AdminAdsApi.adminUpdateUser(self.id, self.ad.title, self.ad.text, self.changeImageValue, self.image,self.ad.ownerUsername, self.ad.categoryId, self.ad.townId, self.date, self.ad.status )
            .then(function(data){
                //console.log(data);
                self.addAlert('success', 'Advertisement edited successfully.');
                // $location.path('/home');

            }, function(data){
                console.error(data);
                for (model in data) {
                    var msg = data[model];
                    for (info in msg)
                        self.addAlert('danger', msg[info]);
                }
            });
    }


}]);