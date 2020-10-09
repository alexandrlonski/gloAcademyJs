const money = 3000,
  income = "фриланс",
  addExpenses = "Питание, Платежи, Здоровье",
  deposit = false,
  mission = 20000,
  period = 12,
  budgetDay = 3000 / 30;

console.log(money, income, deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " долларов");
console.log(addExpenses.toLowerCase().split(", "));

console.log(budgetDay);
