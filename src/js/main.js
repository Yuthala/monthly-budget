
let budgetEnter = document.getElementById ('budget_input'),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expenseslValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
	monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
	//расходы
	expensesSum = document.querySelectorAll ('.expenses-sum'),
	optionalExpensesSum = document.querySelectorAll ('.opt-expenses-sum'),
	//секция накопления
	savingsInputSum = document.getElementById ('input-13'),
	savingsInputPercent = document.getElementById ('input-14'),
	additionalIncomeSum = document.querySelectorAll ('.add-income-sum'),
	addIncome = document.querySelector ('#income'),
	checkSavings = document.querySelector ('#input-12'),
	checkAddIncome = document.querySelector ('#input-15'),
	savingsSum = document.querySelector ('#input-13'),
	savingsPercent = document.querySelector ('#input-14'),
	labels = document.querySelectorAll ('label'),
	income = document.querySelectorAll ('.choose-income'),
	checkbox = document.querySelectorAll('.ckeckbox'),
	//инпуты
	elementsArray = document.querySelectorAll('.input-field'),

	//кнопки Рассичтать и Обновить расчет
	calcButton = document.getElementById ('calc'),
	newCalcButton = document.getElementById ('new-calc'),

	//секция final
	remainderValue = document.getElementById ('remainder'),
	shortageValue = document.getElementById ('shortage-value'),
	potentialIncomeValue = document.getElementById ('potential-income'),

	regex = /^\d*\.?\d*$/; 

//объект с данными
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
				levelValue.textContent = "минимальный";
			} else if (appData.moneyPerDay > 499 && appData.moneyPerDay < 2000) {
				levelValue.textContent = "средний";
			} else if (appData.moneyPerDay > 2000) {
				levelValue.textContent = "высокий";
			} else {
			}
	},

	detectMandatoryExpSum: function() { //записываем полученные от пользователя данные сумм обязательных расходов 
		expenseslValue.textContent = appData.expenses;
	},

	detectOptExpSum: function() {
		optionalExpensesValue.textContent = appData.optionalExpenses; //записываем полученные от пользователя данные сумм необязательных расходов в массив appData
	},

	detectIncome: function() {
		incomeValue.textContent = appData.additionalIncome; //записываем полученные от пользователя данные сумм дополнительных доходов в массив appData
	},

	budgetCalc: function (){ //считаем остаток или дефицит
		remainderPercentCalculation();
	},
};

//действия с массивом инпутов
/*
перебор массива инпутов  с целью разделить их на 3 группы: 
текстовые  поля focus, select
инпуты с суммами focus, select + дополнительно проверка корректности ввода суммы пользователем
инпут с процентами (другая проверка)
*/
elementsArray.forEach(function(elem) { 
    elem.addEventListener('keydown', function(e) {
        if(e.code == 'Enter' || e.code == 'Tab') { //переход между инпутами по Enter или по Tab
          e.preventDefault();
		  //console.log(`${this.value} - Значение получено из поля ${elem.id} `);
		
		//текстовые поля без валидации значений
		  if (elem.id == 'input-2' || elem.id == 'input-4' || elem.id == 'input-6' || elem.id == 'input-8' || elem.id == 'input-10' || elem.id == 'input-12' || elem.id == 'input-15'|| elem.id == 'input-16' || elem.id == 'input-18') {
			document.getElementById(this.dataset.exp).focus();
			document.getElementById(this.dataset.exp).select();
		//поля сумм
        } else if (elem.id == 'budget_input' || elem.id == 'input-3' || elem.id == 'input-5' || elem.id == 'input-7' || elem.id == 'input-9' || elem.id == 'input-11' || elem.id == 'input-13' || elem.id == 'input-17' || elem.id == 'input-19') { //поля сумм обязательных расходов
				while (this.value > 1000000000 || !regex.test(this.value)){ //проверка корректно ли заполнены поля с суммами
				alert ("Введите число без дополнительных символов");
				return;
		  		}
			document.getElementById(this.dataset.exp).focus();
			document.getElementById(this.dataset.exp).select();
		//процент для накоплений	
		} else if (elem.id == 'input-14') { 
				if (this.value == "" || this.value == null || !regex.test(this.value)){
					alert ("Введите число без дополнительных символов");
					return;
				} else if (this.value > 100 || this.value < 0) { //проверка верно ли введен процент 
					alert ("введите число от 0 до 100");
					return;
				}
			document.getElementById(this.dataset.exp).focus();
			document.getElementById(this.dataset.exp).select();
		}
		}
    });
});

