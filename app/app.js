'use strict';

var app = angular.module('AdsProject', ['ngRoute', 'ui.bootstrap'])
    .config(function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'template/home.html',
            controller: 'home as home'
        });
        //$routeProvider.when('/home?Category=:', {
        //    templateUrl: 'template/home.html',
        //    controller: 'home as home'
        //});

        //$routeProvider.when('/login', {
        //    templateUrl: 'templates/login.html',
        //    controller: 'login'
        //});
        $routeProvider.otherwise({redirectTo: '/home'});

        //$locationProvider.html5Mode(true);
    });


