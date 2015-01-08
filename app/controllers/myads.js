app.controller('MyAdsController',  [ 'AdsApi','$routeParams', '$location', function( AdsApi, $routeParams, $location) {
    var self = this;
    self.header = {title:'My Ads'};

    AdsApi.checkLogin().then(function( data){
        // if logged
        self.ifNotLogged = false;
        self.ifLogged = true;
        self.header = {title:'My Ads', username: data.username};
    },function(){
        // if not logged
        self.ifNotLogged = true;
        self.ifLogged = false;

    });



    self.statusList = [
        {id: 0, name: 'Inactive'},
        {id: 1, name: 'Waiting Approval'},
        {id: 2, name: 'Published'},
        {id: 3, name: 'Rejected'}
    ];
    self.status = 'all';
    self.startPage = 1;
    self.pageSize = 4;
    self.pagTotalItems = Infinity;

    if ($routeParams.Status !== undefined){
        self.status = $routeParams.Status;
    }
    if ($routeParams.CategoryId){
        self.startPage = $routeParams.StartPage;
    }

    self.maxSize = 5;
    self.itemsPerPage = self.pageSize;
    self.pagCurrentPage = Number(self.startPage);
    console.log('PagCurrentPage: '+self.pagCurrentPage);

    //self.towns = AdsApi.getSavedTowns();
    //self.categories = AdsApi.getSavedCategories();
    //AdsApi.getTowns()
    //    .then(function(towns){
    //        self.towns = towns;
    //    });
    //AdsApi.getCategories().then(function(cats){
    //    self.categories = cats;
    //});


    function getUserAds() {
        AdsApi.getUserAds(self.status, self.startPage, self.pageSize)
            .then(function(ads){
                self.ads = ads;
                console.log(ads);
                self.pagTotalItems = self.ads.numItems;
            });
    }


    getUserAds();

    self.test =  AdsApi.test;
    self.filterByStatus = function(id){
        console.log('StatusFilter: '+id);
        self.status = id;
        $location.path('/myads').search({Status: self.status, StartPage: self.startPage});

    };


    self.pageChanged  = function(){
        console.log('PageChange:' + self.pagCurrentPage);
        self.startPage = Number(self.pagCurrentPage);
        $location.path('/myads').search({
            Status: self.status,
            StartPage: self.startPage
        });
    };

    //console.log($routeParams);








}]);
