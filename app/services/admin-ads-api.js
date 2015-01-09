/**
 *  AdminAdsApi handles all admin server communication.
 *
 */
app.service('AdminAdsApi', [ '$http', '$q', '$cookieStore', 'config', 'AdsApi' ,function($http, $q, $cookieStore, config, AdsApi) {
    var self = this;
    var API_URL = config.API_URL;


    /**
     *  GET api/admin/Ads?Status={Status}&CategoryId={CategoryId}&TownId={TownId}&SortBy={SortBy}&StartPage={StartPage}&PageSize={PageSize}
     *
     * @param {status} status  Status for the required page
     *  All - 'all'
     *  Inactive - 0
     *  WaitingApproval - 1
     *  Published - 2
     *  Rejected - 3
     * @param categoryId
     * @param townId
     * @param sortBy Sorting expression, e.g. 'Title', '-Title' (descending), 'Owner.Name'.
     * @param {startPage} startPage The page to be displayed
     * @param {pageSize} pageSize The page size to be displayed
     *
     */
    self.getAdminAds = function (status, categoryId, townId, sortBy, startPage, pageSize){
        if (status == 'all') status = '';

        if (Number(startPage) < 0 || Number(startPage) > 100000 ) startPage = 1;
        if (Number(pageSize) < 0 || Number(pageSize) > 1000 ) pageSize = 4;

        var userdata = $cookieStore.get('userdata');
        //console.log(status + startPage + pageSize);

        var request = $http({
            method: "get",
            url: API_URL + "/api/user/Ads",
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            params: {
                Status: status,
                CategoryId: categoryId,
                TownId: townId,
                SortBy: sortBy,
                StartPage: startPage,
                PageSize: pageSize
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };


    function handleErrorTypeOne( response ) {

        if (
            ! angular.isObject( response.data ) ||
            ! response.data.error
        ) {
            return( $q.reject( "An unknown error occurred." ) );
        }

        // Otherwise, use expected error message.
        return( $q.reject( response.data.error_description ) );

    }
    function handleErrorTypeTwo( response ) {

        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
        ) {
            return( $q.reject( "An unknown error occurred." ) );
        }

        // Otherwise, use expected error message.
        return( $q.reject( response.data.modelState ) );

    }

    function handleSuccess( response ) {

        return( response.data );

    }

}]);