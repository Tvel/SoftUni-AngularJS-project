app.controller('AdminEditAdController', ['AdminAdsApi', 'AdsApi', '$routeParams', '$location', function (AdminAdsApi, AdsApi, $routeParams, $location) {
    var self = this;
    self.header = {title: 'Edit Ad'};

    AdsApi.checkLogin().then(function (data) {
        // if logged
        if (!data.isAdmin) $location.path('home');
        self.ifNotLogged = false;
        self.ifLogged = true;
        self.header = {title: 'Edit Ad', username: data.username};
    }, function () {
        // if not logged
        self.ifNotLogged = true;
        self.ifLogged = false;
        $location.path('login');
    });

    if ($routeParams.id) {
        self.id = $routeParams.id;
    }

    self.changeImageValue = false;
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
    AdminAdsApi.adminAd(self.id)
        .then(function (ad) {
            self.ad = ad;
            //console.log(ad);
            self.image = self.ad.imageDataUrl;
            self.date = new Date(self.ad.date);

        });


    self.changeImage = function () {
        //console.log('change');
        if (angular.isObject(self.newImage)) {
            this.image = "data:" + self.newImage.filetype + ";base64," + self.newImage.base64;
            self.changeImageValue = true;
        }
    };
    self.deleteImage = function () {
        // console.log('delete');
        this.image = "//:0";
        self.changeImageValue = true;
    };

    self.submitEditAd = function () {
        AdminAdsApi.adminUpdateAd(self.id, self.ad.title, self.ad.text, self.changeImageValue, self.image, self.ad.ownerUsername, self.ad.categoryId, self.ad.townId, self.date, self.ad.status)
            .then(function (data) {
                //console.log(data);
                self.addAlert('success', 'Advertisement edited successfully.');
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


}]);