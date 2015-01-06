angular.module('adsProject')
    .directive('menuLogin', [function() {
        return {
            link: function(scope,element){
                element.addClass('panel panel-default panel-side');
            },
            templateUrl: 'template/menu-login.html'
        }
    }]);