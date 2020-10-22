`usr strict`
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
   };


let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem  = document.querySelectorAll('.additional_income-item'),
    // additionalIncome2  = document.querySelectorAll('.additional_income-item')[1],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items');
  


start.disabled = true;  

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  precentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function() {
    appData.budget = +salaryAmount.value;
    
    // appData.getPeriod();
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
    
    // start.removeEventListener('click', appData.start);
    },
  checkSalaryAmount: function() {
     if(salaryAmount.value !== '' && isNumber(salaryAmount.value) ){
       start.disabled = false;
     } else {
       start.disabled = true;
     }
  },  
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;   
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcSavedMoney();
   

  },
   
  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
          expensesPlus.style.display = 'none';
        }
        
  },  
  getExpenses: function() {
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== '') {
         appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function() {
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if((itemIncome !== '' || isNumber(itemIncome))&& (cashIncome !== ''|| !isNumber(cashIncome))) {
         appData.income[itemIncome ] = +cashIncome;
      }
    });
  
      for (let key in appData.income){
        appData.incomeMonth += +appData.income[key];
      }

  },
   addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 2){
          incomePlus.style.display = 'none';
        }
  }, 
  getAddExpenses: function() {
   let addExpenses = additionalExpensesItem.value.split(',');
   addExpenses.forEach(function(item){
     item = item.trim();
      if(item !== '') {
          appData.addExpenses.push(item);
      }
   });
  },
  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
          appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function() {
    for(let key in appData.expenses){
        appData.expensesMonth += appData.expenses[key];
      }
    // console.log('Расходы за месяц: ' + appData.expensesMonth);  
     },
  getBudget: function() {
     appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth ;
     appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },  
  getTargetMonth: function() {
     return Math.ceil(targetAmount.value  / appData.budgetMonth);
     
  }, 
  getStatusIncome: function() {
      if (appData.budgetDay > 1200){
      console.log('У вас высокий уровень дохода');
    } else if (appData.budgetDay <= 1200 && appData.budgetDay > 600){
      console.log('У вас средний уровень дохода');
    } else if (appData.budgetDay <= 600 && appData.budgetDay > 0){
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
      console.log('Вы слишком много тратите');
    }
  },
  asking: function() {
     
      
    //  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','питание, ато, кредит, платежи');
    //  while(isNumber(addExpenses) || addExpenses === null || addExpenses === '') {
    //            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','питание, ато, кредит, платежи');
    //          }
    //  appData.deposit = confirm('Есть ли у вас депозит в банке?');
    //  appData.addExpenses = addExpenses.toLowerCase().split(",");
    //  for (let i = 0; i < 2; i++ ) {
    //       let num ; 
    //       expenses = prompt('Введите обязательную статью расходов?', 'питание');
    //        while(isNumber(expenses) || expenses === null || expenses === '' ) {
    //            expenses = +prompt('Введите обязательную статью расходов?', 'питание');
    //          }
    //       num = +prompt('Во сколько это обойдется?');
    //          while(!isNumber(num) || num === 0) {
    //            num = +prompt('Во сколько это обойдется?');
    //          }
    //       appData.expenses[expenses] = num;   
    //     };
        for(let i = 0; i < appData.addExpenses.length; i++) {
            appData.addExpenses[i] = appData.addExpenses[i].trim() ; 
            appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].substr(1)
  
}
     
      },
   getInfoDeposit: function() {
     if(appData.deposit){
       
       appData.precentDeposit = +prompt('Какой годовой процент', '5');
       while(!isNumber(appData.precentDeposit) || appData.precentDeposit === 0) {
               appData.precentDeposit = +prompt('Какой годовой процент', '5');
             }
       appData.moneyDeposit = +prompt('какая сумма заложена?', 20000);
        while(!isNumber(appData.moneyDeposit) || appData.moneyDeposit === 0) {
               appData.moneyDeposit = +prompt('какая сумма заложена?', 20000);
             }
     }
   },
   calcSavedMoney: function() {
    return appData.budgetMonth * periodSelect.value;

   }, 
   getPeriod: function () {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = appData.calcSavedMoney();
  }, 
  
};
salaryAmount.addEventListener('change', appData.checkSalaryAmount ); 
periodSelect.addEventListener('input', appData.getPeriod );  
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock );


// if (appData.getTargetMonth <= 0) {
//         console.log('цель небудет достигнута, вы слишком много тратите');
//       } else {
//         console.log('Cрок достижения цели : ' + appData.getTargetMonth);
//       } 

// for(let key in appData) {
// console.log(`Наша программа включает в себя данные: ${key} = ${appData[key]}`);
// }

// appData.getInfoDeposit();
// console.log(appData.precentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

// console.log(appData.addExpenses.join(', '));

 