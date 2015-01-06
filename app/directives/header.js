angular.module('adsProject')
    .directive('headerMain', [function() {
        return {
            scope: {
            headerInfo: '=headerinfo'
            },
            link: function(scope,element){
                element.addClass('row');
            },
            templateUrl: 'template/header.html'
        }
    }]);