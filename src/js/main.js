'use strict';

let startBtn = document.getElementById ('start'),
	//values = document.querySelectorAll('[class$="-value"]'),
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
	savingsPercent = document.querySelector ('#percent'),
	inputYear = document.querySelector ('.year-value'),
	inputMonth = document.querySelector ('.month-value'),
	inputDay = document.querySelector ('.day-value');


let money, time;


startBtn.addEventListener('click', function() {
	time = prompt("Введите дату в формате YYYY-MM-DD", ''); //получаем от пользователя дату
	money = +prompt("Ваш бюджет на месяц?", ''); //получаем от пользователя его бюджет на месяц (размер доходов)

	while (isNaN(money) || money == "" || money == null) {
		money = +prompt("Ваш бюджет на месяц?", '');//проверка корректно ли введена сумма дохода
	}
	appData.budget = money; //полученные от пользователя данные записываем в объект appData
	budgetValue.textContent = money.toFixed(); //полученные от пользователя данные записываем в созданный div budgetValue
	inputYear.value = new Date(Date.parse(time)).getFullYear();
	inputMonth.value = new Date(Date.parse(time)).getMonth() + 1;
	inputDay.value = new Date(Date.parse(time)).getDate();
});

/*массив с данными*/
let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: true,
	chooseExpenses: function() { /*запрашиваем у пользователя 2 статьи обязательных расходов */
		for (let i = 0; i < 2; i++) {
			let a = prompt ("Введите обязательную статью расходов в этом месяце", ''),
			b = +prompt ("Во сколько обойдется?", '');
		
			if (typeof(a) === 'string' && typeof(a) != null && a != '' 
			&& typeof(b) != null && b != '' && a.length < 50) {
				console.log ("done");
				appData.expenses[a] = b; 
			} else {
				console.log ("bad result");
				i--;
			}
		}
	},
	detectDayBudget: function() { /*расчет бюджета на 1 день */
		appData.moneyPerDay = (appData.budget / 30).toFixed();
		alert(`Ваш бюджет на 1 день: ${appData.moneyPerDay}`);
	},
	detectLevel: function() {/*определение уровня достатка c выводом в консоль*/
		function detectLevel() {
			if (appData.moneyPerDay < 100) {
				console.log ("Это минимальный уровень достатка");
			} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
				console.log ("Это средний уровень достатка");
			} else if (appData.moneyPerDay > 2000) {
				console.log ("Это высокий уровень достатка!");
			} else {
				console.log ("Произошла ошибка");
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
	chooseOptExpenses: function() { /*запрашиваем у пользователя 2 статьи необязательных расходов */
		for (let i = 0; i < 3; i++) {
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
