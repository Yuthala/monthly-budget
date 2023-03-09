//'use strict';
//TO DO: 
//сделать другой цвет для текста в полях вывода: доходы, накопления - зеленые, расходы - оранжевые, бюджет на день и уровень дохода - серые
//рефактор кода
//-удалить комментарии
//-добавить комментарии что делает каждая группа
//-разделы: переменные, объекты, функции
//-проверить где используется каждая переменная
//- переместить объект appData после переменных
//-добавить Read Me на Github (примененные технологии ##, для чего это приложение #, как пользоваться с картинками)



let startBtn = document.getElementById ('start'),
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

	expensesSum = document.querySelectorAll ('.expenses-sum'),
	optionalExpensesSum = document.querySelectorAll ('.opt-expenses-sum'),
	savingsInputSum = document.getElementById ('input-13'),
	savingsInputPercent = document.getElementById ('input-14'),
	additionalIncomeSum = document.querySelectorAll ('.add-income-sum'),
	
	//passiveIncomeSum = document.querySelectorAll ('.choose-sum'),


	addIncome = document.querySelector ('#income'),
	checkSavings = document.querySelector ('#input-12'),
	checkAddIncome = document.querySelector ('#input-15'),
	savingsSum = document.querySelector ('#input-13'),
	savingsPercent = document.querySelector ('#input-14'),
	labels = document.querySelectorAll ('label'),
	//labelSum = document.getElementsByTagName ('label')[0];
	//labelPercent = document.getElementsByTagName ('label')[1],

	elementsArray = document.querySelectorAll('.input-field'),
	income = document.querySelectorAll ('.choose-income'),
	//chooseIncome1 = document.querySelectorAll('.choose-income')[0],
	//chooseIncome2 = document.querySelectorAll('.choose-income')[1],
	// chooseIncome3 = document.querySelectorAll('.choose-income')[2],
	//chooseIncome4 = document.querySelectorAll('.choose-income')[3],
	checkbox = document.querySelectorAll('.ckeckbox'),
	calcButton = document.getElementById ('calc'),
	newCalcButton = document.getElementById ('new-calc'),

	remainderValue = document.getElementById ('remainder'),
	shortageValue = document.getElementById ('shortage-value'),
	potentialIncomeValue = document.getElementById ('potential-income'),

	regex = /^\d*\.?\d*$/; 

	console.log(elementsArray);
	console.log(checkbox);
	console.log(income);
	console.log(labels);

