app.controller('LoginController',  [ 'AdsApi', '$location', '$interval', function( AdsApi, $location, $interval) {
var self = this;

    self.header = {title:'Login'};

    AdsApi.checkLogin()
        .then(
        function(userdata){
            console.log('logged in, redirecting');
            $location.path('/home');
        },
        function(error){console.log(error)}
    );

    self.Submit = function (){
        AdsApi.login(self.username, self.password)
            .then(function(data){ //success
                //console.log(data);
                self.addAlert('success', 'Login Successful');
                $location.path('/home');

            }, function(data){  //error
                console.error('Error: ' +data);
                self.addAlert('danger', data);
            });
    }

}]);
