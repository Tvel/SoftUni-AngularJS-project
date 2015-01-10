/**
 *  AdminAdsApi handles all admin server communication.
 *
 */
app.service('AdminAdsApi', [ '$http', '$q', '$cookieStore', 'config', 'AdsApi' ,function($http, $q, $cookieStore, config, AdsApi) {
    var self = this;
    var API_URL = config.API_URL;

    /**
     *  POST api/admin/Towns
     *
     * @param name new name for the town
     */
    self.adminNewTown = function ( name){
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "post",
            url: API_URL + "/api/admin/Towns",
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            data: {
                name: name
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  PUT api/admin/Towns/{id}
     *
     * @param {number} id  id for the required Town
     *
     * @param name new name for the town
     */
    self.adminUpdateTown = function (id, name){
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "put",
            url: API_URL + "/api/admin/Towns/" + id,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            data: {
                name: name
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  DELETE api/admin/Towns/{id}
     *
     * @param {number} id  id for the required town
     *
     */
    self.adminDeleteTown = function (id){
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "delete",
            url: API_URL + "/api/admin/Towns/" + id,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  GET api/admin/Towns?SortBy={SortBy}&StartPage={StartPage}&PageSize={PageSize}
     *
     * @param sortBy Sorting expression, e.g. 'Title', '-Title' (descending), 'Owner.Name'.
     * @param {startPage} startPage The page to be displayed
     * @param {pageSize} pageSize The page size to be displayed
     *
     */
    self.getAdminTowns = function ( sortBy, startPage, pageSize){

        if (Number(startPage) < 0 || Number(startPage) > 100000 ) startPage = 1;
        if (Number(pageSize) < 0 || Number(pageSize) > 1000 ) pageSize = 4;

        var userdata = $cookieStore.get('userdata');
        //console.log(status + startPage + pageSize);

        var request = $http({
            method: "get",
            url: API_URL + "/api/admin/Towns",
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            params: {
                SortBy: sortBy,
                StartPage: startPage,
                PageSize: pageSize
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  POST api/admin/Categories
     *
     * @param name new name for the category
     */
    self.adminNewCategory = function ( name){
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "post",
            url: API_URL + "/api/admin/Categories",
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            data: {
                name: name
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  PUT api/admin/Categories/{id}
     *
     * @param {number} id  id for the required category
     *
     * @param name new name for the category
     */
    self.adminUpdateCategory = function (id, name){
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "put",
            url: API_URL + "/api/admin/Categories/" + id,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            data: {
                name: name
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  DELETE api/admin/Categories/{id}
     *
     * @param {number} id  id for the required category
     *
     */
    self.adminDeleteCategory = function (id){
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "delete",
            url: API_URL + "/api/admin/Categories/" + id,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  GET api/admin/Categories?SortBy={SortBy}&StartPage={StartPage}&PageSize={PageSize}
     *
     * @param sortBy Sorting expression, e.g. 'Title', '-Title' (descending), 'Owner.Name'.
     * @param {startPage} startPage The page to be displayed
     * @param {pageSize} pageSize The page size to be displayed
     *
     */
    self.getAdminCategories = function ( sortBy, startPage, pageSize){

        if (Number(startPage) < 0 || Number(startPage) > 100000 ) startPage = 1;
        if (Number(pageSize) < 0 || Number(pageSize) > 1000 ) pageSize = 4;

        var userdata = $cookieStore.get('userdata');
        //console.log(status + startPage + pageSize);

        var request = $http({
            method: "get",
            url: API_URL + "/api/admin/Categories",
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            params: {
                SortBy: sortBy,
                StartPage: startPage,
                PageSize: pageSize
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  DELETE api/admin/User/{username}
     *
     * @param {string} username  name for the required user
     *
     */
    self.adminDeleteUser = function (username){
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "delete",
            url: API_URL + "/api/admin/User/" + username,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };


    /**
     *  PUT api/admin/SetPassword
     *
     * @param {string} username username for the required user
     * @param newPass new password
     * @param confPass confirm password
     */
    self.adminChangePasswordUser = function (username, newPass, confPass){
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "put",
            url: API_URL + "/api/admin/SetPassword",
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            data: {
                Username: username,
                NewPassword: newPass,
                ConfirmPassword: confPass

            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  PUT api/admin/User/{username}
     *
     * @param {string} username username for the required user
     *
     */
    self.adminUpdateUser = function (username, name, email, phone, townid, isAdmin){
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "put",
            url: API_URL + "/api/admin/User/" + username,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            data: {
                Name: name,
                Email: email,
                PhoneNumber: phone,
                TownId: townid,
                IsAdmin: isAdmin
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  GET api/admin/Users?SortBy={SortBy}&StartPage={StartPage}&PageSize={PageSize}
     *
     * @param sortBy Sorting expression, e.g. 'Title', '-Title' (descending), 'Owner.Name'.
     * @param {startPage} startPage The page to be displayed
     * @param {pageSize} pageSize The page size to be displayed
     *
     */
    self.getAdminUsers = function ( sortBy, startPage, pageSize){

        if (Number(startPage) < 0 || Number(startPage) > 100000 ) startPage = 1;
        if (Number(pageSize) < 0 || Number(pageSize) > 1000 ) pageSize = 4;

        var userdata = $cookieStore.get('userdata');
        //console.log(status + startPage + pageSize);

        var request = $http({
            method: "get",
            url: API_URL + "/api/admin/Users",
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            params: {
                SortBy: sortBy,
                StartPage: startPage,
                PageSize: pageSize
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  DELETE api/admin/Ads/{id}
     *
     * @param {id} id  ID for the required ad
     *
     *
     */
    self.adminDeleteAd = function (id){
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "delete",
            url: API_URL + "/api/admin/Ads/" + id,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  PUT api/admin/Ads/{id}
     *
     * @param {id} id  ID for the required ad
     *
     *
     * @param title
     * @param text
     * @param changeImage
     * @param image
     * @param owner
     * @param catId
     * @param townId
     * @param date
     * @param status
     */
    self.adminUpdateAd = function (id, title, text, changeImage, image, owner, catId, townId, date, status){
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "put",
            url: API_URL + "/api/admin/Ads/" + id,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            data: {
                Title: title,
                Text: text,
                ChangeImage: changeImage,
                ImageDataURL: image,
                CategoryId: catId,
                TownId: townId,
                Date: date,
                Status: status
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  GET api/admin/Ads/{id}
     *
     * @param {id} id  ID for the required ad
     *
     *
     */
    self.adminAd = function (id){
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "get",
            url: API_URL + "/api/admin/Ads/" + id,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  PUT api/admin/Ads/Approve/{id}
     *
     * @param {id} id  ID for the required ad
     *
     *
     */
    self.adminApproveAd = function (id){
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "put",
            url: API_URL + "/api/admin/Ads/Approve/" + id,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  PUT api/admin/Ads/Reject/{id}
     *
     * @param {id} id  ID for the required ad
     *
     *
     */
    self.adminRejectAd = function (id){
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "put",
            url: API_URL + "/api/admin/Ads/Reject/" + id,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            }
        });

        return( request.then( handleSuccess, handleErrorTypeOne ) );
    };

    /**
     *  GET api/admin/Ads?Status={Status}&CategoryId={CategoryId}&TownId={TownId}&SortBy={SortBy}&StartPage={StartPage}&PageSize={PageSize}
     *
     * @param status  Status for the required page
     *  All - 'all'
     *  Inactive - 0
     *  WaitingApproval - 1
     *  Published - 2
     *  Rejected - 3
     * @param categoryId
     * @param townId
     * @param sortBy Sorting expression, e.g. 'Title', '-Title' (descending), 'Owner.Name'.
     * @param {number} startPage The page to be displayed
     * @param {number} pageSize The page size to be displayed
     *
     */
    self.getAdminAds = function (status, categoryId, townId, sortBy, startPage, pageSize){
        if (status == 'all') status = '';
        if (categoryId == 'all') categoryId = '';
        if (townId == 'all') townId = '';

        if (Number(startPage) < 0 || Number(startPage) > 100000 ) startPage = 1;
        if (Number(pageSize) < 0 || Number(pageSize) > 1000 ) pageSize = 4;

        var userdata = $cookieStore.get('userdata');
        //console.log(status + startPage + pageSize);

        var request = $http({
            method: "get",
            url: API_URL + "/api/admin/Ads",
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