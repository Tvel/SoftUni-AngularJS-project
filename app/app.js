'use strict';

var app = angular.module('adsProject', ['ngRoute', 'ui.bootstrap', 'ngCookies'])
    .config(function ($routeProvider) {

        //Main routes
        $routeProvider.when('/home', {
            templateUrl: 'template/home.html',
            controller: 'HomeController as home'
        });
        $routeProvider.when('/login', {
            templateUrl: 'template/login.html',
            controller: 'LoginController as login'
        });
        $routeProvider.when('/register', {
            templateUrl: 'template/register.html',
            controller: 'RegisterController as register'
        });

        // User routes
        $routeProvider.when('/editprofile', {
            templateUrl: 'template/editprofile.html',
            controller: 'editProfileController as editProfile'
        });
        $routeProvider.when('/publish', {
            templateUrl: 'template/publish.html',
            controller: 'PublishAdController as publishAd'
        });
        $routeProvider.when('/myads', {
            templateUrl: 'template/my-ads.html',
            controller: 'MyAdsController as myAds'
        });
        $routeProvider.when('/editad/:id', {
            templateUrl: 'template/edit-ad.html',
            controller: 'EditAdController as editAd'
        });
        $routeProvider.when('/deactivate/:id', {
            templateUrl: 'template/ad-options.html',
            controller: 'DeactivateAdController as adOption'
        });
        $routeProvider.when('/publish/:id', {
            templateUrl: 'template/ad-options.html',
            controller: 'PublishAgainAdController as adOption'
        });
        $routeProvider.when('/delete/:id', {
            templateUrl: 'template/ad-options.html',
            controller: 'DeleteAdController as adOption'
        });


        // Admin routes
        $routeProvider.when('/admin/home', {
            templateUrl: 'template/admin/home.html',
            controller: 'AdminHomeController as editAd'
        });
        $routeProvider.when('/admin/ads/edit/:id', {
            templateUrl: 'template/admin/edit-ad.html',
            controller: 'AdminEditAdController as editAd'
        });
        $routeProvider.when('/admin/ads/delete/:id', {
            templateUrl: 'template/admin/ad-options.html',
            controller: 'AdminDeleteAdController as adOption'
        });
        $routeProvider.when('/admin/ads/approve/:id', {
            templateUrl: 'template/admin/ad-options.html',
            controller: 'AdminApproveAdController as adOption'
        });
        $routeProvider.when('/admin/ads/reject/:id', {
            templateUrl: 'template/admin/ad-options.html',
            controller: 'AdminRejectAdController as adOption'
        });


        $routeProvider.when('/admin/users/list', {
            templateUrl: 'template/admin/users.html',
            controller: 'AdminUsersController as users'
        });
        $routeProvider.when('/admin/users/edit/:id', {
            templateUrl: 'template/admin/edit-user.html',
            controller: 'AdminEditUserController as user'
        });
        $routeProvider.when('/admin/users/delete/:id', {
            templateUrl: 'template/admin/delete-user.html',
            controller: 'AdminDeleteUserController as user'
        });

        $routeProvider.when('/admin/categories/list', {
            templateUrl: 'template/admin/category.html',
            controller: 'AdminCategoriesController as categories'
        });
        $routeProvider.when('/admin/categories/create', {
            templateUrl: 'template/admin/edit-category.html',
            controller: 'AdminCreateCategoryController as category'
        });
        $routeProvider.when('/admin/categories/edit/:id', {
            templateUrl: 'template/admin/edit-category.html',
            controller: 'AdminEditCategoryController as category'
        });
        $routeProvider.when('/admin/categories/delete/:id', {
            templateUrl: 'template/admin/delete-category.html',
            controller: 'AdminDeleteCategoryController as category'
        });

        $routeProvider.when('/admin/towns/list', {
            templateUrl: 'template/admin/town.html',
            controller: 'AdminTownsController as towns'
        });
        $routeProvider.when('/admin/towns/create', {
            templateUrl: 'template/admin/edit-town.html',
            controller: 'AdminCreateTownController as town'
        });
        $routeProvider.when('/admin/towns/edit/:id', {
            templateUrl: 'template/admin/edit-town.html',
            controller: 'AdminEditTownController as town'
        });
        $routeProvider.when('/admin/towns/delete/:id', {
            templateUrl: 'template/admin/delete-town.html',
            controller: 'AdminDeleteTownController as town'
        });






        $routeProvider.otherwise({redirectTo: '/home'});

        //$locationProvider.html5Mode(true);
    });


