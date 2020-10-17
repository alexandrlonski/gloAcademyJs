`usr strict`
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
   },
    money,
    start = function() {
     do {
        money = prompt('Ваш месячный доход?', '45000');
     }
    while (!isNumber(money));
    }
  start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 500000,
  period: 12,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function(){
    for(let key in appData.expenses){
        appData.expensesMonth += appData.expenses[key];
      }
      
     },
  getBudget: function() {
     appData.budgetMonth = money - appData.expensesMonth ;
     appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },  
  getTargetMonth: function() {
     return Math.ceil(appData.mission / appData.budgetMonth);
  }, 
  getStatusIncome: function() {
      if (appData.budgetDay > 1200){
       return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay <= 1200 && appData.budgetDay > 600){
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay <= 600 && appData.budgetDay > 0){
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Вы слишком много тратите');
    }
  },
  asking: function() {
     addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','питание, ато, кредит, платежи');
     appData.deposit = confirm('Есть ли у вас депозит в банке?');
     appData.addExpenses = addExpenses.toLowerCase().split(", ");
     for (let i = 0; i < 2; i++ ) {
          let num ; 
          expenses = prompt('Введите обязательную статью расходов?', 'питание');
          num = +prompt('Во сколько это обойдется?');
             while(!isNumber(num) || num === 0) {
               num = +prompt('Во сколько это обойдется?');
             }
          appData.expenses[expenses] = num;   
        };
     
      }    
     
};  

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Расходы за месяц: ' + appData.expensesMonth);

if (appData.getTargetMonth() <= 0) {
  console.log('цель небудет достигнута, вы слишком много тратите');
} else {
console.log('Cрок достижения цели : ' + appData.getTargetMonth()) ;
} 

console.log(appData.getStatusIncome());
  
for(let key in appData) {
  console.log(`Наша программа включает в себя данные: ${key} = ${appData[key]}`);
}

