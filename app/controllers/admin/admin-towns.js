app.controller('AdminTownsController', ['AdsApi', 'AdminAdsApi', '$routeParams', '$location', function (AdsApi, AdminAdsApi, $routeParams, $location) {
    var self = this;
    self.header = {title: 'Towns'};

    AdsApi.checkLogin().then(function (data) {
        // if logged
        if (!data.isAdmin) $location.path('home');
        self.ifNotLogged = false;
        self.ifLogged = true;
        self.header = {title: 'Towns', username: data.username};
    }, function () {
        // if not logged
        self.ifNotLogged = true;
        self.ifLogged = false;
        $location.path('login');
    });

    self.sort = 'Name';
    self.startPage = 1;
    self.pageSize = 6;
    self.pagTotalItems = Infinity;
    self.maxSize = 5;
    self.itemsPerPage = self.pageSize;


    if ($routeParams.StartPage) {
        self.startPage = $routeParams.StartPage;
    }
    if ($routeParams.SortBy) {
        self.sort = $routeParams.SortBy;
    }
    self.pagCurrentPage = Number(self.startPage);
    function getCats() {
        AdminAdsApi.getAdminTowns(self.sort, self.startPage, self.pageSize)
            .then(function (towns) {
                self.towns = towns;
                console.log(towns);
                self.pagTotalItems = self.towns.numItems;
            });
    }

    getCats();

    self.filterBySort = function (id) {
        // console.log('ortFilter: '+id);
        self.sort = id;
        $location.path('/admin/towns/list').search({StartPage: self.startPage, SortBy: self.sort});

    };

    self.pageChanged = function () {
        //console.log('PageChange:' + self.pagCurrentPage);
        self.startPage = Number(self.pagCurrentPage);
        $location.path('/admin/towns/list').search({StartPage: self.startPage, SortBy: self.sort});

    };

}]);