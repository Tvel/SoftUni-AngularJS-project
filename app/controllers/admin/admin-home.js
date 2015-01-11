app.controller('AdminHomeController', ['AdsApi', 'AdminAdsApi', '$routeParams', '$location', function (AdsApi, AdminAdsApi, $routeParams, $location) {
    var self = this;
    self.header = {title: 'Ads'};

    AdsApi.checkLogin().then(function (data) {
        // if logged
        if (!data.isAdmin) $location.path('home');
        self.ifNotLogged = false;
        self.ifLogged = true;
        self.header = {title: 'Ads', username: data.username};
    }, function () {
        // if not logged
        self.ifNotLogged = true;
        self.ifLogged = false;
        $location.path('login');
    });

    self.statusList = [
        {id: 0, name: 'Inactive'},
        {id: 1, name: 'Waiting Approval'},
        {id: 2, name: 'Published'},
        {id: 3, name: 'Rejected'}
    ];
    self.sortList = [
        //Sorting expression, e.g. 'Title', '-Title' (descending), 'Owner.Name'.
        {id: 'Title', name: 'Title Asc'},
        {id: '-Title', name: 'Title Desc'},
        {id: 'Owner.Name', name: 'Owner Asc'},
        {id: '-Owner.Name', name: 'Owner Desc'}
    ];

    self.status = 'all';
    self.sort = 'Title';
    self.categoryId = 'all';
    self.townId = 'all';
    self.startPage = 1;
    self.pageSize = 4;
    self.pagTotalItems = Infinity;

    if ($routeParams.Status !== undefined) {
        self.status = $routeParams.Status;
    }
    if ($routeParams.CategoryId) {
        self.categoryId = $routeParams.CategoryId;
    }
    if ($routeParams.TownId) {
        self.townId = $routeParams.TownId;
    }
    if ($routeParams.StartPage) {
        self.startPage = $routeParams.StartPage;
    }
    if ($routeParams.SortBy) {
        self.sort = $routeParams.SortBy;
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
        AdminAdsApi.getAdminAds(self.status, self.categoryId, self.townId, self.sort, self.startPage, self.pageSize)
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
        $location.path('/admin/home').search({
            CategoryId: self.categoryId,
            TownId: self.townId,
            StartPage: self.startPage,
            Status: self.status,
            SortBy: self.sort
        });
        //getAds();
    };

    self.filterByTown = function (id) {
        //console.log('TownFilter: '+id);
        self.townId = id;
        $location.path('/admin/home').search({
            CategoryId: self.categoryId,
            TownId: self.townId,
            StartPage: self.startPage,
            Status: self.status,
            SortBy: self.sort
        });

        //getAds();
    };
    self.filterByStatus = function (id) {
        // console.log('StatusFilter: '+id);
        self.status = id;
        $location.path('/admin/home').search({
            CategoryId: self.categoryId,
            TownId: self.townId,
            StartPage: self.startPage,
            Status: self.status,
            SortBy: self.sort
        });

    };
    self.filterBySort = function (id) {
        // console.log('SortFilter: '+id);
        self.sort = id;
        $location.path('/admin/home').search({
            CategoryId: self.categoryId,
            TownId: self.townId,
            StartPage: self.startPage,
            Status: self.status,
            SortBy: self.sort
        });

    };

    self.pageChanged = function () {
        //console.log('PageChange:' + self.pagCurrentPage);
        self.startPage = Number(self.pagCurrentPage);
        $location.path('/admin/home').search({
            CategoryId: self.categoryId,
            TownId: self.townId,
            StartPage: self.startPage,
            Status: self.status,
            SortBy: self.sort
        });


    };

}]);
