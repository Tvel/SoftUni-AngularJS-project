angular.module('adsProject')
    .directive('headerMain', ['AdsApi', '$location', function(AdsApi, $location) {
        return {
            scope: {
            headerInfo: '=headerinfo'
            },
            link: function(scope,element){
                element.addClass('row');
            },
            controller: function($scope, AdsApi, $location){

                $scope.showLogout = false;
                if ($scope.headerInfo !== undefined) {
                    if ($scope.headerInfo.username !== undefined) {
                        $scope.showLogout = true;
                    }
                }

                $scope.logout = function() {
                    AdsApi.logout();
                    //    .then(function(){
                    //
                    //});
                    $location.path('#/home');
                };
            },
            templateUrl: 'template/menus/header.html'
        }
    }]);