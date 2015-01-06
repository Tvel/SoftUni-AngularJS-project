angular.module('adsProject')
    .directive('menuNavigation', [function() {
        return {
            scope: {
                menushow: '=menushow',
                active: '=active'
            },
            link: function(scope,element){
                element.addClass('panel panel-default panel-side');
            },
            templateUrl: 'template/menu-navigation.html'
        }
    }]);