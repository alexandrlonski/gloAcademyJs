let money ,
  income = "фриланс",
  addExpenses ,
  deposit ,
  mission = prompt('Какую сумму хотите собрать?',''),
  period ,
  budgetDay = money / 30;

money = prompt('Ваш месячный доход?','');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','');

if (prompt('Есть ли у вас депозит в банке?','да/нет') === 'да' ) {
   deposit = true;
} else  {
   deposit = false;
}

let expenses1 = prompt('Введите обязательную статью расходов?', ''),
    amount1 = prompt('Во сколько это обойдется?', ''),
    expenses2 = prompt('Введите обязательную статью расходов?', ''),
    amount2 = prompt('Во сколько это обойдется?', '');

budgetMonth = +money - (+amount1 + +amount2 );

period = Math.ceil(+mission / budgetMonth);

budgetDay =  Math.floor(budgetMonth / 30);

// console.log( typeof(money), typeof(income), typeof(deposit));
// console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " долларов");
console.log('Остаток за день =' + budgetDay); 
console.log('Ваш ежемесячный доход:' + money);
console.log(addExpenses.toLowerCase().split(", "));
console.log('Депозит: ' + deposit);
console.log(expenses1 + ' = ' + amount1);
console.log(expenses2 + ' = ' + amount2 );
console.log('Остаток за месяц =' + budgetMonth);
console.log('Требуемое кол-во месяцев:' + period);

if (budgetDay > 1200){
   console.log('У вас высокий уровень дохода');
} else if (budgetDay < 1200 && budgetDay > 600){
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay > 0){
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
}