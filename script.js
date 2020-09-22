const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 },
];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.innerHTML = ` 
	  ${transaction.text}
	  <span>${sign}${Math.abs(transaction.amount)}</span>
	  <button class='delete-btn' onclick='removeTransaction(${
      transaction.id
    })'>x</button>
	`;
  list.appendChild(item);
}

function updateValues() {
  const amount = transactions.map((transaction) => transaction.amount);
  const total = amount.reduce((cur, acc) => (cur += acc), 0).toFixed(2);
  const income = amount
    .filter((amount) => amount > 0)
    .reduce((cur, acc) => (cur += acc), 0)
    .toFixed(2);
  const expense = (
    amount
      .filter((amount) => amount < 0)
      .reduce((cur, acc) => (cur += acc), 0) * -1
  ).toFixed(2);

  balance.innerHTML = `$${total}`;
  moneyPlus.innerHTML = `$${income}`;
  moneyMinus.innerHTML = `$${expense}`;
}

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please provide transaction');
  } else {
    const transaction = {
      id: generateRandomId(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = '';
    amount.value = '';
  }
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
}

function generateRandomId() {
  return Math.floor(Math.random() * 100000000);
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
