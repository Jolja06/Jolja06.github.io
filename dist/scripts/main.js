(function(){
  angular
    .module('calcApp', ['discount.service', 'products.ctrl']);
})();
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
(function() {
  angular
    .module('discount.service', [])
    .factory('DiscountService', DiscountService)

    function DiscountService() {
      var obj = {count: count};

      function count(prod, discount) {
        // Сумма товаров в корзине
        var sum = 0;
        for( var i = 0; i < prod.length; i++ ) {
          sum += prod[i].price;
        };

        // Вычисляется процент каждого товара от общей стоимости
        // Вычисление скидки пропорционально от каждого товара с округлением в меньшую сторону
        var number = [];
        for( var j = 0; j <prod.length; j++ ) {
          number.push(Math.floor(discount*((prod[j].price)*100/sum)/100));
        };

        // Вычисление суммы скидки, которая уже расписана по товарам
        var sale = number.reduce(function(sum, current) {
          return sum + current;
        }, 0); 

        // Поиск индекса товара с самой высокой ценой 
        var emax = Math.max.apply(null, number);

        // Замена значения скидки для самого дорогого товара, 
        // оставшаяся после округления, чтобы в итоге была скидка равная discount = 7;
        var a = 0;
        var index = 0;
        for ( a; a < number.length; a++) {
          if(number[a] === emax) {
            index = a;
          } 
        }

        number[index] = emax + (discount - sale);

        // Вывод скидки для каждого товара
        for( var m = 0; m < prod.length; m++ ) {
          var sale = prod[m].sale;
          prod[m].sale = prod[m].price - number[m];
        }
        return prod;
      }
      return obj;
    } 

})();