app.controller('AdminDeleteCategoryController',  [ 'AdminAdsApi','AdsApi','$routeParams', '$location',  function( AdminAdsApi, AdsApi, $routeParams, $location) {
    var self = this;
    self.header = {title:'DeleteCategory'};

    AdsApi.checkLogin().then(function( data){
        // if logged
        if(!data.isAdmin) $location.path('home');
        self.ifNotLogged = false;
        self.ifLogged = true;
        self.header = {title:'Delete Category', username: data.username};
    },function(){
        // if not logged
        self.ifNotLogged = true;
        self.ifLogged = false;
        $location.path('login');
    });

    self.profile = {};
    if ($routeParams.id){
        self.profile.id = $routeParams.id;
    }
    if ($routeParams.Name){
        self.profile.name = $routeParams.Name;
    }

    self.submitDeleteCategory = function (){
        AdminAdsApi.adminDeleteCategory(self.profile.id)
            .then(function(data){
                //console.log(data);
                self.addAlert('success', 'Category deleted successfully.');
                // $location.path('/home');

            }, function(data){
                console.error(data);
                for (model in data) {
                    var msg = data[model];
                    for (info in msg)
                        self.addAlert('danger', msg[info]);
                }
            });
    };

    self.cancelClick = function() {
        window.history.back();
    };



}]);