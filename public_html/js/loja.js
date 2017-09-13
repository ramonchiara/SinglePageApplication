var app = angular.module('lojaApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: 'views/principal.html',
                controller: 'lojaCtrl'
            })
            .otherwise({
                redirectTo: "/"
            });
});

app.controller('lojaCtrl', function ($scope, $http) {

    $scope.min = 0;
    $scope.max = 10000;

    $scope.minPreco = 0;
    $scope.maxPreco = 10000;

    $scope.produtos = [];

    $http.get('produtos.json').then(function (response) {
        $scope.produtos = response.data;

        var precos = response.data.map(function (p) {
            return p.preco;
        });

        $scope.minPreco = Math.min.apply(null, precos);
        $scope.maxPreco = Math.max.apply(null, precos);
    });

    $scope.filtro = function (value, index, array) {
        return value.preco >= $scope.min && value.preco <= $scope.max;
    };
});
