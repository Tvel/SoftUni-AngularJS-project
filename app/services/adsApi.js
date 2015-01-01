app.factory('AdsApi', [ '$http','$q',function($http, $q) {


    function getTowns() {
        return $http.get('http://softuni-ads.azurewebsites.net/api/Towns')
            .then( handleSuccess, handleError );
    }

    function getCategories() {
        return $http.get('http://softuni-ads.azurewebsites.net/api/Categories')
            .then( handleSuccess, handleError );
    }

    //GET api/Ads?CategoryId={CategoryId}&TownId={TownId}&StartPage={StartPage}&PageSize={PageSize}
    function getAds(categoryId, townId, startPage, pageSize) {
        if (categoryId == 'all') categoryId = '';
        if (townId == 'all') townId = '';

        if (Number(startPage) < 0 || Number(startPage) > 100000 ) startPage = 1;
        if (Number(pageSize) < 0 || Number(pageSize) > 1000 ) pageSize = 4;

        console.log(categoryId + townId + startPage + pageSize);

        var request = $http({
            method: "get",
            url: "http://softuni-ads.azurewebsites.net/api/Ads",
            params: {
                CategoryId: categoryId,
                TownId : townId,
                StartPage: startPage,
                PageSize: pageSize
            }
        });

        return( request.then( handleSuccess, handleError ) );
    }

    function testpost( name ) {

        var request = $http({
            method: "post",
            url: "api/test",
            params: {
                action: "add"
            },
            data: {
                name: name
            }
        });

        return( request.then( handleSuccess, handleError ) );

    }

    return {
        getTowns: getTowns,
        getCategories: getCategories,
        getAds: getAds,
        test: 'test'
    };




    // I transform the error response, unwrapping the application dta from
    // the API response payload.
    function handleError( response ) {

        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
        ) {

            return( $q.reject( "An unknown error occurred." ) );

        }

        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );

    }


    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {

        return( response.data );

    }
}]);