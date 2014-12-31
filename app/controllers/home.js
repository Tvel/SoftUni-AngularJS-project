app.controller('home',  [ 'AdsApi', function( AdsApi) {
    var self = this;

    AdsApi.getTowns().then(function(towns){
        self.towns = towns;
    });

    AdsApi.getCategories().then(function(cats){
        self.categories= cats;
    });

    self.test =  AdsApi.test;





}]);
