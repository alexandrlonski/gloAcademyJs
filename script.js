`usr strict`
const isNumber = function(n) {
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
     

class AppData {
   constructor() {
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
  }

     disabledOn() {
   allInputLeft.forEach(function (item) {
       item.disabled = true;
    })
  }
     disabledOff() {
    allInputLeft.forEach(function (item) {
       item.disabled = false;
    })
  }
     changeDisplay() {
    start.style.display = 'none';
    cancel.style.display = 'block';

  }
     backDisplay() {
    start.style.display = 'block';
    cancel.style.display = 'none';
  } 
     clearInput() {
    allInput.forEach(function (item) {
       item.value = '';
    })
  }
     reset() {
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
  }
     start() {
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
  }
     checkSalaryAmount() {
     if(salaryAmount.value !== '' && isNumber(salaryAmount.value) ){
       start.disabled = false;
     } else {
       start.disabled = true;
     }
  }
     showResult() {
    budgetMonthValue.value = this.budgetMonth;   
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
  } 
     removeExpensesBlock() {
    for(let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].remove();
    }   
    
     let props = Object.getOwnPropertyNames(this.expenses);
    for (var i = 0; i < props.length; i++) {
     delete this.expenses[props[i]];
   };
     
    expensesPlus.style.display = 'block';
        
  }
     removeIncomeBlock() {
    for(let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].remove();
    }
     let props = Object.getOwnPropertyNames(this.income);
    for (var i = 0; i < props.length; i++) {
     delete this.income[props[i]];
   };
    
    incomePlus.style.display = 'block';
        
  }
     addExpensesBlock() {
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
      
  }
     getExpenses() {
    
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== '') {
         this.expenses[itemExpenses] = +cashExpenses;
      }
    }); 
  } 
     getIncome() {
  
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if((itemIncome !== '' || isNumber(itemIncome))&& (cashIncome !== ''|| !isNumber(cashIncome))) {
         this.income[itemIncome ] = +cashIncome;
      }
    });
  
      for (let key in this.income){
        this.incomeMonth += +this.income[key];
      }
  }
     addIncomeBlock() {
    incomeItems[0].insertAdjacentHTML(`beforeend`, `<div class="income-items">
                    <input type="text" class="income-title" placeholder="Наименование">
                    <input type="text" class="income-amount" placeholder="Сумма">
                </div>`);
                
                incomePlus.before(incomeItems[0]);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 2){
          incomePlus.style.display = 'none';
        }  
        this.placeholderAmountFunc();
       this.placeholderNumberFunc();
     
  } 
     getAddExpenses() {
   let addExpenses = additionalExpensesItem.value.split(',');
   addExpenses.forEach((item) => {
     item = item.trim();
      if(item !== '') {
         this.addExpenses.push(item);
      }  
   }); 
  } 
     getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if(itemValue !== ''){
          this.addIncome.push(itemValue);
      }
    }); 
  }
     getExpensesMonth() {
    for(let key in this.expenses){
        this.expensesMonth += this.expenses[key];
      }
  }
     getBudget() {
     this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth ;
     this.budgetDay = Math.floor( this.budgetMonth / 30);
    
  }
     getTargetMonth() {
     return Math.ceil(targetAmount.value  / this.budgetMonth);
     
  }
     getStatusIncome() {
      if (this.budgetDay > 1200){
      console.log('У вас высокий уровень дохода');
    } else if (this.budgetDay <= 1200 && this.budgetDay > 600){
      console.log('У вас средний уровень дохода');
    } else if (this.budgetDay <= 600 && this.budgetDay > 0){
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
      console.log('Вы слишком много тратите');
    }
  
  }
  // Запись расходов в массив с большой буквы
     asking() {
        for(let i = 0; i < this.addExpenses.length; i++) {
           this.addExpenses[i] = this.addExpenses[i].trim() ; 
           this.addExpenses[i] = this.addExpenses[i][0].toUpperCase() + this.addExpenses[i].substr(1);
           }
  }          
     getInfoDeposit() {
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
  } 
     calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }
     getPeriod() {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = this.calcSavedMoney();
   
  }
     placeholderAmountFunc() {
  placeholderAmount = document.querySelectorAll('[placeholder="Наименование"]');
   placeholderAmount.forEach(function(item) {
    item.addEventListener('input',function() {
      item.value = item.value.replace(/[a-zA-Z0-9]/, '')
    });
  });
  } 
     placeholderNumberFunc() {
   placeholderNumber = document.querySelectorAll('[placeholder="Сумма"]');
  placeholderNumber.forEach(function(item) {
    item.addEventListener('input',function() {
      item.value = item.value.replace(/[^0-9]/, '')
    });
  });
  }
     addEventListenerFunc() {
  start.disabled = true; 
  start.addEventListener('click', this.start.bind(this));
  salaryAmount.addEventListener('change', this.checkSalaryAmount.bind(this) ); 
  periodSelect.addEventListener('input', this.getPeriod.bind(this) ); 
  cancel.addEventListener('click', this.reset.bind(this));
  expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
  incomePlus.addEventListener('click', this.addIncomeBlock.bind(this) );
  } 
};               
const appData = new AppData();
appData.addEventListenerFunc();
appData.placeholderAmountFunc();
appData.placeholderNumberFunc();




 