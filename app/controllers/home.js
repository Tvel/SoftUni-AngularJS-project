app.controller('HomeController', ['AdsApi', '$routeParams', '$location', function (AdsApi, $routeParams, $location) {
    var self = this;
    self.header = {title: 'Home'};

    AdsApi.checkLogin().then(function (data) {
        // if logged
        if (data.isAdmin) $location.path('admin/home');
        self.ifNotLogged = false;
        self.ifLogged = true;
        self.header = {title: 'Home', username: data.username};
    }, function () {
        // if not logged
        self.ifNotLogged = true;
        self.ifLogged = false;

    });


    self.categoryId = 'all';
    self.townId = 'all';
    self.startPage = 1;
    self.pageSize = 4;
    self.pagTotalItems = Infinity;

    if ($routeParams.CategoryId) {
        self.categoryId = $routeParams.CategoryId;
    }
    if ($routeParams.TownId) {
        self.townId = $routeParams.TownId;
    }
    if ($routeParams.StartPage) {
        self.startPage = $routeParams.StartPage;
    }
    //if ($routeParams.CategoryId){
    //    self.pageSize = $routeParams.PageSize;
    //}

    self.maxSize = 5;
    self.itemsPerPage = self.pageSize;
    self.pagCurrentPage = Number(self.startPage);
    //console.log('PagCurrentPage: '+self.pagCurrentPage);

    self.towns = AdsApi.getSavedTowns();
    self.categories = AdsApi.getSavedCategories();
    function getAds() {

        AdsApi.getAds(self.categoryId, self.townId, self.startPage, self.pageSize)
            .then(function (ads) {
                self.ads = ads;
                //console.log(ads);
                self.pagTotalItems = self.ads.numItems;
            });
    }

    AdsApi.getTowns()
        .then(function (towns) {
            self.towns = towns;
        });
    AdsApi.getCategories().then(function (cats) {
        self.categories = cats;
    });
    getAds();


    self.filterByCategory = function (id) {
        //console.log('CatFilter: '+id);
        self.categoryId = id;
        $location.path('/home').search({CategoryId: self.categoryId, TownId: self.townId, StartPage: self.startPage});
        //getAds();
    };

    self.filterByTown = function (id) {
        //console.log('TownFilter: '+id);
        self.townId = id;
        var path = "/home?CategoryId=" + self.categoryId + '&TownId=' + self.townId + '&StartPage=' + self.startPage;
        $location.path('/home').search({CategoryId: self.categoryId, TownId: self.townId, StartPage: self.startPage});

        //getAds();
    };

    self.pageChanged = function () {
        //console.log('PageChange:' + self.pagCurrentPage);
        self.startPage = Number(self.pagCurrentPage);
        $location.path('/home').search({
            CategoryId: self.categoryId,
            TownId: self.townId,
            StartPage: self.startPage
        });

        //getAds();

    };

}]);
