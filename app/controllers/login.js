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

    self.alerts = [
        //{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        //{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

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




    self.Submit = function (){
       // self.addAlert('success', self.username + ' ' + self.password);
        AdsApi.login(self.username, self.password)
            .then(function(data){
                //console.log(data);
                self.addAlert('success', 'Login Successful');

                $location.path('/home');


            }, function(data){
                console.error('Error: ' +data);
                self.addAlert('danger', data);
            });
    }





}]);
