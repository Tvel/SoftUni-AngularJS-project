angular.module('adsProject')
    .directive('alertAds', ['$location', function ($location) {
        return {
            scope: {
                addAlert: '=addAlert'
            },
            link: function (scope, element) {
                element.addClass('col-md-12 alert-height');
            },
            controller: function ($scope, $interval) {

                $scope.alerts = [];
                /*
                 * Interval is needed so alerts can be closed one by one every 5 seconds
                 */
                var killInterval = undefined;
                $scope.addAlert = function (type, msg) {
                    $scope.alerts.push({type: type, msg: msg});
                    //console.log(self.alerts);

                    if (!angular.isDefined(killInterval)) {
                        killInterval = $interval(function () {
                            $scope.closeAlert(0);
                        }, 5000)
                    }
                };

                $scope.closeAlert = function (index) {
                    $scope.alerts.splice(index, 1);

                    if ($scope.alerts.length == 0) {
                        if (angular.isDefined(killInterval)) {
                            $interval.cancel(killInterval);
                            killInterval = undefined;
                        }
                    }
                };

            },
            templateUrl: 'template/alert/alert-ads.html'
        }
    }]);