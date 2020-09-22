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

let transactions = dummyTransactions;

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.innerHTML = ` 
	  ${transaction.text}
	  <span>${sign}${Math.abs(transaction.amount)}</span>
	  <button class='delete-btn'>x</button>
	`;
  list.appendChild(item);
}

function updateValues() {
  const total = transactions
    .map((transaction) => transaction.amount)
    .reduce((cur, acc) => (cur += acc), 0)
    .toFixed(2);
  const income = transactions
    .map((transaction) => transaction.amount)
    .filter((amount) => amount > 0)
    .reduce((cur, acc) => (cur += acc), 0)
    .toFixed(2);
  const expense = (
    transactions
      .map((transaction) => transaction.amount)
      .filter((amount) => amount < 0)
      .reduce((cur, acc) => (cur += acc), 0) * -1
  ).toFixed(2);

  balance.innerHTML = `$${total}`;
  moneyPlus.innerHTML = `$${income}`;
  moneyMinus.innerHTML = `$${expense}`;
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
