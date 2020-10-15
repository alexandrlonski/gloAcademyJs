let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money ,
  income = "фриланс",
  addExpenses ,
  deposit ,
  mission = +prompt('Какую сумму хотите собрать?','500000'),
  period ,
  budgetDay;

  let start = function() {
    
    // 1. while (isNaN(money) || money.trim() === '' || money === null) {
    // 2. while (isNaN(parseFloat(money))) как вариант,но пропускает числа с пробелом

     do {
        money = prompt('Ваш месячный доход?', '45000');
     }
    while (!isNumber(money));
  }

  start();


addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','питание, ато, кредит, платежи');

 deposit = confirm('Есть ли у вас депозит в банке?');

// let expenses1 = prompt('Введите обязательную статью расходов?', 'питание'),
//     expenses1Amount = +prompt('Во сколько это обойдется?', '20000'),
//     expenses2 = prompt('Введите обязательную статью расходов?', 'авто'),
//     expenses2Amount = +prompt('Во сколько это обойдется?', '5000');

let showTypeOf = function(data) {
  console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(", "));

// let expenses1,
//     expenses2;

let expenses = [];
let costs = [];

let getExpensesMonth = function(){

let num ,
    sum = 0;
 for (let i = 0; i < 2; i++ ) {

      expenses[i] = prompt('Введите обязательную статью расходов?', 'питание');
      num = +prompt('Во сколько это обойдется?');
      while(!isNumber(num) || num === 0) {
         num = +prompt('Во сколько это обойдется?');
      }
     sum += num
 }

 return sum;
}
let expensesMonth = getExpensesMonth();
console.log('Расходы за месяц: ' + expensesMonth);

 let getAccumulatedMonth = function(){
 return money - expensesMonth;
}
let accumulatedMonth = getAccumulatedMonth();

budgetDay =  Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ' + budgetDay);

let getTargetMonth = function(){
  return Math.ceil(mission / accumulatedMonth);
}
if (getTargetMonth() <= 0) {
  console.log('цель небудет достигнута');
} else {
console.log('Cрок достижения цели : ' + getTargetMonth()) ;
} 

let getStatusIncome = function () {
if (budgetDay > 1200){
   return ('У вас высокий уровень дохода');
} else if (budgetDay <= 1200 && budgetDay > 600){
  return ('У вас средний уровень дохода');
} else if (budgetDay <= 600 && budgetDay > 0){
  return ('К сожалению у вас уровень дохода ниже среднего');
} else {
  return ('Что то пошло не так');
}
};
