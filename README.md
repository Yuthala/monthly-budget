# Money Keeper
HTML + CSS + SASS + vanilla JavaScript

High-level monthly personal/family budget calculation with indication what is your potential additional income in case you invest a remainder at 'conditionally zero-risk' interest rate.

This is a study project to practice basic JavaScript functions and methods - cycles, conditions, dataset, array methods, number methods, RegExp, keyboard and mouse events. User amount entry fields are being validated, text fields don't. 'Focus' and 'select' methods allow to auto-select next field by pressing Eneter or Tab key. Mouse-click can be used to select any field and buttons.
No libraries used.

Styles include CSS variables for colors and CSS mixins for input fields and buttons. Savings and additional income fields become active or inactive (by adding classes dynamically) depending on checkbox status. SASS is used as a CSS preprocessor. Imported font Poppins.

## How to use?
There are no mandatory fields but the final output depends on how accurate your entries are!
Use Enter or Tab to move by input fields. You can also use click necessary field with a mouse. Enter only values without percentage or currency symbols into values fields. Enter whatever is understandable for you in text fields. Press "Рассчитать бюджет" when finished entries. Press "Обновить расчет" to restart calculation. 
1. Enter your monthly main income. 

<img width="370" alt="Screenshot 2023-03-09 at 14 35 41" src="https://user-images.githubusercontent.com/113363158/224011738-2a5d2058-1823-41d2-ba96-069ebf5c4d62.png">

2. Enter your mandatory and optional expenses. Group your mandatory expenses into maximum 3 groups and optional expenses into maximum 2 groups. 
<img width="700" alt="Screenshot 2023-03-09 at 14 37 19" src="https://user-images.githubusercontent.com/113363158/224012005-1ccf347c-a1fa-43cd-963f-9050a384f5e7.png">
3. Tick the checkbox if you have some savings. Entry fields become active. Enter savings amount and interest rate.
<img width="578" alt="Screenshot 2023-03-09 at 14 38 48" src="https://user-images.githubusercontent.com/113363158/224012307-c2471b66-b7b9-4d01-8b7f-d2378e5311ad.png">
4. Tick the checkbox if you have addional income. Entry fields become active. Enter additional income. Group your additional income into maximum 2 groups.
<img width="705" alt="Screenshot 2023-03-09 at 14 44 01" src="https://user-images.githubusercontent.com/113363158/224013367-dd798425-e7c3-417e-8708-4509b34201af.png">
5. Click "Рассчитать бюджет". We are done!  At the right-hand side you'll see an output table with your income, expenses and savings, which create your passive income. The program also calculates how much you can spend daily to fit your budget and your 'wealth rate' (very conditionally).
<img width="403" alt="Screenshot 2023-03-09 at 15 12 54" src="https://user-images.githubusercontent.com/113363158/224019873-7dc99da3-e2d5-4016-ab61-530cadee4066.png">
6. Resulting table below indicates if your monthly budget is positive (and you have some remainder) or negative. If you've got a remainder you can see what is your potential income if you invest the remainder at 'conditionally zero-risk' rate, which is currently 7% for Russian Rouble.
<img width="394" alt="Screenshot 2023-03-09 at 15 16 08" src="https://user-images.githubusercontent.com/113363158/224021215-a87eff54-60e0-45d8-ba60-829362a5e562.png">

7. To start new calculation press "Обновить расчет" button and repeat all the steps.

Hope you enjoy using this tool!
