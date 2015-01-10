app.controller('AdminDeleteUserController',  [ 'AdminAdsApi','AdsApi','$routeParams', '$location',  function( AdminAdsApi, AdsApi, $routeParams, $location) {
    var self = this;
    self.header = {title:'Delete User'};

    AdsApi.checkLogin().then(function( data){
        // if logged
        if(!data.isAdmin) $location.path('home');
        self.ifNotLogged = false;
        self.ifLogged = true;
        self.header = {title:'Delete user', username: data.username};
    },function(){
        // if not logged
        self.ifNotLogged = true;
        self.ifLogged = false;
        $location.path('login');
    });

    self.profile = {};
    if ($routeParams.username){
        self.profile.username = $routeParams.username;
    }
    if ($routeParams.Email){
        self.profile.email = $routeParams.Email;
    }
    if ($routeParams.PhoneNumber){
        self.profile.phoneNumber = $routeParams.PhoneNumber;
    }
    if ($routeParams.Name){
        self.profile.name = $routeParams.Name;
    }
    if ($routeParams.TownId){
        self.profile.townId= $routeParams.TownId;
    }
    if ($routeParams.isAdmin){
        self.profile.isAdmin= $routeParams.isAdmin;
    }
    if ($routeParams.Id){
        self.profile.id= $routeParams.Id;
    }

    self.towns = AdsApi.getSavedTowns();
    AdsApi.getTowns()
        .then(function(towns){
            self.towns = towns;
        });


    self.submitDeleteUser = function (){
        AdminAdsApi.adminDeleteUser(self.profile.username )
            .then(function(data){
                //console.log(data);
                self.addAlert('success', 'User Deleted successfully.');
                // $location.path('/admin/users/list');
                window.history.back();

            }, function(data){
                console.error(data);
                for (model in data) {
                    var msg = data[model];
                    for (info in msg)
                        self.addAlert('danger', msg[info]);
                }
            });
    }

    self.cancelClick = function() {
        window.history.back();
    };



}]);