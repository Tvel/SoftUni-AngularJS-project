angular.module('adsProject')
    .directive('menuAdminNavigation', [function() {
        return {
            scope: {
                active: '=active'
            },
            link: function(scope,element){
                element.addClass('panel panel-default panel-side');
            },
            templateUrl: 'template/menus/menu-admin-navigation.html'
        }
    }]);