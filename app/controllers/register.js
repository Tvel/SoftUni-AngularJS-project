app.controller('RegisterController',  [ 'AdsApi', '$location',  function( AdsApi, $location) {
    var self = this;

    self.header = {title:'Register'};

    AdsApi.checkLogin()
        .then(
        function(userdata){
            console.log('logged in, redirecting');
            $location.path('/home');
        },
        function(error){console.log(error)}
    );

    self.towns = AdsApi.getSavedTowns();
    AdsApi.getTowns()
        .then(function(towns){
            self.towns = towns;
        });

    self.Submit = function (){

        AdsApi.register(self.username, self.password, self.passwordconf, self.name, self.email, self.phone, self.town)
            .then(function(data){
                //console.log(data);
                self.addAlert('success', 'Register Successful, plase <a href="#/login">login</a> if not redirected.');
                $location.path('/home');

            }, function(data){
                console.error(data);
                    for (model in data) {
                        var msg = data[model]
                        for (info in msg)
                        self.addAlert('danger', msg[info]);
                    }
            });
    }


}]);