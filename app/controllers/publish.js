app.controller('PublishAdController',  [ 'AdsApi', '$location', '$interval', function( AdsApi, $location, $interval) {
    var self = this;
    self.header = {title:'Publish New Ad'};

    AdsApi.checkLogin()
        .then(
        function(userdata){
            self.header = {title:'Publish New Ad', username: userdata.username};
            self.menuactive='Publish new Ad';
            self.ifLogged = true;
        },
        function(error){
            console.log('not logged in, redirecting');
            $location.path('/home');
        }
    );

    ///Alerts
        self.alerts = [];
        var killInterval = undefined;
        self.addAlert = function(type, msg) {
            self.alerts.push({type: type ,msg: msg});
            console.log(self.alerts);

            if (!angular.isDefined(killInterval)) {
                killInterval = $interval(function () {
                    //function first(p){for(var i in p)return p[i];}
                    self.closeAlert(0);
                    //console.log('boom alert');

                }, 5000)
            }
        };
        self.closeAlert = function(index) {
            self.alerts.splice(index, 1);

            if (self.alerts.length == 0) {
                if (angular.isDefined(killInterval)) {
                    $interval.cancel(killInterval);
                    killInterval = undefined;
                }
            }
        };
    /// Alerts End


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


    self.clickBrowse = function(){
        angular.element('#inputPicture').trigger('click');
    };



    self.submitPublishAd = function (){

        //if (self.newpassword !== self.newpasswordconf) {
        //    return  self.addAlert('danger','Password and confirmation are not the same');
        //}
        //if (self.changePassForm.$error.minlength) {
        //    return  self.addAlert('danger','New Password must be longer that 2 symbols');
        //}
        //if (self.changePassForm.$error.maxlength) {
        //    return  self.addAlert('danger','New Password must be shorter that 100 symbols');
        //}

        AdsApi.postAd(self.ad.title, self.ad.text, "data:"+self.ad.img.filetype+";base64,"+self.ad.img.base64, self.ad.categoryId, self.ad.townId )
            .then(function(data){
                //console.log(data);
                self.addAlert('success', 'Advertisement submitted for approval. Once approved, it will be published.');
                // $location.path('/home');

            }, function(data){
                console.error(data);
                for (model in data) {
                    var msg = data[model]
                    for (info in msg)
                        self.addAlert('danger', msg[info]);
                }
            });
    }


}]);