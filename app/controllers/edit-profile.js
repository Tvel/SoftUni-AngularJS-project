app.controller('editProfileController', ['AdsApi', '$location', function (AdsApi, $location) {
    var self = this;
    self.header = {title: 'Edit User Profile'};

    self.pattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

    AdsApi.checkLogin()
        .then(
        function (userdata) {
            self.header = {title: 'Edit User Profile', username: userdata.username};
            self.menuactive = 'Edit profile';
            self.ifLogged = true;
        },
        function (error) {
            console.log('not logged in, redirecting');
            $location.path('/home');
        }
    );

    self.towns = AdsApi.getSavedTowns();
    AdsApi.getTowns()
        .then(function (towns) {
            self.towns = towns;
        });

    self.refreshInfo = function () {
        AdsApi.getProfileInfo()
            .then(function (profile) {
                self.profile = profile;
                //console.log(profile);

            });
    };
    self.refreshInfo();

    self.submitEdit = function () {
        AdsApi.setProfileInfo(self.profile.name, self.profile.email, self.profile.phoneNumber, self.profile.townId)
            .then(function (data) {
                //console.log(data);
                self.addAlert('success', 'Edit Profile Successful.');

            }, function (data) {
                console.error(data);
                for (model in data) {
                    var msg = data[model]
                    for (info in msg)
                        self.addAlert('danger', msg[info]);
                }
            });
    };

    self.submitChangePass = function () {

        if (self.newpassword !== self.newpasswordconf) {
            return self.addAlert('danger', 'Password and confirmation are not the same');
        }
        if (self.changePassForm.$error.minlength) {
            return self.addAlert('danger', 'New Password must be longer that 2 symbols');
        }
        if (self.changePassForm.$error.maxlength) {
            return self.addAlert('danger', 'New Password must be shorter that 100 symbols');
        }

        AdsApi.changePassword(self.oldpassword, self.newpassword, self.newpasswordconf)
            .then(function (data) {
                //console.log(data);
                self.addAlert('success', 'Password Changed!');
                // $location.path('/home');

            }, function (data) {
                console.error(data);
                for (model in data) {
                    var msg = data[model]
                    for (info in msg)
                        self.addAlert('danger', msg[info]);
                }

            });
    }
}]);