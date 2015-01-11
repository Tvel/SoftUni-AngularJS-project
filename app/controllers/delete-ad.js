app.controller('DeleteAdController', ['AdsApi', '$routeParams', '$location',
    function (AdsApi, $routeParams, $location) {
        var self = this;
        self.header = {
            title: 'Delete Ad'
        };

        AdsApi.checkLogin().then(function (data) {
            // if logged
            self.ifNotLogged = false;
            self.ifLogged = true;
            self.header = {
                title: 'Delete Ad',
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
        self.title = 'Confirm Deleting Ad?';
        self.buttonName = 'Delete';
        self.submitClick = function () {
            AdsApi.deleteUserAd(self.id)
                .then(function (ad) {
                    self.addAlert('success', 'Ad is Deleted');
                }, function (error) {
                    console.error(error);
                });

            window.history.back();
        };
        self.cancelClick = function () {
            window.history.back();
        };


}]);
