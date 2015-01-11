/**
 *  AdsApi handles all server communication and user login, logout.
 *
 */
app.service('AdsApi', ['$http', '$q', '$cookieStore', 'config', function ($http, $q, $cookieStore, config) {
    var self = this;
    var API_URL = config.API_URL;

    /**
     * GET api/Towns
     *
     */
    self.getTowns = function getTowns() {
        return $http.get(API_URL + '/api/Towns')
            .then(handleSuccess, handleErrorTypeOne)
            .then(function (response) {
            $cookieStore.put('Towns', response);
            return ( response );
        });
    };

    /**
     * Gets the local Towns storage, helps reduce loading flicker
     * @returns {*} local cookie storage of the Towns
     */
    self.getSavedTowns = function getSavedTowns() {
        return $cookieStore.get('Towns');
    };

    /**
     * GET api/Categories
     *
     */
    self.getCategories = function getCategories() {
        return $http.get(API_URL + '/api/Categories')
            .then(handleSuccess, handleErrorTypeOne)
            .then(function (response) {
                $cookieStore.put('Categories', response);
                return ( response );
            });
    };

    /**
     * Gets the local Category storage, helps reduce loading flicker
     * @returns {*} local cookie storage of the categories
     */
    self.getSavedCategories = function getSavedCategories() {
        return $cookieStore.get('Categories');
    };

    /**
     * GET api/Ads?CategoryId={CategoryId}&TownId={TownId}&StartPage={StartPage}&PageSize={PageSize}
     * @param categoryId
     * @param townId
     * @param startPage
     * @param pageSize
     * @returns {*}
     */
    self.getAds = function getAds(categoryId, townId, startPage, pageSize) {
        if (categoryId == 'all') categoryId = '';
        if (townId == 'all') townId = '';

        if (Number(startPage) < 0 || Number(startPage) > 100000) startPage = 1;
        if (Number(pageSize) < 0 || Number(pageSize) > 1000) pageSize = 4;

        //console.log(categoryId + townId + startPage + pageSize);

        var request = $http({
            method: "get",
            url: API_URL + "/api/Ads",
            params: {
                CategoryId: categoryId,
                TownId: townId,
                StartPage: startPage,
                PageSize: pageSize
            }
        });

        return ( request.then(handleSuccess, handleErrorTypeOne) );
    };

    /**
     * POST api/user/Register
     * @param username
     * @param password
     * @param confirmPassword
     * @param name
     * @param email
     * @param phone
     * @param townId
     *
     * return:{
     *       "access_token": "<token>",
     *       "token_type": "bearer",
     *       "expires_in": <seconds>,
     *       "username": "<username>",
     *       ".issued": "<date>",
     *       ".expires": "<date>"
     *    }
     */
    self.register = function register(username, password, confirmPassword, name, email, phone, townId) {

        var request = $http({
            method: "post",
            url: API_URL + "/api/user/Register",
            data: {
                Username: username,
                Password: password,
                ConfirmPassword: confirmPassword,
                Name: name,
                Email: email,
                Phone: phone,
                TownId: townId
            }
        });

        return ( request.then(handleSuccess, handleErrorTypeTwo)
            .then(function (response) {
                console.log(response);
                $cookieStore.put('userdata', response);
            }));
    };

    /**
     * POST api/user/Login
     *
     * @param Username
     * @param Password
     */
    self.login = function login(Username, Password) {
        var request = $http({
            method: "post",
            url: API_URL + "/api/user/Login",
            data: {
                username: Username,
                password: Password
            }
        });

        return ( request.then(handleSuccess, handleErrorTypeOne)
            .then(function (response) {
                //console.log(response);
                $cookieStore.put('userdata', response);
                return response;
            })
        );
    };

    /**
     * POST api/user/Logout
     *
     */
    self.logout = function logout() {
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "post",
            url: API_URL + "/api/user/Logout",
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            }
        });

        $cookieStore.remove('userdata');

        return ( request.then(handleSuccess, handleErrorTypeOne) );
        //var deferred = $q.defer();
        //
        //return deferred.resolve( {msg: 'Successful logout'} );

    };

    /**
     * Checks if user is logged in and if session is expired
     *
     */
    self.checkLogin = function checkLogin() {
        var userdata = $cookieStore.get('userdata');

        //console.log( userdata);
        var deferred = $q.defer();

        if (angular.isDefined(userdata)) {

            var dateNow = new Date(new Date().getTime());
            var dateExpires = new Date(userdata['.expires']);

            if (dateNow > dateExpires) {
                deferred.reject('session expired');
            }
            else {
                deferred.resolve(userdata);
            }
        }
        else {
            deferred.reject('not logged')
        }


        return deferred.promise;

    };

    /**
     * GET api/user/Profile
     *
     */
    self.getProfileInfo = function getProfileInfo() {

        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "get",
            url: API_URL + "/api/user/Profile",
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            }
        });

        return ( request.then(handleSuccess, handleErrorTypeOne) );


    };

    /**
     * PUT api/user/Profile
     * @param name
     * @param email
     * @param phone
     * @param townId
     */
    self.setProfileInfo = function setProfileInfo(name, email, phone, townId) {

        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "put",
            url: API_URL + "/api/user/Profile",
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            data: {
                Name: name,
                Email: email,
                PhoneNumber: phone,
                TownId: townId
            }
        });

        return ( request.then(handleSuccess, handleErrorTypeOne) );


    };

    /**
     * PUT api/user/ChangePassword
     * @param oldPass
     * @param newPass
     * @param newPassConf
     *
     */
    self.changePassword = function changePassword(oldPass, newPass, newPassConf) {

        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "put",
            url: API_URL + "/api/user/ChangePassword",
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            data: {
                OldPassword: oldPass,
                NewPassword: newPass,
                ConfirmPassword: newPassConf
            }
        });

        return ( request.then(handleSuccess, handleErrorTypeTwo) );
    };

    /**
     * POST api/user/Ads
     * @param title
     * @param text
     * @param image
     * @param cat categoryId
     * @param town TownId
     */
    self.postUserAd = function postAd(title, text, image, cat, town) {

        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "post",
            url: API_URL + "/api/user/Ads/",
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            data: {
                Title: title,
                Text: text,
                ImageDataURL: image,
                CategoryId: cat,
                TownId: town
            }
        });

        return ( request.then(handleSuccess, handleErrorTypeTwo) );
    };

    /**
     *  PUT api/user/Ads/{id}
     *
     * @param {id} id  ID for the required ad
     * @param {boolean} changeImage
     * @param title
     * @param text
     * @param image
     * @param cat
     * @param town
     */
    self.editUserAd = function postAd(id, changeImage, title, text, image, cat, town) {
        var userdata = $cookieStore.get('userdata');

        if (!changeImage) {
            image = undefined;
        }
        if (image === "//:0") {
            image = null;
        }

        var request = $http({
            method: "put",
            url: API_URL + "/api/user/Ads/" + id,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            },
            data: {
                Title: title,
                Text: text,
                ChangeImage: changeImage,
                ImageDataURL: image,
                CategoryId: cat,
                TownId: town
            }
        });

        return ( request.then(handleSuccess, handleErrorTypeTwo) );
    };

    /**
     *  GET api/user/Ads?Status={Status}&StartPage={StartPage}&PageSize={PageSize}
     *
     * @param {status} status  Status for the required page
     *  All - 'all'
     *  Inactive - 0
     *  WaitingApproval - 1
     *  Published - 2
     *  Rejected - 3
     * @param {startPage} startPage The page to be displayed
     * @param {pageSize} pageSize The page size to be displayed
     *
     */
    self.getUserAds = function (status, startPage, pageSize) {
        if (status == 'all') status = '';

        if (Number(startPage) < 0 || Number(startPage) > 100000) startPage = 1;
        if (Number(pageSize) < 0 || Number(pageSize) > 1000) pageSize = 4;

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
                StartPage: startPage,
                PageSize: pageSize
            }
        });

        return ( request.then(handleSuccess, handleErrorTypeOne) );
    };

    /**
     *  GET api/user/Ads/{id}
     *
     * @param {id} id  ID for the required ad
     *
     *
     */
    self.getUserAd = function (id) {
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "get",
            url: API_URL + "/api/user/Ads/" + id,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            }
        });

        return ( request.then(handleSuccess, handleErrorTypeOne) );
    };

    /**
     *  PUT api/user/Ads/Deactivate/{id}
     *
     * @param {id} id  ID for the required ad
     *
     *
     */
    self.deactivateUserAd = function (id) {
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "put",
            url: API_URL + "/api/user/Ads/Deactivate/" + id,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            }
        });

        return ( request.then(handleSuccess, handleErrorTypeOne) );
    };

    /**
     *  PUT api/user/Ads/PublishAgain/{id}
     *
     * @param {id} id  ID for the required ad
     *
     *
     */
    self.publishAgainUserAd = function (id) {
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "put",
            url: API_URL + "/api/user/Ads/PublishAgain/" + id,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            }
        });

        return ( request.then(handleSuccess, handleErrorTypeOne) );
    };

    /**
     *  DELETE api/user/Ads/{id}
     *
     * @param {id} id  ID for the required ad
     *
     *
     */
    self.deleteUserAd = function (id) {
        var userdata = $cookieStore.get('userdata');

        var request = $http({
            method: "delete",
            url: API_URL + "/api/user/Ads/" + id,
            headers: {
                Authorization: 'Bearer ' + userdata.access_token
            }
        });

        return ( request.then(handleSuccess, handleErrorTypeOne) );
    };


    function handleErrorTypeOne(response) {

        if (
            !angular.isObject(response.data) || !response.data.error
        ) {
            return ( $q.reject("An unknown error occurred.") );
        }

        // Otherwise, use expected error message.
        return ( $q.reject(response.data.error_description) );

    }

    function handleErrorTypeTwo(response) {

        if (
            !angular.isObject(response.data) || !response.data.message
        ) {
            return ( $q.reject("An unknown error occurred.") );
        }

        // Otherwise, use expected error message.
        return ( $q.reject(response.data.modelState) );

    }

    function handleSuccess(response) {

        return ( response.data );

    }
}]);