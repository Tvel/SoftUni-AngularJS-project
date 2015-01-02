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

    function register(Username, Password, ConfirmPassword, Name, Email, Phone, TownId){
        //requires : Username, Password, ConfirmPassword, Name, Email
        //optional : Phone, TownId
        //
        //returns :
        //{
        //    "access_token": "CfZxR56Gx0ViDB0rNF9aNdi3NBtobyLoJsNOQlwnWlE0cHkPjRV_l-YQNeTxeRUhl3dEQ_pi1csjKuNAs7zJdOOYkiYEd6k9DoRQubf12d8hyKgjBRnRtvTCqj2bNf37vzHeZO69wSXx16ILWvyfEbz-Gc67tHUi8Y-rAEXXi1MOgUbsbk6G7YHpiV2sFX6-o979ONnEoEt8vEe0cOFfNagWW3f3km6EZTKwGH0qqw98q6wAYCOkpZYLglxMh390vYaKTozaRBy0qw5n0f09M4zaXtgpGtOg36vX_NtzzhXYCJ2oVI3j3Kchjv6-gw7Y1EVmJxy10GDbJTz-b32bYV8_DuASu_4JqEvG8uKwoCJWUKaForft0ECbLpkdHQ61S20wwizbNU1goI0DccMSuQev7207Z862VVhmlHj9f4XJW20YWUVsKHbm4Wqo_jGAHasOGt9wkpf9fxG0UTWaFIsv1aYGGLrUb_luWcmDbic",
        //    "token_type": "bearer",
        //    "expires_in": 1209599,
        //    "username": "tostos",
        //    ".issued": "Fri, 02 Jan 2015 21:27:13 GMT",
        //    ".expires": "Fri, 16 Jan 2015 21:27:13 GMT"
        //}

        var request = $http({
            method: "post",
            url: "http://softuni-ads.azurewebsites.net/api/user/Register",
            params: {
                Username: Username,
                Password: Password,
                ConfirmPassword: ConfirmPassword,
                Name: Name,
                Email: Email,
                Phone: Phone,
                TownId: TownId
            }
        });

        return( request.then( handleSuccess, handleError ) );
    }

    function login(Username, Password){
        var request = $http({
            method: "post",
            url: "http://softuni-ads.azurewebsites.net/api/user/Login",
            params: {
                Username: Username,
                Password: Password
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
        register: register,
        login: login,
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