//действия с массивом инпутов
/*
перебор массива инпутов  с целью разделить их на 2 группы: 
текстовые  поля focus, select
инпуты с суммами focus, select + дополнительно проверка корректности ввода суммы пользователем
*/
elementsArray.forEach(function(elem) { 
    elem.addEventListener('keydown', function(e) {
        if(e.code == 'Enter' || e.code == 'Tab') { //переход между инпутами по Enter или по Tab
          e.preventDefault();
		  console.log(`${this.value} - Значение получено из поля ${elem.id} `);
		
		//текстовые поля
		  if (elem.id == 'input-2' || elem.id == 'input-4' || elem.id == 'input-6' || elem.id == 'input-8' || elem.id == 'input-10' || elem.id == 'input-12' || elem.id == 'input-15'|| elem.id == 'input-16' || elem.id == 'input-18') {
			document.getElementById(this.dataset.exp).focus();
			document.getElementById(this.dataset.exp).select();
			
		// } else if (elem.id == 'budget_input') { //поле бюджет на месяц
		// 		while (this.value == "" || this.value == null || this.value > 1000000000 || !regex.test(this.value)){ //проверка корректно ли введена сумма бюджета
		// 		alert ("Введите число без дополнительных символов");
		// 		return;	
		//   		}
				//console.log('enter pushed');
		  	//appData.budget = this.value;
			// document.getElementById(this.dataset.exp).focus();
			// document.getElementById(this.dataset.exp).select();
			// appData.detectDayBudget();
			// appData.detectLevel();

        } else if (elem.id == 'budget_input' || elem.id == 'input-3' || elem.id == 'input-5' || elem.id == 'input-7' || elem.id == 'input-9' || elem.id == 'input-11' || elem.id == 'input-13' || elem.id == 'input-17' || elem.id == 'input-19') { //поля сумм обязательных расходов
				while (this.value > 1000000000 || !regex.test(this.value)){ //проверка корректно ли заполнены поля с суммами
				alert ("Введите число без дополнительных символов");
				return;
		  		}
		//   appData.expenses += Number(this.value);
		//   console.log(`${appData.expenses} - Текущая сумма обязательных расходов`);
		//   appData.detectMandatoryExpSum();
		  document.getElementById(this.dataset.exp).focus();
		  document.getElementById(this.dataset.exp).select();
		 

		// } else if (elem.id == 'input-9' || elem.id == 'input-11') {//поля сумм необязательных расходов 
		// 		while (this.value > 1000000000 || !regex.test(this.value)){ //проверка корректно ли введена сумма необязательных расходов	
		// 		alert ("Введите число без дополнительных символов");
		// 		return;
		// 		}
		// 	// appData.optionalExpenses += Number(this.value);
		// 	// console.log(`${appData.optionalExpenses} - Текущая сумма необязательных расходов`);
		// 	// appData.detectOptExpSum();
		// 	document.getElementById(this.dataset.exp).focus();
		//   	document.getElementById(this.dataset.exp).select();
			
		// } else if (elem.id == 'input-13') { //поле сумма накоплений
		// 	while (this.value > 1000000000 || this.value == 0 || !regex.test(this.value)){ //проверка корректно ли введена сумма накоплений
		// 		alert ("Введите число >0 без дополнительных символов");
		// 		return;
		// 	}
		// 		// appData.passiveIncome =  Number(this.value);
		// 		// console.log(`${appData.passiveIncome} - сумма накоплений`)
		// 		document.getElementById(this.dataset.exp).focus();
		// 		document.getElementById(this.dataset.exp).select();
			
		// 			// if (elem.id == 'input-14') {
					// 	while (this.value == "" || this.value == null || !regex.test(this.value)) {
					// 		alert ("Введите число без дополнительных символов");
					// 	}
					// 	if (this.value == "" || this.value == null || !regex.test(this.value)){
					// 		alert ("Введите число без дополнительных символов");
					// 		return;
					// 	} else if (this.value > 100 || this.value <= 0) {
					// 		alert ("введите число от 0 до 100");
					// 		return;
					// 	} else {
					// 		let calculations = appData.passiveIncome*Number(this.value)/100/12;
					// 		monthSavingsValue.textContent = calculations.toFixed();
					// 		document.getElementById(this.dataset.exp).focus();
					// 		document.getElementById(this.dataset.exp).select();
					// 	}
					// }
				
			// appData.passiveIncome =  Number(this.value);
			

		} else if (elem.id == 'input-14') { //процент для накоплений
				if (this.value == "" || this.value == null || !regex.test(this.value)){
					alert ("Введите число без дополнительных символов");
					return;
				} else if (this.value > 100 || this.value < 0) { //проверка верно ли введен процент 
					alert ("введите число от 0 до 100");
					return;
				}
			//appData.percentIncome =  Number(this.value);
			// let calculations = appData.passiveIncome*Number(this.value)/100/12;//расчет накоплений за месяц
			// monthSavingsValue.textContent = calculations.toFixed();
			document.getElementById(this.dataset.exp).focus();
			document.getElementById(this.dataset.exp).select();

		// } else if (elem.id == 'input-17' || elem.id == 'input-19') { //поля дополнительного дохода
		// 		while (this.value > 10000000 || !regex.test(this.value)){ //проверка корректно ли введены суммы дополнительного дохода	
		// 		alert ("Введите число без дополнительных символов");
		// 		return;
		// 		}
// 	appData.additionalIncome += Number(this.value);
// 			console.log(`${appData.additionalIncome} - Текущая сумма дополнительных доходов`);
// 			appData.detectIncome();
// 			document.getElementById(this.dataset.exp).focus();
// 		  	document.getElementById(this.dataset.exp).select();
		}
}
    });
});


calcButton.addEventListener ('click', function (e) { //действия по кнопке Рассчитать Бюджет
	e.preventDefault;
	appData.budget = budgetEnter.value; //добавляем бюджет в массив
	appData.detectDayBudget();//определяем дневной бюджет
	appData.detectLevel(); //определяем уровень достатка

	expensesSum.forEach(function(elem) { //обязательные расходы
		appData.expenses += Number(elem.value);
		appData.detectMandatoryExpSum();
		console.log(`${appData.expenses} - проверка цикла forEach expenses`);
	});

	optionalExpensesSum.forEach(function (elem) { //возможные траты
		appData.optionalExpenses += Number(elem.value);
		appData.detectOptExpSum();
		console.log(`${appData.optionalExpenses} - проверка цикла forEach optionalExpenses`);
	});

	appData.savingsAmount = Number(savingsInputSum.value);
	appData.percentIncome = Number(savingsInputPercent.value);
	appData.passiveIncome = appData.savingsAmount*appData.percentIncome/100/12;//расчет накоплений за месяц
	monthSavingsValue.textContent = appData.passiveIncome.toFixed(2);
	console.log(`${appData.savingsAmount} - проверка что введено в сумму накоплений`);
	
	additionalIncomeSum.forEach(function (elem) { //дополнительные доходы
		appData.additionalIncome += Number(elem.value);
		appData.detectIncome();
		console.log(`${appData.additionalIncome} - Текущая сумма дополнительных доходов`);
	});

	appData.budgetCalc(); //расчет остатка и процентов на остаток
});


newCalcButton.addEventListener ('click', function (e) { //действия по кнопке Обновить расчет
	window.location.reload();
});

