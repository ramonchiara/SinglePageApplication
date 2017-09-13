var app = angular.module('lojaApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: 'views/principal.html',
                controller: 'lojaCtrl'
            })
            .when("/produto/:id", {
                templateUrl: 'views/produto.html',
                controller: 'lojaCtrl'
            })
            .otherwise({
                redirectTo: "/"
            });
});

app.controller('lojaCtrl', function ($scope, $http, $routeParams) {

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

        $scope.p = null;
        for (p of $scope.produtos) {
            if (p.id == $routeParams.id) {
                $scope.p = p;
                break;
            }
        }
    });

    $scope.filtro = function (value, index, array) {
        return value.preco >= $scope.min && value.preco <= $scope.max;
    };
});