//действия по кнопке Рассчитать Бюджет
calcButton.addEventListener ('click', function (e) { 
	e.preventDefault;
	appData.budget = budgetEnter.value; //добавляем бюджет в массив
	appData.detectDayBudget();//определяем дневной бюджет
	appData.detectLevel(); //определяем уровень достатка

	expensesSum.forEach(function(elem) { //обязательные расходы
		appData.expenses += Number(elem.value);
		appData.detectMandatoryExpSum();
		//console.log(`${appData.expenses} - проверка цикла forEach expenses`);
	});

	optionalExpensesSum.forEach(function (elem) { //возможные траты
		appData.optionalExpenses += Number(elem.value);
		appData.detectOptExpSum();
		//console.log(`${appData.optionalExpenses} - проверка цикла forEach optionalExpenses`);
	});

	appData.savingsAmount = Number(savingsInputSum.value);
	appData.percentIncome = Number(savingsInputPercent.value);
	appData.passiveIncome = appData.savingsAmount*appData.percentIncome/100/12;//расчет накоплений за месяц
	monthSavingsValue.textContent = appData.passiveIncome.toFixed(2);
	//console.log(`${appData.savingsAmount} - проверка что введено в сумму накоплений`);
	
	additionalIncomeSum.forEach(function (elem) { //дополнительные доходы
		appData.additionalIncome += Number(elem.value);
		appData.detectIncome();
		//console.log(`${appData.additionalIncome} - Текущая сумма дополнительных доходов`);
	});

	appData.budgetCalc(); //расчет остатка и процентов на остаток
});

 //действия по кнопке Обновить расчет
newCalcButton.addEventListener ('click', function (e) {
	window.location.reload();
});



//расчет остатка/дефицита бюджета и потенциальных процентов на остаток
function remainderPercentCalculation() {
		//console.log(`${appData.budget} - значение budget`);
		//console.log(`${appData.expenses} - значение expenses, ${appData.optionalExpenses} -  значение Optional expenses, ${appData.savingsAmount} -  значение passiveIncome, ${appData.additionalIncome} -  значение additionalIncome`);
	remainder = (appData.budget - appData.expenses - appData.optionalExpenses + appData.passiveIncome + appData.additionalIncome).toFixed(2);
		//console.log(`${remainder} - значение переменной remainder`);
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
			//console.log(`${potentialIncome} - значение потенциального дохода за 1 мес при наличии остатка`);
			potentialIncomeValue.textContent = potentialIncome;

		} else { //если <0, записываем модуль в поле Дефицит
			shortageValue.textContent = Math.abs(remainder);
			potentialIncomeValue.textContent = '0';
			shortageValue.classList.add('negative');
			potentialIncomeValue.classList.add('inactive');
		}
}

//массив с чекбоксами накоплений и дополнительных доходов - динамическое добавление классов в зависимости от checked
checkbox.forEach(function(elem) {
	elem.addEventListener('change', function() {
		if(elem.id == 'input-12') { //чекбокс накопления
			if (this.checked) {
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
				for (let i = 0; i < income.length; i++) {
					income[i].removeAttribute ('disabled'); //если checked, делаем поля активными
				}
			} else {
				income.disabled = true; //если unticked, делаем поля неактивными
			}
		}
	});
});