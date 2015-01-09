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

    self.alerts = [];
    /*
     * Interval is needed so alerts can be closed one by one every 5 seconds
     */
    var killInterval = undefined;
    self.addAlert = function(type, msg) {
        self.alerts.push({type: type ,msg: msg});
        //console.log(self.alerts);

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
