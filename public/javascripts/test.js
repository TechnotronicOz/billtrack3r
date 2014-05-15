function HelloController($scope, $location) {
    $scope.greeting = { text: 'Hello' };
}

function CartController($scope) {
    $scope.items = [
        { title: 'One', quantity: 8, price: 3.95 },
        { title: 'Two', quantity: 4, price: 9.99 },
        { title: 'Three', quantity: 2, price: 6.95 }
    ]

    $scope.remove = function(index) {
        $scope.items.splice(index, 1);
    }
}