'use strict';

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state('home', {
        url: '/',
        controller: 'homeCtrl',
        controllerAs: 'homeCtrl',
        templateUrl: 'partials/home.html',
        data : {
            pageTitle: 'd3 portfolio',
            description: 'by niekes'
        }
    })
    .state('linechart', {
        url: '/linechart',
        controller: 'linechartCtrl',
        controllerAs: 'linechartCtrl',
        templateUrl: 'partials/linechart.html',
        data : {
            showInList: true,
            pageTitle: 'Multi series line chart',
            // description: 'with zooming effect',
            description: 'with v4',
            codeLink: 'linechart'
        }
    })
    .state('pathanimation', {
        url: '/pathanimation',
        templateUrl: 'partials/pathanimation.html',
        data : {
            showInList: true,
            pageTitle: 'Path animation',
            description: 'with text',
            codeLink: 'pathanimation'
        }
    })
    .state('histogram', {
        url: '/histogram',
        controller: 'histogramCtrl',
        controllerAs: 'histogramCtrl',
        templateUrl: 'partials/histogram.html',
        data : {
            showInList: true,
            pageTitle: 'Histogram',
            description: 'for images',
            codeLink: 'histogram'
        }
    })
    .state('treemap', {
        url: '/treemap',
        controller: 'treemapCtrl',
        controllerAs: 'treemapCtrl',
        templateUrl: 'partials/treemap.html',
        data : {
            showInList: true,
            pageTitle: 'Treemap',
            description: 'with tranformation to table',
            codeLink: 'treemap'
        }
    })
    .state('gauge', {
        url: '/gauge',
        controller: 'gaugeCtrl',
        controllerAs: 'gaugeCtrl',
        templateUrl: 'partials/gauge.html',
        data : {
            showInList: true,
            pageTitle: 'Gauge',
            description: 'with number at the tip of the needle',
            codeLink: 'gauge'
        },
    })
    .state('textanimation', {
        url: '/textanimation',
        controller: 'textanimationCtrl',
        controllerAs: 'textanimationCtrl',
        templateUrl: 'partials/textanimation.html',
        data : {
            showInList: true,
            pageTitle: 'Text Animation',
            description: 'interpolation between to numeric values',
            codeLink: 'textanimation'
        },
    })
    .state('stackedcolumnchart', {
        url: '/stackedcolumnchart',
        controller: 'stackedcolumnchartCtrl',
        controllerAs: 'stackedcolumnchartCtrl',
        templateUrl: 'partials/stackedcolumnchart.html',
        data : {
            showInList: true,
            pageTitle: 'Stacked Column Chart',
            description: 'with negative values',
            codeLink: 'stackedcolumnchart'
        }
    })
    .state('piechart', {
        url: '/piechart',
        controller: 'piechartCtrl',
        controllerAs: 'piechartCtrl',
        templateUrl: 'partials/piechart.html',
        data : {
            showInList: true,
            pageTitle: 'Pie Chart',
            description: 'with arc padding and rounded corners',
            codeLink: 'piechart'
        }
    })
    .state('scatterplot', {
        url: '/scatterplot',
        controller: 'scatterplotCtrl',
        controllerAs: 'scatterplotCtrl',
        templateUrl: 'partials/scatterplot.html',
        data : {
            showInList: true,
            pageTitle: 'Scatterplot',
            description: 'with curved text',
            codeLink: 'scatterplot'
        }
    });

    $urlRouterProvider.otherwise('/');
});

app.run(function ($rootScope, $state){
    $rootScope.$state = $state;
});