/* объект с данными*/
let appData = {
	budget: 0.0,
	expenses: 0.0,
	optionalExpenses: 0.0,
	savings: true,
	savingsAmount: 0.0,
	percentIncome: 0.0,
	passiveIncome: 0.0,
	additionalIncome: 0.0,
	remainder: 0.0,
	potentialIncome: 0.0,

	detectDayBudget: function() { //расчет бюджета на 1 день 
		appData.moneyPerDay = (appData.budget / 30).toFixed();
		dayBudgetValue.textContent = appData.moneyPerDay;
		budgetValue.textContent = appData.budget; //полученные от пользователя данные записываем в созданный div budgetValue
	},
	detectLevel: function() {//определение уровня достатка c выводом в консоль
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

	detectMandatoryExpSum: function() { //записываем полученные от пользователя данные сумм обязательных расходов 
		expenseslValue.textContent = appData.expenses;
	},

	detectOptExpSum: function() {
		optionalExpensesValue.textContent = appData.optionalExpenses; //записываем полученные от пользователя данные сумм необязательных расходов в массив appData
	},

	// checkSavings: function() {

	// }
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

	// chooseOptExpenses: function() { /*запрашиваем у пользователя 2 статьи необязательных расходов */
	// 	for (let i = 0; i < 2; i++) {
	// 		let c = prompt ("Введите необязательную статью расходов в этом месяце", ''),
	// 		d = +prompt ("Во сколько обойдется?", '');
		
	// 		if (typeof(c) === 'string' && typeof(c) != null && c != '' 
	// 		&& typeof(d) != null && d != '' && c.length < 50) {
	// 			console.log ("done");
	// 			appData.optionalExpenses[c] = d; //добавить новое значение в объект
	// 		} else {
	// 			console.log ("bad result");
	// 			i--;
	// 		}
	// 	}
	// },

	// checkSavings: function() { /*проверяем есть ли накопления и рассчитываем сумму ежемесячного дохода */
	// 	if (appData.savings == true) {
	// 		let save = +prompt("Какова сумма накоплений?"),
	// 			percent = +prompt("Под какой процент?");
			
	// 		appData.monthIncome = save/100/12*percent;
	// 		alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
	// 	}
	// },
	
	detectIncome: function() {
		incomeValue.textContent = appData.additionalIncome; //записываем полученные от пользователя данные сумм дополнительных доходов в массив appData
	},

	budgetCalc: function (){ //считаем остаток или дефицит
		remainderPercentCalculation();
	},
};

function remainderPercentCalculation() {
		console.log(`${appData.budget} - значение budget`);
		console.log(`${appData.expenses} - значение expenses, ${appData.optionalExpenses} -  значение Optional expenses, ${appData.savingsAmount} -  значение passiveIncome, ${appData.additionalIncome} -  значение additionalIncome`);
	remainder = (appData.budget - appData.expenses - appData.optionalExpenses + appData.passiveIncome + appData.additionalIncome).toFixed(2);
		console.log(`${remainder} - значение переменной remainder`);
		if (remainder >= 0) { //если >= 0, записываем в поле Остаток
			remainderValue.textContent = remainder; 
			remainderValue.classList.add('plus');
			potentialIncome = (remainder * 0.07 / 12).toFixed(2);//рассчитываем проценты на остаток
			if (potentialIncome == 0) {
				potentialIncomeValue.textContent = '0';
				potentialIncomeValue.classList.add('inactive');
				remainderValue.classList.add('inactive');
				return;
			}
			console.log(`${potentialIncome} - значение потенциального дохода за 1 мес при наличии остатка`);
			potentialIncomeValue.textContent = potentialIncome;

		} else { //если <0, записываем модуль в поле Дефицит
			shortageValue.textContent = Math.abs(remainder);
			potentialIncomeValue.textContent = '0';
			shortageValue.classList.add('negative');
			potentialIncomeValue.classList.add('inactive');
		}
}

checkbox.forEach(function(elem) { //массив с чекбоксами
	elem.addEventListener('change', function() {
		if(elem.id == 'input-12') { //чекбокс накопления
			if (this.checked) {
				console.log("true - input-12");
				savingsSum.disabled = false;
				savingsPercent.disabled = false;
				for (i = 0; i < labels.length; i++) {
					labels[i].classList.add('active'); //если checked, добавляем класс active и делаем поля активными
				}
			} else {
				savingsSum.disabled = true;
				savingsPercent.disabled = true;
				for (i = 0; i < labels.length; i++) {
					labels[i].classList.remove('active'); //если unticked, убираем класс active и делаем поля неактивными
				}
			}
		} else if(elem.id == 'input-15') { //чекбокс дополнительные доходы
			if (this.checked) {
				console.log("true - input-15");
				for (let i = 0; i < income.length; i++) {
					income[i].removeAttribute ('disabled'); //если checked, делаем поля активными
				}
			} else {
				income.disabled = true; //если unticked, делаем поля неактивными
			}
		}
	});
});
console.log(`${appData.savings} - Значение checkbox накоплений`);