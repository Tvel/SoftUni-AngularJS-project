angular.module('adsProject')
    .directive('adsFilter', [function() {
        return {
            scope: {
                title: '=filtertitle',
                activeid: '=filterid',
                clickfn:  '=clickfn',
                filterlist: '=filterlist',
                showAll: '=?showAll'
            },
            link: function(scope,element){
                element.addClass('panel panel-default panel-side');
            },
            controller: function($scope){
                if ( !angular.isDefined($scope.showAll)) { $scope.showAll = true;}
            },
            templateUrl: 'template/menus/adsfilter.html'
        }
    }]);