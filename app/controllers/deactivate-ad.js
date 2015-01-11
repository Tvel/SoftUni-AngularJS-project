app.controller('DeactivateAdController', ['AdsApi', '$routeParams', '$location',
    function (AdsApi, $routeParams, $location) {
        var self = this;
        self.header = {
            title: 'Deactivate Ad'
        };

        AdsApi.checkLogin().then(function (data) {
            // if logged
            self.ifNotLogged = false;
            self.ifLogged = true;
            self.header = {
                title: 'Deactivate Ad',
                username: data.username
            };
        }, function () {
            // if not logged
            self.ifNotLogged = true;
            self.ifLogged = false;

        });

        if ($routeParams.id) {
            self.id = $routeParams.id;
        }

        AdsApi.getUserAd(self.id)
            .then(function (ad) {
                self.ad = ad;
                console.log(ad);

            });
        self.title = 'Confirm Deactivating Ad?';
        self.buttonName = 'Deactivate';
        self.submitClick = function () {
            AdsApi.deactivateUserAd(self.id)
                .then(function (ad) {
                    self.addAlert('success', 'Ad is deactivated');
                }, function (error) {
                    console.error(error);
                });

            window.history.back();
        };
        self.cancelClick = function () {
            window.history.back();
        };

}]);
