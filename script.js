'use strict';

let books = document.querySelector('.books');
let book = document.querySelectorAll('.book');
// задание 1
book[1].after(book[0]);
book[3].before(book[4]);
book[5].after(book[2]);
// задание 2
let elBody = document.querySelector('body');
elBody.style.backgroundImage =" url('../image/adv.jpg')";
// задание 3
let h2 = document.querySelectorAll('h2');
h2[2].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';
// задание 4
document.querySelector('.adv').remove();
// задание 5
let liBook2 = book[0].querySelectorAll('li');
liBook2[8].after(liBook2[4]);
liBook2[4].after(liBook2[5]);
liBook2[9].after(liBook2[2]);
liBook2[9].before(liBook2[7]);

let liBook5 = book[5].querySelectorAll('li');
liBook5[1].after(liBook5[9]);
liBook5[6].after(liBook5[2]);
liBook5[7].after(liBook5[5]);
// задание 6
let newEl = document.createElement('li');
newEl.textContent = 'Глава 8: За пределами ES6' ;
let liBook6 = book[2].querySelectorAll('li');
let ulBook6 = book[2].querySelector('ul')
ulBook6.append(newEl);
newEl.after(liBook6[9]);



