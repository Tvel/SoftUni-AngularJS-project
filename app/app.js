'use strict';

var app = angular.module('adsProject', ['ngRoute', 'ui.bootstrap', 'ngCookies'])
    .config(function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'template/home.html',
            controller: 'HomeController as home'
        });
        //$routeProvider.when('/home?Category=:', {
        //    templateUrl: 'template/home.html',
        //    controller: 'home as home'
        //});

        $routeProvider.when('/login', {
            templateUrl: 'template/login.html',
            controller: 'LoginController as login'
        });
        $routeProvider.when('/register', {
            templateUrl: 'template/register.html',
            controller: 'RegisterController as register'
        });
        $routeProvider.when('/editprofile', {
            templateUrl: 'template/editprofile.html',
            controller: 'editProfileController as editProfile'
        });
        $routeProvider.when('/publish', {
            templateUrl: 'template/publish.html',
            controller: 'PublishAdController as publishAd'
        });
        $routeProvider.when('/myads', {
            templateUrl: 'template/myads.html',
            controller: 'MyAdsController as myAds'
        });
        $routeProvider.when('/editad', {
            templateUrl: 'template/editad.html',
            controller: 'EditAdController as editAd'
        });
        $routeProvider.otherwise({redirectTo: '/home'});

        //$locationProvider.html5Mode(true);
    });


