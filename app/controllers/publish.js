app.controller('PublishAdController', ['AdsApi', '$location', function (AdsApi, $location) {
    var self = this;
    self.header = {title: 'Publish New Ad'};

    AdsApi.checkLogin()
        .then(
        function (userdata) {
            self.header = {title: 'Publish New Ad', username: userdata.username};
            self.menuactive = 'Publish new Ad';
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
    self.categories = AdsApi.getSavedCategories();
    AdsApi.getCategories()
        .then(function (categories) {
            self.categories = categories;
        });

    self.clickBrowse = function () {
        angular.element('#inputPicture').trigger('click');
    };

    self.submitPublishAd = function () {

        AdsApi.postUserAd(self.ad.title, self.ad.text, "data:" + self.ad.img.filetype + ";base64," + self.ad.img.base64, self.ad.categoryId, self.ad.townId)
            .then(function (data) {
                //console.log(data);
                self.addAlert('success', 'Advertisement submitted for approval. Once approved, it will be published.');
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