`usr strict`
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
   };

let placeholderAmount = document.querySelectorAll('[placeholder="Наименование"]'),
    placeholderNumber = document.querySelectorAll('[placeholder="Сумма"]'),
 start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    data = document.querySelector('.data'),
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem  = document.querySelectorAll('.additional_income-item'),
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

const AppData = function () {
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.precentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};
AppData.prototype.disabledOn = function() {
   allInputLeft.forEach(function (item) {
       item.disabled = true;
    })
};
AppData.prototype.disabledOff = function() {
    allInputLeft.forEach(function (item) {
       item.disabled = false;
    })
  };
AppData.prototype.changeDisplay = function() {
    start.style.display = 'none';
    cancel.style.display = 'block';

  }; 
AppData.prototype.backDisplay = function() {
    start.style.display = 'block';
    cancel.style.display = 'none';
  }; 
AppData.prototype.clearInput = function(){
    allInput.forEach(function (item) {
       item.value = '';
    })
  };
AppData.prototype.reset = function() {
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
  };
AppData.prototype.start = function() {
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
    };
AppData.prototype.checkSalaryAmount = function() {
     if(salaryAmount.value !== '' && isNumber(salaryAmount.value) ){
       start.disabled = false;
     } else {
       start.disabled = true;
     }
  }; 
AppData.prototype.showResult = function () {
    budgetMonthValue.value = this.budgetMonth;   
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
  }; 
AppData.prototype.removeExpensesBlock = function() {
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
        
  }; 
AppData.prototype.removeIncomeBlock = function() {
    if(incomeItems[1]) {
     incomeItems[1].remove();
    }
     let props = Object.getOwnPropertyNames(this.income);
    for (var i = 0; i < props.length; i++) {
     delete this.income[props[i]];
   };
    
    incomePlus.style.display = 'block';
        
  };
AppData.prototype.addExpensesBlock = function() {
     expensesItems[0].insertAdjacentHTML(`beforeend`, `<div class="expenses-items">
                    <input type="text" class="expenses-title" placeholder="Наименование">
                    <input type="text" class="expenses-amount" placeholder="Сумма">
                </div>`);
        expensesPlus.before(expensesItems[0]);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
          expensesPlus.style.display = 'none';
        }
        this.placeholderAmountFunc();
        this.placeholderNumberFunc();
      
  }; 
AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== '') {
         _this.expenses[itemExpenses] = +cashExpenses;
      }
    }); 
  }; 
AppData.prototype.getIncome = function() {
  const _this = this;
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if((itemIncome !== '' || isNumber(itemIncome))&& (cashIncome !== ''|| !isNumber(cashIncome))) {
         _this.income[itemIncome ] = +cashIncome;
      }
    });
  
      for (let key in this.income){
        this.incomeMonth += +this.income[key];
      }
  };
AppData.prototype.addIncomeBlock = function() {
    incomeItems[0].insertAdjacentHTML(`beforeend`, `<div class="income-items">
                    <input type="text" class="income-title" placeholder="Наименование">
                    <input type="text" class="income-amount" placeholder="Сумма">
                </div>`);
                
                incomePlus.before(incomeItems[0]);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
          incomePlus.style.display = 'none';
        }  
        this.placeholderAmountFunc();
       this.placeholderNumberFunc();
     
  }; 
AppData.prototype.getAddExpenses = function() {
   let addExpenses = additionalExpensesItem.value.split(',');
   const _this = this;
   addExpenses.forEach(function(item){
     item = item.trim();
      if(item !== '') {
         _this.addExpenses.push(item);
      }  
   }); 
  }; 
AppData.prototype.getAddIncome = function(){
    const _this = this;
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
          _this.addIncome.push(itemValue);
      }
    }); 
  };
AppData.prototype.getExpensesMonth = function() {
    for(let key in this.expenses){
        this.expensesMonth += this.expenses[key];
      }
     };
AppData.prototype.getBudget = function() {
     this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth ;
     this.budgetDay = Math.floor( this.budgetMonth / 30);
    
  };
AppData.prototype.getTargetMonth = function() {
     return Math.ceil(targetAmount.value  / this.budgetMonth);
     
  };
AppData.prototype.getStatusIncome = function() {
      if (this.budgetDay > 1200){
      console.log('У вас высокий уровень дохода');
    } else if (this.budgetDay <= 1200 && this.budgetDay > 600){
      console.log('У вас средний уровень дохода');
    } else if (this.budgetDay <= 600 && this.budgetDay > 0){
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
      console.log('Вы слишком много тратите');
    }
  
  };
  // Запись расходов в массив с большой буквы
AppData.prototype.asking = function() {
        for(let i = 0; i < this.addExpenses.length; i++) {
           this.addExpenses[i] = this.addExpenses[i].trim() ; 
           this.addExpenses[i] = this.addExpenses[i][0].toUpperCase() + this.addExpenses[i].substr(1);
           }
      };           
AppData.prototype.getInfoDeposit = function() {
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
   }; 
AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
   };
AppData.prototype.getPeriod = function () {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = this.calcSavedMoney();
   
  }; 

AppData.prototype.placeholderAmountFunc = function() {
  placeholderAmount = document.querySelectorAll('[placeholder="Наименование"]');
   placeholderAmount.forEach(function(item) {
    item.addEventListener('input',function() {
      item.value = item.value.replace(/[a-zA-Z0-9]/, '')
    });
  });
}; 
AppData.prototype.placeholderNumberFunc = function() {
   placeholderNumber = document.querySelectorAll('[placeholder="Сумма"]');
  placeholderNumber.forEach(function(item) {
    item.addEventListener('input',function() {
      item.value = item.value.replace(/[^0-9]/, '')
    });
  });
};
AppData.prototype.addEventListenerFunc = function() {
  start.addEventListener('click', this.start.bind(this));
  salaryAmount.addEventListener('change', this.checkSalaryAmount.bind(this) ); 
  periodSelect.addEventListener('input', this.getPeriod.bind(this) ); 
  cancel.addEventListener('click', this.reset.bind(this));
  expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
  incomePlus.addEventListener('click', this.addIncomeBlock.bind(this) );
};  
               
const appData = new AppData();
appData.addEventListenerFunc();
appData.placeholderAmountFunc();
appData.placeholderNumberFunc();




 
