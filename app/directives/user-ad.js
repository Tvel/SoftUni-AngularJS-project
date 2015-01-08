angular.module('adsProject')
    .directive('userAd', [function() {
        return {
            scope: {
                ad: '=ad',
                title: '=title',
                buttonName:  '=buttonName',
                submitClick: '=submitClick',
                cancelClick: '=cancelClick'
            },
            link: function(scope,element){
                element.addClass('panel panel-default panel-main col-md-10 col-md-offset-1');
            },
            templateUrl: 'template/user-ad/user-ad.html'
        }
    }]);