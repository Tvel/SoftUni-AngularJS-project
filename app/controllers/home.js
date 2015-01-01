app.controller('home',  [ 'AdsApi','$routeParams', function( AdsApi, $routeParams) {
    var self = this;

    self.categoryId = 'all';
    self.townId = 'all';
    self.startPage = 1;
    self.pageSize = 4;

    if ($routeParams.CategoryId){
        self.categoryId = $routeParams.CategoryId;
    }
    if ($routeParams.CategoryId){
        self.townId = $routeParams.TownId;
    }
    if ($routeParams.CategoryId){
        self.startPage = $routeParams.StartPage;
    }
    if ($routeParams.CategoryId){
        self.pageSize = $routeParams.PageSize;
    }

    function getAds() {

        AdsApi.getAds(self.categoryId, self.townId, self.startPage, self.pageSize).then(function(ads){
            self.ads = ads;
            console.log(ads);
            self.pagTotalItems = self.ads.numItems;
        });

    }

    AdsApi.getTowns().then(function(towns){
        self.towns = towns;
    });

    AdsApi.getCategories().then(function(cats){
        self.categories = cats;
    });

    getAds();

    self.test =  AdsApi.test;
    self.filterByCategory = function(id){
        console.log(id);
        self.categoryId = id;
        getAds();
    };

    self.filterByTown = function(id){
        console.log(id);
        self.townId = id;
        getAds();
    };

    self.pageChanged  = function(){
        console.log(self.pagCurrentPage);
        self.startPage = self.pagCurrentPage;
        getAds();
    };

    console.log($routeParams);


    self.maxSize = 5;

    self.itemsPerPage = self.pageSize;
    self.pagCurrentPage = self.startPage;




}]);
