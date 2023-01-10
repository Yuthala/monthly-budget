let money, time;

/*запрашиваем у пользователя бюджет и дату*/
function start() {
	money = +prompt("Ваш бюджет на месяц?", '');
	time = prompt("Введите дату в формате YYYY-MM-DD", '');

	while (isNaN(money) || money == "" || money == null) {
		money = +prompt("Ваш бюджет на месяц?", '');
	}
}
start();


/*массив с данными*/
let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: true
};

/*запрашиваем у пользователя 2 статьи обязательных расходов */
function chooseExpenses() {
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
}
chooseExpenses();

/*запрашиваем у пользователя 2 статьи необязательных расходов */
function chooseOptExpenses() {
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
}
chooseOptExpenses();

/*расчет бюджета на 1 день */
function detectDayBudget() {
	appData.moneyPerDay = (appData.budget / 30).toFixed();
	alert(`Ваш бюджет на 1 день: ${appData.moneyPerDay}`);
}

detectDayBudget();


/*определение уровня достатка c выводом в консоль*/
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

detectLevel();

/*проверяем есть ли накопления и рассчитываем сумму ежемесячного дохода */
function checkSavings() {
	if (appData.savings == true) {
		let save = +prompt("Какова сумма накоплений?"),
			percent = +prompt("Под какой процент?");
		
		appData.monthIncome = save/100/12*percent;
		alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
	}
}

checkSavings();