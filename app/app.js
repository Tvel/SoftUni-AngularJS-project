'use strict';

var app = angular.module('AdsProject', ['ngRoute', 'ui.bootstrap'])
    .config(function ($routeProvider, $locationProvider) {
        //$routeProvider.when('/main', {
        //    templateUrl: 'templates/main.html',
        //    controller: 'Main as main'
        //});
        //$routeProvider.when('/add', {
        //    templateUrl: 'templates/add.html',
        //    controller: 'Add as add'
        //});
        $routeProvider.otherwise({redirectTo: '/main'});

        $locationProvider.html5Mode(true);
    });