//'use strict';
//TO DO: chooseExpenses, chooseOptExpenses - переделать prompt на поля вода; изменить цвет в инпутах на черный

var startBtn = document.getElementById ('start'),
	//values = document.querySelectorAll('[class$="-value"]'),
	budgetEnter = document.getElementById ('budget_input'),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expenseslValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
	monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
	yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

	expMandatoryItem = document.getElementsByClassName ('expenses-item'),
	btnMandatoryExpenses = document.getElementsByTagName ('button')[0],
	btnOptionalExpenses = document.getElementsByTagName ('button') [1],
	btnCalculate = document.getElementsByTagName ('button') [2],
	expOptionalItem = document.querySelectorAll ('.optionalexpenses-item'),

	addIncome = document.querySelector ('#income'),
	checkSavings = document.querySelector ('#savings'),
	savingsSum = document.querySelector ('#sum'),
	savingsPercent = document.querySelector ('#percent'),s

	elementsArray = document.querySelectorAll('.input-field');
	console.log(elementsArray);
	//inputYear = document.querySelector ('.year-value'),
	//inputMonth = document.querySelector ('.month-value'),
	//inputDay = document.querySelector ('.day-value');
//var money;


elementsArray.forEach(function(elem) {
    elem.addEventListener('keydown', function(e) {
        if(e.code == 'Enter') {
          e.preventDefault();
		  console.log(`${this.value} - Значение получено из поля ${elem.id} `);

		  if (elem.id == 'input-2' || elem.id == 'input-4' || elem.id == 'input-6') {
			document.getElementById(this.dataset.exp).focus();
			document.getElementById(this.dataset.exp).select();
			
		  } else if (elem.id == 'budget_input') {
			let regex = /^\d*\.?\d*$/;
				while (this.value == "" || this.value == null || this.value > 1000000000 || !regex.test(this.value)){
				alert ("Введите число без дополнительных символов");
				return;//проверка корректно ли введена сумма дохода	
		  }
		  appData.budget = this.value;
			document.getElementById(this.dataset.exp).focus();
			document.getElementById(this.dataset.exp).select();
			appData.detectDayBudget();
			appData.detectLevel();

        } else if (elem.id == 'input-3' || elem.id == 'input-5' || elem.id == 'input-7') {
			let regex = /^\d*\.?\d*$/;
				while (this.value == "" || this.value == null || this.value > 1000000000 || !regex.test(this.value)){
				alert ("Введите число без дополнительных символов");
				return;//проверка корректно ли введена сумма дохода	
		  }
		  appData.expenses += Number(this.value);
		  console.log(`${appData.expenses} - Текущая сумма расходов`);
		  document.getElementById(this.dataset.exp).focus();
		  document.getElementById(this.dataset.exp).select();
		  appData.detectMandatoryExpSum();
		} 

	}
    });
});


//startBtn.addEventListener('click', function() {
	//startBtn.style.transition = 'animation ease-out 2s';
	//startBtn.style.animation = 'none';


// function getNumberFromBudgetTextField() {
// 	budgetEnter.addEventListener('keydown', function(e) {
// 		if(e.code == 'Enter') {
// 			console.log(`${this.value} - Значение получено из поля "ваш бюджет на месяц" `);
// 			appData.budget = this.value;
// 			let regex = /^\d*\.?\d*$/;
// 				while (appData.budget == "" || appData.budget == null || appData.budget > 1000000000 || !regex.test(appData.budget)){
// 					alert ("Введите число без дополнительных символов");
// 					return;//проверка корректно ли введена сумма дохода
// 				}
				
// 			appData.detectDayBudget();
// 			appData.detectLevel();
// 		}
// 	});
// }
// getNumberFromBudgetTextField();



//	money = budgetEnter.value;
//console.log(money);
	//+prompt("Ваш бюджет на месяц?", ''); //получаем от пользователя его бюджет на месяц (размер доходов)

	
	// appData.budget = money; //полученные от пользователя данные записываем в объект appData
	// budgetValue.textContent = money.toFixed(); //полученные от пользователя данные записываем в созданный div budgetValue
	//appData.detectDayBudget();
	// dayBudgetValue.textContent = appData.moneyPerDay;
	// appData.detectLevel();
	// appData.chooseExpenses();
	//appData.chooseOptExpenses();
	//appData.checkSavings();
	//appData.chooseIncome();

	//inputYear.value = new Date(Date.parse(time)).getFullYear();
	//inputMonth.value = new Date(Date.parse(time)).getMonth() + 1;
	//inputDay.value = new Date(Date.parse(time)).getDate();


