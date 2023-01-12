'use strict'

let listItem = document.querySelectorAll('.menu-item'),
	ul = document.querySelector('.menu'),
	menuNewItem = document.createElement('li'),
	menuNewItem1 = document.createElement('li');

menuNewItem.classList.add('menu-item');
menuNewItem1.classList.add('menu-item');
console.log(menuNewItem);

menuNewItem.innerHTML = 'Второй пункт';
ul.insertBefore(menuNewItem, listItem[1]);

ul.removeChild(listItem[2]);

menuNewItem1.innerHTML = 'Пятый пункт';
ul.appendChild(menuNewItem1);



