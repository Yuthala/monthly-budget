//'use strict';
//TO DO: 
//погуглить реактивное гетеры  и сеттеры
// дописать после строки 178 функции для добавления в объект по кнопке Рассчитать бюджет - необязательные расходы, накопления, дополнительные доходы - по кнопке Рассчитать бюджет значения должны записываться в appData
//два раза считает расходы, если ввести enter и по нажатию Рассчитать бюджет
// сделать дополнительную функцию для добавления в объект по переходу в другое поле
//сделать переход по Tab
//заменить nested if на другую проверку (если оба поля "Сумма" и "процент" имеют валидные значения, только тогда производятся вычисления)
//секция "Рассчитать бюджет" = по кнопке расчет трех полей. Если остаток, цифра зеленая. Если дефицит - красная без минуса, потенциальный доход зеленый, если получился дефицит - серый ноль.
//сделать другой цвет для текста в полях вывода: доходы, накопления - зеленые, расходы - оранжевые, бюджет на день и уровень дохода - серые
//добавить кнопку "обновить расчет"
//рефактор кода


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
	passiveIncomeSum = document.querySelectorAll ('.choose-sum'),


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

	remainderValue = document.getElementById ('remainder'),
	shortageValue = document.getElementById ('shortage-value'),
	potentialIncomeValue = document.getElementById('potential-income'),

	regex = /^\d*\.?\d*$/; 

	console.log(elementsArray);
	console.log(checkbox);
	console.log(income);
	console.log(labels);

elementsArray.forEach(function(elem) { //массив инпутов
    elem.addEventListener('keydown', function(e) {
        if(e.code == 'Enter' || e.code == 'Tab') { //переход между инпутами по Enter или по Tab
          e.preventDefault();
		  console.log(`${this.value} - Значение получено из поля ${elem.id} `);

		//текстовые поля
		  if (elem.id == 'input-2' || elem.id == 'input-4' || elem.id == 'input-6' || elem.id == 'input-8' || elem.id == 'input-10' || elem.id == 'input-12' || elem.id == 'input-15'|| elem.id == 'input-16' || elem.id == 'input-18') {
			document.getElementById(this.dataset.exp).focus();
			document.getElementById(this.dataset.exp).select();
			
		} else if (elem.id == 'budget_input') { //поле бюджет на месяц
				while (this.value == "" || this.value == null || this.value > 1000000000 || !regex.test(this.value)){ //проверка корректно ли введена сумма бюджета
				alert ("Введите число без дополнительных символов");
				return;	
		  		}
				console.log('enter pushed');
		  	appData.budget = this.value;
			document.getElementById(this.dataset.exp).focus();
			document.getElementById(this.dataset.exp).select();
			appData.detectDayBudget();
			appData.detectLevel();

        } else if (elem.id == 'input-3' || elem.id == 'input-5' || elem.id == 'input-7') { //поля сумм обязательных расходов
				while (this.value > 1000000000 || !regex.test(this.value)){ //проверка корректно ли введена сумма обязательных расходов
				alert ("Введите число без дополнительных символов");
				return;
		  		}
		  appData.expenses += Number(this.value);
		  console.log(`${appData.expenses} - Текущая сумма обязательных расходов`);
		  appData.detectMandatoryExpSum();
		  document.getElementById(this.dataset.exp).focus();
		  document.getElementById(this.dataset.exp).select();
		 

		} else if (elem.id == 'input-9' || elem.id == 'input-11') {//поля сумм необязательных расходов 
				while (this.value > 1000000000 || !regex.test(this.value)){ //проверка корректно ли введена сумма необязательных расходов	
				alert ("Введите число без дополнительных символов");
				return;
				}
			appData.optionalExpenses += Number(this.value);
			console.log(`${appData.optionalExpenses} - Текущая сумма необязательных расходов`);
			appData.detectOptExpSum();
			document.getElementById(this.dataset.exp).focus();
		  	document.getElementById(this.dataset.exp).select();
			
		} else if (elem.id == 'input-13') { //поле сумма накоплений
			while (this.value > 1000000000 || this.value == 0 || !regex.test(this.value)){ //проверка корректно ли введена сумма накоплений
				alert ("Введите число >0 без дополнительных символов");
				return;
			}
				appData.passiveIncome =  Number(this.value);
				console.log(`${appData.passiveIncome} - доход от накоплений за 1 мес`)
				document.getElementById(this.dataset.exp).focus();
				document.getElementById(this.dataset.exp).select();
			
					// if (elem.id == 'input-14') {
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

			let calculations = appData.passiveIncome*Number(this.value)/100/12;//расчет накоплений за месяц
			monthSavingsValue.textContent = calculations.toFixed();
			document.getElementById(this.dataset.exp).focus();
			document.getElementById(this.dataset.exp).select();

		} else if (elem.id == 'input-17' || elem.id == 'input-19') { //поля дополнительного дохода
				while (this.value > 10000000 || !regex.test(this.value)){ //проверка корректно ли введены суммы дополнительного дохода	
				alert ("Введите число без дополнительных символов");
				return;
				}
			appData.additionalIncome += Number(this.value);
			console.log(`${appData.additionalIncome} - Текущая сумма дополнительных доходов`);
			appData.detectIncome();
			document.getElementById(this.dataset.exp).focus();
		  	document.getElementById(this.dataset.exp).select();
		}
}
    });
});


calcButton.addEventListener ('click', function (e) { //действия по кнопке Рассчитать Бюджет
	e.preventDefault;
	appData.budget = budgetEnter.value; //добавляем бюджет в массив
	appData.detectDayBudget();
	appData.detectLevel();

	appData.expenses = 0; //обнуляем и перезаписываем обязательные расходы
	expensesSum.forEach(function(elem) {
		appData.expenses += Number(elem.value);
		console.log(`${appData.expenses} - проверка цикла forEach expenses`);
	});

	appData.optionalExpenses = 0; //обнуляем и перезаписываем необязательные расходы
	optionalExpensesSum.forEach(function (elem) {
		appData.optionalExpenses += Number(elem.value);
		console.log(`${appData.optionalExpenses} - проверка цикла forEach optionalExpenses`);
	});

	
	
	appData.budgetCalc();

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
	expenses: 0.0,
	optionalExpenses: 0.0,
	savings: true,
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

	detectMandatoryExpSum: function() { //записываем полученные от пользователя данные сумм обязательных расходов в массив appData
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
		remainder = appData.budget - (appData.expenses + appData.optionalExpenses) + (appData.passiveIncome + appData.additionalIncome);
		console.log(`${remainder} - значение переменной remainder`);
		console.log(`${appData.budget} - значение budget`);
		console.log(`${appData.expenses} - значение expenses, ${appData.optionalExpenses} -  значение Optional expenses`);
		if (remainder >= 0) { //если >= 0, записываем в поле Остаток
			remainderValue.textContent = remainder; 
			potentialIncome = (remainder * 0.07 / 12).toFixed(2);
			if (potentialIncome == 0) {
				potentialIncomeValue.textContent = '0';
				return;
			}
			console.log(`${potentialIncome} - значение потенциального дохода за 1 мес при наличии остатка`);
			potentialIncomeValue.textContent = potentialIncome;

		} else { //если <0, записываем модуль в поле Дефицит
			shortageValue.textContent = Math.abs(remainder);
			potentialIncomeValue.textContent = '0';
			//shortageValue.classList.add('negative');
		}
	},
};

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