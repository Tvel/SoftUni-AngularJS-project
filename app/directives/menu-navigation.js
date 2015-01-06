angular.module('adsProject')
    .directive('menuNavigation', [function() {
        return {
            link: function(scope,element){
                element.addClass('panel panel-default panel-side');
            },
            templateUrl: 'template/menu-navigation.html'
        }
    }]);