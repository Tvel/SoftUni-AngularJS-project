app.controller('AdminEditUserController', ['AdminAdsApi', 'AdsApi', '$routeParams', '$location', function (AdminAdsApi, AdsApi, $routeParams, $location) {
    var self = this;
    self.header = {title: 'Edit User'};

    AdsApi.checkLogin().then(function (data) {
        // if logged
        if (!data.isAdmin) $location.path('home');
        self.ifNotLogged = false;
        self.ifLogged = true;
        self.header = {title: 'Edit user', username: data.username};
    }, function () {
        // if not logged
        self.ifNotLogged = true;
        self.ifLogged = false;
        $location.path('login');
    });

    self.profile = {};
    if ($routeParams.username) {
        self.profile.username = $routeParams.username;
    }
    if ($routeParams.Email) {
        self.profile.email = $routeParams.Email;
    }
    if ($routeParams.PhoneNumber) {
        self.profile.phoneNumber = $routeParams.PhoneNumber;
    }
    if ($routeParams.Name) {
        self.profile.name = $routeParams.Name;
    }
    if ($routeParams.TownId) {
        self.profile.townId = $routeParams.TownId;
    }
    if ($routeParams.isAdmin) {
        self.profile.isAdmin = $routeParams.isAdmin;
    }

    self.towns = AdsApi.getSavedTowns();
    AdsApi.getTowns()
        .then(function (towns) {
            self.towns = towns;
        });


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

        AdminAdsApi.adminChangePasswordUser(self.profile.username, self.oldpassword, self.newpassword, self.newpasswordconf)
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


    self.submitEditUser = function () {
        AdminAdsApi.adminUpdateUser(self.profile.username, self.profile.name, self.profile.email, self.profile.phoneNumber, self.profile.townId, self.profile.isAdmin)
            .then(function (data) {
                //console.log(data);
                self.addAlert('success', 'Profile edited successfully.');
                // $location.path('/home');

            }, function (data) {
                console.error(data);
                for (model in data) {
                    var msg = data[model];
                    for (info in msg)
                        self.addAlert('danger', msg[info]);
                }
            });
    }

    self.cancelClick = function () {
        window.history.back();
    };


}]);