app.controller('home',  [ 'AdsApi', function( AdsApi) {
    var self = this;

    AdsApi.getTowns().then(function(towns){
        self.towns = towns;
    });

    AdsApi.getCategories().then(function(cats){
        self.categories= cats;
    });

    self.test =  AdsApi.test;
    self.filterByCategory = function(id){
        console.log(id);
    };

    self.filterByTown = function(id){
        console.log(id);
    };


    self.maxSize = 5;
    self.pagTotalItems = 175;
    self.pagCurrentPage = 1;




}]);
