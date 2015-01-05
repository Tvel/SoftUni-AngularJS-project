angular.module('adsProject')
    .directive('headerMain', [function() {
        return {
            scope: {
            headerInfo: '=headerinfo'
            },
            templateUrl: 'template/header.html'
        }
    }]);