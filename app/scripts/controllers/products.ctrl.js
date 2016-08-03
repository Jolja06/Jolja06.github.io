(function() {
  angular
    .module('products.ctrl', [])
    .controller('ProdCtrl', function($scope, DiscountService) {
    
      // Инициализация скидки
      $scope.discount = 7;
      
      // Инициализация товаров
      $scope.products = [
      ];

      // Функцию, которая отвечает за добавление товара  
      $scope.addNewProd = function() {
        $scope.products.push($scope.newProd);
        $scope.newProd.sale = $scope.newProd.price;
        $scope.newProd = null;
      };

      // Функция, которые высчитывает скидку
      $scope.discounApply = function() {
        DiscountService.count($scope.products, $scope.discount);
      }
    });
})();