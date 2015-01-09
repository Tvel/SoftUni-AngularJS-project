app.controller('EditAdController',  [ 'AdsApi', '$location', '$routeParams', function( AdsApi, $location,  $routeParams) {
    var self = this;
    self.header = {title:'Edit Ad'};

    AdsApi.checkLogin()
        .then(
        function(userdata){
            self.header = {title:'Edit Ad', username: userdata.username};
            self.menuactive='Edit Ad';
            self.ifLogged = true;
        },
        function(error){
            console.log('not logged in, redirecting');
            $location.path('/home');
        }
    );

    if ($routeParams.id){
        self.id = $routeParams.id;
    }
    self.changeImageValue = false;

    AdsApi.getUserAd(self.id)
        .then(function(ad){
            self.ad = ad;
            //console.log(ad);
            self.image = self.ad.imageDataUrl;

        });
    self.towns = AdsApi.getSavedTowns();
    AdsApi.getTowns()
        .then(function(towns){
            self.towns = towns;
        });
    self.categories = AdsApi.getSavedCategories();
    AdsApi.getCategories()
        .then(function(categories){
            self.categories = categories;
        });


    self.changeImage = function(){
        //console.log('change');
        if( angular.isObject(  self.newImage) ) {
            this.image = "data:" + self.newImage.filetype + ";base64," + self.newImage.base64;
            self.changeImageValue = true;
        }
    };
    self.deleteImage = function(){
       // console.log('delete');
        this.image = "//:0";
        self.changeImageValue = true;
    };

    self.submitEditAd = function (){
        AdsApi.editUserAd(self.id, self.changeImageValue, self.ad.title, self.ad.text, self.image, self.ad.categoryId, self.ad.townId )
            .then(function(data){
                //console.log(data);
                self.addAlert('success', 'Advertisement submitted for approval. Once approved, it will be published.');
                // $location.path('/home');

            }, function(data){
                console.error(data);
                for (model in data) {
                    var msg = data[model];
                    for (info in msg)
                        self.addAlert('danger', msg[info]);
                }
            });
    }


}]);