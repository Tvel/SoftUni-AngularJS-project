angular.module('adsProject')
    .directive('adsFilter', [function() {
        return {
            scope: {
                title: '=filtertitle',
                activeid: '=filterid',
                clickfn:  '=clickfn',
                filterlist: '=filterlist'
            },
            link: function(scope,element){
                element.addClass('panel panel-default panel-side');
            },
            templateUrl: 'template/menus/adsfilter.html'
        }
    }]);