/*массив с данными*/
let appData = {
	budget: 0.0,
	//timeData: time,
	expenses: 0.0,
	optionalExpenses: {},
	income: [],
	savings: true,
	detectDayBudget: function() { /*расчет бюджета на 1 день */
		appData.moneyPerDay = (appData.budget / 30).toFixed();
		dayBudgetValue.textContent = appData.moneyPerDay;
		budgetValue.textContent = appData.budget; //полученные от пользователя данные записываем в созданный div budgetValue
		//alert(`Ваш бюджет на 1 день: ${appData.moneyPerDay}`);
	},
	detectLevel: function() {/*определение уровня достатка c выводом в консоль*/
			if (appData.moneyPerDay < 499) {
				console.log ('Передано значение "минимальный" в поле уровень Уровень дохода');
				levelValue.textContent = "минимальный";
			} else if (appData.moneyPerDay > 499 && appData.moneyPerDay < 2000) {
				console.log ('Передано значение "средний" в поле уровень Уровень дохода');
				levelValue.textContent = "средний";
			} else if (appData.moneyPerDay > 2000) {
				console.log ('Передано значение "высокий" в поле уровень Уровень дохода');
				levelValue.textContent = "высокий";
			} else {
				console.log ("Произошла ошибка");
			}
	},

	detectMandatoryExpSum: function() {
		expenseslValue.textContent = appData.expenses;
	},

	// chooseExpenses: function() { /*запрашиваем у пользователя 2 статьи обязательных расходов */
	// 	for (let i = 0; i < 3; i++) {
	// 		let a = prompt ("Введите обязательную статью расходов в этом месяце", ''),
	// 		b = +prompt ("Во сколько обойдется?", '');
		
	// 		if (typeof(a) === 'string' && typeof(a) != null && a != '' 
	// 		&& typeof(b) != null && b != '' && a.length < 50) {
	// 			console.log ("done");
	// 			appData.expenses[a] = b; 
	// 		} else {
	// 			console.log ("bad result");
	// 			i--;
	// 		}
	// 	}
	// },

	chooseOptExpenses: function() { /*запрашиваем у пользователя 2 статьи необязательных расходов */
		for (let i = 0; i < 2; i++) {
			let c = prompt ("Введите необязательную статью расходов в этом месяце", ''),
			d = +prompt ("Во сколько обойдется?", '');
		
			if (typeof(c) === 'string' && typeof(c) != null && c != '' 
			&& typeof(d) != null && d != '' && c.length < 50) {
				console.log ("done");
				appData.optionalExpenses[c] = d; //добавить новое значение в объект
			} else {
				console.log ("bad result");
				i--;
			}
		}
	},

	checkSavings: function() { /*проверяем есть ли накопления и рассчитываем сумму ежемесячного дохода */
		if (appData.savings == true) {
			let save = +prompt("Какова сумма накоплений?"),
				percent = +prompt("Под какой процент?");
			
			appData.monthIncome = save/100/12*percent;
			alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
		}
	},
	
	chooseIncome: function() {
			let items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)', '');
		
			if (typeof(items) != 'string' || typeof(items) == null || items == '' ) 
		{
			alert('Вы ввели неверные данные или не ввели их вовсе');
		} else {
			console.log ("done");
			appData.income = items.split(', ');
			appData.income.push(prompt('Может что-то еще?'));
			appData.income.sort();
		}

			appData.income.forEach(function(itemmassive, i) {
				alert('Способы доп. заработка: ' + (i+1) + " - " + itemmassive);
		});
	}
};

// appData.chooseExpenses();
// appData.detectDayBudget();

/*for (var key in appData) {
	if (typeof appData.key === 'function') {
		appData.key();
	}
	alert('Наша программа включает в себя данные:' +key + ' - ' + appData[key]);
};*/
