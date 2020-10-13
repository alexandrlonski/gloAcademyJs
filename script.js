let money ,
  income = "фриланс",
  addExpenses ,
  deposit ,
  mission = +prompt('Какую сумму хотите собрать?','500000'),
  period ,
  budgetDay;

money = prompt('Ваш месячный доход?','70000');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','питание, ато, кредит, платежи');

 deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?', 'питание'),
    amount1 = +prompt('Во сколько это обойдется?', '20000'),
    expenses2 = prompt('Введите обязательную статью расходов?', 'авто'),
    amount2 = +prompt('Во сколько это обойдется?', '5000');

let showTypeOf = function(data) {
  console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(", "));

function getExpensesMonth(a, b){
 return a + b;
}
let expensesMonth = getExpensesMonth(amount1, amount2);
console.log('Расходы за месяц: ' + expensesMonth);


function getAccumulatedMonth(a, b){
 return a - b;
}
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);

budgetDay =  Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ' + budgetDay);

function getTargetMonth(a, b){
  return Math.ceil(a / b);
}

console.log('Cрок достижения цели : ' + getTargetMonth(mission, accumulatedMonth )); 

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
console.log(getStatusIncome());