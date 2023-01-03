
let money = prompt("Ваш бюджет на месяц?", '');
let time = prompt("Введите дату в формате YYYY-MM-DD", '');

let ans1 = prompt ("Введите обязательную статью расходов в этом месяце", '');
let ans2 = prompt ("Во сколько обойдется?", '');
let ans3 = prompt ("Введите обязательную статью расходов в этом месяце", '');
let ans4 = prompt ("Во сколько обойдется?", '');

let appData = {
	budget: money,
	timeData: time,
	expenses: {
		ans1,
		ans2,
		ans3,
		ans4
	},
	optionalExpenses: {},
	income: [],
	savings: false
};

appData.expenses.ans1 = ans2;
appData.expenses.ans3 = ans4;

alert(`Ваш бюджет на 1 день: ${appData.budget/30}`);

