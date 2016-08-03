angular.module('calcApp').controller('ProdCtrl', function($scope) {
  
  // Инициализация скидки
  $scope.discount = 7;
  
  // Инициализация товаров
  $scope.products = [
  {name: 1, price:100, sale: 100},
  {name: 2, price:100, sale: 100},
  {name: 3, price:100, sale: 100},
  ];

  // Функцию, которая отвечает за добавление товара  
  $scope.addNewProd = function() {
    $scope.products.push($scope.newProd);
    $scope.newProd.sale = $scope.newProd.price;
    $scope.newProd = null;
  };

  // Функция, которые высчитывает скидку
  $scope.discounApply = function() {

    // Сумма товаров в корзине
    var sum = 0;
    for( var i = 0; i < $scope.products.length; i++ ) {
      sum += $scope.products[i].price;
    };

    // Вычисляется процент каждого товара от общей стоимости
    // Вычисление скидки пропорционально от каждого товара с округлением в меньшую сторону
    var number = [];
    for( var j = 0; j <$scope.products.length; j++ ) {
      number.push(Math.floor($scope.discount*(($scope.products[j].price)*100/sum)/100));
    };

    // Вычисление суммы скидки, которая уже расписана по товарам
    var sale = number.reduce(function(sum, current) {
      return sum + current;
    }, 0); 

    // Поиск индекса товара с самой высокой ценой 
    var emax = Math.max.apply(null, number);

    // Замена значения скидки для самого дорогого товара, 
    // оставшаяся после округления, чтобы в итоге была скидка равная $scope.discount = 7;
    var a = 0;
    var index = 0;
    for ( a; a < number.length; a++) {
      if(number[a] === emax) {
        index = a;
      } 
    }
    
    number[index] = emax + ($scope.discount - sale);

    // Вывод скидки для каждого товара
    for( var m = 0; m < $scope.products.length; m++ ) {
      var sale = $scope.products[m].sale;
      $scope.products[m].sale = $scope.products[m].price - number[m];
    }
  }
});