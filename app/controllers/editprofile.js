app.controller('editProfileController',  [ 'AdsApi', '$location', '$interval', function( AdsApi, $location, $interval) {
    var self = this;
    self.header = {title:'Edit User Profile'};

    self.pattern= /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

    AdsApi.checkLogin()
        .then(
        function(userdata){
            self.header = {title:'Edit User Profile', username: userdata.username};
            self.menuactive='Edit profile';
            self.ifLogged = true;
        },
        function(error){
            console.log('not logged in, redirecting');
            $location.path('/home');
        }
    );

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

    self.towns = AdsApi.getSavedTowns();
    AdsApi.getTowns()
        .then(function(towns){
            self.towns = towns;
        });

    self.refreshInfo = function(){
        AdsApi.getProfileInfo()
            .then(function(profile){
                self.profile = profile;
                console.log(profile);

                if (angular.isDefined(profileinfoInterval)) {
                    $interval.cancel(profileinfoInterval);
                    profileinfoInterval = undefined;
                }
            });
    };

    var profileinfoInterval = undefined;
    if (!angular.isDefined(self.profile))
    {
        if (!angular.isDefined(profileinfoInterval)) {
            profileinfoInterval = $interval(function () {
                self.refreshInfo();
            }, 1000)
        }

    }



    self.submitEdit = function (){

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

    self.submitChangePass = function (){

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