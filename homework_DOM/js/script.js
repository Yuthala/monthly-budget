'use strict'

let listItem = document.querySelectorAll('.menu-item'),
	ul = document.querySelector('.menu'),
	menuNewItem = document.createElement('li'),
	img = document.body,
	title = document.getElementById('title'),
	adv = document.body.querySelector('.adv'),
	promptApple = document.getElementById('prompt');

	// menuNewItem1 = document.createElement('li');

menuNewItem.classList.add('menu-item');
// menuNewItem1.classList.add('menu-item');
console.log(menuNewItem);

menuNewItem.innerHTML = 'Пятый пункт';
// ul.insertBefore(menuNewItem, listItem[1]);

// ul.removeChild(listItem[2]);

// menuNewItem1.innerHTML = 'Пятый пункт';
// ul.appendChild(menuNewItem1);

ul.insertBefore(listItem[2], listItem[1]);
ul.appendChild(menuNewItem);

img.style.backgroundImage = "url('img/apple_true.jpg')";

title.textContent = 'Мы продаем только подлинную технику Apple';
console.log(title);

adv.remove();

let ans = prompt("Как вы относитесь к технике Apple?");
promptApple.textContent = ans;