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
        $routeProvider.otherwise({redirectTo: '/home'});

        //$locationProvider.html5Mode(true);
    });


