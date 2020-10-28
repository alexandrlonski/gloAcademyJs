`usr strict`
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
   };

// placeholderAmount.forEach(function(){

// });


// let placeholderAmount = document.querySelectorAll([placeholder="Наименование"]);
//     placeholderNumber = document.querySelectorAll([placeholder="Сумма"]);

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    data = document.querySelector('.data'),
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
    expensesItem = document.querySelector('.expenses-items')
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesBlock = document.querySelector('.expenses'),
    allInputLeft = data.querySelectorAll('[type = text]'),
    allInput = document.querySelectorAll('input');
     
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
  disabledOn: function() {
    allInputLeft.forEach(function (item) {
       item.disabled = true;
    })
  },
  disabledOff: function() {
    allInputLeft.forEach(function (item) {
       item.disabled = false;
    })
  },
  changeDisplay: function() {
    start.style.display = 'none';
    cancel.style.display = 'block';

  },
  backDisplay: function() {
    start.style.display = 'block';
    cancel.style.display = 'none';
  },
  clearInput: function(){
    allInput.forEach(function (item) {
       item.value = '';
    })
  },
  reset: function() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.incomeMonth = 0;
    this.expensesMonth = 0;
    this.getBudget();
    this.backDisplay();
    this.disabledOff();
    this.clearInput();
    periodSelect.value = "1";
    this.getPeriod();
    start.disabled = true; 
    expensesPlus.disabled = false;
    incomePlus.disabled = false;
    this.addIncome.splice(0, 3);
     this.removeIncomeBlock();
     this.removeExpensesBlock();
    
    
  },
  start: function() {
    allInputLeft = data.querySelectorAll('[type = text]');
    allInput = document.querySelectorAll('input');
    this.budget = +salaryAmount.value;
    salaryAmount.disabled = true;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    this.disabledOn();
    this.changeDisplay();
    expensesPlus.disabled = true;
    incomePlus.disabled = true;
    
    },
  checkSalaryAmount: function() {
     if(salaryAmount.value !== '' && isNumber(salaryAmount.value) ){
       start.disabled = false;
     } else {
       start.disabled = true;
     }
  },  
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;   
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
  },
  removeExpensesBlock: function() {
    if(expensesItems[1] && expensesItems[2]){
    expensesItems[1].remove();
    expensesItems[2].remove();
  } else if (expensesItems[1]){
    expensesItems[1].remove();
  }
    
     let props = Object.getOwnPropertyNames(this.expenses);
    for (var i = 0; i < props.length; i++) {
     delete this.expenses[props[i]];
   };
     
    expensesPlus.style.display = 'block';
        
  },
  removeIncomeBlock: function() {
    if(incomeItems[1]) {
     incomeItems[1].remove();
    }
     let props = Object.getOwnPropertyNames(this.income);
    for (var i = 0; i < props.length; i++) {
     delete this.income[props[i]];
   };
    
    incomePlus.style.display = 'block';
        
  },
  addExpensesBlock: function() {
     expensesItems[0].insertAdjacentHTML(`beforeend`, `<div class="expenses-items">
                    <input type="text" class="expenses-title" placeholder="Наименование">
                    <input type="text" class="expenses-amount" placeholder="Сумма">
                </div>`);
        expensesPlus.before(expensesItems[0]);
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
  
      for (let key in this.income){
        this.incomeMonth += +this.income[key];
      }
  },
   addIncomeBlock: function() {
    incomeItems[0].insertAdjacentHTML(`beforeend`, `<div class="income-items">
                    <input type="text" class="income-title" placeholder="Наименование">
                    <input type="text" class="income-amount" placeholder="Сумма">
                </div>`);
                
                incomePlus.before(incomeItems[0]);
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
    for(let key in this.expenses){
        this.expensesMonth += this.expenses[key];
      }
 
     },
  getBudget: function() {
     appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth ;
     appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    
  },  
  getTargetMonth: function() {
     return Math.ceil(targetAmount.value  / this.budgetMonth);
     
  }, 
  getStatusIncome: function() {
      if (this.budgetDay > 1200){
      console.log('У вас высокий уровень дохода');
    } else if (this.budgetDay <= 1200 && this.budgetDay > 600){
      console.log('У вас средний уровень дохода');
    } else if (this.budgetDay <= 600 && this.budgetDay > 0){
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
        for(let i = 0; i < this.addExpenses.length; i++) {
           this.addExpenses[i] = this.addExpenses[i].trim() ; 
           this.addExpenses[i] = this.addExpenses[i][0].toUpperCase() + this.addExpenses[i].substr(1)
  
           }
     
      },
   getInfoDeposit: function() {
     if(this.deposit){
       
       this.precentDeposit = +prompt('Какой годовой процент', '5');
       while(!isNumber(this.precentDeposit) || this.precentDeposit === 0) {
               this.precentDeposit = +prompt('Какой годовой процент', '5');
             }
       this.moneyDeposit = +prompt('какая сумма заложена?', 20000);
        while(!isNumber(this.moneyDeposit) || this.moneyDeposit === 0) {
               this.moneyDeposit = +prompt('какая сумма заложена?', 20000);
             }
     }
     
   },
   calcSavedMoney: function() {
    return this.budgetMonth * periodSelect.value;
   }, 
   getPeriod: function () {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = this.calcSavedMoney();
   
  }, 
  
  
};
let startFunc = appData.start.bind(appData),
    checkFunc = appData.checkSalaryAmount.bind(appData),
    periodFunc = appData.getPeriod.bind(appData),
    cancelFunc = appData.reset.bind(appData),
    expensesPlusFunc = appData.addExpensesBlock.bind(appData),
    incomePlusFunc = appData.addIncomeBlock.bind(appData);
salaryAmount.addEventListener('change', checkFunc ); 
periodSelect.addEventListener('input', periodFunc );  
start.addEventListener('click', startFunc);
cancel.addEventListener('click', cancelFunc)
expensesPlus.addEventListener('click', expensesPlusFunc);
incomePlus.addEventListener('click', incomePlusFunc );



 