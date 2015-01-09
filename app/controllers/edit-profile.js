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
    /*
     * Interval is needed so alerts can be closed one by one every 5 seconds
     */
    var killInterval = undefined;
    self.addAlert = function(type, msg) {
        self.alerts.push({type: type ,msg: msg});
        console.log(self.alerts);

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

    self.towns = AdsApi.getSavedTowns();
    AdsApi.getTowns()
        .then(function(towns){
            self.towns = towns;
        });

    self.refreshInfo = function(){
        AdsApi.getProfileInfo()
            .then(function(profile){
                self.profile = profile;
                //console.log(profile);

            });
    };
    self.refreshInfo();




    self.submitEdit = function (){
        AdsApi.setProfileInfo(self.profile.name, self.profile.email, self.profile.phoneNumber, self.profile.townId)
            .then(function(data){
                //console.log(data);
                self.addAlert('success', 'Edit Profile Successful.');

            }, function(data){
                console.error(data);
                for (model in data) {
                    var msg = data[model]
                    for (info in msg)
                        self.addAlert('danger', msg[info]);
                }
            });
    };

    self.submitChangePass = function (){

        if (self.newpassword !== self.newpasswordconf) {
            return  self.addAlert('danger','Password and confirmation are not the same');
        }
        if (self.changePassForm.$error.minlength) {
            return  self.addAlert('danger','New Password must be longer that 2 symbols');
        }
        if (self.changePassForm.$error.maxlength) {
            return  self.addAlert('danger','New Password must be shorter that 100 symbols');
        }

        AdsApi.changePassword(self.oldpassword, self.newpassword, self.newpasswordconf)
            .then(function(data){
               //console.log(data);
                self.addAlert('success', 'Password Changed!');
               // $location.path('/home');

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