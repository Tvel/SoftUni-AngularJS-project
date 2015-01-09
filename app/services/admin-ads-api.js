/**
 *  AdminAdsApi handles all admin server communication.
 *
 */
app.service('AdminAdsApi', [ '$http', '$q', '$cookieStore', 'config', 'AdsApi' ,function($http, $q, $cookieStore, config, AdsApi) {
    var self = this;
    var API_URL = config.API_URL;








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