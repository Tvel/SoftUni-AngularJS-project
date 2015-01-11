app.controller('AdminDeleteAdController', ['AdminAdsApi', 'AdsApi', '$routeParams', '$location', function (AdminAdsApi, AdsApi, $routeParams, $location) {
    var self = this;
    self.header = {title: 'Delete Ad'};

    AdsApi.checkLogin().then(function (data) {
        // if logged
        if (!data.isAdmin) $location.path('home');
        self.ifNotLogged = false;
        self.ifLogged = true;
        self.header = {title: 'Delete Ad', username: data.username};
    }, function () {
        // if not logged
        self.ifNotLogged = true;
        self.ifLogged = false;
        $location.path('login');
    });

    if ($routeParams.id) {
        self.id = $routeParams.id;
    }

    AdminAdsApi.adminAd(self.id)
        .then(function (ad) {
            self.ad = ad;
            console.log(ad);

        });
    self.title = 'Confirm Deleting Ad?';
    self.buttonName = 'Delete';
    self.submitClick = function () {
        AdminAdsApi.adminDeleteAd(self.id)
            .then(function (ad) {
                self.addAlert('success', 'Ad is deleteted');
            }, function (error) {
                console.error(error);
            });

        window.history.back();
    };
    self.cancelClick = function () {
        window.history.back();
    };

}]);